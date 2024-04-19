"use client";
import React, { useState, useEffect } from "react";
import { TableType } from "@/types/types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Reservations = () => {
	const [tables, setTables] = useState<TableType[]>([]);
	// const session = useSession();
	// Fetch table data from API
	const fetchTables = async () => {
		try {
			const apiUrl =
				process.env.NEXT_PUBLIC_ENV === "development"
					? process.env.NEXT_PUBLIC_API_URL_DEV
					: process.env.NEXT_PUBLIC_API_URL_PROD;
			const response = await fetch(`${apiUrl}/api/tables`, {
				cache: "no-cache", //for development only
			});

			const data = await response.json();
			const sortedData = data.sort((a: any, b: any) =>
				a.title.localeCompare(b.title)
			);
			setTables(sortedData);
		} catch (error) {
			console.error("Error fetching tables:", error);
		}
	};

	useEffect(() => {
		fetchTables();
	}, [tables]);

	const handleBooking = async (tableName: string) => {
		if (true == true) {
			// if (session.status === "authenticated") {
			try {
				// Assuming you have an API endpoint to handle booking status changes
				const apiUrl =
					process.env.NEXT_PUBLIC_ENV === "development"
						? process.env.NEXT_PUBLIC_API_URL_DEV
						: process.env.NEXT_PUBLIC_API_URL_PROD;
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
					// Update the local state based on the response
					setTables((prevTables) => {
						const updatedTables = [...prevTables];
						return updatedTables;
					});
					if (response.status === 200) {
						toast.success(
							`${tableName} has been reserved successfully.`
						);
					} else {
						toast.error(`${tableName} could not be reserved.`);
					}
				} else {
					console.error("Failed to update booking status");
				}
			} catch (error) {
				console.error("Error updating booking status:", error);
			}
		} else {
			toast.error("Please login to make reservations");
		}
	};

	return (
		<div>
			<h2 className="text-3xl font-bold text-center my-4">
				RESERVATIONS
			</h2>
			<div className="container mx-auto p-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{tables.map((table) => (
					<div className="m-2 flex flex-col" key={table.id}>
						<div>
							<div className="w-full p-10 border border-red-500/30 rounded-xl bg-gray-300 shadow-inner">
								<div className="flex flex-col gap-4 place-items-center ">
									<div className="flex space-x-4 ">
										<h3 className="text-2xl font-bold uppercase">
											{table.title}
										</h3>
										<span
											className={`text-2xl font-bold ${
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
											onClick={() =>
												handleBooking(table.title)
											}
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
