"use client";

import { Home, ShoppingCart, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

const dockItems = [
	{ icon: Home, label: "Home", href: "/" },
	{ icon: ShoppingCart, label: "Place Order", href: "/place-order" },
	{ icon: Settings, label: "Settings", href: "/settings" },
];

export function FloatingDock() {
	const pathname = usePathname();
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 8);
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 md:left-6 md:top-1/2 md:-translate-y-1/2 md:translate-x-0">
			<div
				className={cn(
					"flex items-center space-x-2 rounded-2xl border p-2 md:flex-col md:space-x-0 md:space-y-2 transition-all duration-300",
					scrolled ? "bg-card/40 backdrop-blur-lg border-border/80 shadow-xl" : "bg-card/80 backdrop-blur-md border-border shadow-lg"
				)}
			>
				{dockItems.map((item) => {
					const isActive = pathname === item.href;
					return (
						<div key={item.href} className="flex flex-col items-center">
							<Link href={item.href}>
								<Button
									variant={isActive ? "default" : "ghost"}
									size="icon"
									className={cn(
										"h-12 w-12 rounded-xl transition-all duration-200",
										isActive ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-accent hover:text-accent-foreground"
									)}
									title={item.label}
								>
									<item.icon className="h-5 w-5" />
								</Button>
							</Link>
							<span className={cn("mt-1 text-[10px] leading-none", isActive ? "text-foreground" : "text-muted-foreground")}>{item.label}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
