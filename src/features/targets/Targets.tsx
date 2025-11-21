// src/features/targets/Targets.tsx
'use client'

import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Button } from '@/components/ui/button'
import { targets as initialTargets } from './data/targets'
import { TargetsTable } from './components/targets-table'
import type { TargetObject } from './data/schema'
import { TargetCreateDialog } from './components/target-create-dialog'

export function Targets() {
  const router = useRouter()

  // локальний стейт замість константного масиву
  const [items, setItems] = useState<TargetObject[]>(initialTargets)
  const [createOpen, setCreateOpen] = useState(false)

  const handleRowClick = (item: TargetObject) => {
    router.navigate({
      to: '/targets/$targetId',
      params: { targetId: String(item.id) },
    })
  }

  const handleCreateTarget = (payload: Omit<TargetObject, 'id' | 'firstSeenAt' | 'lastSeenAt'>) => {
    const now = new Date()
    const newTarget: TargetObject = {
      ...payload,
      id: String(Date.now()), // тимчасовий id, поки нема бекенду
      firstSeenAt: now,
      lastSeenAt: now,
    }

    setItems((prev) => [newTarget, ...prev])
    setCreateOpen(false)
  }

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

          <Button size="sm" onClick={() => setCreateOpen(true)}>
            + Новий обʼєкт / ціль
          </Button>
        </div>

        <TargetsTable items={items} onRowClick={handleRowClick} />
      </Main>

      <TargetCreateDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreate={handleCreateTarget}
      />
    </>
  )
}
