import { useState } from 'react'
import type { Task } from '../data/tasks'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type SubtaskStatus = 'new' | 'in_progress' | 'done'

type Subtask = {
  id: string
  title: string
  status: SubtaskStatus
  assignee?: string
  notes?: string
}

type TaskDetailsPageProps = {
  task: Task
}

const statusLabel: Record<SubtaskStatus, string> = {
  new: 'Нова',
  in_progress: 'В роботі',
  done: 'Виконана',
}

export function TaskDetailsPage({ task }: TaskDetailsPageProps) {
  const [subtasks, setSubtasks] = useState<Subtask[]>([
    {
      id: '1',
      title: 'Збір відкритих джерел (OSINT) по району',
      status: 'in_progress',
      assignee: task.assignee ?? 'аналітик',
      notes: 'Основні джерела: Telegram, DeepState, офіційні зведення.',
    },
    {
      id: '2',
      title: 'Геопривʼязка обʼєктів на мапі',
      status: 'new',
    },
  ])

  const [newSubtaskTitle, setNewSubtaskTitle] = useState('')
  const [newSubtaskNotes, setNewSubtaskNotes] = useState('')

  const addSubtask = () => {
    const title = newSubtaskTitle.trim()
    if (!title) return

    setSubtasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        title,
        status: 'new',
        notes: newSubtaskNotes.trim() || undefined,
      },
    ])

    setNewSubtaskTitle('')
    setNewSubtaskNotes('')
  }

  const toggleSubtaskStatus = (id: string) => {
    setSubtasks((prev) =>
      prev.map((st) =>
        st.id === id
          ? {
            ...st,
            status:
              st.status === 'new'
                ? 'in_progress'
                : st.status === 'in_progress'
                  ? 'done'
                  : 'new',
          }
          : st
      )
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Заголовок задачі */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {task.title}
          </h1>
          {task.description && (
            <p className="max-w-2xl text-sm text-muted-foreground">
              {task.description}
            </p>
          )}
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            {task.assignee && (
              <span>
                Виконавець: <strong>«{task.assignee}»</strong>
              </span>
            )}
            <span>Роль: {task.role}</span>
            {task.dueAt && (
              <span>
                Дедлайн:{' '}
                {new Date(task.dueAt).toLocaleString('uk-UA', {
                  dateStyle: 'short',
                  timeStyle: 'short',
                })}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <Badge variant="outline">
            Пріоритет: {task.priority.toUpperCase()}
          </Badge>
          <Badge>{task.status}</Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr,1.4fr]">
        {/* Ліва колонка: підзадачі */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm uppercase text-muted-foreground">
                Підзадачі
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Форма створення підзадачі */}
              <div className="space-y-2 rounded-md border bg-muted/40 p-3">
                <p className="text-xs text-muted-foreground">
                  Розбий основну задачу на конкретні кроки для аналітиків /
                  виконавців.
                </p>
                <Input
                  placeholder="Назва підзадачі..."
                  value={newSubtaskTitle}
                  onChange={(e) => setNewSubtaskTitle(e.target.value)}
                />
                <Textarea
                  rows={2}
                  placeholder="Деталі, джерела, формат результату (необовʼязково)..."
                  value={newSubtaskNotes}
                  onChange={(e) => setNewSubtaskNotes(e.target.value)}
                />
                <Button size="sm" onClick={addSubtask}>
                  Додати підзадачу
                </Button>
              </div>

              {/* Список підзадач */}
              <div className="space-y-2">
                {subtasks.map((st) => (
                  <div
                    key={st.id}
                    className="flex cursor-pointer items-start justify-between gap-3 rounded-md border bg-background p-3 text-sm hover:bg-muted/60"
                    onClick={() => toggleSubtaskStatus(st.id)}
                  >
                    <div>
                      <div className="font-medium">{st.title}</div>
                      {st.notes && (
                        <div className="text-xs text-muted-foreground">
                          {st.notes}
                        </div>
                      )}
                      {st.assignee && (
                        <div className="mt-1 text-[11px] text-muted-foreground">
                          Виконавець: «{st.assignee}»
                        </div>
                      )}
                    </div>
                    <Badge variant="outline" className="shrink-0 text-[11px]">
                      {statusLabel[st.status]}
                    </Badge>
                  </div>
                ))}

                {subtasks.length === 0 && (
                  <p className="text-xs text-muted-foreground">
                    Підзадач поки немає. Додай першу вище.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Права колонка: інструменти */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm uppercase text-muted-foreground">
                Аналітичні інструменти
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Тут будуть інтегровані модулі: мапа, часові лінії, AI-помічник,
                граф звʼязків, файли розвідданих.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Графік виконання</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground">
              <p>
                Плейсхолдер під міні-таймлайн / Gantt / графік. Сюди можна
                винести часові привʼязки підзадач.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Звʼязки та обʼєкти</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground">
              <p>
                Плейсхолдер під граф обʼєктів: населені пункти, цілі, підрозділи,
                джерела. Пізніше можна прикрутити graph-візуалізацію.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
