"use client";

import { Home, Package, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

const dockItems = [
	{ icon: Home, label: "Home", href: "/" },
	{ icon: Package, label: "Products", href: "/products" },
	{ icon: ShoppingCart, label: "Cart", href: "/cart" },
	{ icon: User, label: "Profile", href: "/profile" },
];

export function FloatingDock() {
	const pathname = usePathname();
	const { getTotalItems } = useCart();
	const cartItemCount = getTotalItems();

	return (
		<div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 md:right-6 md:top-1/2 md:left-auto md:-translate-y-1/2">
			<div className="flex items-center space-x-2 rounded-2xl border p-2 md:flex-col md:space-x-0 md:space-y-2 transition-all duration-300 bg-card/40 backdrop-blur-lg border-border/80 shadow-xl">
				{dockItems.map((item) => {
					const isActive = pathname === item.href;
					const isCart = item.href === "/cart";

					return (
						<div key={item.href} className="flex flex-col items-center relative">
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
									{isCart && cartItemCount > 0 && (
										<Badge
											variant="destructive"
											className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
										>
											{cartItemCount > 99 ? "99+" : cartItemCount}
										</Badge>
									)}
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
