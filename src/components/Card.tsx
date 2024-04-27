import React from "react";
import Image from "next/image";
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
		<div className="flex flex-col shadow-lg shadow-gray/50 rounded-lg">
			<div className="overflow-hidden h-[350px]">
				{/* IMAGE */}
				<div className="relative h-[60%]">
					<Image
						src={cardImage}
						alt="featured image"						
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						style={{ objectFit: "cover" }}
						fill
						priority
					/>
					<p className="text-lg font-bold btn-primary absolute bottom-2 right-4">
						£{cardPrice}
					</p>
				</div>

				{/* TEXT */}
				<div className="p-6 h-[40%] flex flex-col items-center">
					<h3 className="text-xl font-bold tracking-tight text-gray-900 mb-2 ">
						{cardTitle}
					</h3>
					<p className="text-gray-700 text-sm">
						{cardDescription}
					</p>
				</div>
			</div>
			<div className="my-4 flex justify-center">
				<button
					onClick={() => addToCartFromMenu(product)}
					className="px-3 py-2 text-sm font-semibold text-center text-gray-700 rounded-lg bg-yellow-500 hover:bg-yellow-500/70 focus:ring-1 focus:outline-none focus:ring-gray-700"
					disabled={!product.available}
				>
					{product.available === true ? "Add to cart" : "Unavailable"}
				</button>
			</div>
		</div>
	);
};

export default Card;
