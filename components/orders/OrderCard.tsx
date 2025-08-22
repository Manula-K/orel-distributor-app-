"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Calendar } from "lucide-react";
import { formatCurrency, formatFriendlyDateTime } from "@/lib/format";
import { useRouter } from "next/navigation";
import { ORDER_STATUS_LABELS, ORDER_STATUS_BADGE_VARIANTS, ORDER_STATUS_BADGE_STYLES } from "./constants";
import type { OrderCardProps } from "./types";

export default function OrderCard({ order }: OrderCardProps) {
	const router = useRouter();

	const handleCardClick = () => {
		router.push(`/${encodeURIComponent(order.invoiceNumber)}`);
	};

	const isCurrentOrder = order.status === "current";

	return (
		<Card
			className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.01] ${
				isCurrentOrder ? "border-red-500/30 bg-red-50/30" : "hover:border-primary/50"
			}`}
			onClick={handleCardClick}
		>
			<CardContent>
				<div className="flex items-center justify-between mb-3">
					<div className="flex items-center gap-2">
						<Badge variant={ORDER_STATUS_BADGE_VARIANTS[order.status]} className={`text-[10px] h-5 px-2 ${ORDER_STATUS_BADGE_STYLES[order.status]}`}>
							{ORDER_STATUS_LABELS[order.status]}
						</Badge>
						{isCurrentOrder && (
							<Badge variant="outline" className="text-[10px] h-5 px-2 text-red-600 border-red-600">
								Action Required
							</Badge>
						)}
					</div>
					<ChevronRight className="w-4 h-4 text-muted-foreground" />
				</div>

				<div className="flex items-end justify-between gap-3">
					<div className="space-y-1 min-w-0 flex-1">
						<p className="font-semibold text-[13px] leading-tight truncate" title={order.invoiceNumber}>
							{order.invoiceNumber}
						</p>
						<div className="flex items-center gap-2 text-[11px] text-muted-foreground min-w-0">
							<span className="flex items-center gap-1">
								<Calendar className="w-3.5 h-3.5" />
								<span>{formatFriendlyDateTime(order.invoiceDate)}</span>
							</span>
						</div>
					</div>
					<div className="text-right shrink-0">
						<p className="font-bold text-sm leading-tight">{formatCurrency(order.orderTotal)}</p>
						<p className="text-[11px] text-muted-foreground whitespace-nowrap">{order.items.length} items</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
