"use client";

import OrderTopBar from "@/components/order-details/OrderTopBar";
import OrderHeader from "@/components/order-details/OrderHeader";
import OrderTimeline from "@/components/order-details/OrderTimeline";
import OrderSummary from "@/components/order-details/OrderSummary";
import OrderItems from "@/components/order-details/OrderItems";
import type { InvoiceData } from "@/types/invoice";

interface OrderDetailsProps {
	invoiceData: InvoiceData;
	loading: boolean;
	onBack: () => void;
	onAcceptOrder: () => void;
}

export default function OrderDetails({ invoiceData, loading, onBack, onAcceptOrder }: OrderDetailsProps) {
	return (
		<>
			<OrderTopBar />
			<div className="pb-32">
				<div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 lg:gap-4">
					{/* Left column: Order Header, Timeline, Summary (Desktop) */}
					<div className="order-1 lg:order-none space-y-3 lg:space-y-4">
						{/* Mobile Order 1: Order Header */}
						<OrderHeader invoiceData={invoiceData} />

						{/* Desktop-only Timeline */}
						<div className="hidden lg:block">
							<OrderTimeline invoiceDate={invoiceData.invoiceDate} />
						</div>

						{/* Desktop-only Summary */}
						<div className="hidden lg:block">
							<OrderSummary invoiceData={invoiceData} />
						</div>
					</div>

					{/* Right column: Order Items (Desktop) */}
					<div className="order-2 lg:order-none">
						<div className="hidden lg:block">
							<OrderItems invoiceData={invoiceData} />
						</div>
					</div>
				</div>

				{/* Mobile-only components container */}
				<div className="block lg:hidden space-y-3">
					{/* Mobile Order 2: Order Items */}
					<div className="order-2">
						<OrderItems invoiceData={invoiceData} />
					</div>

					{/* Mobile Order 3: Summary */}
					<div className="order-3">
						<OrderSummary invoiceData={invoiceData} />
					</div>

					{/* Mobile Order 4: Timeline */}
					<div className="order-4">
						<OrderTimeline invoiceDate={invoiceData.invoiceDate} />
					</div>
				</div>

				{/* Accept Order button moved to header row in app/[id]/page.tsx */}
			</div>
		</>
	);
}
