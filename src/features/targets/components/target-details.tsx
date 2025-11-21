'use client'

import { MapPin, Crosshair, Clock, Flag, Info } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import type {
  TargetObject,
  TargetPriority,
  TargetStatus,
  TargetType,
  TargetKind,
} from '../data/schema'

type TargetDetailsProps = {
  target: TargetObject
  onCreateTaskClick?: () => void
}

const statusLabel = (s: TargetStatus) => {
  switch (s) {
    case 'candidate':
      return 'Кандидат'
    case 'observed':
      return 'Спостерігається'
    case 'confirmed':
      return 'Підтверджено'
    case 'tasked':
      return 'Є задача'
    case 'engaged':
      return 'Уражається'
    case 'neutralized':
      return 'Нейтралізовано'
  }
}

const statusVariant = (s: TargetStatus) => {
  switch (s) {
    case 'candidate':
      return 'outline'
    case 'observed':
      return 'secondary'
    case 'confirmed':
      return 'default'
    case 'tasked':
      return 'default'
    case 'engaged':
      return 'destructive'
    case 'neutralized':
      return 'outline'
    default:
      return 'outline'
  }
}

const priorityLabel = (p: TargetPriority) => {
  switch (p) {
    case 'high':
      return 'Високий'
    case 'medium':
      return 'Середній'
    case 'low':
      return 'Низький'
  }
}

const priorityVariant = (p: TargetPriority) => {
  switch (p) {
    case 'high':
      return 'destructive'
    case 'medium':
      return 'default'
    case 'low':
    default:
      return 'outline'
  }
}

const kindLabel = (k: TargetKind) => (k === 'object' ? 'Обʼєкт' : 'Ціль')

const typeLabel = (t: TargetType) => {
  switch (t) {
    case 'infrastructure':
      return 'Інфраструктура'
    case 'vehicle':
      return 'Техніка'
    case 'personnel':
      return 'Жива сила'
    case 'position':
      return 'Позиція'
    case 'other':
      return 'Інше'
  }
}

export function TargetDetails({ target, onCreateTaskClick }: TargetDetailsProps) {
  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      {/* Верхній заголовок */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Crosshair className="h-3 w-3" />
            <span>{kindLabel(target.kind)}</span>
            <span className="text-muted-foreground/60">·</span>
            <span className="font-mono text-[11px] uppercase">
              ID: {target.id}
            </span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {target.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>{typeLabel(target.type)}</span>
            {target.source && (
              <>
                <span>·</span>
                <span>Джерело: {target.source}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={priorityVariant(target.priority) as any}>
            {priorityLabel(target.priority)}
          </Badge>
          <Badge variant={statusVariant(target.status) as any}>
            {statusLabel(target.status)}
          </Badge>

          <Button
            size="sm"
            className="ml-1"
            onClick={onCreateTaskClick}
            type="button"
          >
            Створити задачу по цілі
          </Button>
        </div>
      </div>

      <Separator />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] lg:gap-6">
        {/* Ліва колонка */}
        <div className="space-y-4 lg:space-y-6">
          {/* Локація */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                Локація обʼєкта / цілі
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="space-y-1">
                <div className="text-muted-foreground/80">Описово</div>
                <div className="font-medium">
                  {target.locationText ?? 'Не вказано'}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <div className="text-muted-foreground/80 text-xs">
                    Координати
                  </div>
                  <div className="font-mono text-xs">
                    {target.lat && target.lon
                      ? `${target.lat.toFixed(5)}, ${target.lon.toFixed(5)}`
                      : '—'}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-muted-foreground/80 text-xs">
                    MGRS / сітка
                  </div>
                  <div className="font-mono text-xs uppercase">
                    {target.gridRef ?? '—'}
                  </div>
                </div>
              </div>

              <p className="mt-2 text-[11px] text-muted-foreground">
                * Мапу та інструменти роботи з координатами додамо окремим
                модулем (Leaflet / Mapbox).
              </p>
            </CardContent>
          </Card>

          {/* Таймінг */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Часові характеристики
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <div className="text-muted-foreground/80 text-xs">
                    Вперше виявлено
                  </div>
                  <div>
                    {target.firstSeenAt
                      ? target.firstSeenAt.toLocaleString('uk-UA', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                      })
                      : '—'}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-muted-foreground/80 text-xs">
                    Останнє підтвердження
                  </div>
                  <div>
                    {target.lastSeenAt
                      ? target.lastSeenAt.toLocaleString('uk-UA', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                      })
                      : '—'}
                  </div>
                </div>
              </div>

              <div className="mt-2 rounded-md border bg-muted/40 px-3 py-2 text-[11px] text-muted-foreground">
                Ці дані в майбутньому можуть підтягуватись з журналу спостережень
                (БПЛА, радіорозвідка, HUMINT тощо).
              </div>
            </CardContent>
          </Card>

          {/* Нотатки */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Info className="h-4 w-4 text-muted-foreground" />
                Нотатки штабу
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border bg-background/60 p-3 text-sm">
                {target.notes ? (
                  <p className="whitespace-pre-wrap">{target.notes}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Нотаток поки немає. Тут можуть бути уточнення щодо характеру
                    цілі, зайнятих підрозділів, обмежень на ураження тощо.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Права колонка */}
        <div className="space-y-4 lg:space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Flag className="h-4 w-4 text-muted-foreground" />
                Статус обробки цілі
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="space-y-1">
                <div className="text-muted-foreground/80 text-xs">Статус</div>
                <Badge variant={statusVariant(target.status) as any}>
                  {statusLabel(target.status)}
                </Badge>
              </div>

              <div className="space-y-1">
                <div className="text-muted-foreground/80 text-xs">Пріоритет</div>
                <Badge variant={priorityVariant(target.priority) as any}>
                  {priorityLabel(target.priority)}
                </Badge>
              </div>

              <Separator className="my-2" />

              <p className="text-xs text-muted-foreground leading-relaxed">
                Логіка зміни статусу (candidate → observed → confirmed → tasked →
                engaged → neutralized) може бути завʼязана на реальні події.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Повʼязані задачі та обʼєкти
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground">
              <p>
                Тут буде блок з задачами штабу, які привʼязані до цієї цілі
                (розвідка, уточнення координат, вогневе ураження, БДА).
              </p>
              <p>
                Також тут можна буде візуалізувати граф звʼязків: ця ціль →
                інші обʼєкти → задіяні підрозділи → сенсори.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
