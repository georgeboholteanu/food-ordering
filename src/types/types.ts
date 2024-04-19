export type MenuType = {
	id: string;
	title: string;
	desc?: string;
	slug: string;
	img?: string;
	color?: string;
};

export type ProductType = {
	id: string;
	title: string;
	desc?: string;
	img?: string;
	price: number;
	available: boolean;
	options: { quantity: number };
};

export type TableType = {
	id: number;
	title: string;
	available: boolean;
};

export type OrderType = {
	id: string;
	createdAt: string;
	products: [];
	totalPrice: number;
	status: string;
	userEmail: String;
};

export type Employees = {
	id: string;
	createdAt: string;
	name: string;
	surname: string;
	email: string;
	password: string;
	role: "ADMIN" | "BASIC";
}

