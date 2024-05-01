// components/ProtectedRoute.tsx
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

interface ProtectedRouteProps {
	children: ReactNode;
	rolesRequired: string[];
}

const ProtectedRoute = ({ children, rolesRequired }: ProtectedRouteProps) => {
	const { user, isSignedIn } = useUser();
	const [role, setRole] = useState<string>("");
	const [isRoleFetched, setIsRoleFetched] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (!user || !isSignedIn) {
			console.log("Not signed in, redirecting to login.");
			// router.push("/");
			return;
		}

		// Simulate fetching the role from an API endpoint
		const fetchUserRole = async () => {
			const apiUrl = process.env.NEXT_PUBLIC_ENV === "development"
				? process.env.NEXT_PUBLIC_API_URL_DEV
				: process.env.NEXT_PUBLIC_API_URL_PROD;
		
			try {
				const res = await fetch(`${apiUrl}/api/users/check-user`, {
					method: "GET",
					headers: new Headers({
						"Content-Type": "application/json",
						// Authorization: `Bearer ${user.sessionToken}`, // Include user session token
					}),
					cache: "no-cache",
				});
		
				if (!res.ok) {
					throw new Error(`Failed to fetch user role with status: ${res.status}`);
				}
				const data = await res.json();
				if (data.role) {
					setRole(data.role);
				} else {
					setRole(''); // Set to empty string or handle as unauthenticated/unauthorized
				}
				setIsRoleFetched(true);
			} catch (error) {
				console.error("Error fetching user role:", error);
			}
		};
		

		fetchUserRole();
	}, [user, isSignedIn, router]);

	useEffect(() => {
		if (isRoleFetched) {
			if (!rolesRequired.includes(role.toUpperCase())) {
				console.log("Role not authorized, redirecting.");
				router.push("/forbidden");
			}
		}
	}, [role, rolesRequired, isRoleFetched, router]);

	if (!isSignedIn || !isRoleFetched || !rolesRequired.includes(role.toUpperCase())) {
		return <div className="h-[75vh]">Loading...</div>; // Show loading while checking user role and sign-in status
	}

	return <>{children}</>; // Render children if everything is verified
};

export default ProtectedRoute;
