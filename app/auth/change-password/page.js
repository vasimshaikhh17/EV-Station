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
    // Validate required fields
    if (!userId || !oldPassword || !newPassword) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // Fetch the user by ID
    const user = await UserModel.findById(userId).select("+password");
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    // Validate old password
    const isMatch = await doHashValidation(oldPassword, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Old password is incorrect." },
        { status: 401 }
      );
    }

    // Update the password
    user.password = await doHash(newPassword);
    await user.save();

    return NextResponse.json(
      { success: true, message: "Password updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PUT /api/auth/change-password", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
