import {
  LayoutDashboard,
  Map,
  ListTodo,
  Radar,
  Settings,
  Command,
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

} from 'lucide-react'

import type { SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Оператор OSINT',
    email: 'ops@avesint.ai',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'AVESINT.AI',
      logo: Command,
      plan: 'OSINT-платформа',
    },

  ],
  navGroups: [
    {
      title: 'Оперативна робота',
      items: [
        {
          title: 'Огляд',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'Стрічка подій',
          url: '/events',
          icon: ListTodo,
        },
        {
          title: 'Карта подій',
          url: '/map',
          icon: Map,
        },
        {
          title: 'Ревʼю / верифікація',
          url: '/review',
          icon: Radar,
        },
        {
          title: 'Новини / парсер',
          url: '/news-parser',
          icon: Newspaper,
        },
        {
          title: 'Обʼєкти та цілі',
          url: '/entities',
          icon: Crosshair,
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
        },
        {
          title: 'Звіти',
          url: '/reports',
          icon: FileText,
        },
        {
          title: 'Журнал подій',
          url: '/audit-log',
          icon: ScrollText,
        },
      ],
    },
    {
      title: 'Користувачі та доступ',
      items: [
        {
          title: 'Задачі',
          url: '/tasks',
          icon: ShieldCheck,
        },
        {
          title: 'Користувачі',
          url: '/users',
          icon: Users,
        },
        {
          title: 'Ролі та доступи',
          url: '/roles',
          icon: ShieldCheck,
        },
      ],
    },
    {
      title: 'Система',
      items: [
        {
          title: 'Налаштування',
          icon: Settings,
          items: [
            {
              title: 'Обліковий запис',
              url: '/settings/account',
              icon: Wrench,
            },
            {
              title: 'Сповіщення',
              url: '/settings/notifications',
              icon: Bell,
            },

          ],
        },
      ],
    },
    {
      title: 'Автентифікація',
      items: [
        {
          title: 'Вхід',
          url: '/sign-in',
          icon: LogIn,
        },

        {
          title: 'Реєстрація',
          url: '/sign-up',
          icon: UserPlus,
        },
        {
          title: 'Відновлення пароля',
          url: '/forgot-password',
          icon: KeyRound,
        },
        {
          title: 'OTP',
          url: '/otp',
          icon: KeyRound,
        },

      ],
    },
  ],
}
