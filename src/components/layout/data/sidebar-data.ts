// src/components/layout/data/sidebar-data.ts
import {
  LayoutDashboard,
  Map,
  ListTodo,
  Radar,
  Settings,
  Users,
  ShieldCheck,
  FileText,
  BarChart3,
  ScrollText,
  Newspaper,
  Crosshair,
  LogIn,
  UserPlus,
  KeyRound,
  Bell,
  Wrench,
  RadioTower,
} from 'lucide-react'

import type { SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Оператор OSINT',
    callsign: 'ops@avesint.ai',
    avatar: '/avatars/shadcn.jpg',
  },
  navGroups: [
    {
      title: 'Оперативна обстановка',
      items: [
        {
          title: 'Огляд',
          url: '/',
          icon: LayoutDashboard,
          roles: ['user', 'analyst', 'officer', 'admin'],
        },
        {
          title: 'Карта подій',
          url: '/map',
          icon: Map,
          roles: ['user', 'analyst', 'officer', 'admin'],
        },
        {
          title: 'Обʼєкти та цілі',
          url: '/targets',
          icon: Crosshair,
          roles: ['analyst', 'officer', 'admin'],
        },
        {
          title: 'Задачі штабу',
          url: '/tasks',
          icon: ListTodo,
          roles: ['officer', 'admin', 'analyst', 'user'],
        },
      ],
    },
    {
      title: 'Розвіддані та джерела',
      items: [
        {
          title: 'Стрічка подій',
          url: '/events',
          icon: RadioTower,
          roles: ['analyst', 'officer', 'admin'],
        },
        {
          title: 'Ревʼю / верифікація',
          url: '/review',
          icon: Radar,
          roles: ['analyst', 'officer', 'admin'],
        },
        {
          title: 'Новини / парсер',
          url: '/news-parser',
          icon: Newspaper,
          roles: ['analyst', 'officer', 'admin'],
        },
      ],
    },
    {
      title: 'Аналітика та звітність',
      items: [
        {
          title: 'Аналітика',
          url: '/analytics',
          icon: BarChart3,
          roles: ['analyst', 'officer', 'admin'],
        },
        {
          title: 'Звіти',
          url: '/reports',
          icon: FileText,
          roles: ['officer', 'admin'],
        },
        {
          title: 'Журнал дій системи',
          url: '/audit-log',
          icon: ScrollText,
          roles: ['admin'],
        },
      ],
    },
    {
      title: 'Користувачі та доступ',
      items: [
        {
          title: 'Користувачі',
          url: '/users',
          icon: Users,
          roles: ['admin'],
        },
        {
          title: 'Ролі та доступи',
          url: '/roles',
          icon: ShieldCheck,
          roles: ['admin'],
        },
        {
          title: 'Налаштування',
          icon: Settings,
          roles: ['user', 'analyst', 'officer', 'admin'],
          items: [
            {
              title: 'Обліковий запис',
              url: '/settings/account',
              icon: Wrench,
              roles: ['user', 'analyst', 'officer', 'admin'],
            },
            {
              title: 'Сповіщення',
              url: '/settings/notifications',
              icon: Bell,
              roles: ['user', 'analyst', 'officer', 'admin'],
            },
          ],
        },
      ],
    },
    {
      title: 'Автентифікація (демо)',
      items: [
        {
          title: 'Вхід',
          url: '/sign-in',
          icon: LogIn,
          guestOnly: true,
        },
        {
          title: 'Реєстрація',
          url: '/sign-up',
          icon: UserPlus,
          guestOnly: true,
        },
        {
          title: 'Відновлення пароля',
          url: '/forgot-password',
          icon: KeyRound,
          guestOnly: true,
        },
        {
          title: 'OTP',
          url: '/otp',
          icon: KeyRound,
          guestOnly: true,
        },
      ],
    },
  ],
}
