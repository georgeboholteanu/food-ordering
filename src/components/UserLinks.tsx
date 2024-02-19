"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import styles from "../components/_layout/styles.module.css"

const UserLinks = () => {
	const { status } = useSession();

	return (
		<div>
			{status === "authenticated" ? (
				<div className="flex gap-8">
					<button className={`transition-all ${styles.customUnderline}`}>
						<Link href="/orders">Orders</Link>
					</button>
					<button
						onClick={() => signOut()}
						className={`transition-all ${styles.customUnderline}`}
					>
						LOGOUT
					</button>
				</div>
			) : (
				<button className={`transition-all ${styles.customUnderline}`}>
					<Link href="/login">LOGIN</Link>
				</button>
			)}
		</div>
	);
};

export default UserLinks;
