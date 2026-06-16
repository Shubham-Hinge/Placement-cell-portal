import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    await connectDB();

    const { id } =
      await params;

    const application =
      await Application.findById(id)
        .populate("studentId")
        .populate("jobId");

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Application not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      application,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load application",
      },
      {
        status: 500,
      }
    );
  }
}