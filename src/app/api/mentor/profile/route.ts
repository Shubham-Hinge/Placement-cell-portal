import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import MentorProfile from "@/models/MentorProfile";

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
      await MentorProfile.findOne({
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

    const body =
      await req.json();

    const existing =
      await MentorProfile.findOne({
        userId:
          body.userId,
      });

    if (
      existing
    ) {
      const updated =
        await MentorProfile.findByIdAndUpdate(
          existing._id,
          body,
          {
            new: true,
          }
        );

      return NextResponse.json({
        success: true,
        profile:
          updated,
      });
    }

    const profile =
      await MentorProfile.create(
        body
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