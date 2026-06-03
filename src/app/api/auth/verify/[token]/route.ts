import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import VerificationToken from "@/models/VerificationToken";

export async function GET(
  req: Request,
  context: {
    params: Promise<{
      token: string;
    }>;
  }
) {
  try {
    await connectDB();

    const { token } = await context.params;

    const verification =
      await VerificationToken.findOne({
        token,
      });

    if (!verification) {
      return NextResponse.redirect(
        new URL(
          "/login?error=invalid-token",
          req.url
        )
      );
    }

    if (
      verification.expiresAt <
      new Date()
    ) {
      return NextResponse.redirect(
        new URL(
          "/login?error=expired-token",
          req.url
        )
      );
    }

    await User.findOneAndUpdate(
      {
        email: verification.email,
      },
      {
        emailVerified: true,
      }
    );

    await VerificationToken.deleteOne({
      _id: verification._id,
    });

    return NextResponse.redirect(
      new URL(
        "/login?verified=true",
        req.url
      )
    );
  } catch (error) {
    console.error(error);

    return NextResponse.redirect(
      new URL(
        "/login?error=verification-failed",
        req.url
      )
    );
  }
}