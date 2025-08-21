"use client";

import { Category } from "@/types/product";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
	categories: Category[];
	selectedCategory: string;
	onCategoryChange: (categoryId: string) => void;
	className?: string;
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange, className }: CategoryFilterProps) {
	return (
		<div className={cn("w-full", className)}>
			<ScrollArea className="w-full">
				<div className="flex gap-2 pb-2">
					<Button
						variant={selectedCategory === "all" ? "default" : "outline"}
						size="sm"
						onClick={() => onCategoryChange("all")}
						className="whitespace-nowrap flex-shrink-0"
					>
						All Products
					</Button>

					{categories.map((category) => (
						<Button
							key={category.id}
							variant={selectedCategory === category.id ? "default" : "outline"}
							size="sm"
							onClick={() => onCategoryChange(category.id)}
							className="whitespace-nowrap flex-shrink-0"
						>
							{category.name}
						</Button>
					))}
				</div>
			</ScrollArea>
		</div>
	);
}
