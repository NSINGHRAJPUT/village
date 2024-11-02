import { NextResponse } from "next/server";
import dbConnect from "@/dbconfig/db";
import Caste from "@/model/caste";
// import Family from "@/model/family";
// import FamilyMember from "@/model/familyMember";

export const GET = async (req) => {
  try {
    await dbConnect();

    // Aggregate castes with their families and family members
    const castesWithFamiliesAndMembers = await Caste.aggregate([
      // Lookup families for each caste
      {
        $lookup: {
          from: "families", // Collection name for Family
          localField: "_id",
          foreignField: "caste",
          as: "families",
        },
      },
      // Unwind the families array to access each family
      { $unwind: "$families" },
      // Lookup family members for each family
      {
        $lookup: {
          from: "familymembers", // Collection name for FamilyMember
          localField: "families.members",
          foreignField: "_id",
          as: "families.members",
        },
      },
      // Group back by caste to aggregate all families
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          families: { $push: "$families" },
        },
      },
      // Project the final structure
      {
        $project: {
          _id: 0,
          casteId: "$_id",
          casteName: "$name",
          families: {
            familyId: "$families._id",
            familyName: "$families.familyName",
            mainPerson: "$families.mainPerson",
            members: "$families.members",
          },
        },
      },
      // Optional: Sort by caste name, or any other criteria
      { $sort: { casteName: 1 } },
    ]);

    if (!castesWithFamiliesAndMembers.length) {
      return NextResponse.json(
        { success: false, message: "No castes found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: castesWithFamiliesAndMembers },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching caste families and members:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
};
