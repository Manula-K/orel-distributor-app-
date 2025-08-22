import type { DistributorProfile, InvoiceData } from "@/types/invoice";

export interface OrderFiltersProps {
	selectedYear: string;
	setSelectedYear: (v: string) => void;
	selectedMonth: string;
	setSelectedMonth: (v: string) => void;
	selectedStatus: string;
	setSelectedStatus: (v: string) => void;
	uniqueYears: string[];
	uniqueMonthNames: string[];
}

export interface OrderCardProps {
	order: InvoiceData;
}

export interface OrdersListProps {
	orders: InvoiceData[];
	isLoading?: boolean;
}

export interface DistributorProfileProps {
	distributor: DistributorProfile;
}
