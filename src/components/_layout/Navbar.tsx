import Link from "next/link";
import styles from "./styles.module.css";
import { navLinks } from "../../data";
import { employeeLinks } from "../../data";
import { SignedIn } from "@clerk/nextjs";

type NavbarProps = {
	containerStyles: string;
	linkStyles: string;
};

const Navbar: React.FC<NavbarProps> = ({ containerStyles, linkStyles }) => {	

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
			<SignedIn>
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
			</SignedIn>
		</nav>
	);
};

export default Navbar;
