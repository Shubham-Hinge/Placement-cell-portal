import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";

export async function GET() {
  try {
    await connectDB();

    const jobs =
      await Job.find({
        isActive: true,
      }).sort({
        createdAt: -1,
      });

    return NextResponse.json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch jobs",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request
) {
  try {
    await connectDB();

    const body =
      await req.json();

    const {
      companyId,
      companyName,
      title,
      description,
      location,
      salary,
      skills,
      jobType,
      lastDate,
    } = body;

    const job =
      await Job.create({
        companyId,
        companyName,
        title,
        description,
        location,
        salary,
        skills,
        jobType,
        lastDate,
      });

    return NextResponse.json(
      {
        success: true,
        job,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create job",
      },
      { status: 500 }
    );
  }
}