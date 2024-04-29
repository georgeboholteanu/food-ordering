import { prisma } from "@/utils/connectPrisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	const user = auth();
	const { searchParams } = new URL(req.url);
	const externalId = searchParams.get("userId");

	if (!user) {
		return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
			status: 401,
		});
	}

	try {
		const orderedItems = await prisma.orderItem.findMany({
			where: {
				userExternalId: externalId!,
			},
		});

		if (orderedItems.length > 0) {
			return new NextResponse(JSON.stringify(orderedItems), {
				status: 200,
			});
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
