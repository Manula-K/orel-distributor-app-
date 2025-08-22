"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Hash, MapPin, Mail, Phone, ChevronDown, ChevronUp } from "lucide-react";
import type { DistributorProfileProps } from "./types";
import { useState } from "react";

export default function DistributorProfile({ distributor }: DistributorProfileProps) {
	const [isExpanded, setIsExpanded] = useState(true);

	return (
		<Card className="gap-0">
			<CardHeader className="px-4">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base flex items-center gap-2">
						<ShoppingCart className="w-4 h-4" />
						{distributor.name}
					</CardTitle>
					{/* Mobile-only collapse/expand button */}
					<Button
						variant="ghost"
						size="icon"
						aria-label={isExpanded ? "Collapse profile" : "Expand profile"}
						onClick={() => setIsExpanded(!isExpanded)}
						className="lg:hidden shrink-0"
					>
						{isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
					</Button>
				</div>
			</CardHeader>
			{/* Content - always visible on web, collapsible on mobile */}
			<div className={`${isExpanded ? "block" : "hidden"} lg:block`}>
				<CardContent className="pt-0 px-4">
					<div className="space-y-2">
						<div className="flex items-center justify-between rounded-md bg-muted/30 p-3">
							<div className="flex items-center gap-2">
								<Hash className="w-4 h-4 text-muted-foreground" />
								<p className="text-sm text-muted-foreground">Distributor Code</p>
							</div>
							<p className="font-mono font-medium text-sm">{distributor.code}</p>
						</div>

						<div className="flex items-center justify-between rounded-md bg-muted/30 p-3">
							<div className="flex items-center gap-2">
								<MapPin className="w-4 h-4 text-muted-foreground" />
								<p className="text-sm text-muted-foreground">Region</p>
							</div>
							<p className="font-medium text-sm">{distributor.region}</p>
						</div>

						<div className="flex items-center justify-between rounded-md bg-muted/30 p-3">
							<div className="flex items-center gap-2">
								<Mail className="w-4 h-4 text-muted-foreground" />
								<p className="text-sm text-muted-foreground">Email</p>
							</div>
							<a href={`mailto:${distributor.email}`} className="font-medium text-sm break-all text-primary hover:underline">
								{distributor.email}
							</a>
						</div>

						<div className="flex items-center justify-between rounded-md bg-muted/30 p-3">
							<div className="flex items-center gap-2">
								<Phone className="w-4 h-4 text-muted-foreground" />
								<p className="text-sm text-muted-foreground">Phone</p>
							</div>
							<a href={`tel:${distributor.phone.replace(/\s+/g, "")}`} className="font-medium text-sm text-primary hover:underline">
								{distributor.phone}
							</a>
						</div>
					</div>
				</CardContent>
			</div>
		</Card>
	);
}
