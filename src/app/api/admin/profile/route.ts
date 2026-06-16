import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(
  req: NextRequest
) {
  try {
    await connectDB();

    const userId =
      req.nextUrl.searchParams.get(
        "userId"
      );

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

    const admin =
      await User.findById(
        userId
      ).select(
        "-password"
      );

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Admin not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      admin,
    });
  } catch (error) {
    console.error(
      "Admin Profile GET Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load admin profile",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest
) {
  try {
    await connectDB();

    const {
      userId,
      name,
      email,
      profileImage,
    } = await req.json();

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

    const admin =
      await User.findByIdAndUpdate(
        userId,
        {
          name,
          email,
          profileImage,
        },
        {
          new: true,
        }
      ).select(
        "-password"
      );

    return NextResponse.json({
      success: true,
      admin,
    });
  } catch (error) {
    console.error(
      "Admin Profile POST Error:",
      error
    );

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