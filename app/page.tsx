"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MyOrders from "@/components/MyOrders";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { LogOut, Bell, Headset } from "lucide-react";
import { ORDER_HISTORY, MOCK_DISTRIBUTOR } from "@/lib/mock-data";
import type { DistributorProfile, InvoiceData } from "@/types/invoice";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { getUniqueMonthNames, getUniqueYears, splitMonthYear } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

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
			<TopBar
				left={
					<div className="flex items-center gap-3">
						<Image src="/logo1.png" alt="Orel Logo" width={48} height={48} priority />
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
							onClick={() =>
								toast({
									title: "Notifications",
									description: "You're all caught up. No new notifications.",
								})
							}
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
			<LoadingOverlay isLoading={isLoading} text="Loading orders..." spinnerSize="lg">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 overflow-x-hidden">
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
