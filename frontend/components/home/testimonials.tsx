"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Star } from "lucide-react"

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Member for 2 years",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "FitZone completely transformed my fitness journey. The trainers are knowledgeable and supportive, and the community is so motivating. I've achieved results I never thought possible!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Member for 1 year",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "Joining FitZone was the best decision I made for my health. The variety of classes keeps my workouts interesting, and the trainers really care about your progress.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Member for 6 months",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "As a beginner, I was intimidated to join a gym, but FitZone made me feel welcome from day one. The supportive environment and personalized guidance have been incredible.",
      rating: 4,
    },
  ]

  return (
    <section ref={ref} className="bg-muted py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold">What Our Members Say</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Don't just take our word for it. Hear from our members who have transformed their lives with FitZone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="rounded-lg bg-background p-6 shadow-md"
            >
              <div className="mb-4 flex items-center space-x-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>

              <p className="mb-4 text-muted-foreground">{testimonial.content}</p>

              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.rating ? "fill-primary text-primary" : "text-muted"}`}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
