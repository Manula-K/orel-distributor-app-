"use client";

import OrderFilters from "@/components/orders/OrderFilters";
import OrdersList from "@/components/orders/OrdersList";
import DistributorProfile from "@/components/orders/DistributorProfile";
import DescriptionCard from "@/components/orders/DescriptionCard";
import type { DistributorProfile as DistributorProfileType, InvoiceData } from "@/types/invoice";

interface MyOrdersProps {
	distributor: DistributorProfileType | null;
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
	uniqueYears,
	uniqueMonthNames,
	filteredOrders,
	isLoading = false,
}: MyOrdersProps) {
	return (
		<div className="space-y-6">
			<div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
				{/* Mobile Order 1 & Desktop: Filters and Orders */}
				<div className="order-1 lg:order-none lg:col-span-2 space-y-6">
					{/* Mobile Order 1: Filter Card */}
					<OrderFilters
						selectedYear={selectedYear}
						setSelectedYear={setSelectedYear}
						selectedMonth={selectedMonth}
						setSelectedMonth={setSelectedMonth}
						selectedStatus={selectedStatus}
						setSelectedStatus={setSelectedStatus}
						uniqueYears={uniqueYears}
						uniqueMonthNames={uniqueMonthNames}
					/>

					{/* Mobile Order 2: Order List */}
					<OrdersList orders={filteredOrders} isLoading={isLoading} />
				</div>

				{/* Desktop Sidebar - Distributor Profile (hidden on mobile) */}
				{distributor && (
					<div className="hidden lg:block lg:col-span-1 space-y-4">
						<DistributorProfile distributor={distributor} />
						<DescriptionCard />
					</div>
				)}

				{/* Mobile Order 3: Description Card (only on mobile) */}
				<div className="block lg:hidden order-3">
					<DescriptionCard />
				</div>
			</div>
		</div>
	);
}
