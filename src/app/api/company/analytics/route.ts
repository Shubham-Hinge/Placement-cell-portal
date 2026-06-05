import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";
import Application from "@/models/Application";

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

    if (!companyId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Company ID required",
        },
        { status: 400 }
      );
    }

    const jobs =
      await Job.find({
        companyId:
          new mongoose.Types.ObjectId(
            companyId
          ),
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
      });

    const analytics = {
      totalJobs:
        jobs.length,

      activeJobs:
        jobs.filter(
          (job) =>
            job.isActive
        ).length,

      totalApplications:
        applications.length,

      shortlisted:
        applications.filter(
          (app) =>
            app.status ===
            "Shortlisted"
        ).length,

      selected:
        applications.filter(
          (app) =>
            app.status ===
            "Selected"
        ).length,

      rejected:
        applications.filter(
          (app) =>
            app.status ===
            "Rejected"
        ).length,
    };

    return NextResponse.json({
      success: true,
      analytics,
    });
  } catch (error) {
    console.error(
      "Analytics Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load analytics",
      },
      { status: 500 }
    );
  }
}