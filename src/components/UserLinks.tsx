"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const UserLinks = () => {
	const { status } = useSession();

	return (
		<div>
			{status === "authenticated" ? (
				<div className="flex gap-8">
					<button className="transition-all hover:scale-[1.1]">
						<Link href="/orders">Orders</Link>
					</button>
					<button
						onClick={() => signOut()}
						className="transition-all hover:scale-[1.1]"
					>
						Logout
					</button>
				</div>
			) : (
				<button className="transition-all hover:scale-[1.1]">
					<Link href="/login">Login</Link>
				</button>
			)}
		</div>
	);
};

export default UserLinks;
