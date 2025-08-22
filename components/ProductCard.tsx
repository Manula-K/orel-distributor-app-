"use client";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
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

	// Helper functions
	const showToast = (title: string, description: string, variant?: "default" | "destructive") => {
		toast({ title, description, variant });
	};

	const handleQuantityChange = (newQuantity: number) => {
		if (newQuantity < 0) return;

		if (newQuantity > product.stock) {
			showToast("Insufficient stock", `Only ${product.stock} ${product.unit} available in stock.`, "destructive");
			return;
		}

		if (newQuantity === 0) {
			if (cartItem) {
				updateQuantity(product.id, 0);
				showToast("Removed from cart", `${product.name} removed from cart.`);
			}
			return;
		}

		if (cartItem) {
			updateQuantity(product.id, newQuantity);
			showToast("Cart updated", `Quantity updated to ${newQuantity} ${product.unit}.`);
		} else {
			addItem(product, newQuantity);
			showToast("Added to cart", `${newQuantity} ${product.unit} of ${product.name} added to cart.`);
		}
	};

	const handleDecreaseQuantity = () => {
		if (!cartItem || currentQuantity <= 0) return;
		handleQuantityChange(currentQuantity - 1);
	};

	const handleIncreaseQuantity = () => {
		if (cartItem) {
			handleQuantityChange(currentQuantity + 1);
		} else if (product.stock > 0) {
			handleQuantityChange(1);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = parseInt(e.target.value) || 0;
		handleQuantityChange(newValue);
	};

	const isDecreaseDisabled = !cartItem || currentQuantity <= 0;
	const isIncreaseDisabled = cartItem ? currentQuantity >= product.stock : product.stock <= 0;

	return (
		<Card className={cn("group hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full", className)}>
			<CardHeader className="flex-shrink-0">
				<div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: "4 / 4" }}>
					<Image
						src={product.image || "/placeholder-logo.png"}
						alt={product.name}
						fill
						className="object-contain transition-transform duration-300 group-hover:scale-105"
					/>
				</div>
			</CardHeader>

			<CardContent className="px-3 flex-1 flex flex-col">
				<div className="space-y-1.5 flex-1">
					<h3 className="font-semibold text-sm leading-tight line-clamp-1 group-hover:text-primary transition-colors">{product.sku}</h3>
					<p className="text-[10px] text-muted-foreground line-clamp-2 min-h-[1rem]">{product.name}</p>
					<p className="text-sm font-bold text-primary">LKR {product.price.toLocaleString()}</p>
				</div>
			</CardContent>

			<div className="w-full">
				<div className="flex items-center justify-center gap-2">
					<Button variant="outline" size="sm" onClick={handleDecreaseQuantity} disabled={isDecreaseDisabled} className="h-8 w-8">
						<Minus />
					</Button>

					<Input
						type="number"
						value={currentQuantity}
						onChange={handleInputChange}
						min="0"
						max={product.stock}
						className="h-10 w-18 text-center text-xs"
					/>

					<Button variant="outline" size="sm" onClick={handleIncreaseQuantity} disabled={isIncreaseDisabled} className="h-8 w-8">
						<Plus />
					</Button>
				</div>
			</div>
		</Card>
	);
}
