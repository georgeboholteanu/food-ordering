import Link from "next/link";
import { RiFacebookFill, RiPinterestFill, RiTwitterFill, RiInstagramFill } from "react-icons/ri";

type SocialsProps = {
	containerStyles: string;
}

const icons = [
	{
		path: "https://www.instagram.com/",
		name: <RiInstagramFill />,
		icon_color: "text-pink-500/90",
	},
	{
		path: "https://twitter.com/",
		name: <RiTwitterFill />,
		icon_color: "text-gray-500",
	},
    {
		path: "https://www.facebook.com/",
		name: <RiFacebookFill />,
		icon_color: "text-cyan-500",
	},
    {
		path: "https://www.pinterest.com/",
		name: <RiPinterestFill />,
		icon_color: "text-red-500",
	},
];

const Socials: React.FC<SocialsProps> = ({ containerStyles }) => {
	return (
		<div className={`${containerStyles}`}>
			{icons.map((icon, index) => {
				return (
					<Link href={icon.path} key={index}>
						<div className={`text-2xl transition-all ${icon.icon_color}`}>
							{icon.name}
						</div>
					</Link>
				);
			})}
		</div>
	);
};

export default Socials;
