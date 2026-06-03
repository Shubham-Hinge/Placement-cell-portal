import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Debug Logs
  console.log("PATH:", req.nextUrl.pathname);
  console.log("TOKEN:", token);

  const pathname = req.nextUrl.pathname;

  if (!token) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

 const decoded = verifyToken(token);

console.log(
  "TOKEN RECEIVED:",
  token
);

console.log(
  "DECODED:",
  decoded
);

console.log(
  "JWT_SECRET_IN_MIDDLEWARE:",
  process.env.JWT_SECRET
);
  console.log("DECODED:", decoded);

  if (!decoded) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  const role = decoded.role;

  console.log("ROLE:", role);

  if (
    pathname.startsWith("/student") &&
    role !== "student"
  ) {
    return NextResponse.redirect(
      new URL("/unauthorized", req.url)
    );
  }

  if (
    pathname.startsWith("/company") &&
    role !== "company"
  ) {
    return NextResponse.redirect(
      new URL("/unauthorized", req.url)
    );
  }

  if (
    pathname.startsWith("/admin") &&
    role !== "admin"
  ) {
    return NextResponse.redirect(
      new URL("/unauthorized", req.url)
    );
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