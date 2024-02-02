"use client";
import React, { useEffect, useState } from "react";
import { OrderType } from "@/app/types/types";

const getData = async () => {
	const res = await fetch("http://localhost:3000/api/orders", {
		cache: "no-cache", //for development only
	});

	if (!res.ok) {
		throw new Error("Failed");
	}

	return res.json();
};

const Orders = () => {
	const [orders, setOrders] = useState<OrderType[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const ordersData: OrderType[] = await getData();
				console.log("ordersData:", ordersData);
				setOrders(ordersData);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="flex flex-col p-4 gap-4 mx-auto container">
			<table className="min-w-full">
				<thead>
					<tr>
						<th className="px-6 py-3 text-left">Order Id</th>
						<th className="px-6 py-3 text-left">Date</th>
						<th className="px-6 py-3 text-left">Price</th>
						<th className="px-6 py-3 text-left">Products</th>
						<th className="px-6 py-3 text-left">Status</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((item) => (
						<tr
							key={item.id}
							className="bg-white border-b border-gray-200"
						>
							<td className="px-6 py-4 whitespace-nowrap">
								{item.id}
							</td>
							<td className="px-6 py-4 whitespace-nowrap flex gap-4">
								<span className="border-r-2 px-2">
									{item.createdAt.substring(0, 10)}
								</span>
								<span>{item.createdAt.substring(11, 19)}</span>
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								{item.totalPrice}
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								products
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								{item.status}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Orders;
