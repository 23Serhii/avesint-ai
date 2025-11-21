import { useEffect, useState } from 'react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { tasks as initialTasks } from './data/tasks'
// eslint-disable-next-line no-duplicate-imports
import type { Task } from './data/tasks'
import { TasksTable } from './components/tasks-table'
import { TasksCreateDialog } from './components/tasks-create-dialog'
import { useAuthStore } from '@/stores/auth-store'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

const CURRENT_CALLSIGN = 'Беркут'
const CURRENT_ROLE: Task['role'] = 'section_lead'

function normalizeRoles(raw: unknown): string[] {
  if (!raw) return []
  if (Array.isArray(raw)) {
    return raw.map((r) => String(r).toLowerCase().replace(/^role_/, ''))
  }

  return String(raw)
    .split(',')
    .map((r) => r.trim().toLowerCase().replace(/^role_/, ''))
}

export function Tasks() {
  const [items, setItems] = useState<Task[]>(initialTasks)
  const [createOpen, setCreateOpen] = useState(false)

  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const { auth } = useAuthStore()
  const roles = normalizeRoles(auth.user?.role ?? (auth.user as any)?.roles)

  const isAdmin = roles.includes('admin')
  const isOfficer = roles.includes('officer')
  const isAnalyst = roles.includes('analyst')
  const isUser = roles.includes('user')

  // доступи:
  // - "Усі задачі" тільки admin + officer
  // - "Мої задачі" для всіх, крім admin (офіцер теж може)
  const canViewAll = isAdmin || isOfficer
  const canViewMy = isOfficer || isAnalyst || isUser

  const [view, setView] = useState<'all' | 'my'>(() => {
    if (canViewAll) return 'all'
    if (canViewMy) return 'my'
    return 'all'
  })

  // якщо ролі змінились — не тримаємо недоступний таб
  useEffect(() => {
    setView((current) => {
      if (current === 'all' && !canViewAll && canViewMy) return 'my'
      if (current === 'my' && !canViewMy && canViewAll) return 'all'
      return current
    })
  }, [canViewAll, canViewMy])

  const handleTaskCreated = (task: Task) => {
    setItems((prev) => [...prev, task])
  }

  const handleOpenTask = (task: Task) => {
    setSelectedTask(task)
    setDetailsOpen(true)
  }

  const filteredItems =
    view === 'all'
      ? items
      : items.filter((t) => {
        // тут ти можеш підставити свою логіку "моїх" задач
        // зараз — по позивному
        return (t as any).assignee === CURRENT_CALLSIGN
      })

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
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Задачі штабу</h1>
            <p className="text-muted-foreground">
              Панель начальника та посадових осіб для постановки й контролю задач.
            </p>
          </div>
        </div>

        <Tabs
          value={view}
          onValueChange={(val) => setView(val as 'all' | 'my')}
          className="flex flex-1 flex-col gap-4"
        >
          <div className="flex items-center justify-between gap-4">
            <TabsList>
              {canViewAll && <TabsTrigger value="all">Усі задачі</TabsTrigger>}
              {canViewMy && <TabsTrigger value="my">Мої задачі</TabsTrigger>}
            </TabsList>
          </div>

          <TasksTable
            items={filteredItems}
            mode={view}
            currentCallsign={CURRENT_CALLSIGN}
            currentRole={CURRENT_ROLE}
            showRoleFilter={view === 'all' && canViewAll}
            onCreateClick={() => setCreateOpen(true)}
            // ⬇️ Повертаємо модалку замість navigate
            onOpenTask={handleOpenTask}
          />
        </Tabs>
      </Main>

      <TasksCreateDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onTaskCreated={handleTaskCreated}
      />

      <TaskDetailsDialog
        task={selectedTask}
        open={detailsOpen}
        onOpenChange={(open) => {
          setDetailsOpen(open)
          if (!open) setSelectedTask(null)
        }}
      />
    </>
  )
}

type TaskDetailsDialogProps = {
  task: Task | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function TaskDetailsDialog({ task, open, onOpenChange }: TaskDetailsDialogProps) {
  if (!task) return null

  // поля підлаштуй під свій Task, якщо треба
  const title = (task as any).title ?? `Задача #${task.id}`
  const description = (task as any).description ?? ''
  const status = (task as any).status
  const priority = (task as any).priority
  const assignee = (task as any).assignee ?? (task as any).callsign
  const createdAt = (task as any).createdAt
  const dueDate = (task as any).dueDate

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Детальна інформація по задачі штабу.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {status && (
              <Badge variant="outline">
                Статус: {String(status)}
              </Badge>
            )}
            {priority && (
              <Badge variant="outline">
                Пріоритет: {String(priority)}
              </Badge>
            )}
            {assignee && (
              <Badge variant="outline">
                Виконавець: {String(assignee)}
              </Badge>
            )}
          </div>

          {description && (
            <div>
              <h4 className="mb-1 text-sm font-medium text-muted-foreground">
                Опис
              </h4>
              <p className="whitespace-pre-wrap text-sm">
                {description}
              </p>
            </div>
          )}

          <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
            {createdAt && (
              <div>
                <span className="font-medium">Створено:</span> {String(createdAt)}
              </div>
            )}
            {dueDate && (
              <div>
                <span className="font-medium">Дедлайн:</span> {String(dueDate)}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
