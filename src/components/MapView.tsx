"use client"

import { useEffect, useRef } from "react"
import type { Map as LeafletMap } from "leaflet"

export function MapView({
  center,
  zoom = 13,
}: {
  center: [number, number]
  zoom?: number
}) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<LeafletMap | null>(null)

  useEffect(() => {
    async function initMap() {
      if (mapRef.current && !mapInstanceRef.current) {
        const L = await import("leaflet")
        await import("leaflet/dist/leaflet.css")

        // Fix marker icons
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        })

        const map = L.map(mapRef.current).setView(center, zoom)

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
          maxZoom: 19,
        }).addTo(map)

        L.marker(center).addTo(map).bindPopup("Your Location").openPopup()

        mapInstanceRef.current = map
      }
    }
    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [center, zoom])

  return <div ref={mapRef} className="w-full h-[300px] rounded-xl border z-0" />
}
