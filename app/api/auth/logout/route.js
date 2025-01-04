import { NextResponse } from "next/server";
import { serialize } from "cookie"; // Used for handling cookies

export async function POST(request) {
  try {
    // Clear the authentication cookie
    const headers = new Headers();

    // Set cookie to expire immediately to log out
    headers.append(
      "Set-Cookie",
      serialize("authToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Only set the cookie to secure in production
        path: "/", // The path where the cookie is valid
        expires: new Date(0), // Expire the cookie immediately
      })
    );

    // Return a successful response
    return new NextResponse(
      JSON.stringify({ success: true, message: "Logged out successfully" }),
      {
        status: 200,
        headers: headers,
      }
    );
  } catch (error) {
    console.error("Error logging out:", error);
    return new NextResponse(
      JSON.stringify({ success: false, message: "Failed to log out" }),
      { status: 500 }
    );
  }
}
