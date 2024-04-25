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


