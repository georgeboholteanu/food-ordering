import { prisma } from "@/utils/connectPrisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req:NextRequest) => {
	const user = auth();
	const { searchParams } = new URL(req.url);
	const tablen = searchParams.get("tablen");

	
	if (!user.userId) {
		return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
			status: 401,
		});
	}
	
	try {
		const table = await prisma.tables.findUnique({
			where: {
				title: tablen as string, // fixes null resposonse from findUnique
			},
		});

		if (table && table != null) {
			// Check if the table is currently available
			if (table.available || table) { // remove table from if statement for production
				// Change available status to false in database
				await prisma.tables.update({
					where: {
						title: tablen as string,
					},
					data: {
						available: !table.available, // !change to false for production
					},
				});

				return new NextResponse(
					JSON.stringify({ message: `Table has been reserved` }),
					{ status: 200 }
				);
			} else {
				// Return a message indicating the table is already busy
				return new NextResponse(
					JSON.stringify({ message: `${tablen} is already busy` }),
					{ status: 201 }
				);
			}
		} else {
			// Return a message indicating that the table was not found
			return new NextResponse(
				JSON.stringify({ message: `${tablen} not found` }),
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
