"use client";

import Link from "next/link";
import styles from "../components/_layout/styles.module.css";
import {
	SignedIn,
	SignedOut,
	UserButton,
	SignInButton,
	useUser,
} from "@clerk/nextjs";
import { useEffect } from "react";

const UserLinks = () => {
	const user = useUser().user;

	useEffect(() => {
		const registerUser = async () => {
			if (user && user.id) {
				try {
					const res = await fetch("/api/users", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							externalId: user.id,
							email: user.primaryEmailAddress?.emailAddress,
							username: user.fullName,
						}),
					});

					if (res.ok) {
						console.log("User registered successfully");
					} else {
						const resultText = await res.text(); // Get the response text to see the error message
						// console.log("User registration failed", resultText);
						if (res.status === 409) {
							console.log("User already registered");
						}
					}
				} catch (error) {
					console.error(
						"Error submitting user registration request",
						error
					);
				}
			}
		};

		registerUser();
	}, [user]);

	return (
		<div>
			<SignedOut>
				<div className={`transition-all ${styles.customUnderline}`}>
					<SignInButton />
				</div>
			</SignedOut>
			<SignedIn>
				<div className="flex gap-8">
					<UserButton />
					<button
						className={`transition-all ${styles.customUnderline}`}
					>
						<Link href="/client-orders">MY ORDERS</Link>
					</button>
				</div>
			</SignedIn>
		</div>
	);
};

export default UserLinks;
