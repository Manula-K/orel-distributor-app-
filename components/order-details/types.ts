import type { InvoiceData } from "@/types/invoice";

export interface OrderHeaderProps {
	invoiceData: InvoiceData;
}

export interface OrderTimelineProps {
	invoiceDate: string;
}

export interface OrderSummaryProps {
	invoiceData: InvoiceData;
}

export interface OrderItemsProps {
	invoiceData: InvoiceData;
}
