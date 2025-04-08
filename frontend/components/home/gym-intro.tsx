"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { CheckCircle } from "lucide-react"

export function GymIntro() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const features = [
    "State-of-the-art equipment",
    "Expert personal trainers",
    "Variety of group classes",
    "Nutrition counseling",
    "Flexible membership options",
    "Clean and spacious facilities",
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="mb-6 text-3xl font-bold">Welcome to FitZone</h2>
            <p className="mb-6 text-lg text-muted-foreground">
              At FitZone, we believe fitness is not just about building a better body, but about building a better life.
              Our state-of-the-art facilities, expert trainers, and supportive community create the perfect environment
              for you to achieve your fitness goals.
            </p>
            <p className="mb-8 text-lg text-muted-foreground">
              Whether you're a beginner or a fitness enthusiast, we have everything you need to take your fitness
              journey to the next level.
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                >
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[400px] overflow-hidden rounded-lg md:h-[500px]"
          >
            <Image src="/placeholder.svg?height=500&width=500" alt="Gym interior" fill className="object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

