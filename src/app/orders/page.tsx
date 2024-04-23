"use client";
import React, { useEffect, useMemo, useState } from "react";
import { OrderType } from "@/types/types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const getData = async () => {
	const res1 = await fetch(`${apiUrl}/api/orders`, {
		cache: "no-cache", //for development only
	});

	if (!res1.ok) {
		throw new Error("Failed");
	}

	return res1.json();
};
const getOrderProducts = async () => {
	const res2 = await fetch(`${apiUrl}/api/orders/ordered-items`, {
		cache: "no-cache", //for development only
	});

	if (!res2.ok) {
		throw new Error("Failed");
	}

	return res2.json();
};

const Orders = () => {
	const [userOrders, setUserOrders] = useState<OrderType[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// const ordersData: OrderType[] = await getData();
				const orderedProductsData = await getOrderProducts();

				// Group orders by orderId
				const groupedByOrderId = orderedProductsData.reduce(
					(acc: any, item: any) => {
						// Check if there is already an entry for the orderId
						const existingOrder = acc.find(
							(order: any) => order.orderId === item.orderId
						);

						if (existingOrder) {
							// If the order already exists, just add the product to the products array
							existingOrder.products.push({
								productId: item.productId,
							});
						} else {
							// Otherwise, create a new order entry with the products array
							acc.push({
								orderId: item.orderId,
								createdAt: item.createdAt,
								status: item.status,
								tableSlug: item.tableSlug,
								totalPrice: item.totalPrice,
								products: [{ productId: item.productId }],
							});
						}

						return acc;
					},
					[]
				);

				setUserOrders(groupedByOrderId);
				console.log("orders:", groupedByOrderId);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="flex flex-col p-4 gap-4 mx-auto container min-h-[75svh]">
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
					{orders.map((order) => (
						<tr
							key={order.id}
							className="bg-white border-b border-gray-200"
						>
							<td className="px-6 py-4 whitespace-nowrap">
								{order.id}
							</td>
							<td className="px-6 py-4 whitespace-nowrap flex gap-4">
								<span className="border-r-2 px-2">
									{/* {order.createdAt.substring(0, 10)} */}
								</span>
								{/* <span>{order.createdAt.substring(11, 19)}</span> */}
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								{order.totalPrice}
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								{order.products.length}
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								{/* {order.status} */}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Orders;
