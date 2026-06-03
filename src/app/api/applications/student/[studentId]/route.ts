import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      studentId: string;
    }>;
  }
) {
  try {
    await connectDB();

    const {
      studentId,
    } = await params;

    const applications =
      await Application.find({
        studentId,
      }).populate(
        "jobId"
      );

    return NextResponse.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch applications",
      },
      { status: 500 }
    );
  }
}