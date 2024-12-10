// app/api/family/[familyId]/route.js
import Family from "@/model/Family"; // Import the Family model
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import dbConnect from "@/dbconfig/db";

export async function GET(request, { params }) {

    // Ensure a valid DB connection
  await dbConnect();

  const { familyid } = params; // Extract the familyId from the URL params
  // console.log("Received familyId:", familyid);

  if (!mongoose.Types.ObjectId.isValid(familyid)) {
    // Check if the familyId is a valid MongoDB ObjectId
    return NextResponse.json(
      { success: false, message: "Invalid family ID format" },
      { status: 400 }
    );
  }

  try {
    // Fetch family data based on the familyId
    const family = await Family.findById(familyid)
      .populate({
        path: "members", // Populate all family members
        model: "FamilyMember", // Reference to FamilyMember model
      });

    // console.log("Fetched family:", family);

    // If no family found, return a 404 response
    if (!family) {
      return NextResponse.json(
        { success: false, message: "Family not found" },
        { status: 404 }
      );
    }

    // Return the family data with populated members
    return NextResponse.json(
      { success: true, data: family },
      { status: 200 }
    );
  } catch (error) {
    // Log and handle server error
    console.error("Server error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
