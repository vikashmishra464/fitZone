"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export function MissionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="rounded-lg bg-muted p-8"
      >
        <h2 className="mb-4 text-2xl font-bold">Our Mission</h2>
        <p className="mb-4 text-lg text-muted-foreground">
          At FitZone, our mission is to inspire and empower individuals to transform their lives through fitness. We
          believe that fitness is not just about physical strength, but about building mental resilience, confidence,
          and a healthier lifestyle.
        </p>
        <p className="mb-4 text-lg text-muted-foreground">
          We are committed to providing a welcoming and inclusive environment where everyone, regardless of their
          fitness level, can feel comfortable and supported on their journey to better health.
        </p>
        <p className="text-lg text-muted-foreground">
          Our goal is to help our members achieve sustainable results through expert guidance, innovative programs, and
          a supportive community that celebrates every milestone along the way.
        </p>
      </motion.div>
    </section>
  )
}
