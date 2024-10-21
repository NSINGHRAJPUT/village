import { NextResponse } from "next/server";
import dbConnect from "@/dbconfig/db";
import FamilyMember from "@/model/FamilyMember";

export const GET = async (req) => {
  try {
    await dbConnect();

    // Aggregate families by caste
    const casteFamilies = await FamilyMember.aggregate([
      {
        $group: {
          _id: "$caste",
          membersCount: { $sum: 1 },
          members: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          caste: "$_id",
          membersCount: 1,
          members: 1,
        },
      },
      {
        $sort: { membersCount: -1 }, // Sort by members count, descending
      },
    ]);

    if (!casteFamilies.length) {
      return NextResponse.json(
        { success: false, message: "No families found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: casteFamilies },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching caste families:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
};
