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
  try {
    await dbConnect();

    const { familyData, members } = await handleFileUpload(req);
    console.log("familyData", familyData);
    console.log("members", members);
    // Step 1: Find or create the caste
    const casteName = familyData.caste;
    let caste = await Caste.findOne({ name: casteName });
    if (!caste) {
      caste = await Caste.create({ name: casteName });
    }

    // Step 2: Create the family document
    const family = new Family({
      familyName: familyData.familyName,
      caste: caste._id, // Link family to the caste
      members: [], // We will add members later
    });
    await family.save();

    // Step 3: Process and save each family member
    for (const member of members) {
      if (member.photo && member.photoBuffer) {
        const uploadResponse = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "family_photos",
              resource_type: "image",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          stream.end(member.photoBuffer);
        });

        member.photo = uploadResponse.secure_url;
        delete member.photoBuffer;
      }

      // Step 4: Create family member document and associate with family
      const newFamilyMember = new FamilyMember({
        ...member,
        familyId: family._id,
        caste: caste._id,
      });

      // Save the member to get its ID
      await newFamilyMember.save();

      // Add member ID to the family's members array
      family.members.push(newFamilyMember._id);

      // Step 5: Set the main family member (e.g., "grandfather" or "head")
      if (member.relation.toLowerCase() === "grandfather" || member.relation.toLowerCase() === "head") {
        family.mainPerson = newFamilyMember._id;
      }
    }

    // Save the family with updated members and mainPerson
    await family.save();

    return NextResponse.json({
      success: true,
      message: "Family registered successfully",
    });
  } catch (error) {
    console.error("Error processing form submission:", error);

    // Send the error details to the frontend
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit form",
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
};




