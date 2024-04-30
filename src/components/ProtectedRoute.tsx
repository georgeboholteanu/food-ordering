"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";

interface ProtectedRouteProps {
	children: React.ReactNode;
	rolesRequired: string[];
}

const ProtectedRoute = ({ children, rolesRequired }: ProtectedRouteProps) => {
	const { user, isSignedIn } = useUser();
	const [role, setRole] = useState<string>("");
	const router = useRouter();

	useEffect(() => {
		const apiUrl =
			process.env.NEXT_PUBLIC_ENV === "development"
				? process.env.NEXT_PUBLIC_API_URL_DEV
				: process.env.NEXT_PUBLIC_API_URL_PROD;

		const fetchUserRole = async () => {
			try {
				const res = await fetch(`${apiUrl}/api/users/check-user`, {
					cache: "no-cache",
				});

				if (!res.ok) {
					throw new Error(
						`Failed to fetch user role with status: ${res.status}`
					);
				}
				const data = await res.json();
                console.log("User role:", data);
				setRole(data);
			} catch (error) {
				console.error("Error fetching user role:", error);
			}
		};

        fetchUserRole();

		if (!isSignedIn) {
			// Redirect to login if not signed in
            console.error("Please login first");
			router.push("/");
			return;
		}

		if (user && rolesRequired && !rolesRequired.includes(role)) {
			// Check if the user role is in the rolesRequired array
            console.error("You don't have permission to access this page");
			router.push("/");
			return;
		}
	}, [ isSignedIn, user, rolesRequired, router, role]);

	if (!isSignedIn || (user && !rolesRequired.includes(role as string))) {
		return <div>Loading...</div>; // Show loading until everything is verified
	}

	return <>{children}</>; // Render children if everything is verified
};

export default ProtectedRoute;
