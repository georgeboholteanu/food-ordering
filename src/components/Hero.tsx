import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
	return (
		<div className="w-full">
			<div className="relative h-[600px]">
				<Image
					src="/home/exquisite_pasta_dish_2.png"
					alt="Portrait"
					fill
					quality={100}
					sizes="100vw"
					style={{
						objectFit: "cover",
					}}
				/>
			</div>
			<div className="w-[320px] absolute bottom-80 left-32 z-10">
				<div>
					<p className="tracking-widest text-sm">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. Magna etiam tempor orci eu. Odio morbi
						quis commodo odio aenean.
					</p>
					<Link href="/reservations">
						<button className="bg-red-600 text-white px-4 py-2 rounded-xl mt-8">Book Table</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
