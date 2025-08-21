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
	const formatSriLankaMobile = (input: string) => {
		const digits = input.replace(/\D/g, "").slice(0, 10);
		if (digits.length <= 3) return digits;
		if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
		return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
	};

	const handlePhoneChange = (value: string) => {
		// Sanitize and format as 07X XXX XXXX
		const formatted = formatSriLankaMobile(value);
		onPhoneChange(formatted);
	};

	const handlePaste: React.ClipboardEventHandler<HTMLInputElement> = (e) => {
		e.preventDefault();
		const pasted = e.clipboardData.getData("text");
		onPhoneChange(formatSriLankaMobile(pasted));
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
						placeholder="07X XXX XXXX"
						value={phoneNumber}
						onChange={(e) => handlePhoneChange(e.target.value)}
						maxLength={12}
						autoComplete="tel-national"
						pattern="[0-9 ]*"
						onPaste={handlePaste}
						aria-label="Phone number"
						aria-invalid={Boolean(error) || undefined}
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
