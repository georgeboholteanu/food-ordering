"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";

function Login() {
	const { data, status } = useSession();
	const router = useRouter();
	console.log("data: " + data);
	console.log("status: " + status);

	useEffect(() => {
		if (status === "authenticated") {
			router.push("/"); //navigate to home page
		}
	}, [status, router]);

	if (status === "loading") {
		return <p>Loading...</p>;
	}

	return (
		<div className="container mx-auto justify-center items-center mt-20">
			<div className="flex shadow-xl">
				{/* image */}
				<div className="w-[500px] h-[500px] ">
					<div className="relative h-full ">
						<Image
							src="/general/clark-douglas-17ZU9BPy_Q4-unsplash.jpg"
							alt="Logo"
							fill
							priority
							sizes="(max-width: 1000px) 30vw, 400px"
							quality={100}
							className="rounded-l-lg"
						/>
					</div>
				</div>
				{/* buttons */}
				<div className="flex flex-col gap-4 rounded-r-lg px-20 justify-center">
					<div className="">
						<button
							className="flex gap-6 border rounded-md px-4 py-4 w-[220px] justify-center shadow-sm bg-slate-300 hover:bg-slate-400/60"
							onClick={() => signIn("google")}
						>
							<div className="flex items-center gap-4">
								<FaGoogle className="text-red-500" />
								<span>Login with Google</span>
							</div>
						</button>
					</div>
					<Link href="/login/loginEmail">
						<div className="flex gap-6 border rounded-md px-4 py-4 w-[220px] justify-center shadow-sm bg-slate-300 hover:bg-slate-400/60">
							<div className="flex items-center gap-4">
								<MdOutlineMailOutline className="text-red-500 text-lg" />
								<span>Login with Email</span>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
