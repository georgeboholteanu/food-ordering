// http://localhost:3000/api/orders/status
// ROUTE TO UPDATE ORDER STATUS

import { prisma } from "@/utils/connectPrisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest, res: NextResponse) {
	
	const user = auth(); // Ensure your auth method works appropriately in this context
	if (!user) {
		return new NextResponse("Unauthorized", { status: 401 });
	}
	
	const data = await req.json();
	// Parse the JSON body from the request
	const { orderId, status } = data;

	// Validate the necessary data
	if (!orderId || !status) {
		return new NextResponse("Missing required data", { status: 400 });
	}

	try {
		// Update order status in the database
		const updateResponse = await prisma.order.update({
			where: {
				id: orderId,
			},
			data: {
				status: status,
			},
		});

		// Return success response
		return new NextResponse(JSON.stringify(updateResponse), {
			status: 200,
		});
	} catch (error) {
		console.error("Error updating order status:", error);
		return new NextResponse("Internal server error", { status: 500 });
	}
}
