import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex container mx-auto justify-center md:flex-col ">			
		
			<Link href="/menu">
				<button className="md:w-full uppercase bg-gray-500 px-10 py-10 hover:bg-gray-400 text-white border-2 w-[200px] h-[200px]">
					Menu
				</button>
			</Link>
			<Link href="/reservations">
				<button className="md:w-full uppercase bg-gray-500 px-10 py-10 hover:bg-gray-400 text-white border-2 w-[200px] h-[200px]">
					Reservations
				</button>
			</Link>

		</main>
	);
}
