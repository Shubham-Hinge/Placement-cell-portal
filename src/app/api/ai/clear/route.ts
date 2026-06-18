import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Chat from "@/models/Chat";

export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID required",
        },
        { status: 400 }
      );
    }

    await Chat.deleteMany({
      userId,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to clear chat",
      },
      { status: 500 }
    );
  }
}