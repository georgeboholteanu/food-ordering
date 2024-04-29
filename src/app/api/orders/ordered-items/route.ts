// localhost:3000/api/ordered-items
// localhost:3000/api/ordered-items?id=searchParams
import { FilteredProductsType } from "@/types/types";
import { prisma } from "@/utils/connectPrisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	const user = auth();
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");

	if (!user) {
		return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
			status: 401,
		});
	}

	try {
		let orderedItems;
		// if (id) {
		// 	orderedItems = await prisma.orderItem.findMany({
		// 		where: {
		// 			orderId: id,
		// 			...(id ? { orderId: id } : {}),
		// 		},
		// 	});
		// } else {
		orderedItems = await prisma.orderItem.findMany();
		// }

		if (orderedItems && orderedItems.length > 0) {
			return new NextResponse(JSON.stringify(orderedItems), {
				status: 200,
			});
		} else {
			return new NextResponse(
				JSON.stringify({ message: "No orderes placed yet" }),
				{ status: 204 }
			);
		}
	} catch (error) {
		return new NextResponse(
			JSON.stringify({ message: "Something went wrong" }),
			{ status: 500 }
		);
	}
};

export const POST = async (req: NextRequest, res: NextResponse) => {
	const data = await req.json();
	// console.log("Received data:", data);
	const { products, userEmail, tableSlug, totalPrice } = data;

	try {
		// Retrieve user details
		const currentUser = await prisma.users.findUnique({
			where: { email: userEmail },
		});

		console.log("Current user:", currentUser);

		if (!currentUser) {
			return new NextResponse(
				JSON.stringify({ message: "User not found" }),
				{ status: 404 }
			);
		}

		// Create the order
		const newOrder = await prisma.order.create({
			data: {
				totalPrice: parseFloat(totalPrice),
				status: "Waiting confirmation from kitchen",
				user: {
					connect: { id: currentUser.id },
				},
				table: {
					connect: { title: tableSlug },
				},
			},
		});

		// Ensure all products have the necessary properties
		const orderItemsData = products.map(
			(product: FilteredProductsType) => ({
				orderId: newOrder.id,
				userExternalId: currentUser.externalId,
				productId: product.productId,
				productTitle: product.productTitle,
				productPrice: product.productPrice,
				quantity: product.quantity || 1,
				subtotal:
					parseFloat(product.productPrice) * (product.quantity || 1),
			})
		);

		if (!orderItemsData) {
			return new NextResponse(
				JSON.stringify({
					message: "Something went wrong creating the OrderItemsData",
				}),
				{ status: 500 }
			);
		}
		await prisma.orderItem.createMany({
			data: orderItemsData,
		});

		return new NextResponse(JSON.stringify(newOrder), { status: 201 });
	} catch (error) {
		console.error("Error placing order:", error);
		return new NextResponse(
			JSON.stringify({ message: "Something went wrong" }),
			{ status: 500 }
		);
	}
};
