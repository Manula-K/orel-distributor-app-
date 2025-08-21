"use client";

import { useState } from "react";
import TopBar from "@/components/TopBar";
import { useCart } from "@/contexts/CartContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CartPage() {
	const { items, removeItem, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCart();
	const [isCheckingOut, setIsCheckingOut] = useState(false);

	const handleCheckout = () => {
		if (items.length === 0) {
			toast({
				title: "Empty cart",
				description: "Please add some products to your cart before checkout.",
				variant: "destructive",
			});
			return;
		}

		setIsCheckingOut(true);
		// Simulate checkout process
		setTimeout(() => {
			toast({
				title: "Order placed successfully!",
				description: `Your order of LKR ${getTotalPrice().toLocaleString()} has been placed.`,
			});
			clearCart();
			setIsCheckingOut(false);
		}, 2000);
	};

	const handleQuantityChange = (productId: string, newQuantity: number) => {
		if (newQuantity <= 0) {
			removeItem(productId);
			toast({
				title: "Item removed",
				description: "Item has been removed from your cart.",
			});
		} else {
			updateQuantity(productId, newQuantity);
		}
	};

	if (items.length === 0) {
		return (
			<div className="min-h-screen bg-background overflow-x-hidden">
				<TopBar subtitle="Cart" />
				<div className="pt-16" />
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
					<div className="text-center py-12">
						<div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
							<ShoppingCart className="h-8 w-8 text-muted-foreground" />
						</div>
						<h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
						<p className="text-muted-foreground mb-6">Add some products to your cart to get started.</p>
						<Link href="/products">
							<Button>
								<ArrowLeft className="h-4 w-4 mr-2" />
								Continue Shopping
							</Button>
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background overflow-x-hidden">
			<TopBar subtitle="Cart" />
			<div className="pt-16" />
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
					{/* Cart Items */}
					<div className="lg:col-span-2 space-y-4">
						<Card>
							<CardHeader className="pb-0">
								<div className="flex items-center justify-between">
									<CardTitle className="text-base flex items-center gap-2">
										<ShoppingCart className="w-4 h-4" />
										Cart Items ({items.length})
									</CardTitle>
									<Button variant="outline" size="sm" onClick={clearCart} className="bg-background border border-border ">
										<Trash2 className="h-4 w-4 mr-2" />
										Clear Cart
									</Button>
								</div>
							</CardHeader>
							<CardContent className="pt-0">
								{items.map((item, index) => (
									<div key={item.product.id} className={index === 0 ? "pt-0 pb-4" : "py-4"}>
										<div className="flex items-start gap-3">
											<Image
												src={item.product.image || "/placeholder-logo.png"}
												alt={item.product.name}
												width={35}
												height={35}
												className="rounded-md border bg-muted shrink-0"
											/>

											<div className="min-w-0 flex-1">
												<div className="flex items-center justify-between gap-2">
													<div className="flex flex-col items-start gap-1 min-w-0">
														<p className="text-sm font-semibold leading-snug truncate">{item.product.sku}</p>
														<span className="text-[10px] text-muted-foreground whitespace-normal break-words">{item.product.name}</span>
													</div>
													<div className="flex items-center gap-2">
														<Button
															variant="outline"
															size="sm"
															onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
															disabled={item.quantity <= 1}
															className="h-8 w-8"
														>
															<Minus className="h-4 w-4" />
														</Button>
														<Input
															type="number"
															value={item.quantity}
															onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value) || 0)}
															min="0"
															max={item.product.stock}
															className="h-10 w-18 text-center text-xs"
														/>
														<Button
															variant="outline"
															size="sm"
															onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
															disabled={item.quantity >= item.product.stock}
															className="h-8 w-8"
														>
															<Plus className="h-4 w-4" />
														</Button>
													</div>
												</div>
												<div className="mt-2 flex items-center justify-between gap-4 text-[10px]">
													<div className="flex items-center gap-1.5">
														<span className="text-muted-foreground">Unit Price</span>
														<span className="font-bold text-primary">LKR {item.product.price.toLocaleString()}</span>
													</div>
													<div className="flex items-center gap-1.5">
														<span className="text-muted-foreground">Total</span>
														<span className="font-medium">LKR {(item.product.price * item.quantity).toLocaleString()}</span>
													</div>
												</div>
											</div>
										</div>
										{index < items.length - 1 && (
											<Separator className="mx-0 my-2 h-[1.5px] bg-gradient-to-r from-transparent via-border/70 to-transparent rounded-full" />
										)}
									</div>
								))}
							</CardContent>
						</Card>
					</div>

					{/* Order Summary */}
					<div className="lg:col-span-2">
						<Card>
							<CardHeader className="pb-0">
								<CardTitle className="text-base flex items-center gap-2">
									<ShoppingCart className="w-4 h-4" />
									Order Summary
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									{items.map((item) => (
										<div key={item.product.id} className="flex justify-between text-sm">
											<span className="truncate flex-1">
												{item.product.name} × {item.quantity}
											</span>
											<span className="font-medium">LKR {(item.product.price * item.quantity).toLocaleString()}</span>
										</div>
									))}
								</div>

								<Separator />

								<div className="space-y-2">
									<div className="flex justify-between text-sm">
										<span>Subtotal</span>
										<span>LKR {getTotalPrice().toLocaleString()}</span>
									</div>
									<div className="flex justify-between text-sm">
										<span>Discount</span>
										<span className="text-green-600">-LKR {(getTotalPrice() * 0.1).toLocaleString()}</span>
									</div>
									<Separator />
									<div className="flex justify-between font-semibold">
										<span>Total</span>
										<span className="text-primary text-lg">LKR {(getTotalPrice() * 0.9).toLocaleString()}</span>
									</div>
								</div>

								<Button onClick={handleCheckout} disabled={isCheckingOut} className="w-full" size="lg">
									{isCheckingOut ? (
										<>
											<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
											Processing...
										</>
									) : (
										<>
											<ShoppingCart className="h-4 w-4 mr-2" />
											Proceed to Checkout
										</>
									)}
								</Button>

								<Link href="/products">
									<Button variant="outline" className="w-full">
										<ArrowLeft className="h-4 w-4 mr-2" />
										Continue Shopping
									</Button>
								</Link>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
