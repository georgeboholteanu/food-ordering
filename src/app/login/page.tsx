"use client";

import { signIn } from "next-auth/react";
import React from "react";
import Image from "next/image";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import AuthForm from "@/components/login/AuthForm";
import Logo from "@/components/_layout/Logo";
function Login() {

	return (
		<section className="sm:w-[1200px] sm:h-[70svh] m-5">
			<div className="sm:mt-10 grid shadow-lg border border-gray-300  rounded-xl overflow-hidden ">
				<div className="grid sm:grid-cols-2 justify-center  ">
					{/* IMAGE */}
					<div className="hidden sm:grid sm:w-[600px] justify-center bg-red-300/10 items-center place-items-center">
						<Image
							src="/general/login_image.png"
							alt="login image"
							width={0}
							height={0}
							sizes="100vw"
							style={{ width: "100%", height: "auto" }}
							priority
						/>
					</div>
					{/* FORM */}
					<div className="bg-red-300/10 grid place-items-center">
						<div className="grid p-4 gap-4">
							<div className="flex justify-center">
								<Logo containerStyles="justify-center mb-5" />
							</div>
							<AuthForm />
							{/* SEPARATOR */}
							<div className="flex gap-4 items-center">
								<span className="w-24 bg-slate-400 h-[1px]"></span>
								<span>or</span>
								<span className="w-24 bg-slate-400 h-[1px]"></span>
							</div>

							{/* PROVIDER LOGIN */}
							<div className="flex gap-4 rounded-r-lg justify-center items-center ">
								<div className="">
									<button
										className="flex border border-red-600/30 shadow-inner-md rounded-full p-4 justify-center shadow-md bg-slate-300 hover:bg-slate-300/50"
										onClick={() => signIn("google")}
									>
										<FaGoogle className="text-red-600 text-lg" />
									</button>
								</div>
								<div>
									<button
										className="flex border border-blue-600/30 shadow-inner-md rounded-full p-4 justify-center shadow-md bg-slate-300 hover:bg-slate-300/50"
										onClick={() => signIn("google")}
									>
										<FaFacebook className="text-blue-500 text-lg" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Login;
