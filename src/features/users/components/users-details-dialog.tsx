'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { type User } from '../data/schema'
import { roles } from '../data/data'
import { callTypes } from '../data/data'

type UsersDetailsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: User
}

const statusLabel: Record<User['status'], string> = {
  active: 'Активний',
  inactive: 'Неактивний',
  invited: 'Запрошений',
  suspended: 'Призупинений',
}

const roleLabel = (role: User['role']) =>
  roles.find((r) => r.value === role)?.label ?? role

export function UsersDetailsDialog({
                                     open,
                                     onOpenChange,
                                     currentRow,
                                   }: UsersDetailsDialogProps) {
  const statusClass = callTypes.get(currentRow.status)

  const formatDate = (date: Date) =>
    new Date(date).toLocaleString('uk-UA', {
      dateStyle: 'short',
      timeStyle: 'short',
    })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-start">
          <DialogTitle>
            {currentRow.lastName} {currentRow.firstName}
          </DialogTitle>
          <DialogDescription>
            Детальна інформація про користувача та його роль у штабі.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <div className="font-medium">Позивний</div>
              <p className="text-muted-foreground">
                {currentRow.callsign || 'Не вказано'}
              </p>
            </div>
            <div>
              <div className="font-medium">Роль / посада</div>
              <p className="text-muted-foreground">
                {roleLabel(currentRow.role)}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <div className="font-medium">Звання</div>
              <p className="text-muted-foreground">
                {currentRow.rank || 'Не вказано'}
              </p>
            </div>
            <div>
              <div className="font-medium">Підрозділ</div>
              <p className="text-muted-foreground">
                {currentRow.unit || 'Не вказано'}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <div className="font-medium">Контакти</div>
              <p className="text-muted-foreground">
                {currentRow.email}
                <br />
                {currentRow.phoneNumber}
              </p>
            </div>
            <div>
              <div className="font-medium">Статус</div>
              <div className="mt-1 flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className={statusClass + ' capitalize'}
                >
                  {statusLabel[currentRow.status]}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <div className="font-medium">Створено</div>
              <p className="text-muted-foreground">
                {formatDate(currentRow.createdAt)}
              </p>
            </div>
            <div>
              <div className="font-medium">Оновлено</div>
              <p className="text-muted-foreground">
                {formatDate(currentRow.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
