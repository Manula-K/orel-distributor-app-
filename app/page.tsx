"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Phone,
  Shield,
  Receipt,
  Clock,
  RefreshCw,
  PartyPopper,
  Package,
  ChevronLeft,
  Filter,
  ChevronRight,
} from "lucide-react"

type AppStep = "phone" | "otp" | "orders" | "orderDetail" | "success"

interface InvoiceItem {
  id: string
  sku: string
  name: string
  quantity: number
  unitPrice: number
  lineTotal: number
}

interface InvoiceData {
  invoiceNumber: string
  distributorName: string
  invoiceDate: string
  month: string
  period: string
  items: InvoiceItem[]
  subtotal: number
  totalDiscount: number
  orderTotal: number
  status: "current" | "completed"
}

export default function OrelDistributorApp() {
  const [currentStep, setCurrentStep] = useState<AppStep>("phone")
  const [phoneNumber, setPhoneNumber] = useState("+94")
  const [otp, setOtp] = useState(["", "", "", ""])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [otpAttempts, setOtpAttempts] = useState(0)
  const [countdown, setCountdown] = useState(0)
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null)
  const [selectedMonth, setSelectedMonth] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")

  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const orderHistory: InvoiceData[] = [
    {
      invoiceNumber: "INV-2025-001234",
      distributorName: "ABC Electronics Distributors",
      invoiceDate: "2025-01-15",
      month: "January 2025",
      period: "Period 02",
      status: "current",
      items: [
        {
          id: "1",
          sku: "MCB-1P-06A",
          name: "SIGMA MCB 1POLE 06A Type C - 6kA",
          quantity: 50,
          unitPrice: 2850.0,
          lineTotal: 125400.0,
        },
        {
          id: "2",
          sku: "LED-07W-DL",
          name: "LED BULB SCREW TYPE 07W D/L",
          quantity: 200,
          unitPrice: 1940.0,
          lineTotal: 348400.0,
        },
        {
          id: "3",
          sku: "SW-2W-WH",
          name: "SWITCH 2 WAY WHITE",
          quantity: 100,
          unitPrice: 1025.0,
          lineTotal: 97275.0,
        },
      ],
      subtotal: 571075.0,
      totalDiscount: 171322.5,
      orderTotal: 399752.5,
    },
    {
      invoiceNumber: "INV-2024-001198",
      distributorName: "ABC Electronics Distributors",
      invoiceDate: "2024-12-28",
      month: "December 2024",
      period: "Period 26",
      status: "completed",
      items: [
        {
          id: "4",
          sku: "CBL-2.5MM",
          name: "CABLE 2.5MM COPPER WIRE",
          quantity: 500,
          unitPrice: 285.0,
          lineTotal: 131525.0,
        },
        {
          id: "5",
          sku: "PLG-3P-13A",
          name: "PLUG 3 PIN 13A",
          quantity: 75,
          unitPrice: 1480.0,
          lineTotal: 99825.0,
        },
      ],
      subtotal: 231350.0,
      totalDiscount: 69405.0,
      orderTotal: 161945.0,
    },
    {
      invoiceNumber: "INV-2024-001156",
      distributorName: "ABC Electronics Distributors",
      invoiceDate: "2024-12-15",
      month: "December 2024",
      period: "Period 25",
      status: "completed",
      items: [
        {
          id: "6",
          sku: "FAN-52IN-WH",
          name: "CEILING FAN 52 INCH WHITE",
          quantity: 25,
          unitPrice: 8500.0,
          lineTotal: 212500.0,
        },
        {
          id: "7",
          sku: "TUB-40W-WH",
          name: "LED TUBE LIGHT 40W WHITE",
          quantity: 150,
          unitPrice: 2200.0,
          lineTotal: 330000.0,
        },
      ],
      subtotal: 542500.0,
      totalDiscount: 162750.0,
      orderTotal: 379750.0,
    },
    {
      invoiceNumber: "INV-2024-001089",
      distributorName: "ABC Electronics Distributors",
      invoiceDate: "2024-11-20",
      month: "November 2024",
      period: "Period 21",
      status: "completed",
      items: [
        {
          id: "8",
          sku: "SOC-2P-13A",
          name: "SOCKET 2 PIN 13A",
          quantity: 120,
          unitPrice: 950.0,
          lineTotal: 114000.0,
        },
        {
          id: "9",
          sku: "WIR-1.5MM",
          name: "WIRE 1.5MM SINGLE CORE",
          quantity: 1000,
          unitPrice: 125.0,
          lineTotal: 125000.0,
        },
      ],
      subtotal: 239000.0,
      totalDiscount: 71700.0,
      orderTotal: 167300.0,
    },
    {
      invoiceNumber: "INV-2024-001045",
      distributorName: "ABC Electronics Distributors",
      invoiceDate: "2024-11-08",
      month: "November 2024",
      period: "Period 20",
      status: "completed",
      items: [
        {
          id: "10",
          sku: "EXT-3M-WH",
          name: "EXTENSION CORD 3 METER WHITE",
          quantity: 80,
          unitPrice: 1850.0,
          lineTotal: 148000.0,
        },
      ],
      subtotal: 148000.0,
      totalDiscount: 44400.0,
      orderTotal: 103600.0,
    },
  ]

  const filteredOrders = orderHistory.filter((order) => {
    const matchesMonth = selectedMonth === "all" || order.month === selectedMonth
    const orderYear = order.month.split(" ")[1]
    const matchesYear = selectedYear === "all" || orderYear === selectedYear
    return matchesMonth && matchesYear
  })

  const uniqueMonths = Array.from(new Set(orderHistory.map((order) => order.month)))
  const uniqueYears = Array.from(new Set(orderHistory.map((order) => order.month.split(" ")[1])))

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const sendOTP = async () => {
    setLoading(true)
    setError("")

    const phoneRegex = /^\+94[0-9]{9}$/
    if (!phoneRegex.test(phoneNumber)) {
      setError("Please enter a valid Sri Lankan phone number (+94XXXXXXXXX)")
      setLoading(false)
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setLoading(false)
    setCurrentStep("otp")
    setCountdown(60)
    setOtpAttempts(0)
  }

  const verifyOTP = async () => {
    setLoading(true)
    setError("")

    const otpString = otp.join("")
    if (otpString.length !== 4) {
      setError("Please enter a 4-digit OTP")
      setLoading(false)
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (otpString === "1234" || otpString.length === 4) {
      setCurrentStep("orders")
    } else {
      setOtpAttempts((prev) => prev + 1)
      if (otpAttempts >= 2) {
        setError("Maximum attempts reached. Please request a new OTP.")
        setCurrentStep("phone")
        setOtp(["", "", "", ""])
        setOtpAttempts(0)
      } else {
        setError(`Invalid OTP. ${2 - otpAttempts} attempts remaining.`)
      }
    }

    setLoading(false)
  }

  const resendOTP = () => {
    setCountdown(60)
    setOtpAttempts(0)
    setError("")
    setOtp(["", "", "", ""])
  }

  const acceptOrder = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setCurrentStep("success")
    setLoading(false)
  }

  const viewOrderDetail = (order: InvoiceData) => {
    setInvoiceData(order)
    setCurrentStep("orderDetail")
  }

  const formatCurrency = (amount: number) => {
    return `LKR ${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 3) {
      otpRefs[index + 1].current?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Orel Corporation</h1>
          <p className="text-sm text-muted-foreground">Distributor Portal</p>
        </div>

        {currentStep === "phone" && (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Enter Phone Number</CardTitle>
              <CardDescription>We'll send you a verification code</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+94771234567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="text-lg"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button onClick={sendOTP} disabled={loading || phoneNumber.length < 12} className="w-full" size="lg">
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
        )}

        {currentStep === "otp" && (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Verify OTP</CardTitle>
              <CardDescription>Enter the 4-digit code sent to {phoneNumber}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Verification Code</Label>
                <div className="flex justify-center space-x-3">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      ref={otpRefs[index]}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ""))}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
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
                  <Button variant="link" size="sm" onClick={resendOTP}>
                    Resend OTP
                  </Button>
                )}
              </div>

              <Button onClick={verifyOTP} disabled={loading || otp.join("").length !== 4} className="w-full" size="lg">
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </Button>

              <Button variant="outline" onClick={() => setCurrentStep("phone")} className="w-full">
                Back to Phone Number
              </Button>
            </CardContent>
          </Card>
        )}

        {currentStep === "orders" && (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-bold">Your Orders</h2>
              <p className="text-sm text-muted-foreground">Manage and view your order history</p>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter Orders
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <div>
                  <Label className="text-xs font-medium text-muted-foreground mb-2 block">Filter by Year</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedYear === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedYear("all")}
                      className="text-xs h-8"
                    >
                      All Years
                    </Button>
                    {uniqueYears.map((year) => (
                      <Button
                        key={year}
                        variant={selectedYear === year ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedYear(year)}
                        className="text-xs h-8"
                      >
                        {year}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-medium text-muted-foreground mb-2 block">Filter by Month</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedMonth === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedMonth("all")}
                      className="text-xs h-8"
                    >
                      All Months
                    </Button>
                    {uniqueMonths.map((month) => (
                      <Button
                        key={month}
                        variant={selectedMonth === month ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedMonth(month)}
                        className="text-xs h-8"
                      >
                        {month.split(" ")[0]} {month.split(" ")[1]}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              {filteredOrders.map((order) => (
                <Card
                  key={order.invoiceNumber}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${
                    order.status === "current" ? "border-primary bg-primary/5" : "hover:border-primary/50"
                  }`}
                  onClick={() => viewOrderDetail(order)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant={order.status === "current" ? "default" : "secondary"} className="text-xs">
                          {order.status === "current" ? "Current Order" : "Completed"}
                        </Badge>
                        {order.status === "current" && (
                          <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                            Action Required
                          </Badge>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <p className="font-semibold text-sm">{order.invoiceNumber}</p>
                          <p className="text-xs text-muted-foreground">
                            {order.invoiceDate} • {order.period}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{formatCurrency(order.orderTotal)}</p>
                          <p className="text-xs text-muted-foreground">{order.items.length} items</p>
                        </div>
                      </div>

                      <div className="pt-2 border-t">
                        <p className="text-xs text-muted-foreground mb-1">Items Preview:</p>
                        <p className="text-sm font-medium truncate">
                          {order.items
                            .slice(0, 2)
                            .map((item) => item.name)
                            .join(", ")}
                          {order.items.length > 2 && ` +${order.items.length - 2} more`}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredOrders.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No orders found for the selected period</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {currentStep === "orderDetail" && invoiceData && (
          <div className="space-y-4 pb-32">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentStep("orders")}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to Orders
              </Button>
              <Badge variant={invoiceData.status === "current" ? "default" : "secondary"}>
                {invoiceData.status === "current" ? "Current Order" : "Completed"}
              </Badge>
            </div>

            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Receipt className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Order Details</CardTitle>
                      <CardDescription>
                        {invoiceData.month} • {invoiceData.period}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Invoice Number:</span>
                    <span className="font-mono font-medium">{invoiceData.invoiceNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Distributor:</span>
                    <span className="font-medium text-right">{invoiceData.distributorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order Date:</span>
                    <span className="font-medium">{invoiceData.invoiceDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Items ({invoiceData.items.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {invoiceData.items.map((item, index) => (
                    <div key={item.id} className="p-4">
                      <div className="space-y-3">
                        {/* Item name gets full width at top */}
                        <div className="w-full">
                          <h3 className="font-semibold text-sm leading-tight break-words hyphens-auto text-foreground">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs font-mono px-2 py-0.5">
                              {item.sku}
                            </Badge>
                          </div>
                        </div>

                        {/* Compact pricing grid */}
                        <div className="grid grid-cols-3 gap-3 text-center bg-muted/20 rounded-md p-3">
                          <div>
                            <p className="text-xs text-muted-foreground font-medium">Unit Price</p>
                            <p className="font-bold text-sm mt-0.5">{formatCurrency(item.unitPrice)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground font-medium">Qty</p>
                            <p className="font-bold text-sm mt-0.5">{item.quantity.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground font-medium">Line Total</p>
                            <p className="font-bold text-sm text-primary mt-0.5">{formatCurrency(item.lineTotal)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-base">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatCurrency(invoiceData.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-muted-foreground">Discount (30%)</span>
                    <span className="text-green-600 font-medium">-{formatCurrency(invoiceData.totalDiscount)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Order Total</span>
                      <span className="text-primary">{formatCurrency(invoiceData.orderTotal)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {invoiceData.status === "current" && (
              <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/95 to-transparent">
                <div className="max-w-md mx-auto">
                  <Button
                    onClick={acceptOrder}
                    disabled={loading}
                    className="w-full px-8 py-4 h-auto text-base font-bold bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-xl hover:shadow-green-500/25 transition-all duration-300 rounded-xl"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-5 h-5 mr-3 animate-spin" />
                        Processing Order...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-3" />
                        Accept Order
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {currentStep === "success" && (
          <Card className="text-center">
            <CardContent className="pt-8 pb-8">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <PartyPopper className="w-10 h-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-green-600 mb-2">Order Accepted!</CardTitle>
              <CardDescription className="text-base mb-6">
                Your order has been successfully processed and will be prepared for delivery.
              </CardDescription>
              <div className="space-y-3 text-sm text-muted-foreground mb-8">
                <p>
                  Invoice: <span className="font-medium text-foreground">{invoiceData?.invoiceNumber}</span>
                </p>
                <p>
                  Total:{" "}
                  <span className="font-bold text-lg text-foreground">
                    {invoiceData && formatCurrency(invoiceData.orderTotal)}
                  </span>
                </p>
              </div>
              <div className="space-y-3">
                <Button onClick={() => setCurrentStep("orders")} className="w-full" size="lg">
                  Back to Orders
                </Button>
                <Button
                  onClick={() => {
                    setCurrentStep("phone")
                    setPhoneNumber("+94")
                    setOtp(["", "", "", ""])
                    setInvoiceData(null)
                    setError("")
                    setOtpAttempts(0)
                    setCountdown(0)
                  }}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  Process New Order
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
