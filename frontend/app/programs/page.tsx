"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProgramCard } from "@/components/programs/program-card"
import { ProgramFilter } from "@/components/programs/program-filter"
import { programs } from "@/data/programs"

export default function ProgramsPage() {
  const [filter, setFilter] = useState("all")

  const filteredPrograms = filter === "all" ? programs : programs.filter((program) => program.category === filter)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <h1 className="mb-8 text-4xl font-bold">Our Programs</h1>
          <ProgramFilter activeFilter={filter} onFilterChange={setFilter} />
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
