"use client";

import type React from "react";
import { LoadingButton } from "@/components/ui/loading-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Clock, Shield } from "lucide-react";
import { useRef, useEffect, useCallback } from "react";

interface OTPInputProps {
	phoneNumber: string;
	otp: string[];
	error: string;
	loading: boolean;
	otpAttempts: number;
	countdown: number;
	onVerify: () => void;
	onResend: () => void;
	onBack: () => void;
	onOtpChange: (index: number, value: string) => void;
}

export default function OTPInput({
	phoneNumber,
	otp,
	error,
	loading,
	otpAttempts,
	countdown,
	onVerify,
	onResend,
	onBack,
	onOtpChange,
}: OTPInputProps) {
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
	const otpLength = otp.length;

	useEffect(() => {
		// Focus the first input on mount for better UX
		inputRefs.current[0]?.focus();
	}, []);

	const focusInput = useCallback(
		(nextIndex: number) => {
			const clampedIndex = Math.max(0, Math.min(nextIndex, otpLength - 1));
			inputRefs.current[clampedIndex]?.focus();
		},
		[otpLength]
	);

	const handleDistributedFill = useCallback(
		(startIndex: number, digits: string) => {
			let currentIndex = startIndex;
			for (let i = 0; i < digits.length && currentIndex < otpLength; i++) {
				onOtpChange(currentIndex, digits[i]);
				currentIndex++;
			}
			focusInput(currentIndex);
		},
		[focusInput, onOtpChange, otpLength]
	);

	const handleChange = (index: number, rawValue: string) => {
		const sanitized = rawValue.replace(/\D/g, "");
		if (sanitized.length <= 1) {
			onOtpChange(index, sanitized);
			if (sanitized && index < otpLength - 1) {
				focusInput(index + 1);
			}
			return;
		}

		// If user pasted or auto-filled multiple digits into one field, distribute them
		handleDistributedFill(index, sanitized);
	};

	const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
		if (e.key === "Backspace") {
			if (!otp[index] && index > 0) {
				focusInput(index - 1);
			} else {
				// Clear current value first
				onOtpChange(index, "");
			}
			return;
		}

		if (e.key === "ArrowLeft" && index > 0) {
			focusInput(index - 1);
			return;
		}

		if (e.key === "ArrowRight" && index < otpLength - 1) {
			focusInput(index + 1);
			return;
		}

		if (e.key === "Enter") {
			const isComplete = otp.every(Boolean);
			if (isComplete && !loading) {
				onVerify();
			}
		}
	};

	const handlePaste = (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
		if (!pasted) return;
		handleDistributedFill(index, pasted);
	};

	const handleFocus = (index: number) => {
		// Select current value for easier overwrite
		const input = inputRefs.current[index];
		input?.select?.();
	};
	return (
		<Card>
			<CardHeader className="text-center pb-2">
				<div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
					<Shield className="w-6 h-6 text-primary" />
				</div>
				<CardTitle>Verify OTP</CardTitle>
				<CardDescription>
					Enter the {otpLength}-digit code sent to {phoneNumber}
				</CardDescription>
			</CardHeader>
			<CardContent className="pt-0 space-y-4">
				<div className="space-y-2">
					<Label>Verification Code</Label>
					<div className="flex justify-center gap-2 sm:gap-3">
						{otp.map((digit, index) => (
							<Input
								key={index}
								ref={(el) => {
									inputRefs.current[index] = el;
								}}
								type="text"
								inputMode="numeric"
								autoComplete="one-time-code"
								pattern="\\d*"
								maxLength={1}
								value={digit}
								onChange={(e) => handleChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								onPaste={(e) => handlePaste(index, e)}
								onFocus={() => handleFocus(index)}
								className="w-10 h-10 sm:w-12 sm:h-12 text-center text-xl font-bold"
								aria-label={`OTP Digit ${index + 1}`}
								aria-invalid={Boolean(error) || undefined}
							/>
						))}
					</div>
				</div>

				{error && (
					<Alert variant="destructive">
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}

				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">Attempts: {otpAttempts}/3</span>
					{countdown > 0 ? (
						<div className="flex items-center text-muted-foreground">
							<Clock className="w-4 h-4 mr-1" />
							{countdown}s
						</div>
					) : (
						<Button variant="link" size="sm" onClick={onResend}>
							Resend OTP
						</Button>
					)}
				</div>

				<LoadingButton onClick={onVerify} disabled={!otp.every(Boolean)} className="w-full" size="lg" loading={loading} loadingText="Verifying...">
					Verify OTP
				</LoadingButton>

				<Button variant="outline" onClick={onBack} className="w-full">
					Back to Phone Number
				</Button>
			</CardContent>
		</Card>
	);
}
