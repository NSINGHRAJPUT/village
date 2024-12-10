import { NextResponse } from "next/server";
import dbConnect from "@/dbconfig/db";
import FamilyMember from "@/model/FamilyMember";
import Family from "@/model/Family";
import Caste from "@/model/Caste";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

// export const GET = async (req) => {
//   try{
//     await dbConnect();
//     const castes = await Caste.find({}).sort({ createdAt: -1 });
//     return NextResponse.json(
//       { success: true, data: castes },
//       { status: 200 }
//     );
//   }catch(error){
//     console.error("Error Fetch Cast data:", error);
//     return NextResponse.json(
//       { success: false, message: "Server error" , error: error.message},
//       { status: 500 }
//     );
//   }
// }

export const GET = async () => {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all castes and aggregate the count of families in each caste
    const castes = await Caste.aggregate([
      {
        $lookup: {
          from: "families", // The collection to join with (Family collection)
          localField: "_id", // Field from the Caste document
          foreignField: "caste", // Field in the Family document
          as: "families", // Alias for the resulting array
        },
      },
      {
        $project: {
          name: 1, // Include the caste name
          _id: 1, // Include the caste ID
          totalFamilies: { $size: "$families" }, // Count the number of families associated with the caste
        },
      },
    ]);

    console.log("castes", castes);

    return NextResponse.json({ success: true, data: castes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching caste data:", error);

    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  try {
    await dbConnect();

    const body = await req.json();
    const { familyName } = body;
    console.log("req.body", req.body);

    console.log("familyName", familyName);

    if (!familyName) {
      console.log("Family name is required");
      return NextResponse.json(
        { success: false, message: "Family name is required" },
        { status: 400 }
      );
    }

    // Create new caste entry
    const caste = new Caste({ name: familyName });
    await caste.save();

    return NextResponse.json({ success: true, data: caste }, { status: 200 });
  } catch (error) {
    console.error("Error Create Cast data:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
};

export const PUT = async (req) => {
  try {
    await dbConnect();

    const body = await req.json();
    const { id, familyName } = body;

    if (!id || !familyName) {
      return NextResponse.json(
        { success: false, message: "ID and Name are required" },
        { status: 400 }
      );
    }

    // Update caste by ID
    const updatedCaste = await Caste.findByIdAndUpdate(
      id,
      { name: familyName },
      { new: true } // Return the updated document
    );

    if (!updatedCaste) {
      return NextResponse.json(
        { success: false, message: "Caste not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedCaste },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating caste:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
};

export const DELETE = async (req) => {
  const session = await mongoose.startSession();

  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body to get the ID
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Caste ID is required" },
        { status: 400 }
      );
    }

    session.startTransaction();

    // Find the caste by ID
    const caste = await Caste.findById(id)
      .populate("families")
      .session(session);
    if (!caste) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { success: false, message: "Caste not found" },
        { status: 404 }
      );
    }

    // Delete all family members associated with these families
    const familyMembersDeleted = await FamilyMember.deleteMany({
      caste: id,
    }).session(session);

    console.log("familyMembersDeleted", familyMembersDeleted);

    // Delete all families under this caste
    const familiesDeleted = await Family.deleteMany({
      caste: id,
    }).session(session);

    console.log("familiesDeleted", familiesDeleted);

    // Delete the caste itself
    const casteDeleted = await Caste.findByIdAndDelete(id).session(session);

    console.log("casteDeleted", casteDeleted);

    if (!casteDeleted) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { success: false, message: "Failed to delete caste" },
        { status: 500 }
      );
    }

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json(
      {
        success: true,
        message: "Caste, associated families, and members deleted successfully",
        data: {
          casteDeleted,
          familiesDeleted: familiesDeleted.deletedCount,
          familyMembersDeleted: familyMembersDeleted.deletedCount,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error deleting caste:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
};
