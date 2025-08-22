"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, type LucideIcon } from "lucide-react";
import { useMemo } from "react";

import type { OrderTimelineProps } from "./types";

export default function OrderTimeline({ invoiceDate }: OrderTimelineProps) {
	const dateOnly = useMemo(
		() => new Date(invoiceDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
		[invoiceDate]
	);

	const timelineSteps: { title: string; subtitle: string; Icon: LucideIcon }[] = [
		{ title: "Order Confirmed", subtitle: "Order placed and confirmed", Icon: Clock },
		{ title: "Shipping", subtitle: "Order prepared for shipping", Icon: Clock },
		{ title: "Transit", subtitle: "Order in transit to destination", Icon: Clock },
		{ title: "Sent to Customer", subtitle: "Order delivered to customer", Icon: Clock },
	];

	return (
		<Card>
			<CardHeader className="pb-4">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base flex items-center gap-2">
						<Clock className="w-4 h-4" />
						Timeline
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="pt-0">
				<div className="space-y-4">
					{timelineSteps.map(({ title, subtitle, Icon }, index) => (
						<div key={title} className="flex items-start gap-3">
							<div className="relative">
								<div className="w-8 h-8 rounded-full bg-muted border-2 border-muted-foreground/20 flex items-center justify-center">
									<Icon className="w-4 h-4 text-muted-foreground" />
								</div>
								{index < timelineSteps.length - 1 && (
									<div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-dashed border-l border-muted-foreground/30"></div>
								)}
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex items-center justify-between">
									<div>
										<p className="font-semibold text-sm">{title}</p>
										<p className="text-xs text-muted-foreground">{subtitle}</p>
									</div>
									<span className="text-xs text-muted-foreground">{dateOnly}</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
