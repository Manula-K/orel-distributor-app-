"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import PhoneStep from "@/components/steps/PhoneStep";
import OtpStep from "@/components/steps/OtpStep";
import OrdersStep from "@/components/steps/OrdersStep";
import OrderDetailStep from "@/components/steps/OrderDetailStep";
import SuccessStep from "@/components/steps/SuccessStep";
import { normalizeSriLankaPhone } from "@/lib/format";
import { ORDER_HISTORY, MOCK_DISTRIBUTOR } from "@/lib/mock-data";
import type { DistributorProfile, InvoiceData } from "@/types/invoice";

type AppStep = "phone" | "otp" | "orders" | "orderDetail" | "success";

export default function OrelDistributorApp() {
	const [currentStep, setCurrentStep] = useState<AppStep>("phone");
	const [phoneNumber, setPhoneNumber] = useState("+94");
	const [otp, setOtp] = useState(["", "", "", ""]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [otpAttempts, setOtpAttempts] = useState(0);
	const [countdown, setCountdown] = useState(0);
	const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
	const [selectedMonth, setSelectedMonth] = useState("all");
	const [selectedYear, setSelectedYear] = useState("all");
	const [distributor, setDistributor] = useState<DistributorProfile | null>(null);

	// local refs managed within OtpStep after refactor

	const orderHistory: InvoiceData[] = ORDER_HISTORY;

	const filteredOrders = orderHistory.filter((order) => {
		const orderYear = order.month.split(" ")[1];
		const orderMonthName = order.month.split(" ")[0];
		const matchesYear = selectedYear === "all" || orderYear === selectedYear;
		const matchesMonth = selectedMonth === "all" || orderMonthName === selectedMonth;
		return matchesMonth && matchesYear;
	});

	const uniqueYears = Array.from(new Set(orderHistory.map((order) => order.month.split(" ")[1])));
	const uniqueMonthNames =
		selectedYear === "all"
			? Array.from(new Set(orderHistory.map((order) => order.month.split(" ")[0])))
			: Array.from(new Set(orderHistory.filter((order) => order.month.split(" ")[1] === selectedYear).map((order) => order.month.split(" ")[0])));

	useEffect(() => {
		if (countdown > 0) {
			const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
			return () => clearTimeout(timer);
		}
	}, [countdown]);

	useEffect(() => {
		if (selectedYear === "all") return;
		const availableMonths = new Set(orderHistory.filter((o) => o.month.split(" ")[1] === selectedYear).map((o) => o.month.split(" ")[0]));
		if (selectedMonth !== "all" && !availableMonths.has(selectedMonth)) {
			setSelectedMonth("all");
		}
	}, [selectedYear]);

	const sendOTP = async () => {
		setLoading(true);
		setError("");

		const phoneRegex = /^\+94[0-9]{9}$/;
		if (!phoneRegex.test(phoneNumber)) {
			setError("Please enter a valid Sri Lankan phone number (+94XXXXXXXXX)");
			setLoading(false);
			return;
		}

		await new Promise((resolve) => setTimeout(resolve, 1500));

		setLoading(false);
		setCurrentStep("otp");
		setCountdown(60);
		setOtpAttempts(0);
	};

	const verifyOTP = async () => {
		setLoading(true);
		setError("");

		const otpString = otp.join("");
		if (otpString.length !== 4) {
			setError("Please enter a 4-digit OTP");
			setLoading(false);
			return;
		}

		await new Promise((resolve) => setTimeout(resolve, 1500));

		if (otpString === "1234" || otpString.length === 4) {
			setDistributor(MOCK_DISTRIBUTOR);
			setCurrentStep("orders");
		} else {
			setOtpAttempts((prev) => prev + 1);
			if (otpAttempts >= 2) {
				setError("Maximum attempts reached. Please request a new OTP.");
				setCurrentStep("phone");
				setOtp(["", "", "", ""]);
				setOtpAttempts(0);
			} else {
				setError(`Invalid OTP. ${2 - otpAttempts} attempts remaining.`);
			}
		}

		setLoading(false);
	};

	const resendOTP = () => {
		setCountdown(60);
		setOtpAttempts(0);
		setError("");
		setOtp(["", "", "", ""]);
	};

	const acceptOrder = async () => {
		setLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 2000));
		setCurrentStep("success");
		setLoading(false);
	};

	const viewOrderDetail = (order: InvoiceData) => {
		setInvoiceData(order);
		setCurrentStep("orderDetail");
	};

	const handleOtpChange = (index: number, value: string) => {
		if (value.length > 1) return;

		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);
	};

	const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {};

	const logout = () => {
		setCurrentStep("phone");
		setPhoneNumber("+94");
		setOtp(["", "", "", ""]);
		setError("");
		setOtpAttempts(0);
		setCountdown(0);
		setInvoiceData(null);
		setDistributor(null);
		setSelectedYear("all");
		setSelectedMonth("all");
	};

	return (
		<div className={`min-h-screen bg-background ${currentStep === "phone" || currentStep === "otp" ? "flex items-center justify-center" : ""}`}>
			<div className={`w-full max-w-md mx-auto px-4 ${currentStep === "phone" || currentStep === "otp" ? "space-y-6" : "py-6 space-y-6"}`}>
				{currentStep === "phone" && (
					<PhoneStep
						phoneNumber={phoneNumber}
						onPhoneChange={(value) => setPhoneNumber(normalizeSriLankaPhone(value))}
						error={error}
						loading={loading}
						onSendOTP={sendOTP}
					/>
				)}

				{currentStep === "otp" && (
					<OtpStep
						phoneNumber={phoneNumber}
						otp={otp}
						error={error}
						loading={loading}
						otpAttempts={otpAttempts}
						countdown={countdown}
						onVerify={verifyOTP}
						onResend={resendOTP}
						onBack={() => setCurrentStep("phone")}
						onOtpChange={(index, value) => handleOtpChange(index, value)}
					/>
				)}

				{currentStep === "orders" && (
					<OrdersStep
						distributor={distributor}
						selectedYear={selectedYear}
						setSelectedYear={(v) => setSelectedYear(v)}
						selectedMonth={selectedMonth}
						setSelectedMonth={(v) => setSelectedMonth(v)}
						uniqueYears={uniqueYears}
						uniqueMonthNames={uniqueMonthNames}
						filteredOrders={filteredOrders}
						onViewOrderDetail={viewOrderDetail}
						onLogout={logout}
					/>
				)}

				{currentStep === "orderDetail" && invoiceData && (
					<OrderDetailStep invoiceData={invoiceData} loading={loading} onBack={() => setCurrentStep("orders")} onAcceptOrder={acceptOrder} />
				)}

				{currentStep === "success" && (
					<SuccessStep
						invoiceData={invoiceData}
						onBackToOrders={() => setCurrentStep("orders")}
						onProcessNew={() => {
							setCurrentStep("phone");
							setPhoneNumber("+94");
							setOtp(["", "", "", ""]);
							setInvoiceData(null);
							setError("");
							setOtpAttempts(0);
							setCountdown(0);
						}}
					/>
				)}
			</div>
		</div>
	);
}
