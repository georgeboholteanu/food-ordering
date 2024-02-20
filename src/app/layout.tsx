import type { Metadata } from "next";
import { Inter, Alata } from "next/font/google";

import "./globals.css";
import { ToastContainer } from "react-toastify";

// components
import Header from "@/components/_layout/Header";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

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
		<html lang="en">
			<body className="alata-regular">
				<AuthProvider>
					<Header />
					<ToastContainer />
					{children}
				</AuthProvider>
			</body>
		</html>
	);
}
