import { prisma } from "@/utils/connectPrisma";


export const GET = async () => {
	try {
		const employees = await prisma.employees.findMany();

		if (employees.length > 0 || employees) {
			return new Response (JSON.stringify(employees), { status: 200 });
		} else {
			return new Response (JSON.stringify({ message: "No employees found" }), { status: 404 });
		}
	} catch (error) {
		return new Response (
			JSON.stringify({ message: "Something went wrong" }),
			{ status: 500 }
		);
	}
};
