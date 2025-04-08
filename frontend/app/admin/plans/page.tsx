"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { plans } from "@/data/plans"

export default function PlansManagementPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [localPlans, setLocalPlans] = useState([...plans])
  const { toast } = useToast()
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login")
      } else if (user.role !== "admin") {
        router.push("/dashboard")
      } else {
        setIsLoading(false)
      }
    }
  }, [user, loading, router])

  const handleEditPlan = (planId: string) => {
    router.push(`/admin/plans/edit/${planId}`)
  }

  const handleDeletePlan = (planId: string) => {
    if (confirm("Are you sure you want to delete this plan?")) {
      setLocalPlans(localPlans.filter((plan) => plan.id !== planId))
      toast({
        title: "Plan deleted",
        description: "The membership plan has been deleted successfully.",
      })
    }
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
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Membership Plans</h1>
                <p className="text-muted-foreground">Manage your gym's membership plans and pricing.</p>
              </div>
              <Button onClick={() => router.push("/admin/plans/new")}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Plan
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {localPlans.map((plan) => (
                <Card key={plan.id} className="overflow-hidden">
                  <CardHeader className="relative bg-muted pb-8">
                    {plan.popular && (
                      <Badge className="absolute right-4 top-4" variant="secondary">
                        Popular
                      </Badge>
                    )}
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.duration}</CardDescription>
                    <div className="mt-2">
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/{plan.duration.toLowerCase()}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h4 className="mb-2 font-medium">Features:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2 mt-0.5 text-primary">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm" onClick={() => handleEditPlan(plan.id)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeletePlan(plan.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
