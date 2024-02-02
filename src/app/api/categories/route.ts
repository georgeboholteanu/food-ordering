import { prisma } from "@/utils/connectPrisma";


export const GET = async () => {
	try {
		const categories = await prisma.category.findMany();
		return new Response(JSON.stringify(categories), { status: 200 });
	} catch (error) {
		return new Response(
			JSON.stringify({ message: "Something went wrong" }),
			{ status: 500 }
		);
	}
};
