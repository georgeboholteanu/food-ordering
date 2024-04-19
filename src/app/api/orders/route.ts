import { getAuthSession } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/utils/connectPrisma";

export const GET = async () => {
	const session = await getAuthSession();

	if (!session) {
		return new Response(JSON.stringify({ message: "Unauthorized" }), {
			status: 401,
		});
	}

	try {
		const orders = await prisma.order.findMany();

		if (orders.length > 0) {
			return new Response(JSON.stringify(orders), { status: 200 });
		} else {
			return new Response(
				JSON.stringify({ message: "No orders found" }),
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

export const POST = async (req: Request) => {
	// Read the stream as text
	const bodyText = await req.text();

	// Parse the text as JSON
	const data = JSON.parse(bodyText);
	// return new Response(JSON.stringify(data), { status:200 });

	if (data) {
		try {
			// Authenticate (assuming session check is needed for POST as well)
			const session = await getAuthSession();
			if (!session) {
				return new Response(
					JSON.stringify({ message: "Unauthorized" }),
					{
						status: 401,
					}
				);
			}

			// Extract data from the request body

			const { products, userEmail, tableSlug, totalPrice } = data;

			// Validate products
			if (!products || products.length === 0) {
				return new Response(
					JSON.stringify({ message: "Cart is empty" }),
					{
						status: 400,
					}
				);
			}

			// Calculate total price if not provided
			const calculatedTotalPrice =
				totalPrice ||
				products.reduce(
					(total: any, item: any) =>
						total + item.price * item.options.quantity,
					0
				);

			// Create the order
			const newOrder = await prisma.order.create({
				data: {
					totalPrice: calculatedTotalPrice,
					products: {
						create: products,
					},
					status: "Waiting confirmation from kitchen",
					userEmail,
					tableSlug,
				},
			});

			return new Response(JSON.stringify(newOrder), { status: 201 });
		} catch (error) {
			console.error("Error placing order:", error);
			return new Response(
				JSON.stringify({ message: "Something went wrong" }),
				{ status: 500 }
			);
		}
	}
};
