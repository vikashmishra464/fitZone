import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScheduleTable } from "@/components/schedule/schedule-table"
import { scheduleData } from "@/data/schedule"

export default function SchedulePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <h1 className="mb-8 text-4xl font-bold">Class Schedule</h1>
          <ScheduleTable schedule={scheduleData} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
