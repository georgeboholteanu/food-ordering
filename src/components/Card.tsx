import React from "react";
import Image from "next/image";

type CardProps = {
	cardTitle: string;
	cardDescription: string;
	cardImage: string;
};

const Card: React.FC<CardProps> = ({
	cardTitle,
	cardDescription,
	cardImage,
}) => {
	return (
		<div className="">
			<div className="relative h-[30vh]">
				{/* <Image
					src={cardImage}
					alt="Portrait"
					fill
					priority
					quality={100}
					sizes="100vw"
					style={{
						objectFit: "contain",
					}}
					className="rounded-xl absolute"
				/> */}

				<h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{cardTitle}
				</h3>
				<p className="font-normal text-gray-700 dark:text-gray-400">
					{cardDescription}
				</p>
				<div className="justify-end flex">
					<button className="btn-secondary mt-2 ">Add to Cart</button>
				</div>
			</div>
		</div>
	);
};

export default Card;
