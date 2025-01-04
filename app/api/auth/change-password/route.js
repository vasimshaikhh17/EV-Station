import { ConnectDB } from "@/lib/config/db";
import UserModel from "@/lib/models/User";
import { NextResponse } from "next/server";
import { doHash, doHashValidation } from "@/lib/utils/hashing";

const loadDB = async () => {
  await ConnectDB();
};
loadDB();

export async function PUT(request) {
  const { userId, oldPassword, newPassword } = await request.json();

  try {
    const user = await UserModel.findById(userId).select('+password');
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    const isMatch = await doHashValidation(oldPassword, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Old password is incorrect' },
        { status: 401 }
      );
    }

    user.password = await doHash(newPassword);
    await user.save();

    return NextResponse.json(
      { success: true, message: 'Password updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in PUT /api/auth/change-password', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
