'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { tasks } from '@/features/tasks/data/tasks.ts'
import { Badge } from '@/components/ui/badge.tsx'

export function DashboardTasks() {
  const recent = tasks.slice(0, 4)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Останні задачі</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {recent.map((t) => (
          <div key={t.id} className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium">{t.title}</p>
              <p className="text-xs text-muted-foreground">
                Виконавець: {t.assigneeCallsign}
                {t.assigneeRank && ` · ${t.assigneeRank}`}
                {t.assigneeUnit && ` · ${t.assigneeUnit}`}
              </p>
            </div>
            <Badge variant="secondary">
              {t.status === 'new'
                ? 'Нова'
                : t.status === 'in_progress'
                  ? 'В роботі'
                  : 'Виконана'}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
