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

const Orders = () => {
	const { user } = useUser()
	const [userOrders, setUserOrders] = useState<GroupedOrder[]>([]);
	const [totalsByOrderId, setTotalsByOrderId] = useState<
		Record<string, number>
	>({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const apiUrl =
					process.env.NEXT_PUBLIC_ENV === "development"
						? process.env.NEXT_PUBLIC_API_URL_DEV
						: process.env.NEXT_PUBLIC_API_URL_PROD;

				const getOrderProducts = async () => {					
					const res = await fetch(
						`${apiUrl}/api/orders?userId=${user?.id}`,
						apiUrl === "http://localhost:3000"
							? { cache: "no-cache" }
							: {}
					);

					if (!res.ok) {
						throw new Error("Failed to fetch data");
					}

					return res.json();
				};
				const orderItemsData: OrderItemType[] =
					await getOrderProducts();

				const groupedOrders: GroupedOrdersMap = orderItemsData.reduce(
					(acc: any, item: any) => {
						if (!acc[item.orderId]) {
							acc[item.orderId] = {
								orderId: item.orderId,
								products: [],
								total: 0,
							};
						}

						acc[item.orderId].products.push({
							productId: item.productId,
							productTitle: item.productTitle,
							quantity: item.quantity,
							subtotal: parseFloat(item.subtotal),
						});

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
				setIsLoading(false); // Set loading to false after data is processed
			} catch (error) {
				console.error("Error fetching data:", error);
				setIsLoading(false); // Ensure loading is set to false even if there is an error
			}
		};

		fetchData();
	}, []);

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
								<td className="px-2 py-4 whitespace-nowrap flex gap-4"></td>
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
								<td className="px-6 py-4 whitespace-nowrap">
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

export default Orders;
