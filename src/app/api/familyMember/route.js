import { NextResponse } from "next/server";
import dbConnect from "@/dbconfig/db";
import Caste from "@/model/Caste";
import Family from "@/model/Family";
import FamilyMember from "@/model/FamilyMember";
import cloudinary from "@/utils/Cloudnary";

// This function will handle file uploads and form parsing
export async function handleFileUpload(req) {
  const formData = await req.formData();
  const members = [];
  let familyData = {};
  for (const [key, value] of formData.entries()) {
    const match = key.match(/members\[(\d+)]\[(\w+)]/);
    if (match) {
      const [, index, field] = match;
      if (!members[index]) {
        members[index] = {};
      }
      if (field === "photo" && value instanceof File) {
        members[index][field] = value;
        members[index][`${field}Buffer`] = Buffer.from(
          await value.arrayBuffer()
        );
      } else {
        members[index][field] = value;
      }
    } else {
      // Non-member fields, assuming they are family-level data (like caste or family name)
      familyData[key] = value;
    }
  }
  return { familyData, members };
}

export const POST = async (req) => {
  await dbConnect(); // Ensure database connection

  const session = await Family.startSession(); // Start a session for the transaction

  try {
    session.startTransaction(); // Begin the transaction

    const body = await req.json();

    const {
      name,
      dob,
      mobile,
      photo,
      relationToMainPerson,
      maternalSurname,
      isMarried,
      education,
      occupationAddress,
      residentAddress,
      bloodGroup,
      isMainPerson,
      casteId,
      familyId,
    } = body;

    if (isMainPerson) {
  
      // Create a new family
      const family = new Family({ caste: casteId });

      // Create the main person
      const newMainPerson = new FamilyMember({
        name,
        dob,
        mobile,
        photo,
        relationToMainPerson: "Self",
        maternalSurname,
        isMarried,
        education,
        occupationAddress,
        residentAddress,
        bloodGroup,
        isMainPerson: true,
        caste: casteId,
        familyId: family._id,
      });

      // Save both Family and FamilyMember in the transaction
      await family.save({ session });
      await newMainPerson.save({ session });

      // Link the main person to the family
      family.mainPerson = newMainPerson._id;
      family.members.push(newMainPerson._id);
      await family.save({ session });

      await session.commitTransaction(); // Commit the transaction
      session.endSession();

      return new Response(
        JSON.stringify({
          message: "Main person and family created successfully.",
          family,
          mainPerson: newMainPerson,
        }),
        { status: 201 }
      );
    } else {
      // Add a member to an existing family
      if (!familyId || !casteId) {
        throw new Error("familyId and casteId are required.");
      }

      const family = await Family.findById(familyId).session(session);
      if (!family) {
        throw new Error("Family not found.");
      }

      const newMember = new FamilyMember({
        name,
        dob,
        mobile,
        photo,
        relationToMainPerson,
        maternalSurname,
        isMarried,
        education,
        occupationAddress,
        residentAddress,
        bloodGroup,
        isMainPerson: false,
        caste: casteId,
        familyId,
      });

      // Save the new member and update the family
      await newMember.save({ session });
      family.members.push(newMember._id);
      await family.save({ session });

      await session.commitTransaction(); // Commit the transaction
      session.endSession();

      return new Response(
        JSON.stringify({
          message: "Family member added successfully.",
          family,
          member: newMember,
        }),
        { status: 201 }
      );
    }
  } catch (error) {
    await session.abortTransaction(); // Rollback the transaction on error
    session.endSession();
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
};


export const DELETE = async (req) => {
  await dbConnect(); // Ensure database connection

  const session = await Family.startSession(); // Start a session for the transaction

  try {
    session.startTransaction(); // Begin the transaction

    const { memberId } = await req.json(); // Parse the request body to get the member ID

    // Fetch the member details
    const member = await FamilyMember.findById(memberId).session(session);
    if (!member) {
      throw new Error("Family member not found.");
    }

    if (member.isMainPerson) {
      // Main Member Deletion
      const familyId = member.familyId;

      // Delete all members linked to the family
      await FamilyMember.deleteMany({ familyId }).session(session);

      // Delete the family
      await Family.findByIdAndDelete(familyId).session(session);

      await session.commitTransaction(); // Commit the transaction
      session.endSession();

      return new Response(
        JSON.stringify({ message: "Main member and associated family deleted successfully." }),
        { status: 200 }
      );
    } else {
      // Normal Member Deletion
      const familyId = member.familyId;

      // Remove the member from the family
      await Family.findByIdAndUpdate(
        familyId,
        { $pull: { members: memberId } }, // Remove member from the `members` array
        { new: true, session }
      );

      // Delete the member
      await FamilyMember.findByIdAndDelete(memberId).session(session);

      await session.commitTransaction(); // Commit the transaction
      session.endSession();

      return new Response(
        JSON.stringify({ message: "Family member deleted successfully." }),
        { status: 200 }
      );
    }
  } catch (error) {
    await session.abortTransaction(); // Rollback the transaction on error
    session.endSession();
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
};

export const PUT = async (req) => {
  await dbConnect(); // Ensure database connection

  try {
    const { id, ...updateData } = await req.json(); // Parse the request body

    if (!id) {
      throw new Error("FamilyMember ID is required.");
    }

    // Update the FamilyMember document
    const updatedMember = await FamilyMember.findByIdAndUpdate(
      id,
      { $set: updateData }, // Only update the provided fields
      { new: true } // Return the updated document
    );

    // console.log("Updated member:", updatedMember);
    

    if (!updatedMember) {
      throw new Error("FamilyMember not found.");
    }

    return new Response(
      JSON.stringify({ message: "FamilyMember updated successfully.", updatedMember }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
};
