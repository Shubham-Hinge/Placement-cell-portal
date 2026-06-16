import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const companies =
      await User.find({
        role: "company",
      })
        .select("-password")
        .sort({
          createdAt: -1,
        });

    return NextResponse.json({
      success: true,
      companies,
    });
  } catch (error) {
    console.error(
      "GET Companies Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch companies",
      },
      {
        status: 500,
      }
    );
  }
}