"use client";

import Image from "next/image";
import TopBar from "@/components/TopBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export default function SettingsPage() {
	return (
		<div className="min-h-screen bg-background">
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
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
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
		</div>
	);
}
