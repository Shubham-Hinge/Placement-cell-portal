import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(
  req: Request,
  context: {
    params: Promise<{
      token: string;
    }>;
  }
) {
  try {
    await connectDB();

    const { password } =
      await req.json();

    const { token } =
      await context.params;

    const user =
      await User.findOne({
        resetPasswordToken:
          token,
        resetPasswordExpires: {
          $gt: new Date(),
        },
      });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid or expired token",
        },
        { status: 400 }
      );
    }

    user.password =
      await bcrypt.hash(
        password,
        12
      );

    user.resetPasswordToken =
      "";

    user.resetPasswordExpires =
      undefined;

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message:
          "Password updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Reset Password Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Internal Server Error",
      },
      { status: 500 }
    );
  }
}