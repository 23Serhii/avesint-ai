'use client'

import { useRouter } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { targets } from './data/targets'
import { TargetsTable } from './components/targets-table'

export function Targets() {
  const router = useRouter()

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
            router.navigate({
              to: '/targets/$targetId',
              params: { targetId: String(item.id) },
            })
          }
        />
      </Main>
    </>
  )
}
