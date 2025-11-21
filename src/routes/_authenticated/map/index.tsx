import { createFileRoute } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { ProfileDropdown } from '@/components/profile-dropdown'

import { EventsProvider } from '@/features/events/components/events-provider'
import { EventsMapViewport } from '@/features/events/components/events-map-viewport'
import { EventsMapSidebar } from '@/features/events/components/events-map-sidebar'
import { events } from '@/features/events/data/events'

function MapPage() {
  return (
    <EventsProvider>
      <Header fixed>
        <Search />
        <div className="ms-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className="flex flex-1 flex-col gap-4 sm:gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Карта подій</h1>
          <p className="text-muted-foreground text-sm">
            Візуалізація ворожої активності: скупчення сил, рух колон, стратегічна
            авіація, загрози нашій критичній інфраструктурі.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)] xl:grid-cols-[minmax(0,3fr)_minmax(360px,1fr)]">
          <EventsMapViewport items={events} />
          <EventsMapSidebar items={events} />
        </div>
      </Main>
    </EventsProvider>
  )
}

export const Route = createFileRoute('/_authenticated/map/')({
  component: MapPage,
})
