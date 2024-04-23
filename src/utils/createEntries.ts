// npm install --save-dev typescript
// tsc src/utils/createEntries.ts && node src/utils/createEntries.js

import { prisma } from "./connectPrisma";

// Function to create category entries

const createCategoryEntries = async () => {
	try {
		await prisma.category.createMany({
			data: [
				{
					title: "Pastas",
					desc: "Embark on a culinary adventure with our exquisite selection of italian pastas, each a handcrafted masterpiece ready to tantalize your taste buds.",
					slug: "pastas",
					img: "/categories/pastas.png",
					color: "white",
				},
				{
					title: "Burgers",
					desc: "Forget the ordinary, crave the extraordinary! Dive into our world of authentic burgers, where every bite is a journey through bold flavors and fresh, premium ingredients.",
					slug: "burgers",
					img: "/categories/burgers.png",
					color: "red",
				},
				{
					title: "Pizzas",
					desc: "Our pizzas are an explosion of flavor that will sing to your taste buds and dance on your tongue.",
					slug: "pizzas",
					img: "/categories/pizzas.png",
					color: "yellow",
				},
				{
					title: "Drinks",
					desc: "Dive into a kaleidoscope of flavor with our drinks",
					slug: "drinks",
					img: "/categories/drinks.png",
					color: "black",
				},
				{
					title: "Salads",
					desc: "Not just salads, but wellness on a plate!",
					slug: "salads",
					img: "/categories/salads.png",
					color: "green",
				},
			],
		});
		console.log("Category entries created successfully");
	} catch (error) {
		console.error("Error creating category entries:", error);
	} 
};

