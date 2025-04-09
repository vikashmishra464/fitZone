"use client"

import { Separator } from "@/components/ui/separator"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Loader2, CheckCircle, Calendar, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { plans } from "@/data/plans"

export default function PaymentConfirmationPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const router = useRouter()
  const params = useParams()
  const { user, loading ,updateMembership } = useAuth()
  const { toast } = useToast()
  const planId = params.planId as string

  // Generate a random transaction ID
  const transactionId = `TXN-${Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0")}`
  const paymentDate = new Date().toLocaleDateString()
  const nextBillingDate = new Date()
  nextBillingDate.setMonth(nextBillingDate.getMonth() + 1)

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login")
      } else {
        
        plans().then((data) => {
        const plan = data.find((p) => p.id === planId)
        if (plan) {
          setSelectedPlan(plan)

          // Show success toast
          toast({
            title: "Payment Successful!",
            description: `Your ${plan.name} membership has been activated.`,
          })
        } else {
          toast({
            title: "Plan not found",
            description: "The membership plan information couldn't be found.",
            variant: "destructive",
          })
          router.push("/pricing")
        }
        setIsLoading(false)
      }
  )};
    }
  }, [user, loading, router, planId, toast])
  useEffect(() => {
    const getAndUpdatePlan = async () => {
      const data = await plans(); // wait for plans to come
      const plan = data.find((p) => p.id === planId); // find correct plan
  
      if (user && plan) {
        const token = sessionStorage.getItem("token");
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/updateMembership`, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            plan: plan.name,
          }),
        });
        updateMembership(plan.name);
        const result = await response.json();
        console.log(result.message);
      }
    };
  
    getAndUpdatePlan(); // call the function
  }, []);
  

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl"
          >
            <div className="mb-8 flex flex-col items-center justify-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <CheckCircle className="h-12 w-12 text-primary" />
              </div>
              <h1 className="text-3xl font-bold">Payment Successful!</h1>
              <p className="mt-2 text-muted-foreground">
                Thank you for your purchase. Your membership has been activated.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Payment Receipt</CardTitle>
                <CardDescription>Transaction details for your records</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md bg-muted p-4">
                  <div className="mb-4 flex justify-between">
                    <span className="text-muted-foreground">Transaction ID:</span>
                    <span className="font-mono font-medium">{transactionId}</span>
                  </div>
                  <div className="mb-4 flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{paymentDate}</span>
                  </div>
                  <div className="mb-4 flex justify-between">
                    <span className="text-muted-foreground">Payment Method:</span>
                    <span>Credit Card (•••• 4242)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{selectedPlan.name} Membership</span>
                    <span>${selectedPlan.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Duration</span>
                    <span>{selectedPlan.duration}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Next Billing Date</span>
                    <span>{nextBillingDate.toLocaleDateString()}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${selectedPlan.price.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="flex items-center rounded-md bg-primary/10 p-4 text-sm text-primary">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Your membership is now active. You can start using all the facilities right away!</span>
                </div>
                <div className="flex justify-between gap-4">
                  <Button variant="outline" asChild>
                    <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/schedule">
                      View Class Schedule
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
