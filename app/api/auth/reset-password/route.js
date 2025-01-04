import { ConnectDB } from "@/lib/config/db";
import UserModel from "@/lib/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { doHash } from "@/lib/utils/hashing";

const loadDB = async () => {
  await ConnectDB();
};
loadDB();

export async function PUT(request) {
  const { token, newPassword } = await request.json();

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await UserModel.findById(decoded.userId);
    console.log('user: ', user);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 400 }
      );
    }
    user.password = await doHash(newPassword,12);
    await user.save();
    return NextResponse.json(
      { success: true, message: 'Password reset successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in PUT /api/auth/reset-password', error);
    return NextResponse.json(
      { success: false, message: 'Invalid or expired token' },
      { status: 400 }
    );
  }
}