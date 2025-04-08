import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PricingCards } from "@/components/pricing/pricing-cards"
import { PricingComparison } from "@/components/pricing/pricing-comparison"

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <h1 className="mb-8 text-4xl font-bold">Membership Plans</h1>
          <PricingCards />
          <PricingComparison />
        </div>
      </main>
      <Footer />
    </div>
  )
}

