"use client";
import { useUser } from "@clerk/nextjs";

export default function UserInfo() {
	const { isSignedIn, user, isLoaded } = useUser();

	if (!isLoaded) {
		// Handle loading state 
		return null;
	}

	if (isSignedIn) {
		return <div className="text-center font-bold text-">Hello {user.fullName}!</div>;
	}

	return <div>Not signed in</div>;
}
