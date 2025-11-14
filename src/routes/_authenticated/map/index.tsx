import { createFileRoute } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { ProfileDropdown } from '@/components/profile-dropdown'

function MapPage() {
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

      <Main className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Карта подій</h1>
        <p className="text-muted-foreground">
          Тут буде інтерактивна мапа з маркерами подій (Leaflet / OpenStreetMap),
          як описано в ТЗ.
        </p>
      </Main>
    </>
  )
}

export const Route = createFileRoute('/_authenticated/map/')({
  component: MapPage,
})
