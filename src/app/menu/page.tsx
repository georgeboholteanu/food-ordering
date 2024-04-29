"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ProductType } from "@/types/types";
import { GoMoveToTop } from "react-icons/go";
// components
import Card from "@/components/Card";

const menuItems = ["menu", "pastas", "pizzas", "burgers", "salads", "drinks"];
const getData = async (product: string) => {
	const apiUrl =
		process.env.NEXT_PUBLIC_ENV === "development"
			? process.env.NEXT_PUBLIC_API_URL_DEV
			: process.env.NEXT_PUBLIC_API_URL_PROD;
	const url =
		product === "menu"
			? `${apiUrl}/api/products`
			: `${apiUrl}/api/products?cat=${product}`;

	const res = await fetch(url, {
		cache: "no-cache", //for development only
	});

	if (!res.ok) {
		throw new Error("Failed");
	}

	return res.json();
};

const Menu = () => {
	const [products, setProducts] = useState<ProductType[]>([]);
	const [productTitle, setProductTitle] = useState<string>("");

	useMemo(() => {
		// Fetch products on demand
		const fetchData = async () => {
			try {
				if (productTitle) {
					const currentProducts: ProductType[] = await getData(
						productTitle
					);

					setProducts(currentProducts);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [productTitle]);

	useEffect(() => {
		// Fetch initial products when the component mounts
		const fetchInitialProducts = async () => {
			try {
				const initialProducts: ProductType[] = await getData("menu");
				setProducts(initialProducts);
			} catch (error) {
				console.error("Error fetching initial data:", error);
			}
		};

		fetchInitialProducts();
	}, []);

	const handleProductClick = (item: string) => {
		setProductTitle(item);
	};

	const calculateGridColumns = (count: number) => {
		return Math.min(4, count); // Ensures a maximum of 4 columns
	};
	// Calculate the number of columns based on the number of products
	const gridColumns = calculateGridColumns(products.length);

	return (
		// MENU
		<section className="mx-10 sm:mx-12 md:mx-16 lg:mx-20">
			<div className="container mx-auto justify-center">
				{/* SUB MENU */}
				<div className="z-50 mt-5">
					<ul className="container mx-auto flex flex-wrap gap-2 justify-center font-semibold text-xs text-white">
						{menuItems.map((item) => (
							<li key={item}>
								<button
									onClick={() => handleProductClick(item)}
									className="btn-third capitalize"
								>
									{item}
								</button>
							</li>
						))}
					</ul>
				</div>
				{/* MENU CARDS */}
				<div className="my-10 min-h-screen">
					<div
						className={`grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${gridColumns} gap-4 justify-between place-items-center`}
					>
						{products.map((item) => (
							<div key={item.id} className="w-full">
								<Card
									cardTitle={`${item.title}`}
									cardDescription={`${item.desc}`}
									cardImage={`${item.img}`}
									cardPrice={`${item.price}`}
									product={item}
								/>
							</div>
						))}
					</div>
				</div>
				{/* JUMP TO TOP BTN */}
				<div>
					<button
						className="fixed bottom-10 left-10 btn p-4 rounded-xl border-none bg-white/50 text-red-500 text-xl "
						onClick={() =>
							window.scrollTo({ top: 0, behavior: "smooth" })
						}
					>
						<GoMoveToTop />
					</button>
				</div>
			</div>
		</section>
	);
};

export default Menu;
