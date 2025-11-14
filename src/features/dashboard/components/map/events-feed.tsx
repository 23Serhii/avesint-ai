import type { Event } from '@/features/events/data/schema'
import { formatDistanceToNow } from 'date-fns'
import { uk } from 'date-fns/locale'

type Props = {
  events: Event[]
}

export function EventsFeed({ events }: Props) {
  return (
    <div className="rounded-lg border p-4 space-y-4">
      <h3 className="font-semibold text-lg">Latest events</h3>

      {events.slice(0, 6).map((event) => (
        <div key={event.id} className="border-l-2 pl-3">
          <p className="font-medium">{event.title}</p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(event.occurredAt), {
              addSuffix: true,
              locale: uk,
            })}
          </p>
        </div>
      ))}
    </div>
  )
}
