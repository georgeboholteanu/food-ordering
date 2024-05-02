import { MapPin, Phone } from "lucide-react";
import Image from "next/image";
import React from "react";

const Locations = () => {
	return (
		<section>
			<div className="container mx-auto max-w-6xl my-8 px-6">
				<h1 className="text-4xl font-bold text-orange-700/80 mb-8 text-center">
					Locations
				</h1>
				<div className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
					{/* location 1 */}
					<div className="flex flex-col border-gray-200 ">
						<div className="w-full shadow-lg rounded-xl">
							<Image
								src="/general/restaurant-location1.png"
								alt=""
								width={0}
								height={0}
								sizes="100vw"
								style={{ width: "100%", height: "auto" }}
								priority
							/>
						</div>
						<div className="my-5 justify-center items-center flex flex-col">
							<div>
								<h2 className="px-10 font-bold text-2xl mb-4 border-b border-b-zinc-600/30 py-2">
									London Bridge
								</h2>
							</div>
							<div className="flex gap-4 items-center mt-4">
								<div className="text-orange-700/80">
									<MapPin />
								</div>
								<span className="text-sm font-semibold">
									23 Bridge Road, London | SE1 9SG
								</span>
							</div>
							<div className="flex gap-4 items-center mt-2">
								<div className="text-cyan-700/80">
									<Phone />
								</div>
								<span className="my-2 text-sm font-semibold">
									020 8012 5472
								</span>
							</div>
							<h4 className="mt-5 text-xl font-semibold">
								HOURS
							</h4>
							<p className="my-2 text-sm font-semibold">
								Mon - Fri: 09:00 - 22:00
							</p>
							<p className="my-2 text-sm font-semibold">
								Sat - Sun: 09:00 - 23:00
							</p>
						</div>
					</div>

					{/* location 2 */}
					<div className="flex flex-col border-gray-200 ">
						<div className="w-full shadow-lg rounded-xl">
							<Image
								src="/general/restaurant-location3.png"
								alt=""
								width={0}
								height={0}
								sizes="100vw"
								style={{ width: "100%", height: "auto" }}
								priority
							/>
						</div>
						<div className="my-5 justify-center items-center flex flex-col">
							<div>
								<h2 className="px-10 font-bold text-2xl mb-4 border-b border-b-zinc-600/30 py-2">
									Covent Garden
								</h2>
							</div>
							<div className="flex gap-4 items-center mt-4">
								<div className="text-orange-700/80">
									<MapPin />
								</div>
								<span className="text-sm font-semibold">
									85 Covent Square, London | WC2E 8RE
								</span>
							</div>
							<div className="flex gap-4 items-center mt-2">
								<div className="text-cyan-700/80">
									<Phone />
								</div>
								<span className="my-2 text-sm font-semibold">
									020 8012 5466
								</span>
							</div>
							<h4 className="mt-5 text-xl font-semibold">
								HOURS
							</h4>
							<p className="my-2 text-sm font-semibold">
								Mon - Fri: 09:00 - 22:00
							</p>
							<p className="my-2 text-sm font-semibold">
								Sat - Sun: 11:00 - 22:00
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Locations;
