import Link from "next/link";
import Image from "next/image";

type logoProps = {
	containerStyles: string;
};

const Logo: React.FC<logoProps> = ({ containerStyles }) => {
	return (
		<div className={`${containerStyles}`}>
			<div className="w-[168px] h-[42px]">
				<Link href="/" className="">
					<div className="relative h-full">
						<Image
							src="/general/CA-logo.png"
							alt="Logo"
							fill
							priority
							quality="100"
							sizes="(max-width: 168px) 30vw, 168px"
						/>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Logo;
