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

			<div className="absolute w-[310px] inset-0 flex flex-col z-10 mx-auto ml-16 mb-20 justify-end">
				<p className="tracking-widest text-sm">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Magna etiam tempor orci eu. Odio morbi quis commodo
					odio aenean.
				</p>
				<Link href="/reservations">
					<button className="bg-red-600 text-white px-4 py-2 rounded-full mt-8">
						Book Table
					</button>
				</Link>
			</div>
		</div>
	);
}
