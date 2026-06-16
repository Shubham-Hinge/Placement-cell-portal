import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import StudentProfile from "@/models/StudentProfile";

export async function GET() {
  try {
    await connectDB();

    const students =
      await StudentProfile.find()
        .sort({
          createdAt: -1,
        });

    return NextResponse.json({
      success: true,
      students,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch students",
      },
      {
        status: 500,
      }
    );
  }
}