"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check, X } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function PricingComparison() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const features = [
    { name: "Gym Access", basic: true, premium: true, elite: true },
    { name: "Cardio Equipment", basic: true, premium: true, elite: true },
    { name: "Strength Equipment", basic: true, premium: true, elite: true },
    { name: "Locker Room", basic: true, premium: true, elite: true },
    { name: "Towel Service", basic: false, premium: true, elite: true },
    { name: "Group Classes", basic: "Limited (2/week)", premium: "Unlimited", elite: "Unlimited" },
    { name: "Personal Training", basic: false, premium: "1 session/month", elite: "4 sessions/month" },
    { name: "Nutrition Consultation", basic: false, premium: "Basic", elite: "Advanced" },
    { name: "24/7 Access", basic: false, premium: false, elite: true },
    { name: "Guest Passes", basic: false, premium: false, elite: "2 per month" },
    { name: "Mobile App", basic: "Basic", premium: "Standard", elite: "Premium" },
    { name: "Priority Booking", basic: false, premium: false, elite: true },
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="mb-6 text-2xl font-bold">Plan Comparison</h2>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Feature</TableHead>
              <TableHead>Basic</TableHead>
              <TableHead>Premium</TableHead>
              <TableHead>Elite</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature) => (
              <TableRow key={feature.name}>
                <TableCell className="font-medium">{feature.name}</TableCell>
                <TableCell>
                  {feature.basic === true ? (
                    <Check className="h-5 w-5 text-primary" />
                  ) : feature.basic === false ? (
                    <X className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    feature.basic
                  )}
                </TableCell>
                <TableCell>
                  {feature.premium === true ? (
                    <Check className="h-5 w-5 text-primary" />
                  ) : feature.premium === false ? (
                    <X className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    feature.premium
                  )}
                </TableCell>
                <TableCell>
                  {feature.elite === true ? (
                    <Check className="h-5 w-5 text-primary" />
                  ) : feature.elite === false ? (
                    <X className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    feature.elite
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  )
}
