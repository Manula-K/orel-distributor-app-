"use client";

import type React from "react";
import { LoadingButton } from "@/components/ui/loading-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Clock, Shield } from "lucide-react";
import { useRef } from "react";

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

	const handleChange = (index: number, value: string) => {
		onOtpChange(index, value);
		if (value && index < 3) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
		if (e.key === "Backspace" && !otp[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
	};
	return (
		<Card>
			<CardHeader className="text-center pb-2">
				<div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
					<Shield className="w-6 h-6 text-primary" />
				</div>
				<CardTitle>Verify OTP</CardTitle>
				<CardDescription>Enter the 4-digit code sent to {phoneNumber}</CardDescription>
			</CardHeader>
			<CardContent className="pt-0 space-y-4">
				<div className="space-y-2">
					<Label>Verification Code</Label>
					<div className="flex justify-center space-x-3">
						{otp.map((digit, index) => (
							<Input
								key={index}
								ref={(el) => {
									inputRefs.current[index] = el;
								}}
								type="text"
								inputMode="numeric"
								maxLength={1}
								value={digit}
								onChange={(e) => handleChange(index, e.target.value.replace(/\D/g, ""))}
								onKeyDown={(e) => handleKeyDown(index, e)}
								className="w-12 h-12 text-center text-xl font-bold"
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

				<LoadingButton
					onClick={onVerify}
					disabled={otp.join("").length !== 4}
					className="w-full"
					size="lg"
					loading={loading}
					loadingText="Verifying..."
				>
					Verify OTP
				</LoadingButton>

				<Button variant="outline" onClick={onBack} className="w-full">
					Back to Phone Number
				</Button>
			</CardContent>
		</Card>
	);
}
