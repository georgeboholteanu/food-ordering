// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
	"/dashboard",
	
]);

export default clerkMiddleware((auth, request) => {
	if (isProtectedRoute(request)) {
		try {
			auth().protect();
		} catch (error) {
			// Redirect using an absolute URL
			const url = request.nextUrl.clone(); // Clone the URL object to modify it
			url.pathname = "/404"; // Set the pathname to the custom 404 page
			return NextResponse.redirect(url);
		}
	}
});
export const config = {
	matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
