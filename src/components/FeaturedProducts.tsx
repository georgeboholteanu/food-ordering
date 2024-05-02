import Image from "next/image";
import React from "react";

import { featuredProductsArray } from "@/data";

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
								className="flex flex-col justify-center gap-4 border-solid border-[1px]  border-zinc-400/70 rounded-lg overflow-hidden shadow-lg"
							>
								<div className="overflow-hidden h-[420px]">
									<div className="relative h-[60%]">
										<Image
											src={products.image}
											alt="featured image"
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											style={{ objectFit: "cover" }}
											fill
											priority
										/>
									</div>
									<div className="h-[40%] px-4">
										<h4 className="text-lg text-red-600 font-semibold px-2 py-2 justify-center flex">
											{products.title}
										</h4>
										<p className="text-sm font-thin px-4 pb-6">
											{products.description}
										</p>
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

export default FeaturedProducts;
