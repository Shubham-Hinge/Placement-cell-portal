import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import MentorSession from "@/models/MentorSession";

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

    const sessions =
      await MentorSession.find({
        mentorId,
      }).sort({
        sessionDate: 1,
      });

    return NextResponse.json({
      success: true,
      sessions,
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

    const session =
      await MentorSession.create(
        body
      );

    return NextResponse.json({
      success: true,
      session,
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