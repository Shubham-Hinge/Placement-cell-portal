import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import "@/models/User";
import "@/models/Job";

import Application from "@/models/Application";

export async function GET() {
  try {
    await connectDB();

    const placements =
      await Application.find({
        status: "Selected",
      })
        .populate("studentId")
        .populate("jobId");

    return NextResponse.json({
      success: true,
      placements,
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