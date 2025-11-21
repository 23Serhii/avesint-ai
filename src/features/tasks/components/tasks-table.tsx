import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Task, TaskPriority, TaskRole, TaskStatus } from '../data/tasks'

type Props = {
  items: Task[]
  onCreateClick?: () => void
  onOpenTask?: (task: Task) => void
  mode?: 'all' | 'my'
  currentCallsign?: string
  currentRole?: TaskRole
  showRoleFilter?: boolean
}

type StatusFilter = 'all' | TaskStatus
type RoleFilter = 'all' | TaskRole
type PriorityFilter = 'all' | TaskPriority

export function TasksTable({
  items,
  onCreateClick,
  onOpenTask,
  mode = 'all',
  currentCallsign,
  currentRole,
  showRoleFilter = true,
}: Props) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all')
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all')

  const statusLabel = (s: TaskStatus) => {
    switch (s) {
      case 'new':
        return 'Нова'
      case 'in_progress':
        return 'В роботі'
      case 'done':
        return 'Виконана'
    }
  }

  const roleLabel = (r: TaskRole) => {
    switch (r) {
      case 'analyst':
        return 'Аналітик'
      case 'duty_officer':
        return 'Черговий офіцер'
      case 'section_lead':
        return 'Керівник напряму'
      case 'commander':
        return 'Командир'
    }
  }

  const priorityLabel = (p: TaskPriority) => {
    switch (p) {
      case 'high':
        return 'Високий'
      case 'medium':
        return 'Середній'
      case 'low':
        return 'Низький'
    }
  }

  const priorityVariant = (p: TaskPriority) => {
    switch (p) {
      case 'high':
        return 'destructive'
      case 'medium':
        return 'default'
      case 'low':
      default:
        return 'outline'
    }
  }

  const statusVariant = (s: TaskStatus) => {
    switch (s) {
      case 'new':
        return 'outline'
      case 'in_progress':
        return 'default'
      case 'done':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const filteredItems = useMemo(() => {
    return items.filter((task) => {
      // 1️⃣ Якщо режим "мої задачі" — спочатку відфільтровуємо по позивному/ролі
      if (mode === 'my' && (currentCallsign || currentRole)) {
        const byCallsign =
          currentCallsign &&
          task.assigneeCallsign &&
          task.assigneeCallsign.toLowerCase() === currentCallsign.toLowerCase()

        const byRole = currentRole && task.role === currentRole

        if (!(byCallsign || byRole)) {
          return false
        }
      }

      // 2️⃣ Пошук
      const text = (
        task.title +
        ' ' +
        (task.description ?? '') +
        ' ' +
        (task.assigneeCallsign ?? '') +
        ' ' +
        (task.assigneeUnit ?? '') +
        ' ' +
        (task.assigneeRank ?? '')
      ).toLowerCase()
      const q = search.toLowerCase().trim()

      if (q && !text.includes(q)) return false

      // 3️⃣ Фільтри
      if (statusFilter !== 'all' && task.status !== statusFilter) return false
      if (roleFilter !== 'all' && task.role !== roleFilter) return false
      if (priorityFilter !== 'all' && task.priority !== priorityFilter)
        return false

      return true
    })
  }, [
    items,
    search,
    statusFilter,
    roleFilter,
    priorityFilter,
    mode,
    currentCallsign,
    currentRole,
  ])

  return (
    <div className='rounded-lg border'>
      {/* Верхня панель */}
      <div className='flex flex-col gap-3 border-b px-4 py-3 sm:flex-row sm:items-center'>
        <div>
          <h3 className='font-semibold'>
            {mode === 'my' ? 'Мої задачі' : 'Задачі штабу'}
          </h3>
          <p className='text-muted-foreground text-xs'>
            {mode === 'my'
              ? 'Задачі, де ви виконавець або відповідає ваша роль.'
              : 'Начальник нарізає задачі підлеглим за ролями (аналітики, чергові, керівники).'}
          </p>
        </div>

        <div className='flex flex-1 flex-wrap items-center gap-2 sm:justify-end'>
          <Input
            placeholder='Пошук за назвою, описом або позивним…'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='max-w-xs'
          />

          <Select
            value={statusFilter}
            onValueChange={(v: StatusFilter) => setStatusFilter(v)}
          >
            <SelectTrigger className='w-[140px]'>
              <SelectValue placeholder='Статус' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Будь-який статус</SelectItem>
              <SelectItem value='new'>Нові</SelectItem>
              <SelectItem value='in_progress'>В роботі</SelectItem>
              <SelectItem value='done'>Виконані</SelectItem>
            </SelectContent>
          </Select>

          {showRoleFilter && (
            <Select
              value={roleFilter}
              onValueChange={(v: RoleFilter) => setRoleFilter(v)}
            >
              <SelectTrigger className='w-[170px]'>
                <SelectValue placeholder='Роль' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Всі ролі</SelectItem>
                <SelectItem value='analyst'>Аналітики</SelectItem>
                <SelectItem value='duty_officer'>Чергові офіцери</SelectItem>
                <SelectItem value='section_lead'>
                  Керівники напрямків
                </SelectItem>
                <SelectItem value='commander'>Командир</SelectItem>
              </SelectContent>
            </Select>
          )}

          <Select
            value={priorityFilter}
            onValueChange={(v: PriorityFilter) => setPriorityFilter(v)}
          >
            <SelectTrigger className='w-[160px]'>
              <SelectValue placeholder='Пріоритет' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Будь-який пріоритет</SelectItem>
              <SelectItem value='high'>Високий</SelectItem>
              <SelectItem value='medium'>Середній</SelectItem>
              <SelectItem value='low'>Низький</SelectItem>
            </SelectContent>
          </Select>

          <Button size='sm' variant='outline' onClick={() => onCreateClick?.()}>
            + Нова задача
          </Button>
        </div>
      </div>

      {/* Таблиця */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Назва</TableHead>
            <TableHead>Роль / позивний</TableHead>
            <TableHead>Пріоритет</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead className='text-right'>Дедлайн</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((task) => (
            <TableRow
              key={task.id}
              className='cursor-pointer'
              onClick={() => onOpenTask?.(task)} // ⬅️ відкриває сторінку з підзадачами
            >
              <TableCell className='font-medium'>
                {task.title}
                {task.description && (
                  <div className='text-muted-foreground text-xs'>
                    {task.description}
                  </div>
                )}
              </TableCell>
              <TableCell>
                <div className='text-sm'>{roleLabel(task.role)}</div>
                <div className='text-muted-foreground text-xs'>
                  {task.assigneeCallsign && (
                    <>Позивний «{task.assigneeCallsign}»</>
                  )}
                  {(task.assigneeRank || task.assigneeUnit) && (
                    <div className='text-muted-foreground/80 text-[11px]'>
                      {[task.assigneeRank, task.assigneeUnit]
                        .filter(Boolean)
                        .join(', ')}
                    </div>
                  )}
                </div>
              </TableCell>

              <TableCell>
                <Badge variant={priorityVariant(task.priority) as never}>
                  {priorityLabel(task.priority)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={statusVariant(task.status) as never}>
                  {statusLabel(task.status)}
                </Badge>
              </TableCell>
              <TableCell className='text-muted-foreground text-right text-xs'>
                {task.dueAt
                  ? new Date(task.dueAt).toLocaleString('uk-UA')
                  : '—'}
              </TableCell>
            </TableRow>
          ))}

          {filteredItems.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className='py-6 text-center text-sm'>
                Задач немає. Змініть фільтри або створіть нову задачу.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
