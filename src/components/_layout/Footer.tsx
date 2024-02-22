import React from "react";
import Logo from "./Logo";
import Socials from "./Socials";
import Link from "next/link";

const Footer = () => {
	return (
		<section className="container-fluid justify-center px-10 sm:px-20 py-10 pb-15 bg-yellow-500">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-between">
				<div className="flex flex-col gap-3">
					<Logo containerStyles="" />
					<Socials containerStyles="flex gap-5 items-center" />
				</div>
                <div className="flex flex-col text-xs font-thin text-gray-600">
                    <span className="font-bold text-sm">Cucina Autentica Limited</span>
                    <span>23 Church Road, Bonaparte Street</span>
                    <span>NW11 5QU</span>
                    <span>London</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-gray-600 text-xs font-thin">+44 777 536 1195</span>
                    <a href="mailto:contact@cucinaautentica.com" className="text-xs text-red-600 font-semibold">contact@cucinaautentica.com</a>
                </div>
                <div className="flex flex-col text-xs font-thin text-gray-600 gap-1">
                    <Link href="/">Terms and Conditions</Link>
                    <Link href="/">Privacy and cookie policy</Link>
                    <Link href="/">Contact us</Link>
                    <Link href="/">Jobs</Link>
                    <Link href="/">Private Dining</Link>
                </div>
			</div>
		</section>
	);
};

export default Footer;
