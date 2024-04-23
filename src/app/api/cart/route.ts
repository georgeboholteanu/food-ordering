import { prisma } from "@/utils/connectPrisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
	const user = auth();

	if (!user) {
		return new Response(JSON.stringify({ message: "Unauthorized" }), {
			status: 401,
		});
	}

	try {
		const orders = await prisma.order.findMany();

		if (orders.length > 0) {
			return new Response(JSON.stringify(orders), { status: 200 });
		} else {
			return new Response(
				JSON.stringify({ message: "No orders found" }),
				{ status: 404 }
			);
		}
	} catch (error) {
		return new Response(
			JSON.stringify({ message: "Something went wrong" }),
			{ status: 500 }
		);
	}
};

export const POST = async (req: NextRequest) => {
	// Read the stream as text
	// const bodyText = await req.text();

	// Parse the text as JSON
	// const data = JSON.parse(bodyText);
	// return new Response(JSON.stringify(data), { status:200 });
	const data = await req.json();

	if (data) {
		try {
			// Authenticate the user
			const { userId } = auth();
			console.log(userId);
			
			if (!userId) {
				return new NextResponse(
					JSON.stringify({ message: "Unauthorized" }),
					{
						status: 401,
					}
				);
			}

			// Extract data from the request body

			const { products, userEmail, tableSlug, totalPrice } = data;

			// Validate products
			if (!products || products.length === 0) {
				return new NextResponse(
					JSON.stringify({ message: "Cart is empty" }),
					{
						status: 400,
					}
				);
			}

			// Calculate total price if not provided
			const calculatedTotalPrice =
				totalPrice ||
				products.reduce(
					(total: any, item: any) =>
						total + item.price * item.options.quantity,
					0
				);

			// Create the order
			const newOrder = await prisma.order.create({
				data: {
					totalPrice: calculatedTotalPrice,
					orderItems: {
						create: products,
					},
					status: "Waiting confirmation from kitchen",
					userId: userId,
					tableSlug,
				},
			});

			return new NextResponse(JSON.stringify(newOrder), { status: 201 });
		} catch (error) {
			console.error("Error placing order:", error);
			return new NextResponse(
				JSON.stringify({ message: "Something went wrong" }),
				{ status: 500 }
			);
		}
	}
};
