import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone(); // Clone the incoming request URL
  const token = req.cookies.get("token"); // Get the token from cookies

  // console.log("Middleware called - Token:", token); // Logs to the server

  // Protect routes under /admin
  if (url.pathname.startsWith("/admin/dashboard")) {
    if (!token) {
      // Redirect to login page if no token is found
      url.pathname = "/admin"; // Redirect to login page
      return NextResponse.redirect(url);
    }
    // console.log("Admin route accessed with token:", token); // Logs token to the server
  }

  return NextResponse.next(); // Proceed with the request if conditions are met
}

// Apply this middleware to all paths under /admin/*
export const config = {
  matcher: ['/admin/:path*'], // Apply middleware to all paths under /admin/*
};
