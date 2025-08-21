"use client";

import { useEffect, useMemo, useState } from "react";
import MyOrders from "@/components/MyOrders";
import { ORDER_HISTORY, MOCK_DISTRIBUTOR } from "@/lib/mock-data";
import type { DistributorProfile, InvoiceData } from "@/types/invoice";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { getUniqueMonthNames, getUniqueYears, splitMonthYear } from "@/lib/utils";

export default function HomePage() {
	const [selectedMonth, setSelectedMonth] = useState("all");
	const [selectedYear, setSelectedYear] = useState("all");
	const [distributor, setDistributor] = useState<DistributorProfile | null>(MOCK_DISTRIBUTOR);
	const [isLoading, setIsLoading] = useState(true);

	const orderHistory: InvoiceData[] = ORDER_HISTORY;

	const filteredOrders = useMemo(() => {
		return orderHistory.filter((order) => {
			const { year, monthName } = splitMonthYear(order.month);
			const matchesYear = selectedYear === "all" || year === selectedYear;
			const matchesMonth = selectedMonth === "all" || monthName === selectedMonth;
			return matchesMonth && matchesYear;
		});
	}, [orderHistory, selectedMonth, selectedYear]);

	const uniqueYears = useMemo(() => getUniqueYears(orderHistory), [orderHistory]);
	const uniqueMonthNames = useMemo(() => getUniqueMonthNames(orderHistory, selectedYear), [orderHistory, selectedYear]);

	useEffect(() => {
		if (selectedYear === "all") return;
		const availableMonths = new Set(
			orderHistory.filter((o) => splitMonthYear(o.month).year === selectedYear).map((o) => splitMonthYear(o.month).monthName)
		);
		if (selectedMonth !== "all" && !availableMonths.has(selectedMonth)) setSelectedMonth("all");
	}, [selectedYear, selectedMonth, orderHistory]);

	useEffect(() => {
		// Simulate initial loading
		const timer = setTimeout(() => setIsLoading(false), 800);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="min-h-screen bg-background">
			<LoadingOverlay isLoading={isLoading} text="Loading orders..." spinnerSize="lg">
				<div className="max-w-md mx-auto px-4 py-6">
					<MyOrders
						distributor={distributor}
						selectedYear={selectedYear}
						setSelectedYear={(v) => setSelectedYear(v)}
						selectedMonth={selectedMonth}
						setSelectedMonth={(v) => setSelectedMonth(v)}
						uniqueYears={uniqueYears}
						uniqueMonthNames={uniqueMonthNames}
						filteredOrders={filteredOrders}
						isLoading={isLoading}
					/>
				</div>
			</LoadingOverlay>
		</div>
	);
}
