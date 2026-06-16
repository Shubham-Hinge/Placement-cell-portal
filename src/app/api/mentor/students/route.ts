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

    const mentorId =
      searchParams.get(
        "mentorId"
      );

    const students =
      await StudentProfile.find({
        mentorId,
      });

    const result =
      await Promise.all(
        students.map(
          async (
            student
          ) => {
            const user =
              await User.findById(
                student.userId
              ).select(
                "name email"
              );

            return {
              ...student.toObject(),
              name:
                user?.name,
              email:
                user?.email,
            };
          }
        )
      );

    return NextResponse.json({
      success: true,
      students: result,
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