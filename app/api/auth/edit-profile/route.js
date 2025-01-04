import { ConnectDB } from "@/lib/config/db";
import UserModel from "@/lib/models/User";
import { NextResponse } from "next/server";

const loadDB = async () => {
  await ConnectDB();
};
loadDB();

export async function PUT(request) {
  const { userId, firstName, lastName, phoneNumber } = await request.json();

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    await user.save();

    return NextResponse.json(
      { success: true, message: 'Profile updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in PUT /api/auth/edit-profile', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
