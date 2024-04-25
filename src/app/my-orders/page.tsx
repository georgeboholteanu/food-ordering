"use client";
import React, { useEffect, useState } from "react";
import { OrderItemType } from "@/types/types";

interface GroupedOrder {
	orderId: string;
	products: OrderItemType[];	
	total: number;
}

type GroupedOrdersMap = Record<string, GroupedOrder>;

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
	const [userOrders, setUserOrders] = useState<GroupedOrder[]>([]);
	const [totalsByOrderId, setTotalsByOrderId] = useState<
		Record<string, number>
	>({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const orderItemsData: OrderItemType[] =
					await getOrderProducts();
					console.log(orderItemsData)

				const groupedOrders: GroupedOrdersMap = orderItemsData.reduce(
					(acc: any, item: any) => {
						// Check if there is already an entry for the orderId
						if (!acc[item.orderId]) {
							acc[item.orderId] = {
								orderId: item.orderId,
								products: [],
								total: 0,
							};
						}

						// Add the product to the products array
						acc[item.orderId].products.push({
							productId: item.productId,
							productTitle: item.productTitle,
							quantity: item.quantity,
							subtotal: parseFloat(item.subtotal),
						});

						// Sum up the subtotal
						acc[item.orderId].total += parseFloat(item.subtotal);

						return acc;
					},
					{}
				);

				setUserOrders(Object.values(groupedOrders));
				setTotalsByOrderId(
					Object.fromEntries(
						Object.entries(groupedOrders).map(([key, value]) => [
							key,
							value.total,
						])
					)
				);
				
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="flex flex-col p-4 gap-4 mx-auto container min-h-[75svh]">
			<div className={`${userOrders.length > 0 ? "hidden" : ""} flex justify-center text-xl font-semibold text-zinc-700 bg-yellow-100 px-4 py-2`}>You do not have any orders placed</div>
			<table className="min-w-full">
				<thead className="border-b">
					<tr>
						<th className="px-6 py-3 text-left">Order Id</th>
						<th className="px-6 py-3 text-left">Date</th>
						<th className="px-6 py-3 text-left">Products</th>
						<th className="px-6 py-3 text-left">Cost</th>
					</tr>
				</thead>

				<tbody>
					{userOrders.map((order) => (
						<tr
							key={order.orderId}
							className="border-t border-gray-100"
						>
							<td className="px-6 py-4 whitespace-nowrap text-sm">
								{order.orderId}
							</td>
							<td className="px-6 py-4 whitespace-nowrap flex gap-4">
								
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								<ul>
									{order.products.map((product) => (
										<li
											key={product.productId}
											className="text-xs"
										>
											{product.productTitle} <b>X</b>{" "}
											{product.quantity}
										</li>
									))}
								</ul>
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								£{totalsByOrderId[order.orderId].toFixed(2)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Orders;
