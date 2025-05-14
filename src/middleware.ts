import { NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextFetchEvent } from "next/server";

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const url = new URL(req.url);

  // Redirect "/document" to "/"
  if (url.pathname === "/document") {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return clerkMiddleware()(req, event);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Include "/document" route
    "/document",
  ],
};
