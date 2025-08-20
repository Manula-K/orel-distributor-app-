"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import OrderDetailStep from "@/components/OrderDetailStep";
import { ORDER_HISTORY } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrderPage() {
	const params = useParams();
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const orderId = decodeURIComponent(String(params.id ?? ""));

	const invoiceData = useMemo(() => ORDER_HISTORY.find((o) => o.invoiceNumber === orderId) ?? null, [orderId]);

	if (!invoiceData) {
		return (
			<div className="min-h-screen bg-background">
				<div className="max-w-md mx-auto p-4 py-10">
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
		<div className="min-h-screen bg-background">
			<div className="max-w-md mx-auto p-4 py-6">
				<OrderDetailStep
					invoiceData={invoiceData}
					loading={loading}
					onBack={() => router.push("/")}
					onAcceptOrder={async () => {
						setLoading(true);
						await new Promise((r) => setTimeout(r, 1500));
						setLoading(false);
						router.push(
							`/success?invoice=${encodeURIComponent(invoiceData.invoiceNumber)}&total=${encodeURIComponent(invoiceData.orderTotal.toString())}`
						);
					}}
				/>
			</div>
		</div>
	);
}
