"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Users, ArrowRight } from "lucide-react"

interface ProgramProps {
  program: {
    id: string
    title: string
    description: string
    category: string
    duration: string
    level: string
    image: string
    participants: string
  }
}

export function ProgramCard({ program }: ProgramProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden">
        <div className="relative h-[200px] w-full overflow-hidden">
          <Image
            src={program.image || "/placeholder.svg"}
            alt={program.title}
            fill
            className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
          />
          <div className="absolute right-2 top-2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
            {program.level}
          </div>
        </div>

        <CardHeader>
          <CardTitle>{program.title}</CardTitle>
          <CardDescription>{program.category}</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="mb-4 text-muted-foreground">{program.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              {program.duration}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="mr-1 h-4 w-4" />
              {program.participants}
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full group">
            Learn More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

