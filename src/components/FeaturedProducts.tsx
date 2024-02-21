import Image from "next/image";
import React from "react";

const featuredProductsArray = [
	{
		image: "/home/featured_pasta_1.png",
		title: "Lorem food",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
	{
		image: "/home/featured_pasta_2.png",
		title: "Ipsum dolor",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
	{
		image: "/home/featured_pasta_3.png",
		title: "Dolor Sit",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
	{
		image: "/home/featured_pasta_4.png",
		title: "Odio morbi",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
];

const FeaturedProducts = () => {
	return (
        // FEATURED PRODUCTS
		<section className="mx-10 sm:mx-12 md:mx-16 lg:mx-20">
			<div className="container mx-auto justify-center my-10">
				<div className="flex flex-col items-center justify-center my-10">
					<h2 className="flex justify-center uppercase text-red-600 text-xl font-bold ">
						Our specials
					</h2>
					<span className="bg-gray-500 h-[1px] w-48" />
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{featuredProductsArray.map((products, idx) => {
						return (
							<div
								key={idx}
								className="flex flex-col justify-center gap-4 border-solid border-[1px]  border-yellow-500/70 rounded-lg"
							>
								<div className="relative h-[30vh] ">
									<Image
										src={products.image}
										alt="featured image"
										sizes="100vw"
										layout={"fill"}
										objectFit="cover"
										className="absolute inset-0 rounded-lg"
									/>
								</div>
								<h4 className="text-lg text-red-600 font-semibold px-2 justify-center flex">
									{products.title}
								</h4>
								<p className="text-sm font-thin px-4 pb-6">
									{products.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default FeaturedProducts;
