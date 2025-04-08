"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

export function HistorySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const milestones = [
    {
      year: 2010,
      title: "FitZone Founded",
      description:
        "FitZone was founded with a vision to create a fitness center that focuses on holistic wellness and personalized training.",
    },
    {
      year: 2013,
      title: "Expanded Facilities",
      description:
        "We expanded our facilities to include a dedicated yoga studio, cardio area, and state-of-the-art strength training equipment.",
    },
    {
      year: 2016,
      title: "Launched Nutrition Program",
      description:
        "Recognizing the importance of nutrition in fitness, we launched our comprehensive nutrition counseling program.",
    },
    {
      year: 2019,
      title: "Community Outreach",
      description:
        "We started our community outreach program, offering free fitness classes and wellness workshops to underserved communities.",
    },
    {
      year: 2022,
      title: "Digital Transformation",
      description:
        "We embraced digital transformation with the launch of our mobile app and virtual training options for members.",
    },
  ]

  return (
    <section ref={ref} className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="mb-4 text-2xl font-bold">Our History</h2>
        <p className="text-lg text-muted-foreground">
          Since our founding in 2010, FitZone has been dedicated to helping people transform their lives through
          fitness. Here's a look at our journey over the years.
        </p>
      </motion.div>

      <div className="relative mb-12">
        <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border" />

        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.year}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            className={`relative mb-12 ${
              index % 2 === 0
                ? "ml-auto pl-8 pr-0 text-right md:ml-0 md:w-1/2 md:pl-0 md:pr-8"
                : "mr-auto pl-8 md:ml-auto md:mr-0 md:w-1/2 md:pl-8"
            }`}
          >
            <div
              className={`absolute top-0 ${
                index % 2 === 0 ? "-left-3 md:right-0 md:left-auto md:-mr-3" : "-left-3"
              } z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground`}
            >
              <span className="h-3 w-3 rounded-full bg-background" />
            </div>

            <div className="rounded-lg bg-muted p-6">
              <span className="mb-2 inline-block rounded bg-primary/10 px-2 py-1 text-sm font-semibold text-primary">
                {milestone.year}
              </span>
              <h3 className="mb-2 text-xl font-semibold">{milestone.title}</h3>
              <p className="text-muted-foreground">{milestone.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="relative h-[300px] overflow-hidden rounded-lg md:h-[400px]"
      >
        <Image
          src="/placeholder.svg?height=400&width=1200"
          alt="FitZone through the years"
          fill
          className="object-cover"
        />
      </motion.div>
    </section>
  )
}

