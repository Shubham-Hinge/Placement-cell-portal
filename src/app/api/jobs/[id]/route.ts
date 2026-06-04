import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";

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
  await connectDB();

  const { id } =
    await params;

  const job =
    await Job.findById(id);

  return NextResponse.json({
    success: true,
    job,
  });
}

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
  await connectDB();

  const { id } =
    await params;

  const body =
    await req.json();

  const job =
    await Job.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
      }
    );

  return NextResponse.json({
    success: true,
    job,
  });
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  await connectDB();

  const { id } =
    await params;

  await Job.findByIdAndDelete(
    id
  );

  return NextResponse.json({
    success: true,
  });
}