"use client"
import React, { useEffect, useState } from "react";
import { MenuType } from "@/app/types/types";
import Link from "next/link";
import Image from "next/image";

const getData = async () => {
	const res = await fetch("http://localhost:3000/api/categories", {
		cache: "no-cache", //for development only
	});

	if (!res.ok) {
		throw new Error("Failed");
	}

	return res.json();
};

const Menu = () => {

	const [menu, setMenu] = useState<MenuType[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const categories: MenuType[] = await getData();
				setMenu(categories);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);
	

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 gap-4 mx-auto container justify-between">
			{menu.map((item) => (
				<div
					className="max-w-sm flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
					key={item.id}
				>
					<Link
						href={`/menu/${item.slug}`}
						className="flex justify-center h-[250px] relative"
					>
						<Image
							src={item.img || ""}
							alt={item.title}
							fill
							className="object-cover"
							sizes="(max-width: 640px) 30vw, 200px" 
						/>
					</Link>
					<div className="p-5 justify-between flex flex-col h-[200px] overflow-hidden">
						<Link href={`/menu/${item.slug}`}>
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								{item.title}
							</h5>
						</Link>
						<p className="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400">
							{item.desc}
						</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default Menu;
