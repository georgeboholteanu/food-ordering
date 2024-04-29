"use client";
import React, { useCallback, useEffect, useState } from "react";
import { ProductType } from "@/types/types";
import { CgRemove } from "react-icons/cg";
import { IoAddCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Cart = () => {
	const [cart, setCart] = useState<ProductType[]>([]);
	const { isSignedIn, user } = useUser();
	const { getToken } = useAuth();
	const router = useRouter();
	const apiUrl =
		process.env.NEXT_PUBLIC_ENV === "development"
			? process.env.NEXT_PUBLIC_API_URL_DEV
			: process.env.NEXT_PUBLIC_API_URL_PROD;

	const incrementProduct = (prod: ProductType) => {
		const cartItemsRaw = localStorage.getItem("cartItems");
		let cartItems = cartItemsRaw
			? JSON.parse(cartItemsRaw)
			: { products: [] };

		// Find the index of the product in the products array
		const index = cartItems.products.findIndex(
			(item: ProductType) => item.id === prod.id
		);

		if (index !== -1) {
			// Product already exists, update quantity if options array exists
			if (cartItems.products[index].options) {
				cartItems.products[index].options.quantity += 1;
			} else {
				// If options array doesn't exist, create it with quantity set to 1
				cartItems.products[index].options = {
					quantity: 1,
				};
			}
		} else {
			// Product doesn't exist, add a new entry with options array
			prod.options = { quantity: 1 };
			cartItems.products.push(prod);
		}

		// Save the updated object back to local storage
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
		setCart(cartItems.products);
	};

	const decrementProduct = useCallback((prod: ProductType) => {
		let cartItemsRaw = localStorage.getItem("cartItems");
		let cartItems = cartItemsRaw
			? JSON.parse(cartItemsRaw)
			: { products: [] };

		// Find the index of the product in the products array
		const index = cartItems.products.findIndex(
			(item: ProductType) => item.title === prod.title
		);

		if (index !== -1) {
			// Product already exists, update quantity
			if (cartItems.products[index].options.quantity - 1 === 0) {
				// If quantity is reduced to zero, create a new array without the item
				cartItems.products = cartItems.products.filter(
					(item: ProductType) => item.id !== prod.id
				);
			} else {
				// Otherwise, update the quantity
				cartItems.products[index].options.quantity -= 1;
			}
		} else {
			// Product doesn't exist in cart
			console.log("Product removed from cart");
		}

		// Save the updated object back to local storage
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
		setCart(cartItems.products);
	}, []);


	const placeOrder = async () => {
		const cartItemsRaw = localStorage.getItem("cartItems");
		const cartItems = cartItemsRaw ? JSON.parse(cartItemsRaw) : { products: [] };
	
		if (!isSignedIn) {
			toast.error("Please log in to place an order.");
			return;
		}
	
		if (cartItems.products.length === 0) {
			toast.error("Your cart is empty!");
			return;
		}
		// console.log(user)
		console.log(cartItems)


		try {
			
			const response = await fetch(`${apiUrl}/api/orders/ordered-items`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${await getToken()}` // Ensure you're passing the authentication token
				},
				body: JSON.stringify({
					products: cartItems.products.map((prod:ProductType) => ({
						productId: prod.id,
						productTitle: prod.title,	
						productPrice: prod.price,					
						quantity: prod.options.quantity
					})),
					userEmail: user.primaryEmailAddress?.emailAddress, // Assuming `user` object has email
					tableSlug: "takeaway", 
					totalPrice: cartItems.products.reduce((total: any, item:any) => total + item.price * item.options.quantity, 0).toFixed(2)
				}),
			});
	
			if (response.ok) {
				const responseData = await response.json();
				console.log(responseData);
				toast.success("Order has been placed successfully!");
				localStorage.removeItem("cartItems");
				setCart([]); // Clear the cart in state
				router.push("/my-orders");
			} else {
				throw new Error('Failed to place the order.');
			}
		} catch (error) {
			console.error("Error placing order:", error);
			toast.error("Something went wrong. Please try again.");
		}
	};
	

	const emptyCart = () => {
		localStorage.removeItem("cartItems");
		setCart([]);
	};

	useEffect(() => {
		const cartItemsRaw = localStorage.getItem("cartItems");
		const cartItemsUpdated = cartItemsRaw
			? JSON.parse(cartItemsRaw).products
			: [];
		setCart(cartItemsUpdated);
	}, [decrementProduct]);

	const handledecrementProduct = (item: ProductType) => {
		decrementProduct(item);
	};

	return (
		<>
			<div className="my-10 min-h-screen mx-10 sm:mx-12 md:mx-16 lg:mx-20">
				<ul className="container mx-auto">
					{cart.map((item, index) => (
						<li key={index}>
							<div className="flex py-4 font-bold border-b-2 justify-between items-center">
								<span className="flex">{item.title}</span>
								<div className="flex gap-3 items-center">
									<span className="text-md text-red-500">
										x{item.options.quantity}
									</span>
									<button
										onClick={() =>
											handledecrementProduct(item)
										}
										className="text-gray-700 hover:text-red-500 text-xl transition-all"
									>
										<CgRemove />
									</button>
									<span className="text-lg">
										{item.price}
									</span>
									<button
										onClick={() => incrementProduct(item)}
										className="text-gray-700 hover:text-red-500 text-2xl transition-all"
									>
										<IoAddCircleOutline />
									</button>
								</div>
							</div>
						</li>
					))}
				</ul>
				<div className="justify-end flex gap-6 mt-5 text-xl">
					<span className="font-semibold text-red-600/80">Total</span>
					<span className="font-semibold text-red-600/80">
						{cart
							.reduce(
								(total, item) =>
									total + item.price * item.options.quantity,
								0
							)
							.toFixed(2)}
					</span>
				</div>
				<div className="justify-end flex gap-6 mt-5 text-xl ">
					<button
						onClick={emptyCart}
						className="btn-secondary hover:border-gray-500 shadow-md text-sm "
					>
						<span className="font-semibold text-gray-800">
							Empty Cart
						</span>
					</button>
					<button
						onClick={placeOrder}
						className="btn-primary shadow-md text-sm "
					>
						<span className="font-semibold text-gray-200">
							Place Order
						</span>
					</button>
				</div>
			</div>
		</>
	);
};

export default Cart;
