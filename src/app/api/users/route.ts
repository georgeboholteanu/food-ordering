import { NextRequest, NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/utils/connectPrisma";

export const GET = async (req: NextRequest, res: NextResponse) => {
	const user = auth();

	if (!user) {
		return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
			status: 401,
		});
	}

	try {
		const registeredUser = await clerkClient.users.getUser(user.userId!);

		if (!registeredUser) {
			return new NextResponse(
				JSON.stringify({ message: "Unauthorized" }),
				{
					status: 401,
				}
			);
		}
		try {
			// create the user to prisma db
			await prisma.users.create({
				data: {
					externalId: registeredUser.id,
					email: registeredUser.primaryEmailAddress?.emailAddress,
					name: registeredUser.fullName,
				},
			});

			// return the registered user
			return new NextResponse(
				JSON.stringify({
					message: "User registered",
					data: registeredUser,
				}),
				{ status: 200 }
			);
		} catch (error) {
			console.error("Clerk Auth provider error:", error);
			return new NextResponse(
				JSON.stringify({ error: "Clerk Auth provider Error" }),
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error("Error syncing user:", error);
		return new NextResponse(
			JSON.stringify({ error: "Failed to sync user" }),
			{ status: 500 }
		);
	}
};

export const POST = async (req: NextRequest) => {
	try {
		const data = await req.json();
		console.log("Received data:", data);

		const { externalId, email, username } = data;

		// Ensure all required fields are present
		if (!externalId || !email || !username) {
			return new NextResponse(
				JSON.stringify({ message: "Missing required fields" }),
				{
					status: 400,
				}
			);
		}

		// Attempt to fetch the user by the externalId
		const user = await clerkClient.users.getUser(externalId);
		
		// If user doesn't exist, create a new user
		console.log("No existing user found, creating new user...");

		const newUser = await prisma.users.create({
			data: {
				externalId: externalId,
				email: email,
				name: username,
			},
		});

		if (!newUser) {
			return new NextResponse(
				JSON.stringify({ message: "Failed to create user" }),
				{
					status: 500,
				}
			);
		}

		// if creation is successful
		return new NextResponse(
			JSON.stringify({
				message: "User created successfully",
				data: newUser,
			}),
			{
				status: 201,
			}
		);
	} catch (error) {
		console.error("Server error:", error);
		return new NextResponse(
			JSON.stringify({ message: "Internal server error", error }),
			{
				status: 500,
			}
		);
	}
};
