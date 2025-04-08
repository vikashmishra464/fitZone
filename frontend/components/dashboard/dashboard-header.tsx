"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import type { User } from "@/lib/auth-context"
import { CalendarDays, Award, Clock } from "lucide-react"

interface DashboardHeaderProps {
  user: User
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg border bg-background p-6 shadow-sm"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>

        <div className="flex items-center space-x-4">
          <Award className="h-10 w-10 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Membership</p>
            <p className="font-medium">{user.membership}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <CalendarDays className="h-10 w-10 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Member Since</p>
            <p className="font-medium">{user.joinDate}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center space-x-4">
        <Clock className="h-5 w-5 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Last workout: <span className="font-medium">Yesterday, 5:30 PM - Strength Training</span>
        </p>
      </div>
    </motion.div>
  )
}
