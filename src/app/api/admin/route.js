import { NextResponse } from "next/server";
import dbConnect from "@/dbconfig/db";
import User from "@/model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export const POST = async (req) => {
  try {
    await dbConnect(); // Connect to the database

    // Parse the incoming request body
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 }
      );
    }

    // Check if the user with the provided email exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User with this email does not exist",
        },
        { status: 404 }
      );
    }

    // Compare the entered password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          success: false,
          message: "Incorrect password",
        },
        { status: 401 }
      );
    }

    // Generate a token
    const token = jwt.sign(
      { id: user._id }, // Payload with user ID
      process.env.JWT_SECRET,
      { expiresIn: "4h" } // Token expiry (4 hours)
    );

    // Set the token in cookies
    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict",
      maxAge: 60 * 60 * 4, // Cookie expiry (4 hours)
      path: "/", // Cookie path
    });

    // Create a response and attach the cookie header
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: { name: user.name, email: user.email }, // Optional: Return user data
    });

    response.headers.set("Set-Cookie", cookie); // Attach the cookie to the response

    return response;
  } catch (error) {
    console.error("Error processing login:", error);

    // Return an error response
    return NextResponse.json(
      {
        success: false,
        message: "Failed to login",
        error: error.message, // Include error details
      },
      { status: 500 }
    );
  }
};
