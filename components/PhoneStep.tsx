"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Phone, RefreshCw } from "lucide-react";

interface PhoneStepProps {
	phoneNumber: string;
	onPhoneChange: (value: string) => void;
	error: string;
	loading: boolean;
	onSendOTP: () => void;
}

export default function PhoneStep({ phoneNumber, onPhoneChange, error, loading, onSendOTP }: PhoneStepProps) {
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
						placeholder="XXX"
						value={phoneNumber}
						onChange={(e) => onPhoneChange(e.target.value)}
						maxLength={12}
						className="text-lg"
					/>
				</div>

				{error && (
					<Alert variant="destructive">
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}

				<Button onClick={onSendOTP} disabled={loading || phoneNumber.length < 12} className="w-full" size="lg">
					{loading ? (
						<>
							<RefreshCw className="w-4 h-4 mr-2 animate-spin" />
							Sending OTP...
						</>
					) : (
						"Send OTP"
					)}
				</Button>
			</CardContent>
		</Card>
	);
}
