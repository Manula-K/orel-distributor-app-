"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronRight, Filter, LogOut, Package, Calendar, Clock } from "lucide-react";
import type { DistributorProfile, InvoiceData } from "@/types/invoice";
import { formatCurrency } from "@/lib/format";
import { useRouter } from "next/navigation";

interface OrdersStepProps {
	distributor: DistributorProfile | null;
	selectedYear: string;
	setSelectedYear: (v: string) => void;
	selectedMonth: string;
	setSelectedMonth: (v: string) => void;
	uniqueYears: string[];
	uniqueMonthNames: string[];
	filteredOrders: InvoiceData[];
	onViewOrderDetail: (order: InvoiceData) => void;
	onLogout: () => void;
}

export default function OrdersStep({
	distributor,
	selectedYear,
	setSelectedYear,
	selectedMonth,
	setSelectedMonth,
	uniqueYears,
	uniqueMonthNames,
	filteredOrders,
	onViewOrderDetail,
	onLogout,
}: OrdersStepProps) {
	const router = useRouter();
	return (
		<div className="space-y-4">
			<div className="flex flex-wrap items-center justify-between gap-2">
				<div className="flex items-center gap-3">
					<Image src="/logo1.png" alt="Orel Logo" width={60} height={60} priority />
					<div className="text-left">
						<h2 className="text-lg font-bold">Distributor Portal</h2>
						<p className="text-sm text-muted-foreground">Manage your orders</p>
					</div>
				</div>
				<Button aria-label="Logout" variant="ghost" size="sm" className="gap-2" onClick={onLogout}>
					<LogOut className="h-4 w-4" />
					Logout
				</Button>
			</div>

			{distributor && (
				<Card className="gap-0">
					<CardHeader className="pb-1">
						<CardTitle className="text-base">{distributor.name}</CardTitle>
					</CardHeader>
					<CardContent className="pt-0">
						<Accordion type="single" collapsible>
							<AccordionItem value="dist-details">
								<AccordionTrigger className="px-0 py-1 text-sm">View more details</AccordionTrigger>
								<AccordionContent className="px-0">
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
										<div className="rounded-lg bg-muted/30 p-3">
											<p className="text-[11px] text-muted-foreground">Distributor Code</p>
											<p className="font-mono font-medium">{distributor.code}</p>
										</div>
										<div className="rounded-lg bg-muted/30 p-3">
											<p className="text-[11px] text-muted-foreground">Region</p>
											<p className="font-medium">{distributor.region}</p>
										</div>
										<div className="rounded-lg bg-muted/30 p-3">
											<p className="text-[11px] text-muted-foreground">Email</p>
											<a href={`mailto:${distributor.email}`} className="font-medium break-all text-primary hover:underline">
												{distributor.email}
											</a>
										</div>
										<div className="rounded-lg bg-muted/30 p-3">
											<p className="text-[11px] text-muted-foreground">Phone</p>
											<a href={`tel:${distributor.phone.replace(/\s+/g, "")}`} className="font-medium text-primary hover:underline">
												{distributor.phone}
											</a>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardContent>
				</Card>
			)}

			<Card className="gap-3">
				<CardHeader>
					<CardTitle className="text-sm flex items-center gap-2">
						<Filter className="w-4 h-4" />
						Filter Orders
					</CardTitle>
				</CardHeader>
				<CardContent className="pt-0 space-y-3">
					<div className="flex flex-wrap items-end gap-3">
						<div className="flex-1 min-w-[7rem]">
							<Label className="text-[11px] font-medium text-muted-foreground mb-1 block">Filter by Year</Label>
							<Select value={selectedYear} onValueChange={(v) => setSelectedYear(v)}>
								<SelectTrigger size="sm" className="w-full min-w-[7rem]">
									<SelectValue placeholder="Year" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Years</SelectItem>
									{uniqueYears.map((year) => (
										<SelectItem key={year} value={year}>
											{year}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="flex-1 min-w-[8.5rem]">
							<Label className="text-[11px] font-medium text-muted-foreground mb-1 block">Filter by Month</Label>
							<Select value={selectedMonth} onValueChange={(v) => setSelectedMonth(v)}>
								<SelectTrigger size="sm" className="w-full min-w-[8.5rem]">
									<SelectValue placeholder="Month" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Months</SelectItem>
									{uniqueMonthNames.map((monthName) => (
										<SelectItem key={monthName} value={monthName}>
											{monthName}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="space-y-3">
				{filteredOrders.map((order) => {
					const dateObject = new Date(order.invoiceDate);
					const formattedDate = dateObject.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
					const formattedTime = dateObject.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: true }).toLowerCase();
					return (
						<Card
							key={order.invoiceNumber}
							className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${
								order.status === "current" ? "border-red-500/30 bg-red-50/30" : "hover:border-primary/50"
							}`}
							onClick={() => router.push(`/${encodeURIComponent(order.invoiceNumber)}`)}
						>
							<CardContent>
								<div className="flex items-center justify-between mb-1.5">
									<div className="flex items-center gap-1.5">
										<Badge
											variant={order.status === "current" ? "default" : "outline"}
											className={`text-[10px] h-5 px-2 ${order.status === "current" ? "" : "text-green-600 border-green-600"}`}
										>
											{order.status === "current" ? "Current Order" : "Completed"}
										</Badge>
										{order.status === "current" && (
											<Badge variant="outline" className="text-[10px] h-5 px-2 text-red-600 border-red-600">
												Action Required
											</Badge>
										)}
									</div>
									<ChevronRight className="w-4 h-4 text-muted-foreground" />
								</div>

								<div className="flex items-end justify-between">
									<div className="space-y-0.5">
										<p className="font-semibold text-[13px] leading-tight">{order.invoiceNumber}</p>
										<div className="flex items-center gap-3 text-[11px] text-muted-foreground">
											<span className="flex items-center gap-1">
												<Calendar className="w-3.5 h-3.5" />
												<span>{formattedDate}</span>
											</span>
											<span className="flex items-center gap-1">
												<Clock className="w-3.5 h-3.5" />
												<span>{formattedTime}</span>
											</span>
										</div>
									</div>
									<div className="text-right">
										<p className="font-bold text-sm leading-tight">{formatCurrency(order.orderTotal)}</p>
										<p className="text-[11px] text-muted-foreground">{order.items.length} items</p>
									</div>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{filteredOrders.length === 0 && (
				<Card>
					<CardContent className="text-center py-8">
						<Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
						<p className="text-muted-foreground">No orders found</p>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
