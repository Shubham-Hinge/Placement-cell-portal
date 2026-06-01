import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const pathname = req.nextUrl.pathname;

  if (
    pathname.startsWith("/student") ||
    pathname.startsWith("/company") ||
    pathname.startsWith("/admin")
  ) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/login", req.url)
      );
    }

    try {
      jwt.verify(
        token,
        process.env.JWT_SECRET!
      );

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(
        new URL("/login", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/student/:path*",
    "/company/:path*",
    "/admin/:path*",
  ],
};