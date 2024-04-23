import { prisma } from "@/utils/connectPrisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
	const user = auth();
	const { userId, sessionId, getToken } = auth();

	if (!user) {
		return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
			status: 401,
		});
	}

	try {
		const orders = await prisma.order.findMany();
		console.log(orders)

		if (orders.length > 0) {
			return new NextResponse(JSON.stringify(orders), { status: 200 });
		} else {
			return new NextResponse(
				JSON.stringify({ message: "No orders found" }),
				{ status: 404 }
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
	console.log("Received data:", data);
	const { products, userEmail, tableSlug, totalPrice } = data;

	try {
		// Authenticate the user
		const { userId } = auth();
		console.log(userId)
		if (!userId) {
			return new NextResponse(
				JSON.stringify({ message: "Unauthorized" }),
				{
					status: 401,
				}
			);
		}

		// Retrieve user details
		const user = await prisma.users.findUnique({
			where: { email: userEmail },
		});
		console.log(user)

		// Check if user exists otherwise return error
		if (!user) {
			return new NextResponse(
				JSON.stringify({ message: "User not found" }),
				{
					status: 404,
				}
			);
		}


		// Create the order
		const newOrder = await prisma.order.create({
			data: {				
				totalPrice: parseFloat(totalPrice),
				status: "Waiting confirmation from kitchen",
				user: {
					connect: { id: user.id },
				},
				table: {
					connect: { title: tableSlug },
				},
				orderItems: {
					create: products.map((product:any) => ({
						productId: product.productId,
						quantity: product.quantity,
						subtotal: parseFloat(product.price) * product.quantity,
					})),
				},
			},
			include: {
				orderItems: true,
			},
		});

		return new Response(JSON.stringify(newOrder), { status: 201 });
	} catch (error) {
		console.error("Error placing order:", error);
		return new Response(
			JSON.stringify({ message: "Something went wrong" }),
			{ status: 500 }
		);
	}
};
