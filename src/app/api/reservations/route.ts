import { prisma } from "@/utils/connectPrisma";

export const GET = async (req: Request) => {
	const { searchParams } = new URL(req.url);
	const tablen = searchParams.get("tablen");

	try {
		const table = await prisma.tables.findUnique({
			where: {
				title: tablen as string, // fixes null resposonse from findUnique
			},
		});

		if (table && table != null) {
			// Check if the table is currently available
			if (table.available || table) { // remove table from if statement for production
				// Change available status to false in database
				await prisma.table.update({
					where: {
						title: tablen as string,
					},
					data: {
						available: !table.available, // !change to false for production
					},
				});

				return new Response(
					JSON.stringify({ message: `Table has been reserved` }),
					{ status: 200 }
				);
			} else {
				// Return a message indicating the table is already busy
				return new Response(
					JSON.stringify({ message: `${tablen} is already busy` }),
					{ status: 201 }
				);
			}
		} else {
			// Return a message indicating that the table was not found
			return new Response(
				JSON.stringify({ message: `${tablen} not` }),
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
