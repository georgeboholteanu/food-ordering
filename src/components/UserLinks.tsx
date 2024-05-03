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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

						try {
							const roleResponse = await fetch(
								"/api/users/check-user",
								{
									cache: "no-cache",
								}
							);
							const data = await roleResponse.json();

							if (!data.role) {
								toast.error("Could not fetch the user role");
							} else {
								console.log(
									`Welcome ${user.fullName}! You are logged in as ${data.role}!`
								);
							}
						} catch (error) {
							console.error("Error fetching user role:", error);
						}
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
		<div className="flex flex-col sm:flex-row items-center justify-center">
			<div className={`transition-all ${styles.customUnderline}`}>
				<SignedOut>
					<SignInButton />
				</SignedOut>
			</div>
			<div className="flex flex-col sm:flex-row items-center justify-center gap-6">
				<SignedIn>
					<UserButton />
					<button className={`transition-all ${styles.customUnderline}`}>
						<Link href="/client-orders">MY ORDERS</Link>
					</button>
				</SignedIn>
			</div>
		</div>
	);
};

export default UserLinks;
