import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/connectPrisma";

export const POST = async (req: NextRequest) => {
    try {
        const { email, password } = await req.json();

		const currentUser = await prisma.employees.findUnique({
			where: { email: email },
		});
		
		if (!currentUser) {
			return NextResponse.json({ error: "Email not found" });
		} else if (currentUser.password !== password) {
			return NextResponse.json({ error: "Incorrect password" });
		}
		
        return NextResponse.json({ email, password, "message": "success" });
    } catch (error) {
        console.error("Error:", error);
        // Return a server error response
        return new NextResponse(JSON.stringify({
            error: "Internal Server Error",
            message: "An error occurred while processing your request."
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
