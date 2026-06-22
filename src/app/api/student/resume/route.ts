import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import StudentProfile from "@/models/StudentProfile";
import ResumeAnalysis from "@/models/ResumeAnalysis";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const userId =
      req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const profile =
      await StudentProfile.findOne({
        userId,
      }).lean();

    if (!profile) {
      return NextResponse.json(
        {
          success: false,
          message: "Student profile not found.",
        },
        {
          status: 404,
        }
      );
    }

    const analysis =
      await ResumeAnalysis.findOne({
        userId,
      }).lean();

    return NextResponse.json({
      success: true,
      resumeUrl:
        profile.resumeUrl || "",
      analysis,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}