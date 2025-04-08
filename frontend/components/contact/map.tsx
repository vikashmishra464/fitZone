"use client"

import { useEffect, useRef } from "react"

export function Map() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This is a placeholder for a real map implementation
    // In a real application, you would use a library like Google Maps, Mapbox, or Leaflet
    if (mapRef.current) {
      const mapElement = mapRef.current
      mapElement.style.backgroundImage = "url('/placeholder.svg?height=300&width=600')"
      mapElement.style.backgroundSize = "cover"
      mapElement.style.backgroundPosition = "center"
    }
  }, [])

  return <div ref={mapRef} className="h-[300px] rounded-lg border shadow-sm" aria-label="Map showing gym location" />
}
