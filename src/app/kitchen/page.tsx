"use client";
import { OrderItemType } from "@/types/types";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Order } from "@prisma/client";
import { statusToColorClass } from "@/data";

const Kitchen = () => {
	const { user } = useUser();
	const [orders, setOrders] = useState<Order[]>([]);
	const [orderItems, setOrderItems] = useState<OrderItemType[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const apiUrl =
			process.env.NEXT_PUBLIC_ENV === "development"
				? process.env.NEXT_PUBLIC_API_URL_DEV
				: process.env.NEXT_PUBLIC_API_URL_PROD;

		const fetchOrders = async () => {
			try {
				const res = await fetch(`${apiUrl}/api/orders/kitchen`, {
					cache: "no-cache",
				});

				if (!res.ok) {
					throw new Error(
						`Failed to fetch orders with status: ${res.status}`
					);
				}
				const ordersData = await res.json();
				setOrders(ordersData);
				
			} catch (error) {
				console.error("Error fetching kitchen orders:", error);
			}
		};

		const fetchOrderItems = async () => {
			try {
				const responseOrderItems = await fetch(
					`${apiUrl}/api/orders/ordered-items`,
					{
						cache: "no-cache",
					}
				);

				if (!responseOrderItems.ok) {
					throw new Error(
						`Failed to fetch order items with status: ${responseOrderItems.status}`
					);
				}
				const orderItemsData = await responseOrderItems.json();
				setOrderItems(orderItemsData);
			} catch (error) {
				console.error("Error fetching order items:", error);
			}
		};

		const fetchData = async () => {
			await fetchOrders();
			await fetchOrderItems();
			setIsLoading(false);
		};

		fetchData();
	}, []);

	if (isLoading) {
		return <div>Loading kitchen orders...</div>;
	}

	return (
		<div className="p-4 mx-auto container min-h-[75vh]">
			<div
				className={`${
					orders.length > 0 ? "hidden" : ""
				} flex justify-center text-xl font-semibold text-zinc-700 bg-yellow-100 px-4 py-2`}
			>
				You do not have any orders placed
			</div>
			<div className="overflow-x-auto">
				<table className="min-w-full text-center">
					<thead className="border-b">
						<tr>
							<th className="px-4 py-3 ">No</th>
							<th className="px-4 py-3 ">Order Id</th>
							<th className="px-4 py-3 ">Date</th>
							<th className="px-4 py-3 ">Products</th>
							<th className="px-4 py-3 ">Cost</th>
							<th className="px-4 py-3 ">Status</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order: Order, index) => (
							<tr
								key={order.id}
								className="border-t border-gray-100 "
							>
								<td className="px-2 py-4 whitespace-nowrap text-xs">
									{/* add a counter */}
									{index+1}
								</td>
								<td className="px-2 py-4 whitespace-nowrap text-xs">
									{order.id}
								</td>
								<td className="px-2 py-4 whitespace-nowrap text-xs">
									<p>
										{new Date(
											order.createdAt
										).toLocaleDateString(undefined, {
											year: "numeric",
											month: "numeric",
											day: "numeric",
											hour: "2-digit",
											minute: "2-digit",
										})}
									</p>
								</td>
								<td className="px-2 py-4 whitespace-nowrap">
									<ul>
										{orderItems
											.filter(
												(item: OrderItemType) =>
													item.orderId === order.id
											)
											.map((product) => (
												<li
													key={product.id}
													className="text-xs"
												>
													{product.productTitle}{" "}
													<b>X</b> {product.quantity}
												</li>
											))}
									</ul>
								</td>
								<td className="px-2 py-4 whitespace-nowrap">
									<span className="font-bold text-sm border border-gray-400 rounded-full p-2 text-zinc-800">£{order.totalPrice.toString()}</span>
								</td>
								<td className="px-2 py-4 whitespace-nowrap">
									<span
										className={`flex justify-center font-semibold text-xs px-4 py-2 rounded-full ${
											statusToColorClass[order.status]
										}`}
									>
										{order.status}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Kitchen;
