import Image from "next/image";
import React from "react";

import { FaStar } from "react-icons/fa";

const testimonialsArray = [
	{
		image: "/home/portrait_of_a_white_woman_blonde.png",
		title: "Jane Smith",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
	{
		image: "/home/portrait_of_a_white_woman_with_neckles.png",
		title: "Martina Steven",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
	{
		image: "/home/portrait_of_a_white_man_1.png",
		title: "Ronnie White",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
];

const Testimonials = () => {
	return (
		// TESTIMONIALS
		<section className="mx-10 sm:mx-12 md:mx-16 lg:mx-20">
			<div className="container mx-auto justify-center my-10">
				<div className="flex flex-col items-center justify-center my-10">
					<h2 className="flex justify-center uppercase text-red-600 text-xl font-bold ">
						Testimonials
					</h2>
					<span className="bg-gray-500 h-[1px] w-48" />
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
					{testimonialsArray.map((testimonial, idx) => {
						return (
							<div
								key={idx}
								className="flex flex-col justify-center gap-4 bg-pink-100/30"
							>
								<div className="relative h-[30vh] mx-4">
									<Image
										src={testimonial.image}
										alt="featured image"
										sizes="100vw"
										layout={"fill"}
										objectFit="contain"
										className="absolute inset-0 "
									/>
								</div>
								<h4 className="text-lg text-red-600 font-semibold px-2 justify-center flex">
									{testimonial.title}
								</h4>
								<p className="text-sm font-thin px-4 pb-6">
									{testimonial.description}
								</p>
								<div className="py-2 px-4 items-center flex flex-col gap-2 mb-4">
									<h5 className="font-semibold ">Reviews</h5>
									<div className="flex gap-2">
										<FaStar className="text-yellow-500 text-lg" />
										<FaStar className="text-yellow-500 text-lg" />
										<FaStar className="text-yellow-500 text-lg" />
										<FaStar className="text-yellow-500 text-lg" />
										<FaStar className="text-yellow-500 text-lg" />
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
