import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import fs from "fs";
import path from "path";

import { connectDB } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";

import StudentProfile from "@/models/StudentProfile";

export async function POST(
  req: NextRequest
) {
  try {
    await connectDB();

    const formData =
      await req.formData();

    const file =
      formData.get("file") as File;

    const userId =
      formData.get("userId") as string;

    if (!file || !userId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "File and User ID are required",
        },
        {
          status: 400,
        }
      );
    }

    if (
      file.type !==
      "application/pdf"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Only PDF files are allowed",
        },
        {
          status: 400,
        }
      );
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Maximum file size is 5MB",
        },
        {
          status: 400,
        }
      );
    }

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    const tempDir =
      path.join(
        process.cwd(),
        "tmp"
      );

    if (
      !fs.existsSync(
        tempDir
      )
    ) {
      fs.mkdirSync(
        tempDir
      );
    }

    const tempPath =
      path.join(
        tempDir,
        `resume-${Date.now()}.pdf`
      );

    await writeFile(
      tempPath,
      buffer
    );

    const upload =
  await cloudinary.uploader.upload(
    tempPath,
    {
      resource_type:
        "image",
      folder:
        "placement-portal/resumes",
      public_id:
        `resume-${userId}`,
      overwrite: true,
      format: "pdf",
    }
  );
    await unlink(tempPath);

    const resumeUrl =
      upload.secure_url;

    const profile =
      await StudentProfile.findOneAndUpdate(
        {
          userId,
        },
        {
          $set: {
            resumeUrl,
          },
        },
        {
          returnDocument:
            "after",
        }
      );

    if (!profile) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Student profile not found. Please complete your profile first.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      resumeUrl,
    });
  } catch (error: any) {
    console.error(
      "UPLOAD ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Resume upload failed",
      },
      {
        status: 500,
      }
    );
  }
}