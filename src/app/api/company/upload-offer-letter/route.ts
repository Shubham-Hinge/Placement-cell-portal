import { NextResponse } from "next/server";

import cloudinary from "@/lib/cloudinary";
import Application from "@/models/Application";
import { connectDB } from "@/lib/mongodb";

export async function POST(
  req: Request
) {
  try {
    await connectDB();

    const formData =
      await req.formData();

    const file =
      formData.get("file") as File;

    const applicationId =
      formData.get(
        "applicationId"
      ) as string;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Offer Letter Required",
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
                resource_type:
                  "raw",
                folder:
                  "placement-portal/offer-letters",
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

    await Application.findByIdAndUpdate(
      applicationId,
      {
        offerLetterUrl:
          result.secure_url,
      }
    );

    return NextResponse.json({
      success: true,
      url: result.secure_url,
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