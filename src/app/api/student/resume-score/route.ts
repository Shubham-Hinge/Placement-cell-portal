import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import StudentProfile from "@/models/StudentProfile";

export async function GET(
  req: Request
) {
  try {
    await connectDB();

    const { searchParams } =
      new URL(req.url);

    const userId =
      searchParams.get(
        "userId"
      );

    const profile =
      await StudentProfile.findOne(
        {
          userId,
        }
      );

    if (!profile) {
      return NextResponse.json(
        {
          success: false,
        }
      );
    }

    let score = 0;

    if (
      profile.fullName
    )
      score += 10;

    if (
      profile.phone
    )
      score += 10;

    if (
      profile.college
    )
      score += 10;

    if (
      profile.cgpa
    )
      score += 15;

    if (
      profile.skills?.length > 0
    )
      score += 20;

    if (
      profile.github
    )
      score += 10;

    if (
      profile.linkedin
    )
      score += 10;

    if (
      profile.resumeUrl
    )
      score += 15;

    return NextResponse.json({
      success: true,
      score,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}