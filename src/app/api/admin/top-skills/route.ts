import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import StudentProfile from "@/models/StudentProfile";

export async function GET() {
  try {
    await connectDB();

    const skills =
      await StudentProfile.aggregate([
        {
          $unwind: "$skills",
        },
        {
          $group: {
            _id: "$skills",
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
        {
          $limit: 10,
        },
      ]);

    return NextResponse.json({
      success: true,
      skills,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load skills analytics",
      },
      {
        status: 500,
      }
    );
  }
}