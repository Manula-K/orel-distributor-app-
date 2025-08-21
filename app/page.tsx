"use client";

import { useEffect, useMemo, useState } from "react";
import OrdersStep from "@/components/MyOrders";
import { ORDER_HISTORY, MOCK_DISTRIBUTOR } from "@/lib/mock-data";
import type { DistributorProfile, InvoiceData } from "@/types/invoice";

export default function HomePage() {
	const [selectedMonth, setSelectedMonth] = useState("all");
	const [selectedYear, setSelectedYear] = useState("all");
	const [distributor, setDistributor] = useState<DistributorProfile | null>(MOCK_DISTRIBUTOR);

	const orderHistory: InvoiceData[] = ORDER_HISTORY;

	const filteredOrders = useMemo(() => {
		return orderHistory.filter((order) => {
			const orderYear = order.month.split(" ")[1];
			const orderMonthName = order.month.split(" ")[0];
			const matchesYear = selectedYear === "all" || orderYear === selectedYear;
			const matchesMonth = selectedMonth === "all" || orderMonthName === selectedMonth;
			return matchesMonth && matchesYear;
		});
	}, [orderHistory, selectedMonth, selectedYear]);

	const uniqueYears = useMemo(() => Array.from(new Set(orderHistory.map((o) => o.month.split(" ")[1]))), [orderHistory]);
	const uniqueMonthNames = useMemo(
		() =>
			selectedYear === "all"
				? Array.from(new Set(orderHistory.map((o) => o.month.split(" ")[0])))
				: Array.from(new Set(orderHistory.filter((o) => o.month.split(" ")[1] === selectedYear).map((o) => o.month.split(" ")[0]))),
		[selectedYear, orderHistory]
	);

	useEffect(() => {
		if (selectedYear === "all") return;
		const availableMonths = new Set(orderHistory.filter((o) => o.month.split(" ")[1] === selectedYear).map((o) => o.month.split(" ")[0]));
		if (selectedMonth !== "all" && !availableMonths.has(selectedMonth)) setSelectedMonth("all");
	}, [selectedYear]);

	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-md mx-auto px-4 py-6">
				<OrdersStep
					distributor={distributor}
					selectedYear={selectedYear}
					setSelectedYear={(v) => setSelectedYear(v)}
					selectedMonth={selectedMonth}
					setSelectedMonth={(v) => setSelectedMonth(v)}
					uniqueYears={uniqueYears}
					uniqueMonthNames={uniqueMonthNames}
					filteredOrders={filteredOrders}
					onViewOrderDetail={() => {}}
					onLogout={() => {}}
				/>
			</div>
		</div>
	);
}
