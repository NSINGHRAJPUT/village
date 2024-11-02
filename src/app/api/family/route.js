import { NextResponse } from "next/server";
import dbConnect from "@/dbconfig/db";
import FamilyMember from "@/model/FamilyMember";
import Family from "@/model/Family";
import jwt from "jsonwebtoken";

export const GET = async (req) => {
  try {
    await dbConnect();

    // Extract token from cookies
    const cookie = req.headers.get("cookie");
    const token = cookie
      ?.split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify token to get user data
    const { mobile } = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the logged-in family member
    const loggedInMember = await FamilyMember.findOne({ mobile });
    if (!loggedInMember) {
      return NextResponse.json(
        { success: false, message: "Family member not found" },
        { status: 404 }
      );
    }

    // Fetch the family associated with the logged-in member and populate members and caste
    const family = await Family.findById(loggedInMember.familyId)
      .populate("members")       // Populate all family members
      .populate("caste");        // Populate caste details

    if (!family) {
      return NextResponse.json(
        { success: false, message: "Family not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: family },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching family data:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
};
