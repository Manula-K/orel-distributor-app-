"use client";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductCardProps {
	product: Product;
	className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
	const { addItem, items, updateQuantity } = useCart();

	const cartItem = items.find((item) => item.product.id === product.id);
	const currentQuantity = cartItem?.quantity || 0;

	const handleUpdateCartQuantity = (newQuantity: number) => {
		if (newQuantity <= 0) {
			updateQuantity(product.id, 0);
			toast({
				title: "Removed from cart",
				description: `${product.name} removed from cart.`,
			});
		} else if (newQuantity > product.stock) {
			toast({
				title: "Insufficient stock",
				description: `Only ${product.stock} ${product.unit} available in stock.`,
				variant: "destructive",
			});
		} else {
			updateQuantity(product.id, newQuantity);
			toast({
				title: "Cart updated",
				description: `Quantity updated to ${newQuantity} ${product.unit}.`,
			});
		}
	};

	return (
		<Card className={cn("group hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full", className)}>
			<CardHeader className="p-2 pb-1 flex-shrink-0">
				<div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: "4 / 3" }}>
					<Image
						src={product.image || "/placeholder-logo.png"}
						alt={product.name}
						fill
						className="object-contain transition-transform duration-300 group-hover:scale-105"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
					{/* Stock tag removed as requested */}
				</div>
			</CardHeader>

			<CardContent className="px-3 space-y-1.5 flex-1 flex flex-col">
				<div className="space-y-1.5 flex-1">
					{/* Show SKU like title */}
					<h3 className="font-semibold text-sm leading-tight line-clamp-1 group-hover:text-primary transition-colors">{product.sku}</h3>
					{/* Show product name as muted sub description (two lines with ellipsis) */}
					<p className="text-xs text-muted-foreground line-clamp-2 min-h-[2rem]">{product.name}</p>
					<p className="text-md font-bold text-primary">LKR {product.price.toLocaleString()}</p>
				</div>
			</CardContent>

			<div className="w-full">
				<div className="flex items-center justify-center gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => {
							if (!cartItem) return;
							handleUpdateCartQuantity(currentQuantity - 1);
						}}
						disabled={!cartItem || currentQuantity <= 0}
						className="h-8 w-8"
					>
						<Minus />
					</Button>
					<Input
						type="number"
						value={currentQuantity}
						onChange={(e) => {
							const newValue = parseInt(e.target.value) || 0;
							if (newValue < 0) return;
							if (newValue > product.stock) {
								toast({
									title: "Insufficient stock",
									description: `Only ${product.stock} ${product.unit} available in stock.`,
									variant: "destructive",
								});
								return;
							}
							if (newValue === 0) {
								if (cartItem) {
									updateQuantity(product.id, 0);
								}
								return;
							}
							if (cartItem) {
								updateQuantity(product.id, newValue);
							} else {
								addItem(product, newValue);
								toast({
									title: "Added to cart",
									description: `${newValue} ${product.unit} of ${product.name} added to cart.`,
								});
							}
						}}
						min="0"
						max={product.stock}
						className="h-10 w-18 text-center text-xs"
					/>
					<Button
						variant="outline"
						size="sm"
						onClick={() => {
							if (cartItem) {
								handleUpdateCartQuantity(currentQuantity + 1);
							} else {
								if (product.stock <= 0) return;
								addItem(product, 1);
								toast({
									title: "Added to cart",
									description: `1 ${product.unit} of ${product.name} added to cart.`,
								});
							}
						}}
						disabled={cartItem ? currentQuantity >= product.stock : product.stock <= 0}
						className="h-8 w-8"
					>
						<Plus />
					</Button>
				</div>
			</div>
		</Card>
	);
}
