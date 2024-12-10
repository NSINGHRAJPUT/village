import { NextResponse } from "next/server";
import dbConnect from "@/dbconfig/db";
import FamilyMember from "@/model/FamilyMember";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export const POST = async (req) => {
  try {
    await dbConnect();
    const { mobile, age } = await req.json();

    // Validate input
    if (!mobile || !age) {
      return NextResponse.json(
        {
          success: false,
          message: "Mobile number and age are required",
        },
        { status: 400 }
      );
    }
    // console.log(mobile, age);
    // Find the user by mobile number and age
    const familyMember = await FamilyMember.findOne({ mobile });
    
    // console.log(familyMember);
    if (!familyMember) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid mobile number or age",
        },
        { status: 401 }
      );
    }

    // Generate a token
    const token = jwt.sign(
      { mobile: familyMember.mobile, age: familyMember.age },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Set the token in cookies
    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 4, // 1 hour
      path: "/",
    });

    // Set the cookie in the response headers
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      data: { mobile: familyMember.mobile, age: familyMember.age },
    });
    response.headers.set("Set-Cookie", cookie);

    return response;
  } catch (error) {
    console.error("Error processing login request:", error);

    // Send the error details to the frontend
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process login request",
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
};
