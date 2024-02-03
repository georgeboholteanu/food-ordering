"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ProductType } from "@/app/types/types";
import { addToCartFromMenu } from "@/utils/cart";

const getData = async () => {
	const apiUrl =
		process.env.NEXT_PUBLIC_ENV === "development"
			? process.env.NEXT_PUBLIC_API_URL_DEV
			: process.env.NEXT_PUBLIC_API_URL_PROD;
	const res = await fetch(`${apiUrl}/api/products?cat=burgers`, {
		cache: "no-cache", //for development only
	});

	if (!res.ok) {
		throw new Error("Failed");
	}

	return res.json();
};

const Burgers = () => {
	const [products, setProducts] = useState<ProductType[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const productsData: ProductType[] = await getData();
				setProducts(productsData);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 gap-4 mx-auto container justify-between">
			{products.map((item) => (
				<div
					className="max-w-sm flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
					key={item.id}
				>
					<div className="flex justify-center h-[200px] relative">
						<Image
							src={item.img || ""}
							alt={item.title}
							fill
							className="object-cover"
							sizes="(max-width: 640px) 30vw, 200px"
						/>
					</div>
					<div className="p-5 justify-between flex flex-col h-[240px] overflow-hidden">
						<div>
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								{item.title}
							</h5>
						</div>
						<p className="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400">
							{item.desc}
						</p>
						<button
							onClick={() => addToCartFromMenu(item)}
							className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg ${
								item.available === true
									? "bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									: "bg-red-700  hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
							} `}
							disabled={!item.available}
						>
							<div className="flex items-center">
								{item.available === true
									? "Add to cart"
									: "Unavailable"}
								<svg
									className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 14 10"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M1 5h12m0 0L9 1m4 4L9 9"
									/>
								</svg>
							</div>
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default Burgers;
