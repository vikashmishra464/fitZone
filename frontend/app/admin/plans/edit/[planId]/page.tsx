"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { plans } from "@/data/plans"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  price: z.coerce.number().min(1, { message: "Price must be at least 1." }),
  duration: z.string().min(1, { message: "Duration is required." }),
  features: z.string().min(1, { message: "Features are required." }),
  popular: z.boolean().default(false),
})

export default function EditPlanPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [plan, setPlan] = useState<any>(null)
  const { toast } = useToast()
  const router = useRouter()
  const params = useParams()
  const { user, loading } = useAuth()
  const planId = params.planId as string

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login")
      } else if (user.role !== "admin") {
        router.push("/dashboard")
      } else {
        // Find the plan
        plans().then((data) => {
          const foundPlan = data.find((p) => p.id === planId)
          if (foundPlan) {
            setPlan(foundPlan)
          } else {
            toast({
              title: "Plan not found",
              description: "The membership plan you're trying to edit doesn't exist.",
              variant: "destructive",
            })
            router.push("/admin/plans")
          }
          setIsLoading(false)
        });
        
        
        
      }
    }
  }, [user, loading, router, planId, toast])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      duration: "",
      features: "",
      popular: false,
    },
  })

  // Set form values when plan is loaded
  useEffect(() => {
    if (plan) {
      form.reset({
        name: plan.name,
        price: plan.price,
        duration: plan.duration,
        features: plan.features.join("\n"),
        popular: plan.popular,
      })
    }
  }, [plan, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Process features from textarea to array
    const featuresArray = values.features.split("\n").filter((feature) => feature.trim() !== "")

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Plan updated!",
        description: `${values.name} plan has been updated successfully.`,
      })
      router.push("/admin/plans")
    }, 1500)
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
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-6 lg:p-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Edit Membership Plan</h1>
              <p className="text-muted-foreground">Update the details of this membership plan</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Plan Details</CardTitle>
                <CardDescription>
                  Update the details for this membership plan. All fields are required unless marked optional.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Plan Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Basic, Premium, Elite" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" placeholder="29" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Monthly, Yearly" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="features"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Features</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter features, one per line" className="min-h-[150px]" {...field} />
                          </FormControl>
                          <FormDescription>Enter each feature on a new line.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="popular"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Mark as Popular</FormLabel>
                            <FormDescription>This plan will be highlighted as a popular choice.</FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end space-x-4">
                      <Button variant="outline" type="button" onClick={() => router.back()}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          "Update Plan"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
