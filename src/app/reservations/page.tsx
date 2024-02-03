"use client";
import React, { useState, useEffect } from "react";
import { TableType } from "../types/types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";

const Reservations = () => {
	const [tables, setTables] = useState<TableType[]>([]);
	const session = useSession();
	// Fetch table data from API
	const fetchTables = async () => {
		try {
			const apiUrl =
				process.env.NEXT_PUBLIC_ENV === "development"
					? process.env.NEXT_PUBLIC_API_URL_DEV
					: process.env.NEXT_PUBLIC_API_URL_PROD;
			const response = await fetch(`${apiUrl}/api/orders`, {
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
		if (session.status === "authenticated") {
			try {
				// Assuming you have an API endpoint to handle booking status changes
				const response = await fetch(
					`http://localhost:3000/api/reservations?tablen=${tableName}`,
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
		<div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{tables.map((table) => (
				<div className="m-2 flex flex-col" key={table.id}>
					<div>
						<div
							className={`${
								table.available
									? "bg-green-500 hover:bg-green-300"
									: "bg-red-500 hover:bg-red-300"
							} w-full p-20 text-center  transition-all`}
						>
							<div className="capitalize">{table.title}</div>
						</div>
					</div>

					<div className="flex gap-2 justify-between mt-2">
						<button
							className="bg-violet-400 hover:bg-violet-300 w-full rounded-lg p-2 "
							onClick={() => handleBooking(table.title)}
						>
							Make Reservation
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default Reservations;
