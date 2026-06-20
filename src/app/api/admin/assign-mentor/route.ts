import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import StudentProfile from "@/models/StudentProfile";

export async function GET() {
  try {
    await connectDB();

    const mentors = await User.find({
      role: "mentor",
    })
      .select("_id name email")
      .sort({
        createdAt: -1,
      });

    const students = await User.aggregate([
      {
        $match: {
          role: "student",
        },
      },
      {
        $lookup: {
          from: "studentprofiles",
          localField: "_id",
          foreignField: "userId",
          as: "profile",
        },
      },
      {
        $unwind: {
          path: "$profile",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "profile.mentorId",
          foreignField: "_id",
          as: "mentor",
        },
      },
      {
        $unwind: {
          path: "$mentor",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          mentorId: "$profile.mentorId",
          mentorName: "$mentor.name",
        },
      },
      {
        $sort: {
          name: 1,
        },
      },
    ]);

    return NextResponse.json({
      success: true,
      mentors,
      students,
    });
  } catch (error) {
    console.error(
      "GET ASSIGN MENTOR ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load mentor data.",
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

    if (
      !studentId ||
      !mentorId
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Student ID and Mentor ID are required.",
        },
        {
          status: 400,
        }
      );
    }

    const profile =
      await StudentProfile.findOneAndUpdate(
        {
          userId: studentId,
        },
        {
          $set: {
            mentorId,
          },
        },
        {
          returnDocument:
            "after",
        }
      );

    if (!profile) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Student profile not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Mentor assigned successfully.",
      profile,
    });
  } catch (error) {
    console.error(
      "POST ASSIGN MENTOR ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to assign mentor.",
      },
      {
        status: 500,
      }
    );
  }
}