"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TopBarProps {
	left?: ReactNode;
	center?: ReactNode;
	right?: ReactNode;
	className?: string;
}

export default function TopBar({ left, center, right, className }: TopBarProps) {
	const [elevated, setElevated] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setElevated(window.scrollY > 0);
		};
		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

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
					<div className="shrink-0 flex items-center gap-2 min-w-0">{left}</div>
					<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
						<div className="pointer-events-auto max-w-full truncate px-2">{center}</div>
					</div>
					<div className="shrink-0 flex items-center gap-2">{right}</div>
				</div>
			</div>
		</div>
	);
}
