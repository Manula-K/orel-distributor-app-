export const formatCurrency = (amount: number) => {
	return `LKR ${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
};

export const formatFriendlyDateTime = (iso: string) => {
	const d = new Date(iso);
	return d.toLocaleString("en-GB", {
		day: "2-digit",
		month: "long",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});
};

// Always enforce Sri Lankan format: "+94" followed by up to 9 digits.
export const normalizeSriLankaPhone = (rawInput: string) => {
	const digitsOnly = rawInput.replace(/\D/g, "");
	let nationalPart = "";
	if (digitsOnly.startsWith("94")) {
		nationalPart = digitsOnly.slice(2);
	} else if (digitsOnly.startsWith("0")) {
		nationalPart = digitsOnly.slice(1);
	} else {
		nationalPart = digitsOnly;
	}
	nationalPart = nationalPart.slice(0, 9);
	return "+94" + nationalPart;
};
