import { NextResponse } from "next/server";
import { sendOtpEmail } from "@/lib/utils/nodemailer";
import crypto from "crypto";
import UserModel from "@/lib/models/User";
import { ConnectDB } from "@/lib/config/db";
import OtpModel from "@/lib/models/Otp";

const loadDB = async () => {
  await ConnectDB();
};  
loadDB(); 

const otpStorage = new Map(); // Temporary in-memory store

export async function POST(request) {
  const { email } = await request.json();

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const otp = crypto.randomInt(100000, 999999); // Generate 6-digit OTP
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes

    await OtpModel.create({ email, otp, expiresAt });
    // otpStorage.set(email, otp);

    await sendOtpEmail(email, otp);

    return NextResponse.json(
      { success: true, message: "OTP sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send OTP" },
      { status: 500 }
    );
  }
} 
