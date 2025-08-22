"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Package, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "@/lib/format";
import { useState } from "react";
import type { OrderItemsProps } from "./types";

export default function OrderItems({ invoiceData }: OrderItemsProps) {
	const [itemsExpanded, setItemsExpanded] = useState(true);
	const itemsCount = invoiceData.items.length;

	return (
		<Card>
			<CardHeader className="pb-0">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base flex items-center gap-2">
						<Package className="w-4 h-4" />
						Order Items ({itemsCount})
					</CardTitle>
					<Button
						variant="ghost"
						size="icon"
						aria-label={itemsExpanded ? "Collapse items" : "Expand items"}
						onClick={() => setItemsExpanded((v) => !v)}
						className="shrink-0"
					>
						{itemsExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
					</Button>
				</div>
			</CardHeader>
			{itemsExpanded && (
				<CardContent className="pt-0">
					{invoiceData.items.map((item, index) => (
						<div key={item.id} className={index === 0 ? "pt-0 pb-4" : "py-4"}>
							<div className="flex items-start gap-3">
								<Image
									src={item.imageUrl || "/placeholder.jpg"}
									alt={item.name}
									width={35}
									height={35}
									className="rounded-md border bg-muted shrink-0"
								/>
								<div className="min-w-0 flex-1">
									<div className="flex items-center justify-between gap-2">
										<div className="flex flex-col items-start gap-1 min-w-0">
											<p className="text-sm font-semibold leading-snug truncate">{item.sku}</p>
											<span className="text-[10px] text-muted-foreground whitespace-normal break-words">{item.name}</span>
										</div>
										<Badge variant="outline" className="text-[10px] shrink-0">
											Qty {item.quantity}
										</Badge>
									</div>
									<div className="mt-2 flex items-center justify-between gap-4 text-[10px]">
										<div className="flex items-center gap-1.5">
											<span className="text-muted-foreground">Unit Price</span>
											<span className="font-bold text-primary">{formatCurrency(item.unitPrice)}</span>
										</div>
										<div className="flex items-center gap-1.5">
											<span className="text-muted-foreground">Total</span>
											<span className="font-medium">{formatCurrency(item.lineTotal)}</span>
										</div>
									</div>
								</div>
							</div>
							{index < invoiceData.items.length - 1 && (
								<Separator className="mx-0 my-2 h-[1.5px] bg-gradient-to-r from-transparent via-border/70 to-transparent rounded-full" />
							)}
						</div>
					))}
				</CardContent>
			)}
		</Card>
	);
}
