"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import TopBar from "@/components/TopBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import DistributorProfile from "@/components/orders/DistributorProfile";
import type { DistributorProfile as DistributorProfileType } from "@/types/invoice";

export default function ProfilePage() {
	const [isLoading, setIsLoading] = useState(true);

	// Mock distributor data
	const mockDistributor: DistributorProfileType = {
		name: "Orel Electronics Distributor",
		code: "OREL-001",
		region: "North Region",
		contactPerson: "John Smith",
		email: "john.smith@orel.com",
		phone: "+1 (555) 123-4567",
	};

	useEffect(() => {
		// Simulate loading time for profile data
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
							<p className="text-xs text-muted-foreground">Profile</p>
						</div>
					</div>
				}
			/>
			<LoadingOverlay isLoading={isLoading} text="Loading profile..." spinnerSize="lg">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 overflow-x-hidden">
					<DistributorProfile distributor={mockDistributor} />
				</div>
			</LoadingOverlay>
		</div>
	);
}
