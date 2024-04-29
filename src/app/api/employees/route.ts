// localhost:3000/api/employees?id=searchParams
// localhost:3000/api/employees

import { prisma } from "@/utils/connectPrisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");

	try {
		let employees;

		if (id) {
			employees = await prisma.employees.findUnique({
				where: {
					id: "clvi6kkfs000xsjm7uym863wn",
				},
			});
		} else {
			employees = await prisma.employees.findMany();

			if (employees.length > 0 || employees) {
				return new NextResponse(JSON.stringify(employees), {
					status: 200,
				});
			} else {
				return new NextResponse(
					JSON.stringify({ message: "No employees found" }),
					{ status: 404 }
				);
			}
		}

		return new NextResponse(JSON.stringify(employees), { status: 200 });
	} catch (error) {
		return new NextResponse(
			JSON.stringify({ message: "Something went wrong" }),
			{ status: 500 }
		);
	}
};



