import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";
import Job from "@/models/Job";

export async function GET(
  req: Request
) {
  try {
    await connectDB();

    const { searchParams } =
      new URL(req.url);

    const companyId =
      searchParams.get(
        "companyId"
      );

    const jobs =
      await Job.find({
        companyId,
      });

    const jobIds =
      jobs.map(
        (job) => job._id
      );

    const applications =
      await Application.find({
        jobId: {
          $in: jobIds,
        },
      })
        .populate(
          "studentId"
        )
        .populate("jobId");

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
          "Failed to fetch applicants",
      },
      { status: 500 }
    );
  }
}