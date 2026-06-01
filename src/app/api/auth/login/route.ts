import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { generateToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { email, password } = body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid credentials",
        },
        { status: 401 }
      );
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid credentials",
        },
        { status: 401 }
      );
    }

    const token =
      generateToken({
        userId: user._id,
        email: user.email,
        role: user.role,
      });

    return NextResponse.json(
      {
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

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