import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import StudentProfile from "@/models/StudentProfile";

export async function GET() {
  try {
    await connectDB();

    const mentors =
      await User.find({
        role: "mentor",
      })
        .select(
          "_id name email"
        )
        .sort({
          createdAt: -1,
        });

    const students =
      await User.find({
        role: "student",
      })
        .select(
          "_id name email"
        )
        .sort({
          createdAt: -1,
        });

    return NextResponse.json({
      success: true,
      mentors,
      students,
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

export async function POST(
  req: Request
) {
  try {
    await connectDB();

    const {
      studentId,
      mentorId,
    } = await req.json();

    const profile =
      await StudentProfile.findOneAndUpdate(
        {
          userId:
            studentId,
        },
        {
          mentorId,
        },
        {
          new: true,
          upsert: true,
        }
      );

    return NextResponse.json({
      success: true,
      profile,
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