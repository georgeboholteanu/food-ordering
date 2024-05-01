// http://localhost:3000/api/orders/status
// ROUTE TO UPDATE ORDER STATUS
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/connectPrisma";
import { auth } from "@clerk/nextjs/server";

// Define the PUT handler as a named export
export const PUT = async (req: NextRequest, res: NextResponse) => {
	const user = auth();
	if (!user) {
		return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
			status: 401,
		});
	}

	if (req.method !== "PUT") {
		return new NextResponse(
			JSON.stringify({ message: "Method not allowed" }),
			{
				status: 405,
			}
		);
	}

	const { orderId } = req.body;

	if (!orderId) {
		return new NextResponse(
			JSON.stringify({ message: "Missing orderId" }),
			{ status: 400 }
		);
	}
	try {
		// upadate order status
		const updateResponse = await prisma.order.update({
			where: {
				id: orderId,
			},
			data: {
				status: "COMPLETED",
			},
		});

		return new NextResponse(
			JSON.stringify({
				message: "Order status updated successfully",
				order: updateResponse,
			}),
			{
				status: 200,
			}
		);
	} catch (error) {
		return new NextResponse(
			JSON.stringify({ message: "Something went wrong" }),
			{ status: 500 }
		);
	}
};
