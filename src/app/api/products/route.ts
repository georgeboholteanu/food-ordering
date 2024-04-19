// localhost:3000/api/products?cat=searchParams
// localhost:3000/api/products
import { prisma } from "@/utils/connectPrisma";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
	const { searchParams } = new URL(req.url);
	const cat = searchParams.get("cat"); 

	try {
		let products;
		if (cat) {
			products = await prisma.product.findMany({
				where: {
					...(cat ? { catSlug: cat } : { isFeatured: true }),
				},
			});
		} else {
			products = await prisma.product.findMany();
		}

		return new NextResponse(JSON.stringify(products), { status: 200 });
	} catch (error) {
		return new NextResponse(
			JSON.stringify({ message: "Something went wrong" }),
			{ status: 500 }
		);
	}
};
