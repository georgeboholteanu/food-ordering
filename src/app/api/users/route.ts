import { NextRequest, NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/utils/connectPrisma";
import { Prisma } from "@prisma/client";

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
			// Attempt to create the user
			await prisma.users.create({
				data: {
					externalId: registeredUser.id,
					email: registeredUser.primaryEmailAddress?.emailAddress,
					name: registeredUser.fullName,
				},
			});

			// Return success response if user creation is successful
			return new NextResponse(
				JSON.stringify({
					message: "User registered",
					data: registeredUser,
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

export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json();
        console.log("Received data:", data);

        // Ensure all required fields are present
        const { externalId, email, username } = data;
        if (!externalId || !email || !username) {
            return new NextResponse(
                JSON.stringify({ message: "Missing required fields" }),
                { status: 400 }
            );
        }

        // Check for existing user in the local database to avoid unnecessary external calls
        const existingUser = await prisma.users.findUnique({
            where: { externalId: externalId },
        });

        if (existingUser) {
            return new NextResponse(
                JSON.stringify({ message: "User already exists. Skipping registration" }),
                { status: 202 }
            );
        }

        // Since user does not exist locally, we can now check with Clerk (if necessary)
        const user = await clerkClient.users.getUser(externalId);
        if (!user) {
            // Consider whether this should be a 404 or 400 based on your application logic
            return new NextResponse(
                JSON.stringify({ message: "User does not exist in Clerk db" }),
                { status: 404 }
            );
        }

        // Create new user in the local database
        const newUser = await prisma.users.create({
            data: {
                externalId: externalId,
                email: email,
                name: username,
            },
        });

        return new NextResponse(
            JSON.stringify({
                message: `User ${username} was created successfully`,
                data: newUser,
            }),
            { status: 201 }
        );
    } catch (error) {
        console.error("Server error:", error);
        return new NextResponse(
            JSON.stringify({ message: "Internal server error", error }),
            { status: 500 }
        );
    }
};
