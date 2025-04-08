"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"

export function ProgressChart() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Mock data for progress chart
  const progressData = [
    { month: "Jan", weight: 185, strength: 100 },
    { month: "Feb", weight: 182, strength: 110 },
    { month: "Mar", weight: 178, strength: 120 },
    { month: "Apr", weight: 175, strength: 130 },
    { month: "May", weight: 172, strength: 140 },
    { month: "Jun", weight: 170, strength: 150 },
    { month: "Jul", weight: 168, strength: 160 },
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-lg border bg-background p-6 shadow-sm"
    >
      <div className="mb-6 flex items-center space-x-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Your Progress</h2>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={progressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs text-muted-foreground" />
            <YAxis className="text-xs text-muted-foreground" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Line
              type="monotone"
              dataKey="weight"
              name="Weight (lbs)"
              stroke="hsl(var(--primary))"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="strength" name="Strength (lbs)" stroke="hsl(var(--secondary))" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
