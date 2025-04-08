"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CallToAction() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg bg-primary p-12 text-center text-primary-foreground"
        >
          <h2 className="mb-4 text-3xl font-bold">Ready to Start Your Fitness Journey?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg">
            Join FitZone today and take the first step towards a healthier, stronger you. Our expert trainers and
            supportive community are here to help you achieve your fitness goals.
          </p>
          <Link href="/pricing">
            <Button size="lg" variant="secondary" className="group">
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

