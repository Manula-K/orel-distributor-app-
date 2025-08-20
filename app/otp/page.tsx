"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import OtpStep from "@/components/OtpStep";

function OtpPageContent() {
	const router = useRouter();
	const params = useSearchParams();
	const phoneFromQuery = params.get("phone");
	const [phoneNumber, setPhoneNumber] = useState<string>("+94");
	const [otp, setOtp] = useState(["", "", "", ""]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [otpAttempts, setOtpAttempts] = useState(0);
	const [countdown, setCountdown] = useState(0);

	useEffect(() => {
		const stored = phoneFromQuery ?? (typeof window !== "undefined" ? localStorage.getItem("phone") : null);
		if (stored) setPhoneNumber(stored);
		const end = typeof window !== "undefined" ? Number(localStorage.getItem("otpCountdownEnd") ?? 0) : 0;
		if (end > Date.now()) {
			setCountdown(Math.ceil((end - Date.now()) / 1000));
		} else {
			setCountdown(0);
		}
	}, [phoneFromQuery]);

	useEffect(() => {
		if (countdown > 0) {
			const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
			return () => clearTimeout(t);
		}
	}, [countdown]);

	const verifyOTP = async () => {
		setLoading(true);
		setError("");
		const otpString = otp.join("");
		if (otpString.length !== 4) {
			setError("Please enter a 4-digit OTP");
			setLoading(false);
			return;
		}
		await new Promise((r) => setTimeout(r, 800));
		router.push("/");
	};

	const resendOTP = () => {
		const countdownEnd = Date.now() + 60_000;
		try {
			localStorage.setItem("otpCountdownEnd", String(countdownEnd));
		} catch {}
		setCountdown(60);
		setOtpAttempts(0);
		setError("");
		setOtp(["", "", "", ""]);
	};

	return (
		<div className="min-h-screen bg-background flex items-center justify-center">
			<div className="w-full max-w-md mx-auto px-4 space-y-6">
				<OtpStep
					phoneNumber={phoneNumber}
					otp={otp}
					error={error}
					loading={loading}
					otpAttempts={otpAttempts}
					countdown={countdown}
					onVerify={verifyOTP}
					onResend={resendOTP}
					onBack={() => router.push("/auth")}
					onOtpChange={(index, value) => {
						if (value.length > 1) return;
						const next = [...otp];
						next[index] = value;
						setOtp(next);
					}}
				/>
			</div>
		</div>
	);
}

export default function OtpPage() {
	return (
		<Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">Loading…</div>}>
			<OtpPageContent />
		</Suspense>
	);
}
