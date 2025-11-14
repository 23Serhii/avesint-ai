import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { ProfileDropdown } from '@/components/profile-dropdown'

import { newsFeed, newsSources } from './data/news'
import { NewsFeedTable } from './components/news-feed-table'
import { NewsSourcesTable } from './components/news-sources-table'

export function NewsParser() {
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
          <h1 className="text-2xl font-bold tracking-tight">Новини / парсер</h1>
          <p className="text-muted-foreground">
            Централізований збір OSINT-новин з Telegram, Twitter, сайтів та RSS
            з подальшою верифікацією.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <NewsFeedTable items={newsFeed} />
          </div>
          <div className="lg:col-span-1">
            <NewsSourcesTable sources={newsSources} />
          </div>
        </div>
      </Main>
    </>
  )
}
