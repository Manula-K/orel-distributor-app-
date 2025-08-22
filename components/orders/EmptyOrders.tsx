"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";

export default function EmptyOrders() {
	return (
		<Card>
			<CardContent className="text-center py-8">
				<Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
				<p className="text-muted-foreground">No orders found</p>
			</CardContent>
		</Card>
	);
}
