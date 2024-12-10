import { NextResponse } from "next/server";
import dbConnect from "@/dbconfig/db";
import FamilyMember from "@/model/FamilyMember";
import Family from "@/model/Family";
import Caste from "@/model/Caste"
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

    return NextResponse.json(
      { success: true, data: castes },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching caste data:", error);

    return NextResponse.json(
      { success: false, message: "Server error" , error: error.message},
      { status: 500 }
    );
  }
};


export const POST = async (req) => {
  try{

    await dbConnect();
    
    const body = await req.json();
    const { familyName } = body;  
    console.log("req.body", req.body);
  
    console.log("familyName", familyName);
    

    if (!familyName) {
      console.log("Family name is required");
        return NextResponse.json(
            { success: false , message: "Family name is required" },
            { status: 400  }
          );
    }

      // Create new caste entry
      const caste = new Caste({name :  familyName });
      await caste.save();

      return NextResponse.json(
        { success: true, data : caste },
        { status: 200 }
      );
  
  }catch(error){
    console.error("Error Create Cast data:", error);
    return NextResponse.json(
      { success: false, message: "Server error" , error: error.message},
      { status: 500 }
    );
  } 
}