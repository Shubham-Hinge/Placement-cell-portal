import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";

import {
  sendShortlistedEmail,
  sendSelectedEmail,
  sendRejectedEmail,
  sendInterviewEmail,
} from "@/lib/mail";

export async function PATCH(
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

    const body =
      await req.json();

    const {
      status,
      interviewDate,
      interviewTime,
      meetingLink,
    } = body;

    const application =
      await Application.findByIdAndUpdate(
        id,
        {
          status,
        },
        {
          new: true,
        }
      )
        .populate(
          "studentId"
        )
        .populate("jobId");

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Application not found",
        },
        { status: 404 }
      );
    }

    const student =
      application.studentId as any;

    if (
      interviewDate &&
      interviewTime &&
      meetingLink &&
      student?.email
    ) {
      await sendInterviewEmail(
        student.email,
        interviewDate,
        interviewTime,
        meetingLink
      );
    }

    if (
      student?.email
    ) {
      if (
        status ===
        "Shortlisted"
      ) {
        await sendShortlistedEmail(
          student.email
        );
      }

      if (
        status ===
        "Selected"
      ) {
        await sendSelectedEmail(
          student.email
        );
      }

      if (
        status ===
        "Rejected"
      ) {
        await sendRejectedEmail(
          student.email
        );
      }
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
          "Failed to update status",
      },
      { status: 500 }
    );
  }
}