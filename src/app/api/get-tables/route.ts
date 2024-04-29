import { prisma } from "@/utils/connectPrisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async () => {
	const user = auth();

	if (!user) {
		return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
			status: 401,
		});
	}

	try {
		const tables = await prisma.tables.findMany({
			where: {
				title: {
					not: "takeaway",
				},
			},
		});
		if (tables.length > 0 || tables) {

			return new NextResponse(JSON.stringify(tables), { status: 200 });
		}
		return new NextResponse(
			JSON.stringify({ message: "No tables found" , status: 404 }),
		)
	} catch (error) {
		return new NextResponse(
			JSON.stringify({ message: "Something went wrong" }),
			{ status: 500 }
		);
	}
};
