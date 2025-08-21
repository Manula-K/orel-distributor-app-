"use client";

import Image from "next/image";
import TopBar from "@/components/TopBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export default function PlaceOrderPage() {
	return (
		<div className="min-h-screen bg-background overflow-x-hidden">
			<TopBar
				left={
					<div className="flex items-center gap-3">
						<Image src="/logo1.png" alt="Orel Logo" width={40} height={40} />
						<div className="leading-tight">
							<p className="text-sm font-semibold">Distributor Portal</p>
							<p className="text-xs text-muted-foreground">Place Order</p>
						</div>
					</div>
				}
			/>
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 overflow-x-hidden">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-lg">
							<ShoppingCart className="w-5 h-5" />
							Start a New Order
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4 text-sm text-muted-foreground">
						<p>
							This is a placeholder page. Hook up your product catalog and cart flow here. The navigation button in the floating dock (visible on
							medium+ screens) and header routes correctly.
						</p>
						<Button size="sm" onClick={() => alert("Implement place order flow")}>
							Continue
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
