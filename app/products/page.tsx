"use client";

import { useState, useMemo } from "react";
import TopBar from "@/components/TopBar";
import { ProductCard } from "@/components/ProductCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProductSearch } from "@/components/ProductSearch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, Package } from "lucide-react";
import { CATEGORIES, PRODUCTS, getProductsByCategory, searchProducts } from "@/lib/product-data";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

// view mode removed

export default function ProductsPage() {
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");
	const { getTotalItems, getTotalPrice } = useCart();

	// Filter products based on category and search
	const filteredProducts = useMemo(() => {
		let products = PRODUCTS;

		// Filter by category
		if (selectedCategory !== "all") {
			products = getProductsByCategory(selectedCategory);
		}

		// Filter by search query
		if (searchQuery.trim()) {
			products = searchProducts(searchQuery);
		}

		return products;
	}, [selectedCategory, searchQuery]);

	const selectedCategoryData = CATEGORIES.find((cat) => cat.id === selectedCategory);

	return (
		<div className="min-h-screen bg-background overflow-x-hidden">
			<TopBar subtitle="Products" />
			<div className="pt-16" />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
				{/* Category Filter */}
				<div className="mb-2">
					<CategoryFilter categories={CATEGORIES} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
				</div>

				<ProductSearch onSearch={setSearchQuery} className="mb-4" />

				{/* Products Grid */}
				{filteredProducts.length > 0 ? (
					<div className={cn("grid gap-3", "grid-cols-2 sm:grid-cols-2 lg:grid-cols-5")}>
						{filteredProducts.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				) : (
					<div className="text-center py-12">
						<div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
							<Package className="h-8 w-8 text-muted-foreground" />
						</div>
						<h3 className="text-lg font-semibold mb-2">No products found</h3>
						<p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
						<Button
							variant="outline"
							onClick={() => {
								setSelectedCategory("all");
								setSearchQuery("");
							}}
						>
							Clear all filters
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
