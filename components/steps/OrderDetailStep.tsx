"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, ChevronLeft, RefreshCw, CheckCircle } from "lucide-react";
import type { InvoiceData } from "@/types/invoice";
import { formatCurrency, formatFriendlyDateTime } from "@/lib/format";

interface OrderDetailStepProps {
	invoiceData: InvoiceData;
	loading: boolean;
	onBack: () => void;
	onAcceptOrder: () => void;
}

export default function OrderDetailStep({ invoiceData, loading, onBack, onAcceptOrder }: OrderDetailStepProps) {
	return (
		<div className="space-y-4 pb-32">
			<div className="flex items-center justify-between">
				<Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
					<ChevronLeft className="w-4 h-4" />
					Back to Orders
				</Button>
				<Badge variant={invoiceData.status === "current" ? "default" : "secondary"}>
					{invoiceData.status === "current" ? "Current Order" : "Completed"}
				</Badge>
			</div>

			<Card>
				<CardHeader className="pb-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<Image src="/logo1.png" alt="Orel Logo" width={36} height={36} />
							<div>
								<CardTitle className="text-lg">{invoiceData.invoiceNumber}</CardTitle>
								<CardDescription>{invoiceData.distributorName}</CardDescription>
							</div>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">Date & Time</span>
						<span className="font-medium">{formatFriendlyDateTime(invoiceData.invoiceDate)}</span>
					</div>
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">Status</span>
						{invoiceData.status === "current" ? (
							<span className="text-red-600 font-medium">Current Order</span>
						) : (
							<span className="text-green-600 font-medium">Completed</span>
						)}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="pb-3">
					<CardTitle className="text-lg flex items-center gap-2">
						<Package className="w-5 h-5" />
						Order Items ({invoiceData.items.length})
					</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					<div className="divide-y">
						{invoiceData.items.map((item) => (
							<div key={item.id} className="p-4">
								<div className="space-y-3">
									<div className="w-full">
										<h3 className="font-semibold text-sm leading-tight break-words hyphens-auto text-foreground">{item.name}</h3>
										<div className="flex items-center gap-2 mt-1">
											<Badge variant="outline" className="text-xs font-mono px-2 py-0.5">
												{item.sku}
											</Badge>
										</div>
									</div>

									<div className="grid grid-cols-3 gap-3 text-center bg-muted/20 rounded-md p-3">
										<div>
											<p className="text-xs text-muted-foreground font-medium">Unit Price</p>
											<p className="font-bold text-sm mt-0.5">{formatCurrency(item.unitPrice)}</p>
										</div>
										<div>
											<p className="text-xs text-muted-foreground font-medium">Qty</p>
											<p className="font-bold text-sm mt-0.5">{item.quantity.toLocaleString()}</p>
										</div>
										<div>
											<p className="text-xs text-muted-foreground font-medium">Line Total</p>
											<p className="font-bold text-sm text-primary mt-0.5">{formatCurrency(item.lineTotal)}</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardContent className="pt-6">
					<div className="space-y-4">
						<div className="flex justify-between text-base">
							<span className="text-muted-foreground">Subtotal</span>
							<span className="font-medium">{formatCurrency(invoiceData.subtotal)}</span>
						</div>
						<div className="flex justify-between text-base">
							<span className="text-muted-foreground">Discount (30%)</span>
							<span className="text-green-600 font-medium">-{formatCurrency(invoiceData.totalDiscount)}</span>
						</div>
						<div className="border-t pt-4">
							<div className="flex justify-between text-xl font-bold">
								<span>Order Total</span>
								<span className="text-primary">{formatCurrency(invoiceData.orderTotal)}</span>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{invoiceData.status === "current" && (
				<div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/95 to-transparent">
					<div className="max-w-md mx-auto">
						<Button
							onClick={onAcceptOrder}
							disabled={loading}
							className="w-full px-8 py-4 h-auto text-base font-bold bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-xl hover:shadow-green-500/25 transition-all duration-300 rounded-xl"
						>
							{loading ? (
								<>
									<RefreshCw className="w-5 h-5 mr-3 animate-spin" />
									Processing Order...
								</>
							) : (
								<>
									<CheckCircle className="w-5 h-5 mr-3" />
									Accept Order
								</>
							)}
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
