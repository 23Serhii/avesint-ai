// src/features/tasks/data/tasks.ts

export type TaskStatus = 'new' | 'in_progress' | 'done'
export type TaskPriority = 'high' | 'medium' | 'low'
export type TaskRole = 'analyst' | 'duty_officer' | 'section_lead' | 'commander'

export type Task = {
  id: string
  title: string
  description?: string
  role: TaskRole
  priority: TaskPriority
  status: TaskStatus

  // 🔥 військовий блок
  assigneeCallsign: string          // позивний: "БЕРКУТ"
  assigneeRank?: string             // "ст. лейтенант"
  assigneeUnit?: string             // "Аналітичний відділ"

  createdAt: string
  updatedAt?: string
  dueAt?: string
}

// Прості мок-дані (можеш розширити)
export const tasks: Task[] = [
  {
    id: 't-1',
    title: 'Розвідзвіт по району Бахмут-південь',
    description:
      'Зібрати дані по руху техніки противника за останні 24 години, джерела: БПЛА, радіоперехоплення.',
    role: 'analyst',
    priority: 'high',
    status: 'in_progress',
    assigneeCallsign: 'БЕРКУТ',
    assigneeRank: 'ст. лейтенант',
    assigneeUnit: 'Аналітичний відділ',
    createdAt: new Date().toISOString(),
    dueAt: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(), // +3 години
  },
  {
    id: 't-2',
    title: 'Моніторинг скупчення техніки біля ТЕЦ',
    description:
      'Підтвердження наявності танків/ББМ біля обʼєкта критичної інфраструктури. Звірити з супутниковими даними.',
    role: 'duty_officer',
    priority: 'medium',
    status: 'new',
    assigneeCallsign: 'ОМЕГА',
    assigneeRank: 'капітан',
    assigneeUnit: 'Черговий по штабу',
    createdAt: new Date().toISOString(),
  },
  {
    id: 't-3',
    title: 'Побудова карти загроз по району Курахове',
    description:
      'Агрегувати дані по ворожій активності за останні 7 діб та сформувати теплову карту ризиків.',
    role: 'section_lead',
    priority: 'medium',
    status: 'in_progress',
    assigneeCallsign: 'ЛОРД',
    assigneeRank: 'майор',
    assigneeUnit: 'Керівник напряму',
    createdAt: new Date().toISOString(),
  },
  {
    id: 't-4',
    title: 'Аналіз маршрутів стратегічної авіації',
    description:
      'Виділити типові маршрути польотів стратегічних бомбардувальників РФ, повʼязати з обстрілами.',
    role: 'analyst',
    priority: 'high',
    status: 'new',
    assigneeCallsign: 'ФЕНІКС',
    assigneeRank: 'лейтенант',
    assigneeUnit: 'Аналітичний відділ',
    createdAt: new Date().toISOString(),
  },
]
