"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import type { OrderSummaryProps } from "./types";

export default function OrderSummary({ invoiceData }: OrderSummaryProps) {
	return (
		<Card>
			<CardHeader className="pb-0">
				<CardTitle className="text-base flex items-center gap-2">
					<FileText className="w-4 h-4" />
					Summary
				</CardTitle>
			</CardHeader>
			<CardContent className="pt-6">
				<div className="space-y-4">
					<div className="flex justify-between text-sm">
						<span className="text-muted-foreground">Subtotal</span>
						<span className="font-medium">{formatCurrency(invoiceData.subtotal)}</span>
					</div>
					<div className="flex justify-between text-sm">
						<span className="text-muted-foreground">Discount (30%)</span>
						<span className="text-green-600 font-medium">-{formatCurrency(invoiceData.totalDiscount)}</span>
					</div>
					<div className="border-t pt-4">
						<div className="flex justify-between text-base font-bold">
							<span>Order Total</span>
							<span className="text-primary">{formatCurrency(invoiceData.orderTotal)}</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
