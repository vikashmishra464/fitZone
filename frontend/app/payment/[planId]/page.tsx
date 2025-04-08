"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Loader2, CreditCard, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { plans } from "@/data/plans"

export default function PaymentPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const router = useRouter()
  const params = useParams()
  const { user, loading } = useAuth()
  const { toast } = useToast()
  const planId = params.planId as string

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login")
      } else {
        plans().then((data) => {
          const plan = data.find((p) => p.id === planId)
          if (plan) {
            setSelectedPlan(plan)
          } else {
            toast({
              title: "Plan not found",
              description: "The membership plan you're trying to purchase doesn't exist.",
              variant: "destructive",
            })
            router.push("/pricing")
          }
          setIsLoading(false)
        }
    )};
    }
  }, [user, loading, router, planId, toast])

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      router.push(`/payment/confirmation/${planId}`)
    }, 2000)
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="mb-8 text-center text-3xl font-bold">Complete Your Purchase</h1>

            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
              {/* Order Summary */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>Membership plan details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium">{selectedPlan.name} Plan</span>
                    <span>${selectedPlan.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Duration</span>
                    <span>{selectedPlan.duration}</span>
                  </div>
                  {selectedPlan.popular && (
                    <div className="rounded-md bg-primary/10 p-2 text-center text-sm text-primary">
                      Most Popular Choice
                    </div>
                  )}
                  <div className="pt-4">
                    <h4 className="mb-2 font-medium">Includes:</h4>
                    <ul className="space-y-1 text-sm">
                      {selectedPlan.features.slice(0, 4).map((feature: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {selectedPlan.features.length > 4 && (
                        <li className="text-muted-foreground">+{selectedPlan.features.length - 4} more features</li>
                      )}
                    </ul>
                  </div>
                </CardContent>
                <Separator />
                <CardFooter className="mt-4 flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold">${selectedPlan.price.toFixed(2)}</span>
                </CardFooter>
              </Card>

              {/* Payment Form */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                  <CardDescription>Enter your payment information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePayment}>
                    <div className="mb-6">
                      <RadioGroup
                        defaultValue="credit-card"
                        value={paymentMethod}
                        onValueChange={setPaymentMethod}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="credit-card" id="credit-card" />
                          <Label htmlFor="credit-card" className="flex items-center">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Credit / Debit Card
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal">PayPal</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {paymentMethod === "credit-card" && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="card-name">Name on Card</Label>
                          <Input id="card-name" placeholder="John Doe" required />
                        </div>
                        <div>
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" required />
                          </div>
                          <div>
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" required />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "paypal" && (
                      <div className="rounded-md bg-muted p-4 text-center">
                        <p>You will be redirected to PayPal to complete your payment.</p>
                      </div>
                    )}

                    <div className="mt-6">
                      <Button type="submit" className="w-full" disabled={isProcessing}>
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          `Pay $${selectedPlan.price.toFixed(2)}`
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
