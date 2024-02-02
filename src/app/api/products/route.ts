import { prisma } from "@/utils/connectPrisma";

export const GET = async ( req: Request ) => {
	const { searchParams } = new URL (req.url);
	const cat = searchParams.get("cat"); // localhost:3000/api/menu/?cat=searchParams

	try {
		const products = await prisma.product.findMany({
			where: {
				...(cat ? { catSlug: cat } : { isFeatured: true }),
			},
		});
		return new Response(JSON.stringify(products), { status: 200 });
	} catch (error) {
		return new Response(
			JSON.stringify({ message: "Something went wrong" }),
			{ status: 500 }
		);
	}
};
