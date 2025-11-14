import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { tasks as initialTasks } from './data/tasks'
import { TasksTable } from './components/tasks-table'
// import { TasksCreateDialog } ... якщо потім захочеш

// тимчасовий поточний користувач (посадова особа)
const CURRENT_CALLSIGN = 'Беркут' // поміняєш на свій / з auth
const CURRENT_ROLE: 'commander' | 'section_lead' | 'analyst' | 'duty_officer' =
  'section_lead'

export function Tasks() {
  const [items] = useState(initialTasks)
  const [view, setView] = useState<'all' | 'my'>('all')
  const [createOpen, setCreateOpen] = useState(false)

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
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Задачі штабу</h1>
            <p className="text-muted-foreground">
              Панель начальника та посадових осіб для постановки й контролю задач.
            </p>
          </div>
        </div>

        {/* Вкладки: усі задачі / мої задачі */}
        <Tabs
          value={view}
          onValueChange={(val) => setView(val as 'all' | 'my')}
          className="flex flex-1 flex-col gap-4"
        >
          <div className="flex items-center justify-between gap-4">
            <TabsList>
              <TabsTrigger value="all">Усі задачі</TabsTrigger>
              <TabsTrigger value="my">Мої задачі</TabsTrigger>
            </TabsList>

            {/* Якщо потрібна кнопка створення в шапці */}
            {/* <Button onClick={() => setCreateOpen(true)}>Нова задача</Button> */}
          </div>

          {/* Таблиця всередині активної вкладки */}
          <TasksTable
            items={items}
            mode={view}
            currentCallsign={CURRENT_CALLSIGN}
            currentRole={CURRENT_ROLE}
            onCreateClick={() => setCreateOpen(true)}
          />
        </Tabs>
      </Main>

      {/* Тут пізніше підключиш модалку / дровер створення */}
      {/* <TasksCreateDialog open={createOpen} onOpenChange={setCreateOpen} /> */}
    </>
  )
}
