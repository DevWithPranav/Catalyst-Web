import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/");

  if (isAdminRoute) {
    const isLoggedIn = true; // mock flag

    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}