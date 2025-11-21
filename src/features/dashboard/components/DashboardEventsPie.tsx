import { useMemo } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { events } from '@/features/events/data/events'
import type { Event } from '@/features/events/data/schema'
import type { TimeRange } from './time-range'

const ONE_HOUR = 1000 * 60 * 60
const ONE_DAY = ONE_HOUR * 24

type PieDatum = {
  name: string
  value: number
}

const SEVERITY_LABEL: Record<string, string> = {
  critical: 'Критичні',
  high: 'Високі',
  medium: 'Середні',
  low: 'Низькі',
}

const COLORS: Record<string, string> = {
  critical: '#ef4444', // red
  high: '#f97316', // orange
  medium: '#eab308', // yellow
  low: '#22c55e', // green
}

function pickEventDate(ev: Event) {
  return ev.occurredAt ?? ev.createdAt
}

function isWithinRange(dateIso: string, now: Date, range: TimeRange) {
  const ts = new Date(dateIso).getTime()
  const diff = now.getTime() - ts

  if (diff < 0) return false

  switch (range) {
    case '24h':
      return diff <= ONE_DAY
    case '7d':
      return diff <= ONE_DAY * 7
    case '30d':
      return diff <= ONE_DAY * 30
  }
}

function buildPieData(allEvents: Event[], range: TimeRange, now: Date): PieDatum[] {
  const inRange = allEvents.filter((ev) =>
    isWithinRange(pickEventDate(ev), now, range),
  )

  const counters: Record<string, number> = {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
  }

  for (const ev of inRange) {
    const sev = ev.severity ?? 'low'
    if (counters[sev] === undefined) counters[sev] = 0
    counters[sev]++
  }

  return Object.entries(counters)
    .map(([severity, value]) => ({
      name: SEVERITY_LABEL[severity] ?? severity,
      value,
      severity,
    }))
    .filter((d) => d.value > 0) as any
}

type Props = {
  range: TimeRange
}

export function DashboardEventsPie({ range }: Props) {
  const now = useMemo(() => new Date(), [])
  const data = useMemo(() => buildPieData(events, range, now), [range, now])

  const total = data.reduce((acc, d) => acc + d.value, 0)

  return (
    <Card className="h-[280px]">
      <CardHeader className="pb-1">
        <CardTitle className="flex items-center justify-between text-sm font-medium">
          <span>Структура подій за severity</span>
          <span className="text-muted-foreground text-[11px]">
            Всього: {total || 0}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[230px] pb-2 pt-1">
        {total === 0 ? (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            За обраний період подій немає.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data as any}
                dataKey="value"
                nameKey="name"
                innerRadius={45}
                outerRadius={75}
                paddingAngle={2}
              >
                {(data as any).map((entry: any, idx: number) => {
                  const sevKey = entry.severity as string
                  return (
                    <Cell
                      key={`cell-${idx}`}
                      fill={COLORS[sevKey] ?? '#9ca3af'}
                      strokeWidth={1}
                    />
                  )
                })}
              </Pie>
              <Tooltip
                formatter={(value: any, name: any) => [
                  value,
                  name as string,
                ]}
              />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                iconSize={8}
                wrapperStyle={{
                  fontSize: 11,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
