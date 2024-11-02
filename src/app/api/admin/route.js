import { NextResponse } from "next/server";
import dbConnect from "@/dbconfig/db";
import User from "@/model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export const POST = async (req) => {
  try {
    await dbConnect(); // Connect to the database
    const { email, password } = await req.json();
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
        { mobile: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      // Set the token in cookies
      const cookie = serialize("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 4, 
        path: "/",
      });

      // const userTypeCookie = serialize("userType", "admin", {
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: "strict",
      //   maxAge: 60 * 60, 
      //   path: "/",
      // });

    // Successful login
    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: { name: user.name, email: user.email }, // Optionally return some user data
    });

    response.headers.set("Set-Cookie", cookie);


  } catch (error) {
    console.error("Error processing login:", error);

    // Send the error details to the frontend
    return NextResponse.json(
      {
        success: false,
        message: "Failed to login",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
