"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function TrainersSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const trainers = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Head Trainer",
      image: "/placeholder.svg?height=400&width=300",
      bio: "Alex has over 10 years of experience in fitness training and specializes in strength and conditioning. He is certified in personal training, nutrition, and sports medicine.",
      social: {
        instagram: "#",
        twitter: "#",
        facebook: "#",
      },
    },
    {
      id: 2,
      name: "Samantha Lee",
      role: "Yoga Instructor",
      image: "/placeholder.svg?height=400&width=300",
      bio: "Samantha is a certified yoga instructor with 8 years of experience. She specializes in vinyasa flow and restorative yoga, helping members improve flexibility and mindfulness.",
      social: {
        instagram: "#",
        twitter: "#",
        facebook: "#",
      },
    },
    {
      id: 3,
      name: "Marcus Williams",
      role: "Cardio Specialist",
      image: "/placeholder.svg?height=400&width=300",
      bio: "Marcus is passionate about helping members improve their cardiovascular health. With a background in sports science, he designs effective cardio programs for all fitness levels.",
      social: {
        instagram: "#",
        twitter: "#",
        facebook: "#",
      },
    },
    {
      id: 4,
      name: "Jessica Chen",
      role: "Nutrition Coach",
      image: "/placeholder.svg?height=400&width=300",
      bio: "Jessica holds a degree in nutrition and helps members develop sustainable eating habits. She believes that proper nutrition is the foundation of any successful fitness journey.",
      social: {
        instagram: "#",
        twitter: "#",
        facebook: "#",
      },
    },
  ]

  return (
    <section ref={ref} className="mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-2xl font-bold"
      >
        Meet Our Expert Trainers
      </motion.h2>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {trainers.map((trainer, index) => (
          <motion.div
            key={trainer.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="overflow-hidden rounded-lg bg-background shadow-md"
          >
            <div className="relative h-[300px] w-full">
              <Image src={trainer.image || "/placeholder.svg"} alt={trainer.name} fill className="object-cover" />
            </div>

            <div className="p-6">
              <h3 className="mb-1 text-xl font-semibold">{trainer.name}</h3>
              <p className="mb-4 text-sm text-primary">{trainer.role}</p>
              <p className="mb-4 text-sm text-muted-foreground">{trainer.bio}</p>

              <div className="flex space-x-4">
                <a href={trainer.social.instagram} className="text-muted-foreground hover:text-primary">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href={trainer.social.twitter} className="text-muted-foreground hover:text-primary">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href={trainer.social.facebook} className="text-muted-foreground hover:text-primary">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
