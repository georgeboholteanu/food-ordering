// http://localhost:3000/api/users
import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/utils/connectPrisma";


export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json();
		console.log(data)
        console.log("Received data:", data);

        // Ensure all required fields are present
        const { externalId, email, username } = data;
        if (!externalId || !email) {
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
                name: username || email.split("@")[0],
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
