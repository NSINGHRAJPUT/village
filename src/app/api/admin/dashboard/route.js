import dbConnect from "@/dbconfig/db";  // Import DB connection helper
import Caste from "@/model/Caste";        // Import Caste model
import Family from "@/model/Family";      // Import Family model
import FamilyMember from "@/model/FamilyMember"; // Import FamilyMember model
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect(); // Connect to the database
    // Fetch the total number of Castes, Families, and Members from the database
 console.log("Dashboard data fetched successfully");
 
    const totalCast = await Caste.countDocuments();  // Count all Castes
    const totalFamily = await Family.countDocuments();  // Count all Families
    const totalMember = await FamilyMember.countDocuments();  // Count all Family Members

    const data = [
      { label: "Total Cast", value: totalCast },
      { label: "Total Family", value: totalFamily },
      { label: "Total Member", value: totalMember },
    ];


    console.log("Dashboard data fetched successfully" + data);
    
    // Return success response with the fetched data
    return NextResponse.json(
      {
        success: true,
        data: data,  // Include the fetched data
        message: "Dashboard data fetched successfully",  // Message indicating success
      },
      { status: 200 }  // Success status
    );
  } catch (error) {
    // Catch any error and return a failure response
    console.error("Error fetching dashboard data:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard data",  // Custom message for failure
        error: error.message,  // Include error details for debugging
      },
      { status: 500 }  // Server error status
    );
  }
}
