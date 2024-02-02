import { useState } from "react";
import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa6";
import UserLinks from "../UserLinks";

type NavbarProps = {
	containerStyles: string;
	linkStyles: string;
	underlineStyles: string;
}

const links = [
	{ path: "/", name: "home" },
	{ path: "/menu", name: "menu" },
	{ path: "/reservations", name: "reservations" },
	
];

const Navbar: React.FC<NavbarProps> = ({
	containerStyles,
	linkStyles,
	underlineStyles,
}) => {
	
	return (
		<nav className={`${containerStyles}`}>
			{links.map((link, index) => {
				return (
					<Link
						href={link.path}
						key={index}
						className={`capitalize ${linkStyles} hover:text-primary `}
					>
						{link.name}
					</Link>
				);
			})}
			<UserLinks />
			<Link href="/cart" className={`capitalize  hover:text-primary `}>
				<button className="bg-orange-600/70 p-2 rounded-full px-5 hover:bg-slate-400 transition-all flex gap-2 items-center">
					<FaCartArrowDown className="text-white font-semibold" />
					<span>Cart</span>
				</button>
			</Link>
		</nav>
	);
};

export default Navbar;
