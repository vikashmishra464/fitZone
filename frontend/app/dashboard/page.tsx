"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AttendanceCard } from "@/components/dashboard/attendance-card"
import { ProgressChart } from "@/components/dashboard/progress-chart"
import { useAuth } from "@/lib/auth-context"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading || !user) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <DashboardHeader user={user} />
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <AttendanceCard />
            <ProgressChart />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

