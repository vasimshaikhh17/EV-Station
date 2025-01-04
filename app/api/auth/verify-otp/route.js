import { NextResponse } from "next/server";
import UserModel from "@/lib/models/User";
import { ConnectDB } from "@/lib/config/db";
import OtpModel from "@/lib/models/Otp";

const loadDB = async () => {
  await ConnectDB();
};
loadDB();

const otpStorage = new Map(); // Use the same storage as in send-otp

export async function POST(request) {
  const { email, otp } = await request.json();
  console.log(' email, otp: ',  email, otp);

  try {
    // const storedOtp = otpStorage.get(email);
    const otpRecord = await OtpModel.findOne({ email, otp });
    console.log('storedOtp: ', otpRecord);

    // console.log('storedOtp: ', storedOtp);

    if (!otpRecord) {
      return NextResponse.json(
        { success: false, message: "Invalid OTP" },
        { status: 400 }
      );
    }
    const otpExpirationTime = new Date(otpRecord.createdAt).getTime() + 10 * 60 * 1000; // 10 minutes
    const currentTime = new Date().getTime();

    if (currentTime > otpExpirationTime) {
      return NextResponse.json(
        { success: false, message: "Expired OTP" },
        { status: 400 }
      );
    }

    const user = await UserModel.findOneAndUpdate(
      { email },
      { is_verified: true },
      { new: true }
    );

    await OtpModel.deleteOne({ email, otp });
    // otpStorage.delete(email);
    return NextResponse.json(
      { success: true, message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { success: false, message: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}