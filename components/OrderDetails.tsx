"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
	Package,
	ChevronLeft,
	RefreshCw,
	CheckCircle,
	Calendar,
	Clock,
	ChevronDown,
	ChevronUp,
	ShoppingBag,
	Warehouse,
	Truck,
	MapPin,
} from "lucide-react";
import type { InvoiceData } from "@/types/invoice";
import { formatCurrency, formatFriendlyDateTime } from "@/lib/format";
import { useState } from "react";

interface OrderDetailsProps {
	invoiceData: InvoiceData;
	loading: boolean;
	onBack: () => void;
	onAcceptOrder: () => void;
}

export default function OrderDetails({ invoiceData, loading, onBack, onAcceptOrder }: OrderDetailsProps) {
	const [itemsExpanded, setItemsExpanded] = useState(true);
	return (
		<div className="space-y-4 pb-32">
			<div className="flex items-center justify-between">
				<Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
					<ChevronLeft className="w-4 h-4" />
					Back to Orders
				</Button>
				<Image src="/logo1.png" alt="Orel Logo" width={60} height={60} />
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
						<span className="text-muted-foreground">Date/Time</span>
						<div className="flex items-center gap-2 text-[11px]">
							<span className="flex items-center gap-1">
								<Calendar className="w-4 h-4 text-muted-foreground" />
								<span className="font-medium">{formatFriendlyDateTime(invoiceData.invoiceDate)}</span>
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
									/>
									<div className="min-w-0 flex-1">
										<div className="flex items-center justify-between gap-2">
											<div className="flex flex-col items-start gap-1 min-w-0">
												<p className="text-sm font-semibold leading-snug truncate">{item.sku}</p>
												<Badge variant="secondary" className="text-[10px]">
													{item.name}
												</Badge>
											</div>
											<Badge variant="outline" className="text-[10px] shrink-0">
												Qty {item.quantity}
											</Badge>
										</div>
										<div className="mt-2 flex items-center justify-between gap-4 text-[10px]">
											<div className="flex items-center gap-1.5">
												<span className="text-muted-foreground ">Unit Price</span>
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

			<Card>
				<CardHeader className="pb-0">
					<div className="flex items-center justify-between">
						<CardTitle className="text-lg flex items-center gap-2">
							<Clock className="w-5 h-5" />
							Timeline
						</CardTitle>
						<Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 border-blue-200">
							<CheckCircle className="w-3 h-3 mr-1" />
							In Progress
						</Badge>
					</div>
				</CardHeader>
				<CardContent className="pt-0">
					<div className="space-y-4">
						{/* Order Confirmed */}
						<div className="flex items-start gap-3">
							<div className="relative">
								<div className="w-8 h-8 rounded-full bg-muted border-2 border-muted-foreground/20 flex items-center justify-center">
									<ShoppingBag className="w-4 h-4 text-muted-foreground" />
								</div>
								<div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-dashed border-l border-muted-foreground/30"></div>
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex items-center justify-between">
									<div>
										<p className="font-semibold text-sm">Order Confirmed</p>
										<p className="text-xs text-muted-foreground">Order placed and confirmed</p>
									</div>
									<span className="text-xs text-muted-foreground">
										{new Date(invoiceData.invoiceDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
									</span>
								</div>
							</div>
						</div>

						{/* Shipping */}
						<div className="flex items-start gap-3">
							<div className="relative">
								<div className="w-8 h-8 rounded-full bg-muted border-2 border-muted-foreground/20 flex items-center justify-center">
									<Warehouse className="w-4 h-4 text-muted-foreground" />
								</div>
								<div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-dashed border-l border-muted-foreground/30"></div>
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex items-center justify-between">
									<div>
										<p className="font-semibold text-sm">Shipping</p>
										<p className="text-xs text-muted-foreground">Order prepared for shipping</p>
									</div>
									<span className="text-xs text-muted-foreground">
										{new Date(invoiceData.invoiceDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
									</span>
								</div>
							</div>
						</div>

						{/* Transit */}
						<div className="flex items-start gap-3">
							<div className="relative">
								<div className="w-8 h-8 rounded-full bg-muted border-2 border-muted-foreground/20 flex items-center justify-center">
									<Truck className="w-4 h-4 text-muted-foreground" />
								</div>
								<div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-dashed border-l border-muted-foreground/30"></div>
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex items-center justify-between">
									<div>
										<p className="font-semibold text-sm">Transit</p>
										<p className="text-xs text-muted-foreground">Order in transit to destination</p>
									</div>
									<span className="text-xs text-muted-foreground">
										{new Date(invoiceData.invoiceDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
									</span>
								</div>
							</div>
						</div>

						{/* Sent to Customer */}
						<div className="flex items-start gap-3">
							<div className="relative">
								<div className="w-8 h-8 rounded-full bg-muted border-2 border-muted-foreground/20 flex items-center justify-center">
									<MapPin className="w-4 h-4 text-muted-foreground" />
								</div>
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex items-center justify-between">
									<div>
										<p className="font-semibold text-sm">Sent to Customer</p>
										<p className="text-xs text-muted-foreground">Order delivered to customer</p>
									</div>
									<span className="text-xs text-muted-foreground">
										{new Date(invoiceData.invoiceDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
									</span>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
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
