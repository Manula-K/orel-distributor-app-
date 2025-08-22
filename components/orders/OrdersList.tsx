"use client";

import OrderCard from "./OrderCard";
import EmptyOrders from "./EmptyOrders";
import { OrderCardSkeleton } from "@/components/ui/loading-skeleton";
import type { OrdersListProps } from "./types";

export default function OrdersList({ orders, isLoading = false }: OrdersListProps) {
	if (isLoading) {
		return (
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
				{Array.from({ length: 3 }).map((_, index) => (
					<OrderCardSkeleton key={index} />
				))}
			</div>
		);
	}

	if (orders.length === 0) {
		return <EmptyOrders />;
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
			{orders.map((order) => (
				<OrderCard key={order.invoiceNumber} order={order} />
			))}
		</div>
	);
}
