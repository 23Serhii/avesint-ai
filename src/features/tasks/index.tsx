import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { ProfileDropdown } from '@/components/profile-dropdown'

import { tasks } from './data/tasks'
import { TasksTableSimple } from './components/tasks-table'

export function Tasks() {
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
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Задачі штабу</h1>
          <p className="text-muted-foreground">
            Панель начальника для постановки задач підлеглим (аналітикам, черговим,
            керівникам напрямків).
          </p>
        </div>

        <TasksTableSimple items={tasks} />
      </Main>
    </>
  )
}
