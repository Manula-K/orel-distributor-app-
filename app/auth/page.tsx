"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneStep from "@/components/PhoneStep";
import { normalizeSriLankaPhone } from "@/lib/format";

export default function AuthPage() {
	const router = useRouter();
	const [phoneNumber, setPhoneNumber] = useState("+94");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const sendOTP = async () => {
		setLoading(true);
		setError("");

		const phoneRegex = /^\+94[0-9]{9}$/;
		if (!phoneRegex.test(phoneNumber)) {
			setError("Please enter a valid Sri Lankan phone number (+94XXXXXXXXX)");
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
			<div className="w-full max-w-md mx-auto px-4 space-y-6">
				<PhoneStep
					phoneNumber={phoneNumber}
					onPhoneChange={(value) => setPhoneNumber(normalizeSriLankaPhone(value))}
					error={error}
					loading={loading}
					onSendOTP={sendOTP}
				/>
			</div>
		</div>
	);
}
