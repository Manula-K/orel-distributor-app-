"use client";

import { LoadingButton } from "@/components/ui/loading-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Phone } from "lucide-react";

interface PhoneStepProps {
	phoneNumber: string;
	onPhoneChange: (value: string) => void;
	error: string;
	loading: boolean;
	onSendOTP: () => void;
}

export default function PhoneStep({ phoneNumber, onPhoneChange, error, loading, onSendOTP }: PhoneStepProps) {
	const handlePhoneChange = (value: string) => {
		// Remove all non-digit characters
		const digitsOnly = value.replace(/\D/g, "");

		// Limit to maximum 10 digits
		if (digitsOnly.length <= 10) {
			onPhoneChange(value);
		}
	};

	return (
		<Card>
			<CardHeader className="text-center ">
				<div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
					<Phone className="w-6 h-6 text-primary" />
				</div>
				<CardTitle>Enter Phone Number</CardTitle>
				<CardDescription>We'll send you a verification code</CardDescription>
			</CardHeader>
			<CardContent className="pt-0 space-y-3">
				<div className="space-y-2">
					<Label htmlFor="phone">Phone Number</Label>
					<Input
						id="phone"
						type="tel"
						inputMode="numeric"
						placeholder="071 999 1761"
						value={phoneNumber}
						onChange={(e) => handlePhoneChange(e.target.value)}
						maxLength={13}
						className="text-lg"
					/>
				</div>

				{error && (
					<Alert variant="destructive">
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}

				<LoadingButton
					onClick={onSendOTP}
					disabled={phoneNumber.replace(/\D/g, "").length !== 10}
					className="w-full"
					size="lg"
					loading={loading}
					loadingText="Sending OTP..."
				>
					Send OTP
				</LoadingButton>
			</CardContent>
		</Card>
	);
}
