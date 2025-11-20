'use client'

import { MapContainer, TileLayer } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'

export function DashboardMiniMap() {
  const center: LatLngExpression = [48.5, 32.0]

  return (
    <div className="rounded-lg border p-3">
      <h3 className="mb-2 text-sm font-medium text-muted-foreground">Оперативна мапа</h3>

      <div className="h-[260px] overflow-hidden rounded-md">
        <MapContainer
          center={center}
          zoom={6}
          zoomControl={false}
          scrollWheelZoom={false}
          attributionControl={false}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      </div>
    </div>
  )
}
