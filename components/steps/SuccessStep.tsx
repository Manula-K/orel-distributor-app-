"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { PartyPopper } from "lucide-react";
import type { InvoiceData } from "@/types/invoice";
import { formatCurrency } from "@/lib/format";

interface SuccessStepProps {
	invoiceData: InvoiceData | null;
	onBackToOrders: () => void;
	onProcessNew: () => void;
}

export default function SuccessStep({ invoiceData, onBackToOrders, onProcessNew }: SuccessStepProps) {
	return (
		<Card className="text-center">
			<CardContent className="pt-8 pb-8">
				<div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
					<PartyPopper className="w-10 h-10 text-green-600" />
				</div>
				<CardTitle className="text-2xl font-bold text-green-600 mb-2">Order Accepted!</CardTitle>
				<CardDescription className="text-base mb-6">Your order has been successfully processed and will be prepared for delivery.</CardDescription>
				<div className="space-y-3 text-sm text-muted-foreground mb-8">
					<p>
						Invoice: <span className="font-medium text-foreground">{invoiceData?.invoiceNumber}</span>
					</p>
					<p>
						Total: <span className="font-bold text-lg text-foreground">{invoiceData && formatCurrency(invoiceData.orderTotal)}</span>
					</p>
				</div>
				<div className="space-y-3">
					<Button onClick={onBackToOrders} className="w-full" size="lg">
						Back to Orders
					</Button>
					<Button onClick={onProcessNew} variant="outline" className="w-full" size="lg">
						Process New Order
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
