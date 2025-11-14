export type TaskPriority = 'low' | 'medium' | 'high'
export type TaskStatus = 'new' | 'in_progress' | 'done'
export type TaskRole = 'analyst' | 'duty_officer' | 'section_lead' | 'commander'

export type Task = {
  id: string
  title: string
  description: string // якщо хочеш, можеш зробити description?: string
  role: TaskRole
  assignee: string
  assigneeName?: string
  priority: TaskPriority
  status: TaskStatus
  dueAt?: string
  createdAt?: string // зробили опційним — TS більше не вимагає його
}

export const tasks: Task[] = [
  {
    id: 'TASK-0001',
    title: 'Провести первинний аналіз подій за останні 6 годин',
    description:
      'Згрупувати події за типами (артилерія, БпЛА, диверсії) та сформувати коротку зведену таблицю.',
    priority: 'high',
    status: 'new',
    role: 'analyst',
    assignee: 'молодший аналітик',
    dueAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: 'TASK-0002',
    title: 'Оновити карту обʼєктів на південному напрямку',
    description:
      'Звірити координати мостів та логістичних вузлів, перевірити актуальність статусу обʼєктів.',
    priority: 'medium',
    status: 'in_progress',
    role: 'duty_officer',
    assignee: 'черговий офіцер',
    dueAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: 'TASK-0003',
    title: 'Підготувати добовий аналітичний звіт',
    description:
      'Зведення по подіях, обʼєктах та джерелах. Окремо виділити тренди по БпЛА та артобстрілах.',
    priority: 'high',
    status: 'new',
    role: 'section_lead',
    assignee: 'керівник напрямку',
    dueAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: 'T-1',
    title: 'Приклад задачі',
    description: 'Опис задачі',
    role: 'analyst',
    assignee: 'Беркут',
    assigneeName: 'ст. лейтенант Іваненко І.І.',
    priority: 'high',
    status: 'in_progress',
    dueAt: '2025-11-14T18:00:00Z',
    createdAt: '2025-11-14T09:00:00Z',
  },
]
