'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { Task } from '../data/tasks'
import { TaskCreateForm, type TaskCreateFormValues } from './task-create-form'

type TasksCreateDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onTaskCreated: (task: Task) => void
}

export function TasksCreateDialog({
                                    open,
                                    onOpenChange,
                                    onTaskCreated,
                                  }: TasksCreateDialogProps) {
  const handleCreate = (values: TaskCreateFormValues) => {
    const now = new Date().toISOString()

    const newTask: Task = {
      id:
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : String(Date.now()),
      title: values.title,
      description: values.description ?? '',
      role: values.role,
      assignee: values.assignee,
      assigneeName: values.assigneeName,
      priority: values.priority,
      status: 'new',          // нові задачі за замовчуванням
      dueAt: values.dueAt || undefined,
      createdAt: now,         // якщо в твоєму типі є
      // якщо в Task є ще якісь поля – додай тут
    }

    onTaskCreated(newTask)
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        onOpenChange(state)
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Нова задача штабу</DialogTitle>
        </DialogHeader>

        <TaskCreateForm onCreate={handleCreate} />
      </DialogContent>
    </Dialog>
  )
}
