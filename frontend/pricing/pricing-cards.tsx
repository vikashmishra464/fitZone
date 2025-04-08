"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function PricingCards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const plans = [
    {
      name: "Basic",
      price: 29,
      description: "Perfect for beginners looking to start their fitness journey.",
      features: [
        "Access to gym facilities",
        "Basic equipment usage",
        "2 group classes per week",
        "Locker room access",
        "Online workout resources",
      ],
      popular: false,
    },
    {
      name: "Premium",
      price: 59,
      description: "Our most popular plan for fitness enthusiasts.",
      features: [
        "Full access to gym facilities",
        "All equipment usage",
        "Unlimited group classes",
        "1 personal training session/month",
        "Nutrition consultation",
        "Locker room access with towel service",
        "Access to mobile app",
      ],
      popular: true,
    },
    {
      name: "Elite",
      price: 99,
      description: "The ultimate fitness experience for dedicated athletes.",
      features: [
        "24/7 access to gym facilities",
        "All equipment usage",
        "Unlimited group classes",
        "4 personal training sessions/month",
        "Monthly nutrition consultation",
        "Locker room access with premium amenities",
        "Priority class booking",
        "Guest passes (2 per month)",
        "Access to mobile app with premium features",
      ],
      popular: false,
    },
  ]

  return (
    <div ref={ref} className="mb-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className={`relative overflow-hidden rounded-lg border ${
              plan.popular ? "border-primary shadow-lg" : "border-border"
            } bg-background p-6`}
          >
            {plan.popular && (
              <div className="absolute right-0 top-0 bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Most Popular
              </div>
            )}

            <h3 className="text-2xl font-bold">{plan.name}</h3>
            <div className="my-4">
              <span className="text-4xl font-bold">${plan.price}</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <p className="mb-6 text-muted-foreground">{plan.description}</p>

            <ul className="mb-6 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link href={`/payment/${plan.name.toLowerCase()}`}>
              <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                Get Started
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
