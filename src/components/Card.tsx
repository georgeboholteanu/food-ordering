import React from "react";
import Image from "next/image";
// components
import { addToCartFromMenu } from "@/utils/cart";
import { ProductType } from "@/types/types";
type CardProps = {
	cardTitle: string;
	cardDescription: string;
	cardImage: string;
	cardPrice: string;
	product: ProductType;
};

const Card: React.FC<CardProps> = ({
	cardTitle,
	cardDescription,
	cardImage,
	cardPrice,
	product,
}) => {
	return (
		<div className="shadow-lg shadow-gray/50 rounded-lg">
			<div className="relative h-[30vh] ">
				<Image
					src={cardImage}
					alt="featured image"
					sizes="100vw"
					layout={"fill"}
					objectFit="cover"
					className="absolute inset-0 rounded-lg"
				/>
				<p className="text-lg font-bold btn-primary absolute bottom-2 right-4">
					£{cardPrice}
				</p>
			</div>
			<div className="flex flex-col items-center text-center gap-1 my-4">
				<h3 className="text-2xl font-bold tracking-tight text-gray-900">
					{cardTitle}
				</h3>
				<p className="text-gray-700 px-4 text-justify">
					{cardDescription}
				</p>
			</div>
			<div className="justify-center flex pb-4">
				<button
					onClick={() => addToCartFromMenu(product)}
					className="inline-flex items-center px-3 py-2 text-sm font-semibold text-center text-gray-700 rounded-lg bg-yellow-500  hover:bg-yellow-500/70 focus:ring-1 focus:outline-none focus:ring-gray-700 "
					disabled={!product.available}
				>
					<div className="flex items-center">
						{product.available === true
							? "Add to cart"
							: "Unavailable"}
					</div>
				</button>
			</div>
		</div>
	);
};

export default Card;
