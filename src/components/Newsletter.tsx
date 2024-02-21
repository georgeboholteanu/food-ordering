"use client"
import Image from "next/image";
import React, { useState } from "react";

const Newsletter = () => {
	const [nameInput, setNameInput] = useState("");
	const [emailInput, setEmailInput] = useState("");

	const handleNameChange = (e: any) => {
		e.preventDefault();
		setNameInput(e.target.value);
	};
	const handleEmailChange = (e: any) => {
		e.preventDefault();
		setEmailInput(e.target.value);
	};

	const handleSubscribe = () => {
		console.log("Subscribe:", nameInput, " ", emailInput);
	};

	return (
		<div className="relative h-[600px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
			<div className="">
				<Image
					src="/home/georgeboholteanu_editorial_photography_of_closeup_seating_area_1.png"
					alt="Portrait"
					fill
					priority
					quality={100}
					sizes="100vw"
					style={{
						objectFit: "cover",
					}}
				/>
			</div>

			<div className="absolute w-[300px] sm:w-[370px] inset-0 flex flex-col z-10 mx-auto sm:mr-16 lg:mr-24 mb-20 justify-end">
				<div className="p-6  bg-white/50 rounded-lg">
					<h3 className="uppercase font-bold text-lg ">
						Cucina autentica newsletter
					</h3>
					<p className="text-xs font-light pt-2 italic">
						Sign up here to receive our news, events and promotions
						via our newsletter.
					</p>
					<input
						type="text"
						className="px-2 py-2 w-full mt-6 bg-black/70 border border-solid border-yellow-500 font-semibold text-white"
						placeholder="Name"
                        onChange={handleNameChange}
					/>
					<input
						type="email"
						className="px-2 py-2 w-full mt-6 bg-black/70 border border-solid border-yellow-500 font-semibold text-white"
						placeholder="Email"
                        onChange={handleEmailChange}
					/>

					<button
						className="bg-red-600 text-white px-4 py-2 rounded-full mt-8"
						onClick={handleSubscribe}
					>
						SUBSCRIBE
					</button>
				</div>
			</div>
		</div>
	);
};

export default Newsletter;
