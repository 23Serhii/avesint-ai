import { type LinkProps } from '@tanstack/react-router'

// --- Ролі системи ---
export type Role = 'user' | 'analyst' | 'officer' | 'admin'

// --- Базовий юзер ---
type User = {
  name: string
  callsign: string
  avatar: string
}


// --- Розширені поля доступу ---
type AccessControl = {
  roles?: Role[]            // кому показувати
  authOnly?: boolean        // тільки для авторизованих
  guestOnly?: boolean       // тільки для гостей
}

// --- Базовий елемент меню ---
type BaseNavItem = {
  title: string
  badge?: string
  icon?: React.ElementType
} & AccessControl

// --- Клік-посилання ---
type NavLink = BaseNavItem & {
  url: LinkProps['to'] | (string & {})
  items?: never
}

// --- Розкривний список ---
type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & {
    url: LinkProps['to'] | (string & {})
  })[]
  url?: never
}

// --- Об'єднання двох типів ---
type NavItem = NavCollapsible | NavLink

// --- Група меню ---
type NavGroup = {
  title: string
  items: NavItem[]
}

// --- Дані сайдбару ---
type SidebarData = {
  user: User
  navGroups: NavGroup[]
}

export type {
  SidebarData,
  NavGroup,
  NavItem,
  NavCollapsible,
  NavLink,
}

