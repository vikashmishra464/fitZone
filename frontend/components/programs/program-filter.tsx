"use client"

import { Button } from "@/components/ui/button"

interface ProgramFilterProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export function ProgramFilter({ activeFilter, onFilterChange }: ProgramFilterProps) {
  const filters = [
    { id: "all", label: "All Programs" },
    { id: "strength", label: "Strength" },
    { id: "cardio", label: "Cardio" },
    { id: "yoga", label: "Yoga" },
    { id: "pilates", label: "Pilates" },
    { id: "crossfit", label: "CrossFit" },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  )
}

