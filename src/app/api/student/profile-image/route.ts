import { NextResponse } from "next/server";

import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";

import StudentProfile from "@/models/StudentProfile";

export async function POST(
  req: Request
) {
  try {
    await connectDB();

    const formData =
      await req.formData();

    const file =
      formData.get("file") as File;

    const userId =
      formData.get(
        "userId"
      ) as string;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Image required",
        },
        { status: 400 }
      );
    }

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    const result =
      await new Promise<any>(
        (
          resolve,
          reject
        ) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder:
                  "placement-portal/profile-images",
              },
              (
                error,
                result
              ) => {
                if (error)
                  reject(error);
                else
                  resolve(result);
              }
            )
            .end(buffer);
        }
      );

    await StudentProfile.findOneAndUpdate(
      {
        userId,
      },
      {
        profileImage:
          result.secure_url,
      },
      {
        upsert: true,
      }
    );

    return NextResponse.json({
      success: true,
      imageUrl:
        result.secure_url,
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