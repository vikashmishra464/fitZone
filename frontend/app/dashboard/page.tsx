"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AttendanceCard } from "@/components/dashboard/attendance-card"
import { ProgressChart } from "@/components/dashboard/progress-chart"
import { AttendanceMarker } from "@/components/dashboard/attendance-marker"
import { useAuth } from "@/lib/auth-context"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login")
      } else {
        setIsLoading(false)
      }
    }
  }, [user, loading, router])

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
          {user && <DashboardHeader user={user} />}
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <AttendanceMarker user={user} />
            <AttendanceCard />
          </div>
          <div className="mt-6">
            <ProgressChart />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
