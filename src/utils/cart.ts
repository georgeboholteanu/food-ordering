import { ProductType } from "@/types/types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Function to add products to cart
export const addToCartFromMenu = (prod: ProductType) => {
	const cartItemsRaw = localStorage.getItem("cartItems");
	let cartItems = cartItemsRaw ? JSON.parse(cartItemsRaw) : { products: [] };

	// Find the index of the product in the products array
	const index = cartItems.products.findIndex(
		(item: ProductType) => item.title === prod.title
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
	toast.success(`Added ${prod.title} to cart`);
};
