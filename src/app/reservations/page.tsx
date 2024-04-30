"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "@clerk/nextjs";
import { TableType } from "@/types/types";

const apiUrl =
	process.env.NEXT_PUBLIC_ENV === "development"
		? process.env.NEXT_PUBLIC_API_URL_DEV
		: process.env.NEXT_PUBLIC_API_URL_PROD;

const Reservations = () => {
	const { user } = useUser();
	const [tables, setTables] = useState<TableType[]>([]);

	const fetchTables = async () => {
		try {
			const response = await fetch(`${apiUrl}/api/get-tables`, {
				cache: "no-cache",
			});
			const data = await response.json();
			if (Array.isArray(data)) {
				// Check if data is an array
				const sortedData = data.sort((a: any, b: any) =>
					a.title.localeCompare(b.title)
				);
				setTables(sortedData);
			} else {
				console.error("Data fetched is not an array:", data);
			}
		} catch (error) {
			console.error("Error fetching tables:", error);
		}
	};

	useEffect(() => {
		fetchTables();
	}, [tables]);

	const handleBooking = async (tableName: string) => {
		if (user) {
			try {
				const response = await fetch(
					`${apiUrl}/api/reservations?tablen=${tableName}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				if (response.ok) {
					const updatedTable = await response.json(); // Ensure this contains the latest table info
					setTables((prevTables) =>
						prevTables.map((table) =>
							table.id === updatedTable.id
								? { ...table, ...updatedTable }
								: table
						)
					);
					toast.success(
						`${tableName} has been reserved successfully.`
					);
				} else {
					toast.error(await response.text());
				}
			} catch (error) {
				console.error("Error updating booking status:", error);
				toast.error("Error updating booking status.");
			}
		} else {
			toast.error("Please login to make reservations");
		}
	};

	return (
		<div>
			<h2 className="text-2xl font-bold text-center my-4">
				Restaurant Tables
			</h2>
			<div className="container mx-auto p-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{tables.map((table) => (
					<div className="m-2 flex flex-col" key={table.id}>
						<div>
							<div className="w-full p-10 border border-red-500/30 rounded-xl bg-gray-300 shadow-inner">
								<div className="flex flex-col gap-4 place-items-center ">
									<div className="flex flex-col justify-center items-center">
										<h3 className="text-xl font-bold uppercase">
											{table.title}
										</h3>
										<span
											className={`text-sm font-bold ${
												table.available
													? "text-green-600 "
													: "text-red-500/70 "
											}`}
										>
											{table.available
												? "Available"
												: "Unavailable"}
										</span>
									</div>
									<span className="bg-gray-500 w-full h-[1px]"></span>
									<Image
										src="/general/table.png"
										alt="table with chairs"
										width={150}
										height={150}
										priority
									/>
									<div className="flex gap-2 justify-between mt-2">
										<button
											className={` w-full rounded-lg py-2 px-4 font-semibold ${
												table.available
													? "bg-green-500/30 hover:bg-green-400/20"
													: "bg-red-500/30 hover:bg-red-400/30}"
											}`}
											onClick={() => {
												handleBooking(table.title);
											}}
										>
											{table.available
												? "Book Now"
												: "Reserved"}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Reservations;
