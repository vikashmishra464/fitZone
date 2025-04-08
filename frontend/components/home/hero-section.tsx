"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, useInView, useAnimation } from "framer-motion"

export function HeroSection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center bg-gradient-to-r from-primary/10 to-secondary/10">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920')" }}
      />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="container relative z-10 mx-auto px-4 text-center"
      >
        <motion.h1
          variants={itemVariants}
          className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Transform Your Body <br />
          <span className="text-primary">Transform Your Life</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
          Join FitZone today and start your fitness journey with our expert trainers and state-of-the-art facilities.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        >
          <Link href="/programs">
            <Button size="lg" className="min-w-[150px]">
              Explore Programs
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="outline" className="min-w-[150px]">
              View Pricing
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

