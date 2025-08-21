"use client";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronRight, Filter, Package, Calendar, ShoppingCart, Info, Mail, Phone, MapPin, Hash } from "lucide-react";
import type { DistributorProfile, InvoiceData } from "@/types/invoice";
import { formatCurrency, formatFriendlyDateTime } from "@/lib/format";
import { useRouter } from "next/navigation";
import { OrderCardSkeleton } from "@/components/ui/loading-skeleton";

interface MyOrdersProps {
	distributor: DistributorProfile | null;
	selectedYear: string;
	setSelectedYear: (v: string) => void;
	selectedMonth: string;
	setSelectedMonth: (v: string) => void;
	selectedStatus: string;
	setSelectedStatus: (v: string) => void;
	keyword: string;
	setKeyword: (v: string) => void;
	uniqueYears: string[];
	uniqueMonthNames: string[];
	filteredOrders: InvoiceData[];
	isLoading?: boolean;
}

export default function MyOrders({
	distributor,
	selectedYear,
	setSelectedYear,
	selectedMonth,
	setSelectedMonth,
	selectedStatus,
	setSelectedStatus,
	keyword,
	setKeyword,
	uniqueYears,
	uniqueMonthNames,
	filteredOrders,
	isLoading = false,
}: MyOrdersProps) {
	const router = useRouter();
	return (
		<div className="space-y-4 lg:space-y-6">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
				<div className="lg:col-span-2 space-y-4">
					<Card className="gap-3">
						<CardHeader className="px-4 overflow-x-hidden">
							<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
								<CardTitle className="text-sm flex items-center gap-2">
									<Filter className="w-4 h-4" />
									Filter Orders
								</CardTitle>
							</div>
						</CardHeader>
						<CardContent className="pt-0 px-4 space-y-3 overflow-x-hidden">
							<div className="flex flex-wrap items-end gap-3">
								<div className="flex-[2] min-w-[12rem]">
									<Label className="text-[11px] font-medium text-muted-foreground mb-1 block">Search</Label>
									<Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Search orders..." className="h-8 text-sm" />
								</div>
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
								<div className="flex-1 min-w-[8.5rem]">
									<Label className="text-[11px] font-medium text-muted-foreground mb-1 block">Filter by Status</Label>
									<Select value={selectedStatus} onValueChange={(v) => setSelectedStatus(v)}>
										<SelectTrigger size="sm" className="w-full min-w-[8.5rem]">
											<SelectValue placeholder="Status" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">All Status</SelectItem>
											<SelectItem value="current">Current</SelectItem>
											<SelectItem value="completed">Completed</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</CardContent>
					</Card>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
						{isLoading
							? Array.from({ length: 3 }).map((_, index) => <OrderCardSkeleton key={index} />)
							: filteredOrders.map((order) => {
									return (
										<Card
											key={order.invoiceNumber}
											className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.01] ${
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
															{order.status === "current" ? "Replenish Order" : "Completed"}
														</Badge>
														{order.status === "current" && (
															<Badge variant="outline" className="text-[10px] h-5 px-2 text-red-600 border-red-600">
																Action Required
															</Badge>
														)}
													</div>
													<ChevronRight className="w-4 h-4 text-muted-foreground" />
												</div>

												<div className="flex items-end justify-between gap-3">
													<div className="space-y-0.5 min-w-0">
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
				{distributor && (
					<div className="lg:col-span-1">
						<Card className="gap-0">
							<CardHeader className="pb-2 px-4">
								<CardTitle className="text-base flex items-center gap-2">
									<ShoppingCart className="w-4 h-4" />
									{distributor.name}
								</CardTitle>
							</CardHeader>
							<CardContent className="pt-0 px-4">
								<div className="space-y-1">
									<div className="flex items-center justify-between rounded-md bg-muted/30 p-3">
										<div className="flex items-center gap-2">
											<Hash className="w-4 h-4 text-muted-foreground" />
											<p className="text-sm text-muted-foreground">Distributor Code</p>
										</div>
										<p className="font-mono font-medium text-sm">{distributor.code}</p>
									</div>
									<div className="flex items-center justify-between rounded-md bg-muted/30 p-3">
										<div className="flex items-center gap-2">
											<MapPin className="w-4 h-4 text-muted-foreground" />
											<p className="text-sm text-muted-foreground">Region</p>
										</div>
										<p className="font-medium text-sm">{distributor.region}</p>
									</div>
									<div className="flex items-center justify-between rounded-md bg-muted/30 p-3">
										<div className="flex items-center gap-2">
											<Mail className="w-4 h-4 text-muted-foreground" />
											<p className="text-sm text-muted-foreground">Email</p>
										</div>
										<a href={`mailto:${distributor.email}`} className="font-medium text-sm break-all text-primary hover:underline">
											{distributor.email}
										</a>
									</div>
									<div className="flex items-center justify-between rounded-md bg-muted/30 p-3">
										<div className="flex items-center gap-2">
											<Phone className="w-4 h-4 text-muted-foreground" />
											<p className="text-sm text-muted-foreground">Phone</p>
										</div>
										<a href={`tel:${distributor.phone.replace(/\s+/g, "")}`} className="font-medium text-sm text-primary hover:underline">
											{distributor.phone}
										</a>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="gap-0 mt-4">
							<CardHeader className="pb-2 px-4">
								<CardTitle className="text-base flex items-center gap-2">
									<Info className="w-4 h-4" />
									Description
								</CardTitle>
							</CardHeader>
							<CardContent className="pt-0 px-4">
								<p className="text-sm text-muted-foreground">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor tempor incididunt ut labore et dolore magna aliqua.
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor tempor incididunt ut labore et dolore magna
									aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor tempor incididunt ut labore et dolore magna
								</p>
							</CardContent>
						</Card>
					</div>
				)}
			</div>
		</div>
	);
}
