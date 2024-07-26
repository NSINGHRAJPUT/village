import { NextResponse } from "next/server";
import dbConnect from "@/dbconfig/db";
import FamilyMember from "@/model/FamilyMember";
import cloudinary from "@/utils/Cloudnary";

// This function will handle file uploads
async function handleFileUpload(req) {
  const formData = await req.formData();
  const members = [];

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
    }
  }

  return members;
}

export const POST = async (req) => {
  try {
    await dbConnect();
    const familyMembers = await handleFileUpload(req);

    for (const member of familyMembers) {
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

      const newFamilyMember = new FamilyMember(member);
      await newFamilyMember.save();
    }

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
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
