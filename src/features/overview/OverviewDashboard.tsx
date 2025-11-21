// src/features/overview/OverviewDashboard.tsx
'use client'

import { useMemo } from 'react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { ProfileDropdown } from '@/components/profile-dropdown'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

import { RadioTower, Crosshair, AlertTriangle, Clock } from 'lucide-react'

import { events } from '@/features/events/data/events'
import { tasks } from '@/features/tasks/data/tasks'
import { targets } from '@/features/targets/data/targets'

// Якщо інша дорога до мапи — підправиш тут
import { EventsMapViewport } from '@/features/events/components/events-map-viewport'

// --- Допоміжні блоки --- //

function DashboardTasks() {
  const recent = tasks.slice(0, 4)

  const statusLabel = (s: (typeof tasks)[number]['status']) => {
    switch (s) {
      case 'new':
        return 'Нова'
      case 'in_progress':
        return 'В роботі'
      case 'done':
        return 'Виконана'
      default:
        return s
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Останні задачі штабу</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {recent.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between gap-3 rounded-md border bg-muted/40 px-3 py-2"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium">{t.title}</p>
              <p className="text-xs text-muted-foreground">
                Виконавець:{' '}
                <span className="font-medium">
                  {t.assigneeCallsign || '—'}
                </span>
                {(t.assigneeRank || t.assigneeUnit) && (
                  <>
                    {' · '}
                    <span className="text-[11px] text-muted-foreground/80">
                      {[t.assigneeRank, t.assigneeUnit]
                        .filter(Boolean)
                        .join(', ')}
                    </span>
                  </>
                )}
              </p>
            </div>
            <Badge variant="secondary" className="text-[11px]">
              {statusLabel(t.status)}
            </Badge>
          </div>
        ))}

        {recent.length === 0 && (
          <p className="text-xs text-muted-foreground">
            Задач поки немає. Створи першу у вкладці «Задачі штабу».
          </p>
        )}
      </CardContent>
    </Card>
  )
}

function DashboardEventsList() {
  const recent = events
    .slice()
    .sort(
      (a, b) =>
        new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime()
    )
    .slice(0, 6)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Останні події по карті</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recent.map((e) => (
          <div
            key={e.id}
            className="flex items-start justify-between gap-3 rounded-md border bg-muted/40 px-3 py-2"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium">{e.title}</p>
              {e.summary && (
                <p className="text-[11px] text-muted-foreground line-clamp-2">
                  {e.summary}
                </p>
              )}
              <p className="text-[10px] font-mono text-muted-foreground/80">
                {new Date(e.occurredAt).toLocaleString('uk-UA', {
                  dateStyle: 'short',
                  timeStyle: 'short',
                })}
              </p>
            </div>
            <Badge
              variant="outline"
              className="mt-1 text-[10px] uppercase tracking-wide"
            >
              {e.severity}
            </Badge>
          </div>
        ))}
        {recent.length === 0 && (
          <p className="text-xs text-muted-foreground">
            Немає подій із координатами для відображення.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

function DashboardStats() {
  const { totalEvents, criticalEvents, highEvents } = useMemo(() => {
    const total = events.length
    const crit = events.filter((e) => e.severity === 'critical').length
    const high = events.filter((e) => e.severity === 'high').length
    return { totalEvents: total, criticalEvents: crit, highEvents: high }
  }, [])

  const { openTasks, highPriorityTasks } = useMemo(() => {
    const open = tasks.filter((t) => t.status !== 'done').length
    const high = tasks.filter((t) => t.priority === 'high').length
    return { openTasks: open, highPriorityTasks: high }
  }, [])

  const activeTargets = useMemo(
    () =>
      targets.filter((t) =>
        ['candidate', 'observed', 'confirmed', 'tasked', 'engaged'].includes(
          t.status
        )
      ).length,
    []
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Коротке зведення обстановки</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-md border bg-muted/40 px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/10">
            <RadioTower className="h-4 w-4 text-amber-500" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">Події моніторингу</p>
            <p className="text-sm font-semibold">
              {totalEvents}{' '}
              <span className="text-[11px] font-normal text-muted-foreground">
                всього / {criticalEvents} критичних / {highEvents} високих
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-md border bg-muted/40 px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500/10">
            <Crosshair className="h-4 w-4 text-sky-500" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">Обʼєкти та цілі</p>
            <p className="text-sm font-semibold">
              {activeTargets}{' '}
              <span className="text-[11px] font-normal text-muted-foreground">
                активних у роботі
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-md border bg-muted/40 px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-500/10">
            <AlertTriangle className="h-4 w-4 text-rose-500" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">Задачі штабу</p>
            <p className="text-sm font-semibold">
              {openTasks}{' '}
              <span className="text-[11px] font-normal text-muted-foreground">
                відкритих, з них {highPriorityTasks} з високим пріоритетом
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-md border bg-muted/40 px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lime-500/10">
            <Clock className="h-4 w-4 text-lime-500" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">
              Режим роботи / готовність
            </p>
            <p className="text-sm font-semibold">
              Нормальний{' '}
              <span className="text-[11px] font-normal text-muted-foreground">
                (демо-дані)
              </span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// --- Основний дашборд --- //

export function OverviewDashboard() {
  return (
    <>
      <Header fixed>
        <Search />
        <div className="ms-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className="flex flex-1 flex-col gap-4 sm:gap-6">
        {/* Заголовок */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Огляд обстановки
          </h1>
          <p className="text-sm text-muted-foreground">
            Зведена картина подій, цілей та задач штабу в одному місці.
          </p>
        </div>

        {/* Короткі стати */}
        <DashboardStats />

        <Separator />

        {/* Основна сітка: зліва карта+події, справа задачі */}
        <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
          <div className="space-y-4">
            <Card className="h-[420px] overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">
                  Оперативна карта подій
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[340px] p-0">
                <div className="h-full w-full">
                  <EventsMapViewport items={events} />
                </div>
              </CardContent>
            </Card>

            <DashboardEventsList />
          </div>

          <div className="space-y-4">
            <DashboardTasks />
            {/* сюди пізніше можна додати ще один блок (наприклад, таймлайн) */}
          </div>
        </div>
      </Main>
    </>
  )
}
