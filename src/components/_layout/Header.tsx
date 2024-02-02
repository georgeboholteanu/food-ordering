"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// components
import Logo from "./Logo";
import Navbar from "./Navbar";



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
					? "py-4 bg-white shadow-lg dark:bg-accent"
					: "py-6 dark:bg-transparent"
			} sticky top-0 z-30 transition-all border-b-2 border-secondary mb-10"
			}`}
		>
			<div className="container mx-auto ">
				<div className="flex items-center justify-between">
					<Logo />
					<div className="flex items-center">
						{/* nav */}
						<Navbar
							containerStyles="hidden lg:flex gap-x-10 items-center px-10 "
							linkStyles="relative hover:text-primary transition-all hover:scale-[1.1]"
							underlineStyles="absolute left-0 top-full h-[2px] bg-primary w-full"
						/>
						{/* mobile nav */}
						<div className="xl:hidden">
							
						</div>
					</div>
				</div>
			</div>

		</header>
	);
};

export default Header;
