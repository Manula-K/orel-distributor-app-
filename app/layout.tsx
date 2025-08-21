import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FloatingDock } from "@/components/FloatingDock";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/contexts/CartContext";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
	preload: true,
	fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
	title: "Orel Distributor Portal",
	description: "Orel Distributor Portal for managing orders and deliveries",
	generator: "Orel Distributor Portal by Orel",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning className={inter.variable}>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</head>
			<body className={inter.className}>
				<CartProvider>
					{children}
					<FloatingDock />
					<Toaster />
				</CartProvider>
			</body>
		</html>
	);
}
