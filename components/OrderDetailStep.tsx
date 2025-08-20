"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, ChevronLeft, RefreshCw, CheckCircle, Calendar, Clock, ChevronDown, ChevronUp } from "lucide-react";
import type { InvoiceData } from "@/types/invoice";
import { formatCurrency } from "@/lib/format";
import { useState } from "react";

interface OrderDetailStepProps {
	invoiceData: InvoiceData;
	loading: boolean;
	onBack: () => void;
	onAcceptOrder: () => void;
}

export default function OrderDetailStep({ invoiceData, loading, onBack, onAcceptOrder }: OrderDetailStepProps) {
	const dateObject = new Date(invoiceData.invoiceDate);
	const formattedDate = dateObject.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
	const formattedTime = dateObject.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: true }).toLowerCase();
	const [itemsExpanded, setItemsExpanded] = useState(true);
	return (
		<div className="space-y-4 pb-32">
			<div className="flex items-center justify-between">
				<Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
					<ChevronLeft className="w-4 h-4" />
					Back to Orders
				</Button>
				<Image src="/logo1.png" alt="Orel Logo" width={70} height={70} />
			</div>

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="text-lg">{invoiceData.invoiceNumber}</CardTitle>
							<CardDescription>{invoiceData.distributorName}</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">Date & Time</span>
						<div className="flex items-center gap-3">
							<span className="flex items-center gap-1">
								<Calendar className="w-4 h-4 text-muted-foreground" />
								<span className="font-medium">{formattedDate}</span>
							</span>
							<span className="flex items-center gap-1">
								<Clock className="w-4 h-4 text-muted-foreground" />
								<span className="font-medium">{formattedTime}</span>
							</span>
						</div>
					</div>
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">Status</span>
						{invoiceData.status === "current" ? (
							<Badge variant="default">Current Order</Badge>
						) : (
							<span className="text-green-600 font-medium">Completed</span>
						)}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="pb-0">
					<div className="flex items-center justify-between">
						<CardTitle className="text-lg flex items-center gap-2 ">
							<Package className="w-5 h-5" />
							Order Items ({invoiceData.items.length})
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
									/>cls
									<div className="min-w-0 flex-1">
										<p className="text-sm font-semibold leading-snug truncate">{item.name}</p>
										<div className="mt-1">
											<Badge variant="secondary" className="text-[13px]">
												{formatCurrency(item.lineTotal)}
											</Badge>
										</div>
										<div className="mt-2 flex items-center gap-7 text-xs">
											<div className="flex items-center gap-1.5">
												<span className="text-muted-foreground">SKU</span>
												<span className="font-bold text-primary">{item.sku}</span>
											</div>
											<div className="flex items-center gap-1.5">
												<span className="text-muted-foreground">Unit</span>
												<span className="font-medium">{formatCurrency(item.unitPrice)}</span>
											</div>
											<div className="flex items-center gap-1.5">
												<span className="text-muted-foreground">Qty</span>
												<span className="font-medium">{item.quantity}</span>
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

			<Card>
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
