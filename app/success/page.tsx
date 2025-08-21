"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PartyPopper } from "lucide-react";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

function SuccessPageContent() {
	const router = useRouter();
	const params = useSearchParams();
	const invoice = params.get("invoice");
	const total = params.get("total");
	const [isPageLoading, setIsPageLoading] = useState(true);

	useEffect(() => {
		// Simulate page loading
		const timer = setTimeout(() => setIsPageLoading(false), 300);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="min-h-screen bg-background overflow-x-hidden">
			<LoadingOverlay isLoading={isPageLoading} text="Loading..." spinnerSize="lg">
				<div className="max-w-md mx-auto p-4 py-10">
					<Card className="text-center">
						<CardContent className="pt-8 pb-8">
							<div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
								<PartyPopper className="w-10 h-10 text-green-600" />
							</div>
							<CardTitle className="text-2xl font-bold text-green-600 mb-2">Order Accepted!</CardTitle>
							<CardDescription className="text-base mb-6">
								Your order has been successfully processed and will be prepared for delivery.
							</CardDescription>
							<div className="space-y-3 text-sm text-muted-foreground mb-8">
								{invoice && (
									<p>
										Invoice: <span className="font-medium text-foreground">{invoice}</span>
									</p>
								)}
								{total && (
									<p>
										Total: <span className="font-bold text-lg text-foreground">{total}</span>
									</p>
								)}
							</div>
							<div className="space-y-3">
								<Button onClick={() => router.push("/")} className="w-full" size="lg">
									Back to Orders
								</Button>
								<Button onClick={() => router.push("/auth")} variant="outline" className="w-full" size="lg">
									Process New Order
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</LoadingOverlay>
		</div>
	);
}

export default function SuccessPage() {
	return (
		<Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">Loading…</div>}>
			<SuccessPageContent />
		</Suspense>
	);
}
