"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";
import { ORDER_STATUS_OPTIONS } from "./constants";
import type { OrderFiltersProps } from "./types";

export default function OrderFilters({
	selectedYear,
	setSelectedYear,
	selectedMonth,
	setSelectedMonth,
	selectedStatus,
	setSelectedStatus,
	uniqueYears,
	uniqueMonthNames,
}: OrderFiltersProps) {
	return (
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
					<div className="flex-1 min-w-[7rem]">
						<Label className="text-[11px] font-medium text-muted-foreground mb-1 block">
							Filter by Year
						</Label>
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
						<Label className="text-[11px] font-medium text-muted-foreground mb-1 block">
							Filter by Month
						</Label>
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
						<Label className="text-[11px] font-medium text-muted-foreground mb-1 block">
							Filter by Status
						</Label>
						<Select value={selectedStatus} onValueChange={(v) => setSelectedStatus(v)}>
							<SelectTrigger size="sm" className="w-full min-w-[8.5rem]">
								<SelectValue placeholder="Status" />
							</SelectTrigger>
							<SelectContent>
								{ORDER_STATUS_OPTIONS.map((option) => (
									<SelectItem key={option.value} value={option.value}>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
