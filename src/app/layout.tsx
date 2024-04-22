import type { Metadata } from "next";
// import { Inter, Alata } from "next/font/google";
import local from 'next/font/local';

	import "./globals.css";
	import { ToastContainer } from "react-toastify";
	import { ClerkProvider } from "@clerk/nextjs";

	// components
import Header from "@/components/_layout/Header";
import Footer from "@/components/_layout/Footer";

const alata = local({
	src:[{
		path: "../../public/fonts/Alata/Alata-Regular.ttf",
		weight: '400',
		style: 'normal'
	}],
	variable: "--font-alata",
})
const roboto = local({
	src:[{
		path: "../../public/fonts/Roboto/Roboto-Bold.ttf",
		weight: '700',
		style: 'normal'
	}],
	variable: "--font-roboto",
}) 

export const metadata: Metadata = {
	title: "Welcome to Cucina Autentica",
	description: "Exquisite dishes a la carte",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`${roboto.variable}`}>
					<Header />
					<ToastContainer
						autoClose={2000}
						draggable={false}
						closeButton={false}
						position="bottom-right"
						style={{ bottom: "20px" }}
					/>
					{children}
					<Footer />
				</body>
			</html>
		</ClerkProvider>
	);
}
