export const formatCurrency = (amount: number) => {
	return `LKR ${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
};

// Format a numeric amount without currency prefix, with fixed 2 decimals and
// thousands separators. Suitable for table cells where currency is shown in headers.
export const formatAmount = (amount: number) => {
	return amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const formatFriendlyDateTime = (iso: string) => {
	const d = new Date(iso);
	const day = d.getDate().toString().padStart(2, "0");
	const month = d.toLocaleDateString("en-GB", { month: "short" });
	const year = d.getFullYear();
	const hours = d.getHours().toString().padStart(2, "0");
	const minutes = d.getMinutes().toString().padStart(2, "0");
	const ampm = d.getHours() >= 12 ? "PM" : "AM";

	return `${day} ${month} ${year} ${hours}.${minutes} ${ampm}`;
};
