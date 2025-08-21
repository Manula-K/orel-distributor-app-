"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PhoneNumberInput from "@/components/PhoneNumberInput";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

export default function AuthPage() {
	const router = useRouter();
	const [phoneNumber, setPhoneNumber] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [isPageLoading, setIsPageLoading] = useState(true);

	useEffect(() => {
		// Simulate page loading
		const timer = setTimeout(() => setIsPageLoading(false), 500);
		return () => clearTimeout(timer);
	}, []);

	const sendOTP = async () => {
		setLoading(true);
		setError("");

		// Remove all non-digit characters and check if it's exactly 10 digits
		const digitsOnly = phoneNumber.replace(/\D/g, "");
		if (digitsOnly.length !== 10) {
			setError("Please enter a valid 10-digit phone number (e.g., 071 999 1761)");
			setLoading(false);
			return;
		}

		await new Promise((r) => setTimeout(r, 800));
		const countdownEnd = Date.now() + 60_000;
		try {
			localStorage.setItem("otpCountdownEnd", String(countdownEnd));
			localStorage.setItem("phone", phoneNumber);
		} catch {}
		setLoading(false);
		router.push(`/otp?phone=${encodeURIComponent(phoneNumber)}`);
	};

	return (
		<div className="min-h-screen bg-background flex items-center justify-center">
			<LoadingOverlay isLoading={isPageLoading} text="Loading..." spinnerSize="lg">
				<div className="w-full max-w-md mx-auto px-4 space-y-6">
					<PhoneNumberInput phoneNumber={phoneNumber} onPhoneChange={setPhoneNumber} error={error} loading={loading} onSendOTP={sendOTP} />
				</div>
			</LoadingOverlay>
		</div>
	);
}
