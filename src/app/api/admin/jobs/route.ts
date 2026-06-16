import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";

export async function GET() {
  try {
    await connectDB();

    const jobs = await Job.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error("Admin Jobs Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch jobs",
      },
      {
        status: 500,
      }
    );
  }
}