import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const role = req.cookies.get("role")?.value;
  const auth = req.cookies.get("auth")?.value;
  const url = req.nextUrl;
  if (url.pathname === "/profile" && auth !== "true") {
    return NextResponse.redirect(new URL("/loginForm", req.url));
  }
  if (url.pathname === "/settings" && auth !== "true") {
    return NextResponse.redirect(new URL("/loginForm", req.url));
  }
  if (url.pathname === "/settings" && role !== "user") {
    return NextResponse.redirect(new URL("/loginForm", req.url));
  }
  if (url.pathname === "/Admin" && role !== "admin") {
    return NextResponse.redirect(new URL("/loginForm", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/settings", "/loginForm", "/Admin", "/profile"],
};
