import { NextResponse } from "next/server";
import dbConnect from "@/dbconfig/db";
import FamilyMember from "@/model/FamilyMember";
import Family from "@/model/Family";


// export const GET = async (req) => {
//   try {
//     await dbConnect();

//     // Extract token from cookies
//     const cookie = req.headers.get("cookie");
//     const token = cookie
//       ?.split("; ")
//       .find((row) => row.startsWith("token="))
//       ?.split("=")[1];

//     if (!token) {
//       return NextResponse.json(
//         { success: false, message: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     // Verify token to get user data
//     const { mobile } = jwt.verify(token, process.env.JWT_SECRET);

//     // Fetch the logged-in family member
//     const loggedInMember = await FamilyMember.findOne({ mobile });
//     if (!loggedInMember) {
//       return NextResponse.json(
//         { success: false, message: "Family member not found" },
//         { status: 404 }
//       );
//     }
//     // console.log('Logged In Member:=====',loggedInMember)
//     // Fetch the family associated with the logged-in member and populate members and caste
//     const family = await Family.findById(loggedInMember.familyId)
//       .populate("members")       // Populate all family members
//       .populate("caste");        // Populate caste details

//       // console.log("family",family)
//     if (!family) {
//       return NextResponse.json(
//         { success: false, message: "Family not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, data: family },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error fetching family data:", error);
//     return NextResponse.json(
//       { success: false, message: "Server error" },
//       { status: 500 }
//     );
//   }
// };

export async function GET(request, { params }) {
  // console.log("data featch get");

  await dbConnect();

  const { castid } = params;

  try {
    // console.log("castid", castid);
    
    // Fetch families with the given casteId
    const families = await Family.find({ caste: castid })
      .populate({
        path: "mainPerson",
        model: "FamilyMember", // Reference the FamilyMember model for population
        select: "name dob mobile relationToMainPerson familyId caste", // Fields to include from FamilyMember
      })
      .select("mainPerson members caste"); // Select only the necessary fields from Family

      // console.log("families a",families);
      
    // Check if families are found
    if (!families) {
      return NextResponse.json(
        { success: false, message: "Family not found" },
        { status: 404 }
      );
    }

    // Return the family data if found
    return NextResponse.json(
      { success: true, data: families },
      { status: 200 }
    );
  } catch (error) {
    // Return an error response in case of server failure
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
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
