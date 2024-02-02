import Link from "next/link";
import Image from "next/image";

const Logo = () => {
	return (
		<div className="w-[120px] h-[100px]">
			<Link href="/" className="hover:scale-[1.1] transition-all">
				<div className="relative h-full">
					<Image
						src="/general/logo-sangiorgio.png"
						alt="Logo"
						fill
						priority
						sizes="(max-width: 640px) 30vw, 200px"
						
					/>
				</div>
			</Link>
		</div>
	);
};

export default Logo;
