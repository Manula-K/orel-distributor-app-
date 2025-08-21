import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { InvoiceData } from "@/types/invoice";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function splitMonthYear(label: string): { monthName: string; year: string } {
	const [monthName, year] = label.split(" ");
	return { monthName, year };
}

export function getUniqueYears(orders: InvoiceData[]): string[] {
	return Array.from(new Set(orders.map((o) => splitMonthYear(o.month).year)));
}

export function getUniqueMonthNames(orders: InvoiceData[], selectedYear: string): string[] {
	if (selectedYear === "all") {
		return Array.from(new Set(orders.map((o) => splitMonthYear(o.month).monthName)));
	}
	return Array.from(new Set(orders.filter((o) => splitMonthYear(o.month).year === selectedYear).map((o) => splitMonthYear(o.month).monthName)));
}
