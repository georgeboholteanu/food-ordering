"use client";

import Link from "next/link";
import styles from "../components/_layout/styles.module.css";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

const UserLinks = () => {
	return (
		<div className="">
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
						<Link href="/orders">MY ORDERS</Link>
					</button>
				</div>
			</SignedIn>
		</div>
	);
};

export default UserLinks;
