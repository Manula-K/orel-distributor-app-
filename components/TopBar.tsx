"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogOut, Bell, Headset } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";

interface TopBarProps {
	left?: ReactNode;
	center?: ReactNode;
	right?: ReactNode;
	className?: string;
	showDefaultButtons?: boolean;
	subtitle?: string;
}

export default function TopBar({ left, center, right, className, showDefaultButtons = true, subtitle }: TopBarProps) {
	const [elevated, setElevated] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const handleScroll = () => {
			setElevated(window.scrollY > 0);
		};
		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const defaultLeftSide = (
		<div className="flex items-center gap-3">
			<Image src="/logo1.png" alt="Orel Logo" width={48} height={48} priority />
			<div className="leading-tight">
				<p className="text-sm font-semibold">Distributor Portal</p>
				{subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
			</div>
		</div>
	);

	const defaultRightButtons = (
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
	);

	return (
		<div
			className={cn(
				"fixed top-0 left-0 right-0 z-50 overflow-x-hidden",
				// glassy background with blur; full-width bar
				"backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/80",
				elevated ? "border-b border-border/50 shadow-sm" : "border-b border-transparent",
				className
			)}
		>
			<div className="relative h-16 w-full">
				{/* Align content to page container width, bar background stays full width */}
				<div className="w-full h-full max-w-7xl mx-auto flex items-center justify-between gap-2 px-4 sm:px-6 lg:px-8 overflow-hidden">
					<div className="shrink-0 flex items-center gap-2 min-w-0">{left || defaultLeftSide}</div>
					<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
						<div className="pointer-events-auto max-w-full truncate px-2">{center}</div>
					</div>
					<div className="shrink-0 flex items-center gap-2">{right || (showDefaultButtons ? defaultRightButtons : null)}</div>
				</div>
			</div>
		</div>
	);
}
