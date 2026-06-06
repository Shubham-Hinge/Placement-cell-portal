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
        .populate("jobId");

    const reportData =
      applications.map(
        (app: any) => ({
          student:
            app.studentId?.name ||
            "N/A",

          email:
            app.studentId?.email ||
            "N/A",

          job:
            app.jobId?.title ||
            "N/A",

          company:
            app.jobId
              ?.companyName ||
            "N/A",

          status:
            app.status,
        })
      );

    return NextResponse.json({
      success: true,
      reportData,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}