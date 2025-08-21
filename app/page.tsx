"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import MyOrders from "@/components/MyOrders";
import TopBar from "@/components/TopBar";
import { ORDER_HISTORY, MOCK_DISTRIBUTOR } from "@/lib/mock-data";
import type { DistributorProfile, InvoiceData } from "@/types/invoice";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { getUniqueMonthNames, getUniqueYears, splitMonthYear } from "@/lib/utils";

export default function HomePage() {
	const router = useRouter();
	const [selectedMonth, setSelectedMonth] = useState("all");
	const [selectedYear, setSelectedYear] = useState("all");
	const [selectedStatus, setSelectedStatus] = useState("all");
	const [keyword, setKeyword] = useState("");
	const [distributor, setDistributor] = useState<DistributorProfile | null>(MOCK_DISTRIBUTOR);
	const [isLoading, setIsLoading] = useState(true);

	const orderHistory: InvoiceData[] = ORDER_HISTORY;

	const filteredOrders = useMemo(() => {
		const trimmedQuery = keyword.trim().toLowerCase();
		return orderHistory.filter((order) => {
			const { year, monthName } = splitMonthYear(order.month);
			const matchesYear = selectedYear === "all" || year === selectedYear;
			const matchesMonth = selectedMonth === "all" || monthName === selectedMonth;
			const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
			const matchesKeyword =
				trimmedQuery.length === 0 ||
				[order.invoiceNumber, order.distributorName, order.period, order.month, ...order.items.flatMap((i) => [i.sku, i.name])]
					.filter(Boolean)
					.map((s) => String(s).toLowerCase())
					.some((s) => s.includes(trimmedQuery));

			return matchesMonth && matchesYear && matchesStatus && matchesKeyword;
		});
	}, [orderHistory, selectedMonth, selectedYear, selectedStatus, keyword]);

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
		<div className="min-h-screen bg-background overflow-x-hidden">
			<TopBar subtitle="Manage your orders" />
			<div className="pt-16" />
			<LoadingOverlay isLoading={isLoading} text="Loading orders..." spinnerSize="lg">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 overflow-x-hidden">
					<MyOrders
						distributor={distributor}
						selectedYear={selectedYear}
						setSelectedYear={(v) => setSelectedYear(v)}
						selectedMonth={selectedMonth}
						setSelectedMonth={(v) => setSelectedMonth(v)}
						selectedStatus={selectedStatus}
						setSelectedStatus={(v) => setSelectedStatus(v)}
						keyword={keyword}
						setKeyword={(v) => setKeyword(v)}
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
