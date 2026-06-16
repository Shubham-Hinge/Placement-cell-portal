import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import Job from "@/models/Job";
import Application from "@/models/Application";

export async function GET() {
  try {
    await connectDB();

    const totalUsers =
      await User.countDocuments();

    const totalStudents =
      await User.countDocuments({
        role: "student",
      });

    const totalCompanies =
      await User.countDocuments({
        role: "company",
      });

    const totalJobs =
      await Job.countDocuments();

    const totalApplications =
      await Application.countDocuments();

    const selectedStudents =
      await Application.countDocuments({
        status: "Selected",
      });

    const shortlisted =
      await Application.countDocuments({
        status: "Shortlisted",
      });

    const rejected =
      await Application.countDocuments({
        status: "Rejected",
      });

    const placementRate =
      totalStudents > 0
        ? (
            (selectedStudents /
              totalStudents) *
            100
          ).toFixed(1)
        : 0;

    return NextResponse.json({
      success: true,
      analytics: {
        totalUsers,
        totalStudents,
        totalCompanies,
        totalJobs,
        totalApplications,
        selectedStudents,
        shortlisted,
        rejected,
        placementRate,
      },
    });
  } catch (error) {
    console.error(
      "Analytics Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load analytics",
      },
      {
        status: 500,
      }
    );
  }
}