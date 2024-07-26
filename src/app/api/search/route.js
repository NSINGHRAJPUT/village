import { NextResponse } from "next/server";
import dbConnect from "@/dbconfig/db";
import FamilyMember from "@/model/FamilyMember";

export const GET = async (req) => {
  try {
    await dbConnect();

    const search = req.nextUrl.searchParams.get("search") || "";
    console.log("Search Query:", search);

    if (!search) {
      return NextResponse.json({
        success: false,
        message: "Search query cannot be empty",
      });
    }

    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
        { caste: { $regex: search, $options: "i" } },
        {
          age: isNaN(search)
            ? { $regex: search, $options: "i" }
            : parseInt(search),
        },
      ],
    };

    console.log("Query:", query);

    const members = await FamilyMember.find(query);
    console.log("Members Found:", members);

    return NextResponse.json({ success: true, members });
  } catch (error) {
    console.error("Error searching members:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to search members",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
