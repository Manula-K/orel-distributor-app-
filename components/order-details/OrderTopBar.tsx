"use client";

import Image from "next/image";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { Headset, Bell, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function OrderTopBar() {
	const router = useRouter();

	return (
		<TopBar
			left={
				<div className="flex items-center gap-3">
					<Image src="/logo1.png" alt="Orel Logo" width={48} height={48} />
					<div className="leading-tight">
						<p className="text-sm font-semibold">Distributor Portal</p>
						<p className="text-xs text-muted-foreground">Manage your orders</p>
					</div>
				</div>
			}
			right={
				<>
					<Button
						aria-label="Help Center"
						variant="ghost"
						size="sm"
						className="gap-2"
						onClick={() =>
							toast({
								title: "Help Center",
								description: "Need assistance? Email support@orel.com or visit Settings.",
							})
						}
					>
						<Headset className="h-4 w-4" />
						<span className="hidden sm:inline">Help Center</span>
					</Button>
					<Button
						aria-label="Notifications"
						variant="ghost"
						size="sm"
						className="gap-2"
						onClick={() => toast({ title: "Notifications", description: "You're all caught up. No new notifications." })}
					>
						<Bell className="h-4 w-4" />
						<span className="hidden sm:inline">Notifications</span>
					</Button>
					<Button
						aria-label="Logout"
						variant="ghost"
						size="sm"
						className="gap-2"
						onClick={() => {
							toast({ title: "Signed out", description: "You have been logged out." });
							router.push("/auth");
						}}
					>
						<LogOut className="h-4 w-4" />
						<span className="hidden sm:inline">Logout</span>
					</Button>
				</>
			}
		/>
	);
}
