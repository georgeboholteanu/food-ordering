import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";

export default function Home() {
	return (
		<main className="mx-auto container-fluid justify-center">
			<Hero />
			<FeaturedProducts />
			<Newsletter />
			<Testimonials />
		</main>
	);
}
