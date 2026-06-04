import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Job from "@/models/Job";
import Application from "@/models/Application";

export async function GET() {
  try {
    await connectDB();

    const totalStudents =
      await User.countDocuments({
        role: "student",
      });

    const selectedStudents =
      await Application.countDocuments({
        status: "Selected",
      });

    const totalJobs =
      await Job.countDocuments();

    const totalApplications =
      await Application.countDocuments();

    const placementRate =
      totalStudents === 0
        ? 0
        : (
            (selectedStudents /
              totalStudents) *
            100
          ).toFixed(2);

    return NextResponse.json({
      success: true,
      analytics: {
        placementRate,
        totalJobs,
        totalApplications,
        selectedStudents,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}