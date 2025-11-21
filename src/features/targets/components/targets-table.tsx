'use client'

import { useMemo, useState } from 'react'
import type { TargetObject, TargetPriority, TargetStatus, TargetType, TargetKind } from '../data/schema'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

type Props = {
  items: TargetObject[]
  onRowClick?: (item: TargetObject) => void
}

type StatusFilter = 'all' | TargetStatus
type PriorityFilter = 'all' | TargetPriority
type TypeFilter = 'all' | TargetType
type KindFilter = 'all' | TargetKind

export function TargetsTable({ items, onRowClick }: Props) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [kindFilter, setKindFilter] = useState<KindFilter>('all')

  const statusLabel = (s: TargetStatus) => {
    switch (s) {
      case 'candidate':
        return 'Кандидат'
      case 'observed':
        return 'Спостерігається'
      case 'confirmed':
        return 'Підтверджено'
      case 'tasked':
        return 'Є задача'
      case 'engaged':
        return 'Уражається'
      case 'neutralized':
        return 'Нейтралізовано'
    }
  }

  const priorityLabel = (p: TargetPriority) => {
    switch (p) {
      case 'high':
        return 'Високий'
      case 'medium':
        return 'Середній'
      case 'low':
        return 'Низький'
    }
  }

  const priorityVariant = (p: TargetPriority) => {
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

  const statusVariant = (s: TargetStatus) => {
    switch (s) {
      case 'candidate':
        return 'outline'
      case 'observed':
        return 'secondary'
      case 'confirmed':
        return 'default'
      case 'tasked':
        return 'default'
      case 'engaged':
        return 'destructive'
      case 'neutralized':
        return 'outline'
      default:
        return 'outline'
    }
  }

  const kindLabel = (k: TargetKind) =>
    k === 'object' ? 'Обʼєкт' : 'Ціль'

  const typeLabel = (t: TargetType) => {
    switch (t) {
      case 'infrastructure':
        return 'Інфраструктура'
      case 'vehicle':
        return 'Техніка'
      case 'personnel':
        return 'Жива сила'
      case 'position':
        return 'Позиція'
      case 'other':
        return 'Інше'
    }
  }

  const filteredItems = useMemo(
    () =>
      items.filter((item) => {
        const q = search.toLowerCase().trim()
        const text = (
          item.title +
          ' ' +
          (item.locationText ?? '') +
          ' ' +
          (item.gridRef ?? '') +
          ' ' +
          (item.notes ?? '')
        ).toLowerCase()

        if (q && !text.includes(q)) return false
        if (statusFilter !== 'all' && item.status !== statusFilter) return false
        if (priorityFilter !== 'all' && item.priority !== priorityFilter) return false
        if (typeFilter !== 'all' && item.type !== typeFilter) return false
        if (kindFilter !== 'all' && item.kind !== kindFilter) return false

        return true
      }),
    [items, search, statusFilter, priorityFilter, typeFilter, kindFilter]
  )

  return (
    <div className="rounded-lg border">
      {/* Тулбар */}
      <div className="flex flex-col gap-3 border-b px-4 py-3 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-semibold">Обʼєкти та цілі</h3>
          <p className="text-xs text-muted-foreground">
            Облік виявлених обʼєктів та цілей з пріоритетами, статусами і координатами.
          </p>
        </div>

        <div className="flex flex-1 flex-wrap items-center gap-2 sm:justify-end">
          <Input
            placeholder="Пошук за назвою, локацією, примітками…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />

          <Select
            value={kindFilter}
            onValueChange={(v: KindFilter) => setKindFilter(v)}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Тип запису" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Обʼєкти + цілі</SelectItem>
              <SelectItem value="object">Лише обʼєкти</SelectItem>
              <SelectItem value="target">Лише цілі</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={typeFilter}
            onValueChange={(v: TypeFilter) => setTypeFilter(v)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Тип" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Усі типи</SelectItem>
              <SelectItem value="infrastructure">Інфраструктура</SelectItem>
              <SelectItem value="vehicle">Техніка</SelectItem>
              <SelectItem value="personnel">Жива сила</SelectItem>
              <SelectItem value="position">Позиції</SelectItem>
              <SelectItem value="other">Інше</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={statusFilter}
            onValueChange={(v: StatusFilter) => setStatusFilter(v)}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Будь-який статус</SelectItem>
              <SelectItem value="candidate">Кандидат</SelectItem>
              <SelectItem value="observed">Спостерігається</SelectItem>
              <SelectItem value="confirmed">Підтверджено</SelectItem>
              <SelectItem value="tasked">Є задача</SelectItem>
              <SelectItem value="engaged">Уражається</SelectItem>
              <SelectItem value="neutralized">Нейтралізовано</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={priorityFilter}
            onValueChange={(v: PriorityFilter) => setPriorityFilter(v)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Пріоритет" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Будь-який</SelectItem>
              <SelectItem value="high">Високий</SelectItem>
              <SelectItem value="medium">Середній</SelectItem>
              <SelectItem value="low">Низький</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Таблиця */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Назва</TableHead>
            <TableHead>Тип</TableHead>
            <TableHead>Локація</TableHead>
            <TableHead>Пріоритет</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead className="text-right">Останнє виявлення</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item) => (
            <TableRow
              key={item.id}
              className={cn('cursor-pointer hover:bg-muted/60')}
              onClick={() => onRowClick?.(item)}
            >
              <TableCell className="font-medium">
                {item.title}
                <div className="text-[11px] text-muted-foreground">
                  {kindLabel(item.kind)}
                  {item.source ? ` · Джерело: ${item.source}` : null}
                </div>
                {item.notes && (
                  <div className="text-[11px] text-muted-foreground line-clamp-1">
                    {item.notes}
                  </div>
                )}
              </TableCell>
              <TableCell>
                <div className="text-sm">{typeLabel(item.type)}</div>
              </TableCell>
              <TableCell>
                <div className="text-xs text-muted-foreground">
                  {item.locationText ?? '—'}
                </div>
                {item.gridRef && (
                  <div className="text-[11px] font-mono uppercase">
                    {item.gridRef}
                  </div>
                )}
              </TableCell>
              <TableCell>
                <Badge variant={priorityVariant(item.priority) as any}>
                  {priorityLabel(item.priority)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={statusVariant(item.status) as any}>
                  {statusLabel(item.status)}
                </Badge>
              </TableCell>
              <TableCell className="text-right text-xs text-muted-foreground">
                {item.lastSeenAt
                  ? item.lastSeenAt.toLocaleString('uk-UA', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  })
                  : '—'}
              </TableCell>
            </TableRow>
          ))}

          {filteredItems.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="py-6 text-center text-sm">
                Немає записів. Спробуйте змінити фільтри.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
