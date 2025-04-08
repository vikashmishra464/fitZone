"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MembersTable } from "@/components/admin/members-table"
import { PlansTable } from "@/components/admin/plans-table"
import { AttendanceStats } from "@/components/admin/attendance-stats"
import { AdminHeader } from "@/components/admin/admin-header"
import { useAuth } from "@/lib/auth-context"
import { members } from "@/data/members"
import { plans } from "@/data/plans"
import { attendanceData } from "@/data/attendance"

export default function AdminPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
  if (loading) return

  if (!user) {
    router.replace("/login") // use replace to stop back button issue
    return
  }

  if (user.role !== "admin") {
    router.replace("/dashboard")
    return
  }

  setIsAdmin(true)
}, [user, loading, router])

if (loading || (!user && !isAdmin)) {
  return <div className="flex h-screen items-center justify-center">Loading...</div>
}

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <AdminHeader />

          <Tabs defaultValue="members" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="plans">Plans</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
            </TabsList>

            <TabsContent value="members" className="mt-6">
              <MembersTable members={members} />
            </TabsContent>

            <TabsContent value="plans" className="mt-6">
              <PlansTable plans={plans} />
            </TabsContent>

            <TabsContent value="attendance" className="mt-6">
              <AttendanceStats attendance={attendanceData} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
