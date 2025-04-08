import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { GymIntro } from "@/components/home/gym-intro"
import { Testimonials } from "@/components/home/testimonials"
import { CallToAction } from "@/components/home/call-to-action"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <GymIntro />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}

