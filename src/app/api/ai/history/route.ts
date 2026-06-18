import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Chat from "@/models/Chat";

export async function GET(
  req: Request
) {
  try {
    await connectDB();

    const { searchParams } =
      new URL(req.url);

    const userId =
      searchParams.get(
        "userId"
      );

    const chats =
      await Chat.find({
        userId,
      }).sort({
        createdAt: 1,
      });

    return NextResponse.json({
      success: true,
      chats,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}