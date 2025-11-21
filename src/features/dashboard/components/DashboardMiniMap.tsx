'use client'

import { useMemo } from 'react'
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup
} from 'react-leaflet'
import type { LatLngExpression, LatLngBoundsExpression } from 'leaflet'

import { Badge } from '@/components/ui/badge'
import { events } from '@/features/events/data/events'


// UA + RU bounds
const UA_RU_BOUNDS: LatLngBoundsExpression = [
  [40.0, 20.0],
  [70.0, 60.0]
]

const DEFAULT_CENTER: LatLngExpression = [49.0, 32.0]

export function DashboardMiniMap() {
  const visibleEvents = useMemo(
    () => events.filter(
      e => typeof e.latitude === 'number' && typeof e.longitude === 'number'
    ),
    []
  )

  const center: LatLngExpression = useMemo(() => {
    if (!visibleEvents.length) return DEFAULT_CENTER
    const lat = visibleEvents.reduce((a, e) => a + (e.latitude ?? 0), 0) / visibleEvents.length
    const lon = visibleEvents.reduce((a, e) => a + (e.longitude ?? 0), 0) / visibleEvents.length
    return [lat, lon]
  }, [visibleEvents])

  return (
    <div className="border rounded-lg overflow-hidden bg-background">

      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-2">
        <h3 className="text-sm font-medium">Оперативна мапа</h3>
        <span className="text-muted-foreground text-[11px]">
          Останні зафіксовані події (UA / RU)
        </span>
      </div>

      {/* ХАК: чітка фіксована висота без padding */}
      <div className="relative" style={{ height: '320px' }}>
        <MapContainer
          center={center}
          zoom={5}
          minZoom={4}
          maxZoom={9}
          maxBounds={UA_RU_BOUNDS}
          maxBoundsViscosity={1}
          zoomControl={false}
          scrollWheelZoom={false}
          attributionControl={false}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {visibleEvents.map(event => {
            const color =
              event.severity === 'critical'
                ? '#ef4444'
                : event.severity === 'high'
                  ? '#f97316'
                  : event.severity === 'medium'
                    ? '#eab308'
                    : '#22c55e'

            return (
              <CircleMarker
                key={event.id}
                center={[event.latitude!, event.longitude!] as LatLngExpression}
                radius={event.severity === 'critical' ? 9 : event.severity === 'high' ? 7 : 6}
                pathOptions={{
                  color,
                  fillColor: color,
                  fillOpacity: 0.9,
                  weight: 2
                }}
              >
                <Popup>
                  <div className="text-[11px] space-y-1">
                    <div className="text-xs font-medium">{event.title}</div>
                    <div className="text-muted-foreground">
                      {event.summary ?? 'Без опису'}
                    </div>
                    <div className="text-muted-foreground/70 font-mono">
                      {event.latitude?.toFixed(4)}, {event.longitude?.toFixed(4)}
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            )
          })}
        </MapContainer>

        {/* Badge */}
        <div className="pointer-events-none absolute bottom-3 left-3 z-10">
          <Badge variant="outline" className="bg-background/85 text-[11px]">
            Подій на мапі: {visibleEvents.length}
          </Badge>
        </div>
      </div>
    </div>
  )
}
