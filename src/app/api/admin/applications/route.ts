import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import "@/models/User";
import "@/models/Job";

import Application from "@/models/Application";

export async function GET() {
  try {
    await connectDB();

    const applications =
      await Application.find()
        .populate("studentId")
        .populate("jobId")
        .sort({
          createdAt: -1,
        });

    return NextResponse.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error(
      "Admin Applications Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch applications",
      },
      {
        status: 500,
      }
    );
  }
}