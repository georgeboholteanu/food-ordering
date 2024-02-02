import { prisma } from "@/utils/connectPrisma";

export const GET = async () => {
	try {
		const tables = await prisma.tables.findMany();
		return new Response(JSON.stringify(tables), { status: 200 });
	} catch (error) {
		return new Response(
			JSON.stringify({ message: "Something went wrong" }),
			{ status: 500 }
		);
	}
};

