import { Shield, UserCheck, Users, AlarmClock } from 'lucide-react'
import { type UserStatus } from './schema'

export const callTypes = new Map<UserStatus, string>([
  ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['inactive', 'bg-neutral-300/40 border-neutral-300'],
  ['invited', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
  [
    'suspended',
    'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
  ],
])

export const roles = [
  {
    label: 'Командир штабу',
    value: 'commander',
    icon: Shield,
  },
  {
    label: 'Керівник напряму',
    value: 'section_lead',
    icon: UserCheck,
  },
  {
    label: 'Аналітик',
    value: 'analyst',
    icon: Users,
  },
  {
    label: 'Черговий офіцер',
    value: 'duty_officer',
    icon: AlarmClock,
  },
] as const
