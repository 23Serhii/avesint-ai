import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon, type LatLngExpression } from 'leaflet'
import type { Event } from '@/features/events/data/schema'
import { useEvents } from '@/features/events/components/events-provider'

// Іконка маркера
const eventIcon = new Icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

type EventsMapProps = {
  events: Event[]
}

export function EventsMap({ events }: EventsMapProps) {
  // беремо контекст один раз (по правилам хуків)
  const { setOpen, setCurrentRow } = useEvents()

  // захист від SSR (якщо раптом)
  if (typeof window === 'undefined') {
    return null
  }

  const center: LatLngExpression = [48.5, 32.2] // центр України

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden border">
      <MapContainer
        center={center}
        zoom={6}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {events
          .filter(
            (e): e is Event & { latitude: number; longitude: number } =>
              e.latitude != null && e.longitude != null,
          )
          .map((event) => {
            const position: LatLngExpression = [
              event.latitude,
              event.longitude,
            ]

            return (
              <Marker key={event.id} position={position} icon={eventIcon}>
                <Popup>
                  <strong>{event.title}</strong> <br />
                  {event.type} / {event.severity}
                  <br />
                  <button
                    type="button"
                    className="text-blue-500 underline mt-1"
                    onClick={() => {
                      setCurrentRow(event)
                      setOpen('update')
                    }}
                  >
                    Open
                  </button>
                </Popup>
              </Marker>
            )
          })}
      </MapContainer>
    </div>
  )
}
