import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { ProfileDropdown } from '@/components/profile-dropdown'

export function Dashboard() {
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
          <h1 className="text-2xl font-bold tracking-tight">Огляд обстановки</h1>
          <p className="text-muted-foreground">
            Зведена панель ситуаційної обізнаності для аналітиків AVESINT.AI.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium text-muted-foreground">
              Подій за добу
            </p>
            <p className="mt-2 text-2xl font-semibold">–</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium text-muted-foreground">
              Підтверджено
            </p>
            <p className="mt-2 text-2xl font-semibold">–</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium text-muted-foreground">
              Активні джерела
            </p>
            <p className="mt-2 text-2xl font-semibold">–</p>
          </div>
        </div>

        <div className="rounded-lg border p-6 text-sm text-muted-foreground">
          Тут буде мапа, стрічка останніх подій та аналітичні віджети згідно ТЗ.
        </div>
      </Main>
    </>
  )
}
