// src/components/layout/app-sidebar.tsx
import { useLayout } from '@/context/layout-provider'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { sidebarData } from './data/sidebar-data'
import { NavGroup } from './nav-group'
import { NavUser } from './nav-user'
import { TeamSwitcher } from './team-switcher'
import { useAuthStore } from '@/stores/auth-store'
import type { NavItem, NavGroup as NavGroupType, Role } from './types'

function filterNavItemByRole(item: NavItem, role: Role | null): boolean {
  // якщо ти хочеш пізніше додати item.requiredRoles – можна перевіряти тут
  // поки що: показуємо ВСЕ для всіх ролей
  return true
}

function filterGroupsByRole(
  groups: NavGroupType[],
  role: Role | null,
): NavGroupType[] {
  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => filterNavItemByRole(item, role)),
    }))
    .filter((group) => group.items.length > 0)
}

export function AppSidebar() {
  const { collapsible, variant } = useLayout()
  const { auth } = useAuthStore()

  // якщо юзера ще нема — роль невідома
  const role: Role | null = (auth.user?.role as Role | undefined) ?? null

  const filteredGroups = filterGroupsByRole(sidebarData.navGroups, role)

  return (
    <Sidebar collapsible={collapsible} variant={variant}>
      <SidebarHeader>

      </SidebarHeader>

      <SidebarContent>
        {filteredGroups.map((group) => (
          <NavGroup key={group.title} {...group} />
        ))}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
