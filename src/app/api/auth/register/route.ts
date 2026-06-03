import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import VerificationToken from "@/models/VerificationToken";
import { registerSchema } from "@/lib/validations";
import { sendVerificationEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const validation =
      registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            validation.error.issues[0]
              ?.message,
        },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      password,
      role,
    } = validation.data;

    const existingUser =
      await User.findOne({
        email: email.toLowerCase(),
      });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email already registered",
        },
        { status: 409 }
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 12);

    await User.create({
      name,
      email:
        email.toLowerCase(),
      password:
        hashedPassword,
      role,
      emailVerified: false,
    });

    const token =
      crypto.randomBytes(32)
        .toString("hex");

    await VerificationToken.create({
      email:
        email.toLowerCase(),
      token,
      expiresAt: new Date(
        Date.now() +
          1000 *
            60 *
            60 *
            24
      ),
    });

    await sendVerificationEmail(
      email,
      token
    );

    return NextResponse.json(
      {
        success: true,
        message:
          "Registration successful. Please verify your email.",
      },
      { status: 201 }
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