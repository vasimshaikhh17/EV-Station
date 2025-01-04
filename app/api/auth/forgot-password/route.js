import { ConnectDB } from "@/lib/config/db";
import UserModel from "@/lib/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { resetPassword } from "@/lib/utils/nodemailer";

const loadDB = async () => {
  await ConnectDB();
};
loadDB();

export async function POST(request) {
  const { email } = await request.json();

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    const resetToken = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: '1h',
    });

    const resetLink = `${process.env.CLIENT_URL}/auth/reset-password?token=${resetToken}`;
    
    await resetPassword(email, 'Password Reset Request', `Click here to reset your password: ${resetLink}`);
    return NextResponse.json(
      { success: true, message: 'Password reset email sent' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in POST /api/auth/forgot-password', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}