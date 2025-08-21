"use client";
import Image from "next/image";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
	Package,
	ChevronLeft,
	Calendar,
	Clock,
	ChevronDown,
	ChevronUp,
	ShoppingBag,
	ShoppingCart,
	Warehouse,
	Truck,
	MapPin,
	type LucideIcon,
	LogOut,
	Bell,
	Headset,
	Hash,
	FileText,
} from "lucide-react";
import type { InvoiceData } from "@/types/invoice";
import { formatCurrency, formatFriendlyDateTime } from "@/lib/format";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

interface OrderDetailsProps {
	invoiceData: InvoiceData;
	loading: boolean;
	onBack: () => void;
	onAcceptOrder: () => void;
}

export default function OrderDetails({ invoiceData, loading, onBack, onAcceptOrder }: OrderDetailsProps) {
	const router = useRouter();
	const [itemsExpanded, setItemsExpanded] = useState(true);
	const isCurrentOrder = invoiceData.status === "current";
	const itemsCount = invoiceData.items.length;
	const friendlyDateTime = useMemo(() => formatFriendlyDateTime(invoiceData.invoiceDate), [invoiceData.invoiceDate]);
	const dateOnly = useMemo(
		() => new Date(invoiceData.invoiceDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
		[invoiceData.invoiceDate]
	);

	const timelineSteps: { title: string; subtitle: string; Icon: LucideIcon }[] = [
		{ title: "Order Confirmed", subtitle: "Order placed and confirmed", Icon: ShoppingBag },
		{ title: "Shipping", subtitle: "Order prepared for shipping", Icon: Warehouse },
		{ title: "Transit", subtitle: "Order in transit to destination", Icon: Truck },
		{ title: "Sent to Customer", subtitle: "Order delivered to customer", Icon: MapPin },
	];
	return (
		<>
			<TopBar
				left={
					<div className="flex items-center gap-3">
						<Image src="/logo1.png" alt="Orel Logo" width={48} height={48} />
						<div className="leading-tight">
							<p className="text-sm font-semibold">Distributor Portal</p>
							<p className="text-xs text-muted-foreground">Manage your orders</p>
						</div>
					</div>
				}
				right={
					<>
						<Button
							aria-label="Help Center"
							variant="ghost"
							size="sm"
							className="gap-2"
							onClick={() =>
								toast({
									title: "Help Center",
									description: "Need assistance? Email support@orel.com or visit Settings.",
								})
							}
						>
							<Headset className="h-4 w-4" />
							<span className="hidden sm:inline">Help Center</span>
						</Button>
						<Button
							aria-label="Notifications"
							variant="ghost"
							size="sm"
							className="gap-2"
							onClick={() => toast({ title: "Notifications", description: "You're all caught up. No new notifications." })}
						>
							<Bell className="h-4 w-4" />
							<span className="hidden sm:inline">Notifications</span>
						</Button>
						<Button
							aria-label="Logout"
							variant="ghost"
							size="sm"
							className="gap-2"
							onClick={() => {
								toast({ title: "Signed out", description: "You have been logged out." });
								router.push("/auth");
							}}
						>
							<LogOut className="h-4 w-4" />
							<span className="hidden sm:inline">Logout</span>
						</Button>
					</>
				}
			/>
			<div className="pb-32">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
					{/* Left column: all details except items */}
					<div className="space-y-4">
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
											{isCurrentOrder ? "Current Order" : "Completed"}
										</Badge>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-0">
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
					</div>

					{/* Right column: Order Items */}
					<div className="space-y-4">
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
															<span className="text-[10px] text-muted-foreground truncate">{item.name}</span>
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
					</div>
				</div>

				{/* Accept Order button moved to header row in app/[id]/page.tsx */}
			</div>
		</>
	);
}
