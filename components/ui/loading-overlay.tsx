import { cn } from "@/lib/utils";
import { LoadingSpinner } from "./loading-spinner";

interface LoadingOverlayProps {
	isLoading?: boolean;
	text?: string;
	spinnerSize?: "sm" | "md" | "lg" | "xl";
	spinnerVariant?: "default" | "secondary" | "white" | "destructive";
	className?: string;
	children?: React.ReactNode;
}

export function LoadingOverlay({
	isLoading = false,
	text = "Loading...",
	spinnerSize = "lg",
	spinnerVariant = "default",
	className,
	children,
}: LoadingOverlayProps) {
	if (!isLoading) {
		return <>{children}</>;
	}

	return (
		<>
			{children}
			<div className={cn("fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50", className)}>
				<div className="flex flex-col items-center gap-4 p-6 rounded-lg bg-card border shadow-lg">
					<LoadingSpinner size={spinnerSize} variant={spinnerVariant} />
					<p className="text-sm font-medium text-muted-foreground">{text}</p>
				</div>
			</div>
		</>
	);
}

export function FullPageLoading({
	text = "Loading...",
	spinnerSize = "xl",
	spinnerVariant = "default",
	className,
}: Omit<LoadingOverlayProps, "children" | "isLoading">) {
	return (
		<div className="min-h-screen bg-background flex items-center justify-center">
			<div className="flex flex-col items-center gap-6 p-8 rounded-lg">
				<LoadingSpinner size={spinnerSize} variant={spinnerVariant} />
				<p className="text-lg font-medium text-muted-foreground">{text}</p>
			</div>
		</div>
	);
}
