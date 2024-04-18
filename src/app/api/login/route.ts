// login route
import { prisma } from "@/utils/connectPrisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req:NextRequest) => {

    try {
        const { email, password } = await req.json();
        
        return NextResponse.json({ email, password, "message": "success" });
    } catch (error) {
        console.error("Error:", error);
    }
}