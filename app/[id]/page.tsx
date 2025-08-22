"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";
import { ChevronLeft, CheckCircle } from "lucide-react";
import OrderDetailStep from "@/components/order-details/OrderDetails";
import { ORDER_HISTORY } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { OrderDetailsSkeleton } from "@/components/ui/loading-skeleton";

export default function OrderPage() {
	const params = useParams();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [isLoadingOrder, setIsLoadingOrder] = useState(true);

	const orderId = decodeURIComponent(String(params.id ?? ""));

	const invoiceData = useMemo(() => ORDER_HISTORY.find((o) => o.invoiceNumber === orderId) ?? null, [orderId]);

	// Simulate order loading
	useEffect(() => {
		const timer = setTimeout(() => setIsLoadingOrder(false), 600);
		return () => clearTimeout(timer);
	}, []);

	const handleAcceptOrder = async () => {
		setLoading(true);
		await new Promise((r) => setTimeout(r, 1500));
		setLoading(false);
		router.push(`/success?invoice=${encodeURIComponent(invoiceData!.invoiceNumber)}&total=${encodeURIComponent(invoiceData!.orderTotal.toString())}`);
	};

	if (!invoiceData) {
		return (
			<div className="min-h-screen bg-background">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
					<Card>
						<CardHeader>
							<CardTitle>Order not found</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-4">No order exists for id: {orderId}</p>
							<button className="underline text-primary" onClick={() => router.push("/")}>
								Go back
							</button>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background overflow-x-hidden">
			<LoadingOverlay isLoading={isLoadingOrder} text="Loading order details..." spinnerSize="lg">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 overflow-x-hidden">
					<div className="mb-4 flex items-center justify-between">
						<Button variant="ghost" size="sm" onClick={() => router.push("/")} className="flex items-center gap-2">
							<ChevronLeft className="w-4 h-4" />
							Back to Orders
						</Button>
						<LoadingButton
							onClick={handleAcceptOrder}
							loading={loading}
							loadingText="Processing..."
							loadingSpinnerSize="sm"
							loadingSpinnerVariant="white"
							className="px-4 py-2 h-auto text-sm font-semibold bg-green-600 hover:bg-green-700 text-white rounded-md shadow-sm"
						>
							<CheckCircle className="w-4 h-4 mr-2" />
							Accept Order
						</LoadingButton>
					</div>
					<OrderDetailStep invoiceData={invoiceData} loading={loading} onBack={() => router.push("/")} onAcceptOrder={handleAcceptOrder} />
				</div>
			</LoadingOverlay>
		</div>
	);
}
