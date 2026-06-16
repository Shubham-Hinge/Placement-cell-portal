import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";

export async function GET(
  req: Request
) {
  try {
    await connectDB();

    const { searchParams } =
      new URL(req.url);

    const search =
      searchParams.get(
        "search"
      );

    const skill =
      searchParams.get(
        "skill"
      );

    const query: any = {
      isActive: true,
    };

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          companyName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          location: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (skill) {
      query.skills = {
        $in: [skill],
      };
    }

    const jobs =
      await Job.find(query)
        .sort({
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