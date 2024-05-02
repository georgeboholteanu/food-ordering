import React from "react";
import UserLinks from "../UserLinks";
import { ShoppingBasket } from "lucide-react";

import Link from "next/link";

type sideNavProps = {
	containerStyles: string;
};

const SideNav: React.FC<sideNavProps> = ({ containerStyles }) => {
	return (
		<div className={`${containerStyles}`}>
			<UserLinks />
			<Link href="/cart">
				<button className="btn-border p-2 px-5 transition-all flex gap-2 items-center">
					<ShoppingBasket className="text-red-500 " />
					<span className="font-semibold">CART</span>
				</button>
			</Link>
		</div>
	);
};

export default SideNav;
