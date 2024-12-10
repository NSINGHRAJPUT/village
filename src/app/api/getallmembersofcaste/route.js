import { NextResponse } from "next/server";
import dbConnect from "@/dbconfig/db";
import FamilyMember from "@/model/FamilyMember";

export const GET = async (req) => {
  try {
    // Connect to the database
    await dbConnect();

    // Get the caste name from the query parameters
    const url = new URL(req.url);
    const caste = url.searchParams.get("caste");
    // console.log("caste", caste);
    // If no caste name is provided, return an error
    if (!caste) {
      return NextResponse.json(
        { success: false, message: "Caste name is required" },
        { status: 400 }
      );
    }

    // Find all members belonging to the specified caste
    const casteMembers = await FamilyMember.find({ caste });

    // If no members are found, return a 404
    if (!casteMembers.length) {
      return NextResponse.json(
        { success: false, message: `No members found for caste ${caste}` },
        { status: 404 }
      );
    }

    // Return the found members
    return NextResponse.json(
      { success: true, data: casteMembers },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching members for caste:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
};
