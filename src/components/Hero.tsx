import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
	return (
		<div className="">
			<div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
				<Image
					src="/general/hero_image.png"
					alt="hero image"
					sizes="(max-width: 1920px) 100vw, (max-width: 768px) 50vw, 33vw"
					style={{ objectFit: "cover" }}
					fill
					priority
					className="absolute"
				/>

				<div className="absolute w-[310px] inset-0 flex flex-col z-10 mx-auto ml-16 lg:ml-72 mb-20 justify-end">
					<div className="lg:bg-green-900/20 p-0 sm:p-6 rounded-lg">
						<p className="hidden lg:block tracking-widest text-sm text-white">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Magna etiam tempor orci eu.
							Odio morbi quis commodo odio aenean.
						</p>
						<Link href="/reservations">
							<button className="btn-primary text-white font-semibold mt-8">
								Book A Table
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
