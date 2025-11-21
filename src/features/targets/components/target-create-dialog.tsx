'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type {
  TargetKind,
  TargetPriority,
  TargetStatus,
  TargetType,
} from '../data/schema'

// 📌 Форм-типи (усе як string, щоб не ламати react-hook-form)
const formSchema = z.object({
  title: z.string().min(1, 'Назва є обовʼязковою.'),
  kind: z
    .enum(['object', 'target'] as const)
    .default('target'),
  type: z
    .enum(['infrastructure', 'vehicle', 'personnel', 'position', 'other'] as const)
    .default('infrastructure'),
  priority: z
    .enum(['high', 'medium', 'low'] as const)
    .default('medium'),
  status: z
    .enum(
      ['candidate', 'observed', 'confirmed', 'tasked', 'engaged', 'neutralized'] as const
    )
    .default('candidate'),
  locationText: z.string().optional(),
  lat: z
    .string()
    .optional()
    .refine(
      (v) => !v || !Number.isNaN(Number(v)),
      'Невірний формат широти'
    ),
  lon: z
    .string()
    .optional()
    .refine(
      (v) => !v || !Number.isNaN(Number(v)),
      'Невірний формат довготи'
    ),
  gridRef: z.string().optional(),
  source: z.string().optional(),
  notes: z.string().optional(),
})

export type TargetCreateFormValues = z.input<typeof formSchema>


// 📌 Payload, який піде далі нагору (а з нього ти вже збираєш TargetObject)
export type TargetCreatePayload = {
  title: string
  kind: TargetKind
  type: TargetType
  priority: TargetPriority
  status: TargetStatus
  locationText?: string
  lat?: number
  lon?: number
  gridRef?: string
  source?: string
  notes?: string
}

type TargetCreateDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreate: (target: TargetCreatePayload) => void
}

export function TargetCreateDialog({
                                     open,
                                     onOpenChange,
                                     onCreate,
                                   }: TargetCreateDialogProps) {
  const form = useForm<TargetCreateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      kind: 'target',
      type: 'infrastructure',
      priority: 'medium',
      status: 'candidate',
      locationText: '',
      lat: '',
      lon: '',
      gridRef: '',
      source: '',
      notes: '',
    },
  })

  const handleSubmit = (values: TargetCreateFormValues) => {
    const lat =
      values.lat && values.lat.trim() !== ''
        ? Number(values.lat.trim())
        : undefined
    const lon =
      values.lon && values.lon.trim() !== ''
        ? Number(values.lon.trim())
        : undefined

    const payload: TargetCreatePayload = {
      title: values.title,
      kind: values.kind as TargetKind,
      type: values.type as TargetType,
      priority: values.priority as TargetPriority,
      status: values.status as TargetStatus,
      locationText: values.locationText || '',
      lat,
      lon,
      gridRef: values.gridRef || '',
      source: values.source || '',
      notes: values.notes || '',
    }

    onCreate(payload)
    form.reset()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!state) {
          form.reset()
        }
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>Новий обʼєкт / ціль</DialogTitle>
          <DialogDescription>
            Заповни дані по новому обʼєкту або цілі. Ця форма — для швидкого
            занесення в базу перед подальшою роботою (розвідка, задачі,
            ураження).
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-4'
          >
            {/* Назва */}
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Назва</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Напр. «Склад БК на південь від Бахмута»'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Тип + Вид (обʼєкт / ціль) */}
            <div className='grid gap-4 sm:grid-cols-2'>
              <FormField
                control={form.control}
                name='kind'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Категорія</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Обʼєкт чи ціль' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='object'>Обʼєкт</SelectItem>
                          <SelectItem value='target'>Ціль</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Тип</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Тип обʼєкта' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='infrastructure'>
                            Інфраструктура
                          </SelectItem>
                          <SelectItem value='vehicle'>Техніка</SelectItem>
                          <SelectItem value='personnel'>Жива сила</SelectItem>
                          <SelectItem value='position'>Позиція</SelectItem>
                          <SelectItem value='other'>Інше</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Пріоритет + Статус */}
            <div className='grid gap-4 sm:grid-cols-2'>
              <FormField
                control={form.control}
                name='priority'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пріоритет</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Пріоритет' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='high'>Високий</SelectItem>
                          <SelectItem value='medium'>Середній</SelectItem>
                          <SelectItem value='low'>Низький</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Статус</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Статус' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='candidate'>Кандидат</SelectItem>
                          <SelectItem value='observed'>
                            Спостерігається
                          </SelectItem>
                          <SelectItem value='confirmed'>
                            Підтверджено
                          </SelectItem>
                          <SelectItem value='tasked'>Є задача</SelectItem>
                          <SelectItem value='engaged'>Уражається</SelectItem>
                          <SelectItem value='neutralized'>
                            Нейтралізовано
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Локація */}
            <FormField
              control={form.control}
              name='locationText'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Локація (опис)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={2}
                      placeholder='Напр. «Промзона, південна околиця, орієнтир — білий ангар».'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid gap-4 sm:grid-cols-3'>
              <FormField
                control={form.control}
                name='lat'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Широта</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='48.12345'
                        inputMode='decimal'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='lon'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Довгота</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='37.54321'
                        inputMode='decimal'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='gridRef'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>MGRS / сітка</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='наприклад, 38T MN 12345 67890'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Джерело + нотатки */}
            <FormField
              control={form.control}
              name='source'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Джерело інформації</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='БПЛА, HUMINT, SIGINT...'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='notes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Нотатки</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={3}
                      placeholder='Додаткові уточнення, обмеження по ураженню, особливості...'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end gap-2 pt-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  form.reset()
                  onOpenChange(false)
                }}
              >
                Скасувати
              </Button>
              <Button type='submit'>Створити</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
