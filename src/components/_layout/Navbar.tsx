import { useState } from "react";
import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa6";
import UserLinks from "../UserLinks";
import styles from "./styles.module.css"

type NavbarProps = {
	containerStyles: string;
	linkStyles: string;
		
};

const links = [
	{ path: "/", name: "HOME" },	
	{ path: "/menu", name: "MENU" },
	{ path: "/reservations", name: "RESERVATIONS" },
	{ path: "/contact", name: "CONTACT" },
];

const Navbar: React.FC<NavbarProps> = ({
	containerStyles,
	linkStyles,	
	
}) => {
	return (
		<nav className={`${containerStyles}`}>
			{links.map((link, index) => {
				return (
					<Link
						href={link.path}
						key={index}
						className={`capitalize ${linkStyles} ${styles.customUnderline} `}
					>
						{link.name}
					</Link>
				);
			})}			

		</nav>
	);
};

export default Navbar;
