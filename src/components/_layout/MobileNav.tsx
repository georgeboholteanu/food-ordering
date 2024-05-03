import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";

// components
import Navbar from "./Navbar";
import Logo from "./Logo";
import Socials from "./Socials";
import SideNav from "./SideNav";

const MobileNav = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<AlignJustify className="cursor-pointer" />
			</SheetTrigger>
			<SheetContent>
				<div className="flex flex-col justify-center items-center">
					<Logo containerStyles="justify-center flex mt-4" />
					<Navbar
						containerStyles="flex flex-col items-center gap-y-4 py-10"
						linkStyles="justify-center text-md sm:text-lg text-black"
					/>
					<SideNav containerStyles="flex flex-col justify-center items-center gap-y-6 py-10 text-black text-sm sm:text-lg" />
					<Socials containerStyles="flex justify-center gap-x-4" />
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default MobileNav;
