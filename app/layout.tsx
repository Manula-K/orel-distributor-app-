import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
			<body className={inter.className}>{children}</body>
		</html>
	);
}
