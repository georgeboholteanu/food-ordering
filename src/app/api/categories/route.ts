import { prisma } from "@/utils/connectPrisma";

export const GET = async () => {
	try {
		const categories = await prisma.category.findMany();

		if (categories.length > 0 || categories) {
			return new Response(JSON.stringify(categories), { status: 200 });
		} else {
			return new Response(
				JSON.stringify({ message: "No categories found" }),
				{ status: 404 }
			);
		}
	} catch (error) {
		return new Response(
			JSON.stringify({ message: "Something went wrong" }),
			{ status: 500 }
		);
	}
};
