// src/features/dashboard/index.tsx

import { useState } from 'react'

import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { ProfileDropdown } from '@/components/profile-dropdown'

import { DashboardStats } from './components/DashboardStats'
import { DashboardMiniMap } from './components/DashboardMiniMap'
import { DashboardRecentEvents } from './components/DashboardRecentEvents'
import { DashboardTasks } from './components/DashboardTasks'

// ДІАГРАМИ (лежать у components/map)
import { DashboardEventsChart } from './components/DashboardEventsChart'
import { DashboardEventsPie } from './components/DashboardEventsPie'
import type { TimeRange } from './components/time-range'

export function Dashboard() {
  // поки без перемикача — просто фіксований діапазон, наприклад 7 днів
  const [range] = useState<TimeRange>('7d')

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

      <Main className="flex flex-col gap-6">
        {/* Заголовок */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Огляд обстановки
          </h1>
          <p className="text-sm text-muted-foreground">
            Оперативний зріз розвідподій, уражень, задач штабу та активних обʼєктів.
          </p>
        </div>

        {/* Верхній ряд: ключові метрики */}
        <DashboardStats />

        {/* Дві діаграми: лінійна + кругова */}
        <div className="grid gap-4 lg:grid-cols-2">
          <DashboardEventsChart range={range} />
          <DashboardEventsPie range={range} />
        </div>

        {/* Нижній ряд: мапа + дві колонки з подіями/задачами */}
        <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.25fr)]">
          {/* Ліва частина — тактична мапа */}
          <div className="space-y-4">
            <DashboardMiniMap />
          </div>

          {/* Права частина — події та задачі */}
          <div className="flex flex-col gap-4">
            <DashboardRecentEvents />
            <DashboardTasks />
          </div>
        </div>
      </Main>
    </>
  )
}
