import { NextResponse } from "next/server";
import crypto from "crypto";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { sendResetPasswordEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message:
            "If the email exists, a reset link has been sent.",
        },
        { status: 200 }
      );
    }

    const token =
      crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;

    user.resetPasswordExpires =
      new Date(
        Date.now() +
          1000 * 60 * 60
      ); // 1 hour

    await user.save();

    await sendResetPasswordEmail(
      user.email,
      token
    );

    return NextResponse.json(
      {
        success: true,
        message:
          "Password reset link sent successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Forgot Password Error:",
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