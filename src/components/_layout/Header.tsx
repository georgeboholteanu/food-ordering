"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// components
import Logo from "./Logo";
import Navbar from "./Navbar";
import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa6";
import UserLinks from "../UserLinks";

interface HeaderProps {
	header?: boolean;
	pathname?: string;
}

const Header: React.FC<HeaderProps> = () => {
	const [header, setHeader] = useState(false);

	return (
		<header
			className={`${
				header
					? "py-4 shadow-lg dark:bg-accent"
					: "py-6 dark:bg-transparent"
			} sticky top-0 z-30 transition-all b mb-10"
			}`}
		>
			<div className="container mx-auto ">
				<div className="flex items-center justify-between">
					<Logo />
					<div className="flex items-center">
						{/* nav */}
						<Navbar
							containerStyles="hidden lg:flex gap-x-10 items-center px-10 "
							linkStyles="relative transition-all hover:primary-text"
							
							
						/>
						{/* mobile nav */}
						<div className="xl:hidden"></div>
					</div>
					<div className="flex items-center gap-4">
						<UserLinks />
						<Link
							href="/cart"
							className={`capitalize`}
						>
							<button className="btn-border p-2 px-5 transition-all flex gap-2 items-center">
								<FaCartArrowDown className="text-red-500 font-semibold" />
								<span>CART</span>
							</button>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
