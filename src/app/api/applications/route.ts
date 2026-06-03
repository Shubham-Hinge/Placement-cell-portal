import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";
import StudentProfile from "@/models/StudentProfile";

export async function POST(
  req: Request
) {
  try {
    await connectDB();

    const body =
      await req.json();

    const {
      jobId,
      studentId,
    } = body;

    const profile =
      await StudentProfile.findOne({
        userId: studentId,
      });

    if (!profile) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Complete profile first",
        },
        { status: 400 }
      );
    }

    const existing =
      await Application.findOne({
        jobId,
        studentId,
      });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Already Applied",
        },
        { status: 400 }
      );
    }

    const application =
      await Application.create({
        jobId,
        studentId,
        resumeUrl:
          profile.resumeUrl,
      });

    return NextResponse.json({
      success: true,
      application,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Application Failed",
      },
      { status: 500 }
    );
  }
}