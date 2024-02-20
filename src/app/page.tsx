import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";

export default function Home() {
	return (
		<main className="mx-auto container-fluid justify-center">
			<Hero />
			<FeaturedProducts />
		</main>
	);
}
