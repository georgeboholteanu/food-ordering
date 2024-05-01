import { NextRequest, NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/utils/connectPrisma";
import { Prisma } from "@prisma/client";

export const GET = async (req: NextRequest, res: NextResponse) => {
	const user = auth();
	console.log(user);

	if (!user) {
		return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
			status: 401,
		});
	}

	try {
		const registeredUser = await clerkClient.users.getUser(user.userId!);

		if (!registeredUser || !registeredUser.externalId || !registeredUser.primaryEmailAddress) {
			return new NextResponse(
				JSON.stringify({ message: "Unauthorized" }),
				{
					status: 401,
				}
			);
		}

		try {
			// Attempt to create the user
			await prisma.users.create({
				data: {
					externalId: registeredUser.externalId,
					email: registeredUser.primaryEmailAddress.emailAddress,
					name: registeredUser.fullName,
				},
			});

			// Return success response if user creation is successful
			return new NextResponse(
				JSON.stringify({
					message: "User registered"
					
				}),
				{ status: 200 }
			);
		} catch (error) {
			// Handle unique constraint violation error
			const prismaError = error as Prisma.PrismaClientKnownRequestError;
			const meta = prismaError.meta as { target?: string[] };
			if (
				prismaError.code === "P2002" &&
				meta?.target?.includes("email")
			) {
				return new NextResponse(
					JSON.stringify({ error: "Email address already exists" }),
					{ status: 400 }
				);
			}

			// Handle other errors
			console.error("Error creating user:", prismaError);
			return new NextResponse(
				JSON.stringify({ error: "Failed to create user" }),
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error("Error fetching user from Clerk:", error);
		return new NextResponse(
			JSON.stringify({ error: "Failed to fetch user from Clerk" }),
			{ status: 500 }
		);
	}
};