const createProductsEntries = async () => {
	try {
		await prisma.product.createMany({
			data: [
				{
					title: "Classic Cheeseburger",
					desc: "A juicy beef patty topped with melted cheddar cheese, crispy lettuce, fresh tomato, and our signature sauce, served on a toasted bun.",
					price: "12.99",
					img: "/products/classic-cheeseburger.png",
					available: true,
					catSlug: "burgers",
				},
				{
					title: "Mushroom Swiss Burger",
					desc: "A juicy beef patty topped with sautéed mushrooms, melted Swiss cheese, caramelized onions, and creamy mayonnaise, served on a toasted brioche bun.",
					price: "14.5",
					img: "/products/mushroom-swiss-burger.png",
					available: true,
					catSlug: "burgers",
				},
				{
					title: "Black Bean Veggie Burger",
					desc: "A vegetarian option with a flavorful black bean patty, avocado slices, pico de gallo, roasted corn, and cilantro lime crema, served on a whole wheat bun.",
					price: "12.99",
					img: "/products/black-bean-veggie-burger.png",
					available: true,
					catSlug: "burgers",
				},
				{
					title: "Pizza Margherita",
					desc: "A classic pizza with a thin crust, fresh tomato sauce, mozzarella cheese, and basil leaves.",
					price: "14.99",
					img: "/products/pizza-margherita.png",
					available: true,
					catSlug: "pizzas",
				},

				{
					title: "Pizza Vegetarian",
					desc: "A delicious pizza loaded with fresh vegetables, mozzarella cheese, and a flavorful tomato sauce.",
					price: "13.99",
					img: "/products/pizza-vegetarian.png",
					available: true,
					catSlug: "pizzas",
				},
				{
					title: "Pizza Pepperoni ",
					desc: "A traditional pizza loaded with savory pepperoni slices, mozzarella cheese, and our signature tomato sauce.",
					price: "13.99",
					img: "/products/pizza-pepperoni.png",
					available: true,
					catSlug: "pizzas",
				},
				{
					title: "Supreme Pizza",
					desc: "A feast for the senses with pepperoni, sausage, ham, green peppers, onions, mushrooms, and extra mozzarella cheese on our classic tomato sauce.",
					price: "16.99",
					img: "/products/pizza-supreme.png",
					available: true,
					catSlug: "pizzas",
				},
				{
					title: "Pizza Quattro Formaggi",
					desc: "A classic Italian pizza with four different cheeses: mozzarella, Parmesan, Fontina, and Gorgonzola.",
					price: "15.99",
					img: "/products/pizza-quattro-formaggi.png",
					available: true,
					catSlug: "pizzas",
				},
				{
					title: "Spaghetti Bolognese",
					desc: "Tender spaghetti noodles tossed in a hearty Bolognese sauce made with ground beef, tomatoes, and Italian herbs.",
					price: "11.99",
					img: "/products/spaghetti-bolognese.png",
					available: true,
					catSlug: "pastas",
				},
				{
					title: "Carbonara",
					desc: "Classic Roman pasta dish with creamy egg yolk, Parmesan cheese, pancetta, and black pepper, coating al dente spaghetti noodles.",
					price: "13.99",
					img: "/products/spaghetti-carbonara.png",
					available: true,
					catSlug: "pastas",
				},
				{
					title: "Seafood Marinara",
					desc: "A medley of fresh seafood, including mussels, clams, shrimp, and calamari, cooked in a flavorful tomato sauce with herbs, tossed with al dente spaghetti.",
					price: "15.99",
					img: "/products/spaghetti-seafood-marinara.png",
					available: false,
					catSlug: "pastas",
				},
				{
					title: "Pesto Spaghetti with Grilled Vegetables",
					desc: "Vibrant basil pesto sauce coats al dente spaghetti, topped with a colorful medley of grilled zucchini, eggplant, bell peppers, and cherry tomatoes.",
					price: "12.99",
					img: "/products/spaghetti-pesto-grilled-vegetables.png",
					available: true,
					catSlug: "pastas",
				},
				{
					title: "Greek Salad",
					desc: "A refreshing combination of romaine lettuce, cucumbers, tomatoes, Kalamata olives, red onion, feta cheese, and a tangy Greek vinaigrette.",
					price: "9.99",
					img: "/products/greek-salad.png",
					available: true,
					catSlug: "salads",
				},
				{
					title: "Southwest Chicken Salad",
					desc: "Grilled chicken strips tossed with romaine lettuce, black beans, corn, avocado slices, pico de gallo, cilantro lime crema, and a spicy chipotle dressing.",
					price: "12.99",
					img: "/products/southwest-chicken-salad.png",
					available: true,
					catSlug: "salads",
				},
				{
					title: "Caprese Salad",
					desc: "A classic Italian trio of fresh mozzarella slices, juicy tomatoes, and fragrant basil leaves drizzled with olive oil and balsamic vinegar.",
					price: "8.99",
					img: "/products/caprese-salad.png",
					available: true,
					catSlug: "salads",
				},
				{
					title: "Caesar Salad",
					desc: "Crisp romaine lettuce with Parmesan cheese, croutons, and our creamy Caesar dressing.",
					price: "8.99",
					img: "/products/caesar-salad.png",
					available: true,
					catSlug: "salads",
				},
				{
					title: "Rosemary Lemonade",
					desc: "A fresh twist on the classic, our homemade lemonade infused with fragrant rosemary sprigs, for a touch of herbal sweetness.",
					price: "6.5",
					img: "/products/rosemary-lemonade.png",
					available: true,
					catSlug: "drinks",
				},
				{
					title: "Blood Orange Mojito",
					desc: "A tropical twist on the mojito, featuring muddled blood oranges, mint leaves, and rum, for a vibrant and citrusy cocktail.",
					price: "8.99",
					img: "/products/blood-orange-mojito.png",
					available: true,
					catSlug: "drinks",
				},
				{
					title: "Spiced Iced Coffee",
					desc: "A smooth and creamy iced coffee infused with warm spices like cardamom and cinnamon, for a comforting and flavorful pick-me-up.",
					price: "5.5",
					img: "/products/spiced-iced-coffee.png",
					available: true,
					catSlug: "drinks",
				},
			],
		});
		console.log("Category entries created successfully");
	} catch (error) {
		console.error("Error creating category entries:", error);
	} 
};

const createEmployeesEntries = async () => {
	try {
		await prisma.employees.createMany({
			data: [
				{
					name: "jon",
					surname: "doe",
					email: "donjoe@gmail.com",
					password: "123",
				},
				{
					name: "james",
					surname: "martin",
					email: "jamesmartin@gmail.com",
					password: "111",
				},
			],
		});
		console.log("Category entries created successfully");
	} catch (error) {
		console.error("Error creating category entries:", error);
	} 
};

const createTablesEntries = async () => {
	try {
		await prisma.tables.createMany({
			data: [
				{
					title: "table1",
				},
				{
					title: "table2",
				},
				{
					title: "table3",
				},
				{
					title: "table4",
				},
				{
					title: "table5",
				},
				{
					title: "table6",
				},
				{
					title: "table7",
				},
				{
					title: "table8",
				},
				{
					title: "takeaway",
				},
			],
		});
		console.log("Category entries created successfully");
	} catch (error) {
		console.error("Error creating category entries:", error);
	} 
};

// Main function to create all entries
const createEntries = async () => {
    await createCategoryEntries();
    await createProductsEntries();
    await createTablesEntries();
    await createEmployeesEntries();

    // Disconnect Prisma client when all operations are done
    await prisma.$disconnect();
};

// Call the main function to start creating entries
createEntries();