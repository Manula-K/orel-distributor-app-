"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Hash, Calendar, Package } from "lucide-react";
import { formatFriendlyDateTime } from "@/lib/format";
import type { OrderHeaderProps } from "./types";

export default function OrderHeader({ invoiceData }: OrderHeaderProps) {
	const isCurrentOrder = invoiceData.status === "current";
	const friendlyDateTime = formatFriendlyDateTime(invoiceData.invoiceDate);

	return (
		<Card className="gap-0">
			<CardHeader className="pb-2 px-4">
				<CardTitle className="text-base flex items-center gap-2">
					<ShoppingCart className="w-4 h-4" />
					{invoiceData.distributorName}
				</CardTitle>
			</CardHeader>
			<CardContent className="pt-0 px-4">
				<div className="space-y-2">
					<div className="flex items-center justify-between rounded-md bg-muted/30 p-3">
						<div className="flex items-center gap-2">
							<Hash className="w-4 h-4 text-muted-foreground" />
							<p className="text-sm text-muted-foreground">Invoice No</p>
						</div>
						<p className="font-mono font-medium text-sm">{invoiceData.invoiceNumber}</p>
					</div>
					<div className="flex items-center justify-between rounded-md bg-muted/30 p-3">
						<div className="flex items-center gap-2">
							<Calendar className="w-4 h-4 text-muted-foreground" />
							<p className="text-sm text-muted-foreground">Date/Time</p>
						</div>
						<p className="font-medium text-sm">{friendlyDateTime}</p>
					</div>
					<div className="flex items-center justify-between rounded-md bg-muted/30 p-3">
						<div className="flex items-center gap-2">
							<Package className="w-4 h-4 text-muted-foreground" />
							<p className="text-sm text-muted-foreground">Status</p>
						</div>
						<Badge
							variant={isCurrentOrder ? "default" : "outline"}
							className={`text-[10px] h-5 px-2 ${isCurrentOrder ? "" : "text-green-600 border-green-600"}`}
						>
							{isCurrentOrder ? "Replenish Order" : "Completed"}
						</Badge>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
