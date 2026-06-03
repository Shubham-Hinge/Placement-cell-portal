import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import StudentProfile from "@/models/StudentProfile";
import User from "@/models/User";

export async function GET(
  req: Request
) {
  try {
    await connectDB();

    const { searchParams } =
      new URL(req.url);

    const userId =
      searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "User ID required",
        },
        { status: 400 }
      );
    }

    const profile =
      await StudentProfile.findOne({
        userId,
      });

    return NextResponse.json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch profile",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request
) {
  try {
    await connectDB();

    const body =
      await req.json();

    const {
      userId,
      fullName,
      phone,
      college,
      course,
      specialization,
      graduationYear,
      cgpa,
      skills,
      github,
      linkedin,
      portfolio,
      resumeUrl,
    } = body;

    const existingProfile =
      await StudentProfile.findOne({
        userId,
      });

    if (existingProfile) {
      const updatedProfile =
        await StudentProfile.findOneAndUpdate(
          { userId },
          {
            fullName,
            phone,
            college,
            course,
            specialization,
            graduationYear,
            cgpa,
            skills,
            github,
            linkedin,
            portfolio,
            resumeUrl,
            profileCompleted: true,
          },
          { new: true }
        );

      return NextResponse.json({
        success: true,
        profile:
          updatedProfile,
      });
    }

    const profile =
      await StudentProfile.create({
        userId,
        fullName,
        phone,
        college,
        course,
        specialization,
        graduationYear,
        cgpa,
        skills,
        github,
        linkedin,
        portfolio,
        resumeUrl,
        profileCompleted: true,
      });

    return NextResponse.json(
      {
        success: true,
        profile,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to save profile",
      },
      { status: 500 }
    );
  }
}