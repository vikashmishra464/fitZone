"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ScheduleClass {
  id: string
  time: string
  name: string
  trainer: string
  duration: string
}

interface ScheduleDay {
  day: string
  classes: ScheduleClass[]
}

interface ScheduleTableProps {
  schedule: ScheduleDay[]
}

export function ScheduleTable({ schedule }: ScheduleTableProps) {
  const [currentWeek, setCurrentWeek] = useState(0)

  const handlePrevWeek = () => {
    setCurrentWeek((prev) => Math.max(prev - 1, 0))
  }

  const handleNextWeek = () => {
    setCurrentWeek((prev) => prev + 1)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Weekly Schedule</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handlePrevWeek} disabled={currentWeek === 0}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span>Week {currentWeek + 1}</span>
          <Button variant="outline" size="icon" onClick={handleNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Time</TableHead>
              {schedule.map((day) => (
                <TableHead key={day.day}>{day.day}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {["06:00 AM", "08:00 AM", "10:00 AM", "12:00 PM", "04:00 PM", "06:00 PM", "08:00 PM"].map((time) => (
              <TableRow key={time}>
                <TableCell className="font-medium">{time}</TableCell>
                {schedule.map((day) => {
                  const classAtTime = day.classes.find((c) => c.time === time)

                  return (
                    <TableCell key={`${day.day}-${time}`}>
                      {classAtTime ? (
                        <div className="rounded bg-muted p-2">
                          <div className="font-medium">{classAtTime.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {classAtTime.trainer} • {classAtTime.duration}
                          </div>
                        </div>
                      ) : null}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
