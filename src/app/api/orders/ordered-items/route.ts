// localhost:3000/api/orders
// localhost:3000/api/orders?id=searchParams
import { prisma } from "@/utils/connectPrisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	const user = auth();
	const { userId, sessionId, getToken } = auth();
    const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");

	if (!user) {
		return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
			status: 401,
		});
	}

	try {
		let orderedItems 
        if (id) {
            orderedItems = await prisma.orderItem.findMany({
                where: {
                    ...(id ? { orderId: id } : {}),
                }
            });
        } else {
            orderedItems = await prisma.orderItem.findMany();
        }

		if (orderedItems.length > 0) {
			return new NextResponse(JSON.stringify(orderedItems), { status: 200 });
		} else {
			return new NextResponse(
				JSON.stringify({ message: "No ordered items found" }),
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