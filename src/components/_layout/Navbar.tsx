
import Link from "next/link";
import styles from "./styles.module.css"
import { navLinks } from "../../data";
import { employeeLinks } from "../../data";
import { useUser } from "@clerk/nextjs";

type NavbarProps = {
	containerStyles: string;
	linkStyles: string;
		
};

const Navbar: React.FC<NavbarProps> = ({
	containerStyles,
	linkStyles,	
	
}) => {
	const { user } = useUser();

	return (
		<nav className={`${containerStyles}`}>
			{/* regular nav links */}
			{navLinks.map((link, index) => {
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
			{/* employee only nav links */}
			{employeeLinks.map((link, index) => {
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
