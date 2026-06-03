import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";

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

    const { status } =
      body;

    const application =
      await Application.findByIdAndUpdate(
        id,
        {
          status,
        },
        {
          new: true,
        }
      );

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