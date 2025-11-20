// src/features/targets/Targets.tsx
'use client'

import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { targets } from './data/targets'
import { TargetsTable } from './components/targets-table'
import { getRouteApi } from '@tanstack/react-router'

// беремо API для детального роута
const targetDetailsRoute = getRouteApi('/targets/$targetId')

export function Targets() {
  const navigate = targetDetailsRoute.useNavigate()

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
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Обʼєкти та цілі
            </h2>
            <p className="text-muted-foreground">
              Оперативний перелік виявлених обʼєктів і цілей з привʼязкою до
              місцевості, пріоритетами та статусами.
            </p>
          </div>
        </div>

        <TargetsTable
          items={targets}
          onRowClick={(item) =>
            navigate({
              params: { targetId: String(item.id) },
            })
          }
        />
      </Main>
    </>
  )
}
