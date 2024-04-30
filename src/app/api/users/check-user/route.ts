// http://localhost:3000/api/check-user
// RETURN THE ROLE OF THE LOGGED IN USER

import { prisma } from "@/utils/connectPrisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	const user = auth();
	// check if user is authenticated
	if (!user || !user.userId) {
		return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
			status: 401,
		});
	}

	// find the user in the database
	try {
		const userInDb = await prisma.users.findUnique({
			where: {
				externalId: user.userId,
			},
		});

		if (!userInDb) {
			return new NextResponse(
				JSON.stringify({ message: "User not found" }),
				{ status: 404 }
			);
		}
		console.log("User role backend", userInDb.role);
		return new NextResponse(JSON.stringify(userInDb.role), {
			status: 200,
		});
	} catch (error) {
		return new NextResponse(
			JSON.stringify({ message: "Something went wrong" }),
			{ status: 500 }
		);
	}
};
