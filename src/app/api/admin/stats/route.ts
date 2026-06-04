import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Job from "@/models/Job";
import Application from "@/models/Application";

export async function GET() {
  try {
    await connectDB();

    const users =
      await User.countDocuments();

    const students =
      await User.countDocuments({
        role: "student",
      });

    const companies =
      await User.countDocuments({
        role: "company",
      });

    const jobs =
      await Job.countDocuments();

    const applications =
      await Application.countDocuments();

    const selected =
      await Application.countDocuments({
        status: "Selected",
      });

    return NextResponse.json({
      success: true,
      stats: {
        users,
        students,
        companies,
        jobs,
        applications,
        selected,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load stats",
      },
      { status: 500 }
    );
  }
}