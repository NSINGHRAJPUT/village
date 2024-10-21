import { NextResponse } from "next/server";
import dbConnect from "@/dbconfig/db";
import FamilyMember from "@/model/FamilyMember";
import jwt from "jsonwebtoken";

// Get all family members or create a new family member
export const GET = async (req) => {
  try {
    await dbConnect();

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

    // Verify token and get payload
    const { mobile } = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch all family members with the given mobile number
    const familyMembers = await FamilyMember.find({ mobile });

    if (!familyMembers.length) {
      return NextResponse.json(
        { success: false, message: "No family members found" },
        { status: 404 }
      );
    }

    // Determine master member
    const masterMember = familyMembers.reduce(
      (prev, current) => (prev.age > current.age ? prev : current),
      familyMembers[0]
    );

    return NextResponse.json(
      { success: true, data: { familyMembers, masterMember } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching family members:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  try {
    await dbConnect();

    const cookie = req.headers.get("cookie");

    // Extract the token from the cookies (assumes cookie-parser or equivalent parsing)
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

    // Verify token and get payload
    const { mobile } = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch all family members with the given mobile number
    const familyMembers = await FamilyMember.find({ mobile });

    // Determine master member
    const masterMember = familyMembers.reduce(
      (prev, current) => (prev.age > current.age ? prev : current),
      familyMembers[0]
    );

    // Check if the requestor is the master member
    if (
      req.body.age !== masterMember.age ||
      req.body.mobile !== masterMember.mobile
    ) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    // Create new family member
    const newMember = new FamilyMember(req.body);
    await newMember.save();

    return NextResponse.json(
      { success: true, data: newMember },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating family member:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
};

export const PATCH = async (req) => {
  try {
    await dbConnect();

    const cookie = req.headers.get("cookie");

    // Extract the token from the cookies (assumes cookie-parser or equivalent parsing)
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

    // Verify token and get payload
    const { mobile } = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch all family members with the given mobile number
    const familyMembers = await FamilyMember.find({ mobile });

    // Determine master member
    const masterMember = familyMembers.reduce(
      (prev, current) => (prev.age > current.age ? prev : current),
      familyMembers[0]
    );

    // Check if the requestor is the master member
    if (
      req.body.age !== masterMember.age ||
      req.body.mobile !== masterMember.mobile
    ) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    // Get the family member ID from the URL
    const { id } = req.query;

    // Update the family member's data
    const updatedMember = await FamilyMember.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedMember) {
      return NextResponse.json(
        { success: false, message: "Family member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedMember },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating family member:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req) => {
  try {
    await dbConnect();

    const cookie = req.headers.get("cookie");

    // Extract the token from the cookies (assumes cookie-parser or equivalent parsing)
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

    // Verify token and get payload
    const { mobile } = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch all family members with the given mobile number
    const familyMembers = await FamilyMember.find({ mobile });

    // Determine master member
    const masterMember = familyMembers.reduce(
      (prev, current) => (prev.age > current.age ? prev : current),
      familyMembers[0]
    );

    // Check if the requestor is the master member
    if (
      req.body.age !== masterMember.age ||
      req.body.mobile !== masterMember.mobile
    ) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    // Get the family member ID from the URL
    const { id } = req.query;

    // Delete the family member
    const deletedMember = await FamilyMember.findByIdAndDelete(id);

    if (!deletedMember) {
      return NextResponse.json(
        { success: false, message: "Family member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: deletedMember },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting family member:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
};
