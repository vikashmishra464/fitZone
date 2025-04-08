import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MissionSection } from "@/components/about/mission-section"
import { TrainersSection } from "@/components/about/trainers-section"
import { HistorySection } from "@/components/about/history-section"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <h1 className="mb-8 text-4xl font-bold">About FitZone</h1>
          <MissionSection />
          <TrainersSection />
          <HistorySection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
