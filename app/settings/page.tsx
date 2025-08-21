"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import TopBar from "@/components/TopBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

export default function SettingsPage() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Simulate loading time for settings data
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 800);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="min-h-screen bg-background overflow-x-hidden">
			<TopBar
				left={
					<div className="flex items-center gap-3">
						<Image src="/logo1.png" alt="Orel Logo" width={40} height={40} />
						<div className="leading-tight">
							<p className="text-sm font-semibold">Distributor Portal</p>
							<p className="text-xs text-muted-foreground">Settings</p>
						</div>
					</div>
				}
			/>
			<LoadingOverlay isLoading={isLoading} text="Loading settings..." spinnerSize="lg">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 overflow-x-hidden">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-lg">
								<Settings className="w-5 h-5" />
								Preferences
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4 text-sm text-muted-foreground">
							<p>This is a placeholder settings page. Add your preferences and profile controls here.</p>
							<Button size="sm" onClick={() => alert("Implement settings flow")}>
								Save Changes
							</Button>
						</CardContent>
					</Card>
				</div>
			</LoadingOverlay>
		</div>
	);
}
