import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isApiRoute = req.nextUrl.pathname.startsWith("/api/v1");

  if (isApiRoute) {
    // TODO: Replace with real authentication (e.g. session cookie / JWT validation)
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authentication credentials were not provided" },
        { status: 401 }
      );
    }

    // TODO: Validate the token against your auth provider here
    // const token = authHeader.split(" ")[1];
    // const isValid = await validateToken(token);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/v1/:path*"],
};