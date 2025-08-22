export const ORDER_STATUS_OPTIONS = [
	{ value: "all", label: "All Status" },
	{ value: "current", label: "Current" },
	{ value: "completed", label: "Completed" },
] as const;

export const ORDER_STATUS_LABELS = {
	current: "Replenish Order",
	completed: "Completed",
} as const;

export const ORDER_STATUS_BADGE_VARIANTS = {
	current: "default",
	completed: "outline",
} as const;

export const ORDER_STATUS_BADGE_STYLES = {
	current: "",
	completed: "text-green-600 border-green-600",
} as const;
