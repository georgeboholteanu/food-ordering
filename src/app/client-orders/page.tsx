"use client";
import React, { useEffect, useState } from "react";
import { OrderItemType } from "@/types/types";
import { useUser } from "@clerk/nextjs";

interface GroupedOrder {
	orderId: string;
	products: OrderItemType[];
	total: number;
}

type GroupedOrdersMap = Record<string, GroupedOrder>;

const ClientOrders = () => {
	const { user } = useUser();
	const [userOrders, setUserOrders] = useState<GroupedOrder[]>([]);
	const [totalsByOrderId, setTotalsByOrderId] = useState<
		Record<string, number>
	>({});
	const [orderItemsData, setOrderItemsData] = useState<OrderItemType[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			if (!user?.id) {
				console.log("User ID is undefined, skipping fetch");
				setIsLoading(false);
				return;
			}

			try {
				const apiUrl =
				process.env.NEXT_PUBLIC_ENV === "development"
					? process.env.NEXT_PUBLIC_API_URL_DEV
					: process.env.NEXT_PUBLIC_API_URL_PROD;

				const res = await fetch(
					`${apiUrl}/api/orders?userId=${user.id}`,
					{
						cache: "no-cache",
					}
				);

				if (!res.ok) {
					throw new Error(
						`Failed to fetch data with status: ${res.status}`
					);
				}

				const orderItems = await res.json();
				setOrderItemsData(orderItems);

				const groupedOrders: GroupedOrdersMap = orderItems.reduce(
					(acc: any, item: any) => {
						const {
							orderId,
							productId,
							productTitle,
							quantity,
							subtotal,
						} = item;
						if (!acc[orderId]) {
							acc[orderId] = { orderId, products: [], total: 0 };
						}

						acc[orderId].products.push({
							productId,
							productTitle,
							quantity,
							subtotal: parseFloat(subtotal),
						});
						acc[orderId].total += parseFloat(subtotal);
						return acc;
					},
					{}
				);

				setUserOrders(Object.values(groupedOrders));
				setTotalsByOrderId(
					Object.fromEntries(
						Object.keys(groupedOrders).map((key) => [
							key,
							groupedOrders[key].total,
						])
					)
				);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [user?.id]);

	if (isLoading) {
		return <div className="min-h-[75vh]">Loading...</div>;
	}

	return (
		<div className="p-4 mx-auto container min-h-[75vh]">
			<div
				className={`${
					userOrders.length > 0 ? "hidden" : ""
				} flex justify-center text-xl font-semibold text-zinc-700 bg-yellow-100 px-4 py-2`}
			>
				You do not have any orders placed
			</div>
			<div className="overflow-x-auto">
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
								<td className="px-2 py-4 whitespace-nowrap text-sm">
									{order.orderId}
								</td>
								<td className="px-2 py-4 whitespace-nowrap flex gap-4 text-sm">
									<p>
										{new Date(
											orderItemsData[0]?.createdAt
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
								<td className="px-2 py-4 whitespace-nowrap">
									£{totalsByOrderId[order.orderId].toFixed(2)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ClientOrders;