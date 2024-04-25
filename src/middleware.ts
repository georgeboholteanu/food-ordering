// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
	"/api/orders/ordered-items",
	"/dashboard",
	"/my-orders",
]);

export default clerkMiddleware((auth, request) => {
	if (isProtectedRoute(request)) auth().protect();
});
export const config = {
	matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
