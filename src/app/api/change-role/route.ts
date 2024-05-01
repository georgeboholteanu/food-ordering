// http://localhost:3000/api/change-role
// ROUTE TO UPDATE USER ROLE

import { prisma } from "@/utils/connectPrisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
	const user = auth();
	if (!user) {
		return new NextResponse("Unauthorized", { status: 401 });
	}

	try {
		const updateResponse = await prisma.users.updateMany({
			data: {
				role: "WAIT",
			},
		});

		if (!updateResponse) {
			return new NextResponse("User with specified role not found", {
				status: 404,
			});
		}
		return new NextResponse("User role updated successfully", {
			status: 200,
		});
	} catch (error) {
		console.error("Error updating order status:", error);
		return new NextResponse("Internal server error", { status: 500 });
	}
}
