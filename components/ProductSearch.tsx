"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductSearchProps {
	onSearch: (query: string) => void;
	placeholder?: string;
	className?: string;
}

export function ProductSearch({ onSearch, placeholder = "Search products by name, SKU, or description...", className }: ProductSearchProps) {
	const [query, setQuery] = useState("");

	useEffect(() => {
		const timer = setTimeout(() => {
			onSearch(query);
		}, 300);

		return () => clearTimeout(timer);
	}, [query, onSearch]);

	const handleClear = () => {
		setQuery("");
		onSearch("");
	};

	return (
		<div className={cn("relative w-full", className)}>
			<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
			<Input type="text" placeholder={placeholder} value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10 pr-10" />
			{query && (
				<Button
					variant="ghost"
					size="sm"
					onClick={handleClear}
					className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted"
				>
					<X className="h-3 w-3" />
				</Button>
			)}
		</div>
	);
}
