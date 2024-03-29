import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
	return (
		<div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
			<div className="">
				<Image
					src="/home/exquisite_pasta_dish_2.png"
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

			<div className="absolute w-[310px] inset-0 flex flex-col z-10 mx-auto ml-16 lg:ml-24 mb-20 justify-end">
				<div className="lg:bg-green-900/20 p-0 sm:p-6 rounded-lg">
					<p className="hidden lg:block tracking-widest text-sm">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. Magna etiam tempor orci eu. Odio morbi
						quis commodo odio aenean.
					</p>
					<Link href="/reservations">
						<button className="btn-primary text-white font-semibold mt-8">
							Book A Table
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
