import Link from "next/link";
import Image from "next/image";

const Logo = () => {
	return (
		<div className="w-[168px] h-[42px]">
			<Link href="/" className="hover:scale-[1.1] transition-all">
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
	);
};

export default Logo;
