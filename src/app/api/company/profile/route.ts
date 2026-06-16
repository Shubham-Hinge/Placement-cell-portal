import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Company from "@/models/Company";

export async function GET(
  request: NextRequest
) {
  try {
    await connectDB();

    const userId =
      request.nextUrl.searchParams.get(
        "userId"
      );

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User ID is required",
      });
    }

    const profile =
      await Company.findOne({
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
          "Failed to load profile",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    await connectDB();

    const body =
      await request.json();

    const {
      userId,
      companyName,
      email,
      phone,
      website,
      industry,
      location,
      description,
      logo,
    } = body;

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User ID is required",
      });
    }

    const profile =
      await Company.findOneAndUpdate(
        {
          userId,
        },
        {
          userId,
          companyName,
          email,
          phone,
          website,
          industry,
          location,
          description,
          logo,
        },
        {
          new: true,
          upsert: true,
        }
      );

    return NextResponse.json({
      success: true,
      message:
        "Profile Saved Successfully",
      profile,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to save profile",
      },
      {
        status: 500,
      }
    );
  }
}