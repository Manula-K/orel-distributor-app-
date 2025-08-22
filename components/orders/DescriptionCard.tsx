"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export default function DescriptionCard() {
	return (
		<Card className="gap-0">
			<CardHeader className="pb-2 px-4">
				<CardTitle className="text-base flex items-center gap-2">
					<Info className="w-4 h-4" />
					Description
				</CardTitle>
			</CardHeader>
			<CardContent className="pt-0 px-4">
				<p className="text-sm text-muted-foreground">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
					dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</p>
			</CardContent>
		</Card>
	);
}
