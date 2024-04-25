// pages/404.js
import React from "react";
import Link from "next/link";
import Logo from "@/components/_layout/Logo";

const Custom404 = () => {
	return (
		<div className="mx-5 h-[56svh] sm:h-[70svh]">
			<div className="my-[4rem]">
				<div className="flex flex-col gap-4 items-center justify-center text-center ">
					<h1 className="text-3xl font-bold text-zinc-700">Welcome</h1>
					<Logo containerStyles="mb-16 mt-2" />
				</div>

				<div className="flex flex-col gap-4 items-center justify-center place-items-center p-5 ">
					<h1 className="text-3xl">404 - Page Not Found</h1>
					<p className="text-center">Oops, the page you're looking for does not exist or you need to login.</p>
					<button className="border px-4 py-2 rounded-full hover:border-yellow-500 transition-all bg-slate-300">
						<Link href="/" className="text-zinc-700 ">Go back home</Link>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Custom404;
