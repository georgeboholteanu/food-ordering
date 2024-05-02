"use client";

// components
import Logo from "./Logo";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";
import SideNav from "./SideNav";

type HeaderProps = {
	header?: boolean;
	pathname?: string;
};

const Header: React.FC<HeaderProps> = () => {
	return (
		<header className=" sticky top-0 z-30 mx-auto container-fluid py-6 px-10 sm:px-20 shadow-sm border border-b-gray-300 bg-stone-200">
			<div className="container mx-auto">
				<div className="flex items-center justify-between">
					<Logo containerStyles="" />
					<div className="flex items-center">
						{/* nav */}
						<Navbar
							containerStyles="hidden lg:flex gap-x-10 items-center px-10 py-4 text-sm sm:text-md translate-x-[5%]"
							linkStyles="relative transition-all hover:primary-text"
						/>
						{/* mobile nav */}
						<div className="lg:hidden text-sm">
							<MobileNav />
						</div>
					</div>

					<SideNav containerStyles="hidden lg:flex items-center gap-4 text-sm" />
				</div>
			</div>
		</header>
	);
};

export default Header;
