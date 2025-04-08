"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface AttendanceMarkerProps {
  user: any
}

export function AttendanceMarker({ user }: AttendanceMarkerProps) {
  const [hasCheckedIn, setHasCheckedIn] = useState(false)
  const [lastCheckIn, setLastCheckIn] = useState<string | null>(null)
  const { toast } = useToast()

  const handleCheckIn = () => {
    const now = new Date()
    const formattedDate = now.toLocaleDateString()
    const formattedTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    setHasCheckedIn(true)
    setLastCheckIn(`${formattedDate} at ${formattedTime}`)

    toast({
      title: "Check-in successful!",
      description: "Your attendance has been recorded.",
    })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-primary" />
            Attendance
          </CardTitle>
          <CardDescription>Mark your attendance for today</CardDescription>
        </CardHeader>
        <CardContent>
          {hasCheckedIn ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-4">
              <div className="rounded-full bg-primary/10 p-3">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium">You're checked in!</h3>
                <p className="text-sm text-muted-foreground">Last check-in: {lastCheckIn}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4 py-4">
              <p className="text-center text-muted-foreground">
                You haven't checked in today. Click the button below to mark your attendance.
              </p>
              <Button onClick={handleCheckIn}>Check In Now</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
