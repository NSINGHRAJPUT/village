import { NextResponse } from "next/server";
import dbConnect from "@/dbconfig/db";
import FamilyMember from "@/model/FamilyMember";
import Family from "@/model/Family";
import Caste from "@/model/Caste"
import jwt from "jsonwebtoken";
import cloudinary from "@/utils/Cloudnary";

export const GET = async (req) => {
  try {
    await dbConnect();

    // Extract token from cookies
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

    // Verify token to get user data
    const { mobile } = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the logged-in family member
    const loggedInMember = await FamilyMember.findOne({ mobile });
    if (!loggedInMember) {
      return NextResponse.json(
        { success: false, message: "Family member not found" },
        { status: 404 }
      );
    }
    // console.log('Logged In Member:=====',loggedInMember)
    // Fetch the family associated with the logged-in member and populate members and caste
    const family = await Family.findById(loggedInMember.familyId)
      .populate("members")       // Populate all family members
      .populate("caste");        // Populate caste details

      // console.log("family",family)
    if (!family) {
      return NextResponse.json(
        { success: false, message: "Family not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: family },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching family data:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
};


export async function handleFileUpload(req) {
  const formData = await req.formData();
  const memberData = {};

  for (const [key, value] of formData.entries()) {
    if (key === "photo" && value instanceof File) {
      // Convert the photo to a buffer for uploading
      memberData[key] = value;
      memberData[`${key}Buffer`] = Buffer.from(await value.arrayBuffer());
    } else {
      // Handle other form fields
      memberData[key] = value;
    }
  }

  return memberData;
}

export const POST = async (req) => {
  try {
    await dbConnect();

    // Parse the request and extract the file and member details
    const memberData = await handleFileUpload(req);

    const { name, dob, mobile, relationToMainPerson, familyId, caste, photo, photoBuffer } = memberData;

    // Upload the photo to Cloudinary if it exists
    let photoUrl = null;
    if (photo && photoBuffer) {
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
        stream.end(photoBuffer);
      });
      photoUrl = uploadResponse.secure_url;
    }

    // Create a new family member
    const member = new FamilyMember({
      name,
      dob,
      mobile,
      relationToMainPerson,
      familyId,
      caste,
      photo: photoUrl, // Save the photo URL
    });

    await member.save();

    // Add the member to the family document
    await Family.findByIdAndUpdate(familyId, {
      $push: { members: member._id },
    });

    return NextResponse.json(
      { success: true, member },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding family member:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add member", error: error.message },
      { status: 500 }
    );
  }
};

