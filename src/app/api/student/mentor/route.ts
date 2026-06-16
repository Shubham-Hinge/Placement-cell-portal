import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import StudentProfile from "@/models/StudentProfile";
import MentorProfile from "@/models/MentorProfile";
import User from "@/models/User";

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

    const student =
      await StudentProfile.findOne({
        userId,
      });

    if (
      !student ||
      !student.mentorId
    ) {
      return NextResponse.json({
        success: true,
        mentor: null,
      });
    }

    const mentorUser =
      await User.findById(
        student.mentorId
      ).select(
        "name email"
      );

    const mentorProfile =
      await MentorProfile.findOne({
        userId:
          student.mentorId,
      });

    return NextResponse.json({
      success: true,

      mentor: {
        name:
          mentorUser?.name || "",

        email:
          mentorUser?.email || "",

        fullName:
          mentorProfile?.fullName || "",

        designation:
          mentorProfile?.designation || "",

        company:
          mentorProfile?.company || "",

        experience:
          mentorProfile?.experience || "",

        expertise:
          mentorProfile?.expertise || [],

        linkedin:
          mentorProfile?.linkedin || "",

        bio:
          mentorProfile?.bio || "",

        profileImage:
          mentorProfile?.profileImage || "",
      },
    });
  } catch (error) {
    console.error(
      "Student Mentor Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load mentor",
      },
      {
        status: 500,
      }
    );
  }
}