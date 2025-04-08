"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Calendar } from "lucide-react"

export function AttendanceCard() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Mock data for attendance
  const currentMonth = new Date().toLocaleString("default", { month: "long" })
  const attendanceData = [
    { day: 1, attended: true },
    { day: 3, attended: true },
    { day: 5, attended: true },
    { day: 8, attended: true },
    { day: 10, attended: true },
    { day: 12, attended: true },
    { day: 15, attended: true },
    { day: 17, attended: false },
    { day: 19, attended: true },
    { day: 22, attended: true },
    { day: 24, attended: true },
    { day: 26, attended: true },
    { day: 29, attended: true },
  ]

  // Calculate attendance percentage
  const attendancePercentage = Math.round(
    (attendanceData.filter((day) => day.attended).length / attendanceData.length) * 100,
  )

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-lg border bg-background p-6 shadow-sm"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Attendance</h2>
        </div>
        <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">{currentMonth}</span>
      </div>

      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Attendance Rate</span>
          <span className="font-medium">{attendancePercentage}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-primary" style={{ width: `${attendancePercentage}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
          const dayData = attendanceData.find((d) => d.day === day)
          return (
            <div
              key={day}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs ${
                dayData
                  ? dayData.attended
                    ? "bg-primary text-primary-foreground"
                    : "bg-destructive/10 text-destructive"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {day}
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
