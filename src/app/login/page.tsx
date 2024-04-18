"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import AuthForm from "@/components/login/AuthForm";
import { MailIcon, HomeIcon, PhoneCall } from "lucide-react";
function Login() {
	// const { data, status } = useSession();
	// const router = useRouter();
	// console.log("data: " + data);
	// console.log("status: " + status);

	// useEffect(() => {
	// 	if (status === "authenticated") {
	// 		router.push("/"); //navigate to home page
	// 	}
	// }, [status, router]);

	// if (status === "loading") {
	// 	return <p>Loading...</p>;
	// }

	return (
		// LOGIN
		// <section
		// 	className="container mx-auto my-10"
		// 	style={{ minHeight: "calc(100vh - 350px)" }}
		// >
		// 	<div className=" relative justify-center items-center">
		// 		{/* image */}
		// 		<div className="h-[50vh] md:h-[70vh]">
		// 			<Image
		// 				src="/general/clark-douglas-17ZU9BPy_Q4-unsplash.jpg"
		// 				alt="login image"
		// 				fill
		// 				priority
		// 				layout={"fill"}
		// 				objectFit="cover"
		// 				className="rounded-lg"
		// 				onError={(e) =>
		// 					console.error("Error loading image:", e)
		// 				}
		// 			/>
		// 		</div>
		// 		{/* buttons */}
		// 		<div className="flex flex-col gap-4 rounded-r-lg justify-center items-center z-10 absolute inset-0">
		// 			<div className="">
		// 				<button
		// 					className="flex gap-6 border rounded-md px-4 py-4 w-[220px] justify-center shadow-sm bg-slate-300 hover:bg-slate-400/60"
		// 					onClick={() => signIn("google")}
		// 				>
		// 					<div className="flex items-center gap-4">
		// 						<FaGoogle className="text-red-500" />
		// 						<span>Login with Google</span>
		// 					</div>
		// 				</button>
		// 			</div>
		// 			<Link href="/login/loginEmail">
		// 				<div className="flex gap-6 border rounded-md px-4 py-4 w-[220px] justify-center shadow-sm bg-slate-300 hover:bg-slate-400/60">
		// 					<div className="flex items-center gap-4">
		// 						<MdOutlineMailOutline className="text-red-500 text-lg" />
		// 						<span>Login with Email</span>
		// 					</div>
		// 				</div>
		// 			</Link>
		// 		</div>
		// 	</div>
		// </section>
		// add a section with rounded corners
		<section className="w-[1200px] sm:h-[70vh] mx-auto ">
			<div className="mt-10 grid place-items-center h-[600px] border border-gray-300 shadow-lg rounded-xl overflow-hidden ">
				<div className="grid grid-cols-2 mx-auto justify-center  ">
					<div className="w-[600px] place-items-center grid bg-red-300/10">
						<Image
							src="/general/login_image.png"
							alt="login image"
							width={0}
							height={0}
							sizes="100vw"
							style={{ width: "100%", height: "auto" }}
						/>
					</div>
					{/* FORM */}
					<div className="w-[600px] p-10 place-items-center grid bg-red-300/10">
						<AuthForm />
					</div>
				</div>
			</div>
		</section>
	);
}

export default Login;
