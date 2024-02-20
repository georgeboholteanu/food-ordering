"use client";

// components
import Logo from "./Logo";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";
import SideNav from "../SideNav";

type HeaderProps = {
	header?: boolean;
	pathname?: string;
};

const Header: React.FC<HeaderProps> = () => {
	return (
		<header className="sticky top-0 z-30 mx-auto container p-6">
			<div className="container mx-auto ">
				<div className="flex items-center justify-between">
					<Logo containerStyles="" />
					<div className="flex items-center">
						{/* nav */}
						<Navbar
							containerStyles="hidden lg:flex gap-x-10 items-center px-10 "
							linkStyles="relative transition-all hover:primary-text"
						/>
						{/* mobile nav */}
						<div className="lg:hidden">
							<MobileNav />
						</div>
					</div>

					<SideNav containerStyles="hidden lg:flex items-center gap-4" />
				</div>
			</div>
		</header>
	);
};

export default Header;
