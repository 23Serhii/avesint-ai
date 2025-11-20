'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { events } from '@/features/events/data/events'
import { Badge } from '@/components/ui/badge'

export function DashboardRecentEvents() {
  const recent = events.slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Останні події</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recent.map((e) => (
          <div key={e.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{e.title}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(e.occurredAt).toLocaleString('uk-UA')}
              </p>
            </div>
            <Badge variant="outline">{e.severity}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
