export interface InvoiceItem {
	id: string;
	sku: string;
	name: string;
	quantity: number;
	unitPrice: number;
	lineTotal: number;
}

export interface InvoiceData {
	invoiceNumber: string;
	distributorName: string;
	invoiceDate: string;
	month: string;
	period: string;
	items: InvoiceItem[];
	subtotal: number;
	totalDiscount: number;
	orderTotal: number;
	status: "current" | "completed";
}

export interface DistributorProfile {
	name: string;
	code: string;
	region: string;
	contactPerson: string;
	email: string;
	phone: string;
}
