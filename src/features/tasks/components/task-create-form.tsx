'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// ======== VALIDATION SCHEMA ========

const formSchema = z.object({
  title: z.string().min(1, 'Обовʼязкове поле'),
  description: z.string().optional(),

  role: z.enum(['analyst', 'duty_officer', 'section_lead', 'commander']),

  assignee: z.string().min(1, 'Вкажіть позивний виконавця'),
  assigneeName: z.string().optional(),

  priority: z.enum(['high', 'medium', 'low']),

  dueAt: z.string().optional(),
})

export type TaskCreateFormValues = z.infer<typeof formSchema>

// ======== COMPONENT ========

type TaskCreateFormProps = {
  onCreate: (values: TaskCreateFormValues) => void
}

export function TaskCreateForm({ onCreate }: TaskCreateFormProps) {
  const form = useForm<TaskCreateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      role: 'analyst',
      assignee: '',
      assigneeName: '',
      priority: 'medium',
      dueAt: '',
    },
  })

  const handleSubmit = (values: TaskCreateFormValues) => {
    onCreate(values)

    // Reset form after submit
    form.reset({
      title: '',
      description: '',
      role: 'analyst',
      assignee: '',
      assigneeName: '',
      priority: 'medium',
      dueAt: '',
    })
  }

  return (
    <div className="rounded-lg bg-card border p-4">
      <h3 className="mb-1 text-sm font-semibold uppercase text-muted-foreground">
        Створення задачі
      </h3>

      <p className="mb-4 text-xs text-muted-foreground">
        Заповніть форму щоб створити нову задачу штабу.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">

          {/* ===== Назва ===== */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Назва задачі</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Напр. «Розвідзвіт по району Бахмут-південь»" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ===== Опис ===== */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Короткий зміст</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Конкретизуйте що потрібно зробити..."
                    rows={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ===== Роль + Дедлайн ===== */}
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Роль виконавця</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Оберіть роль" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="analyst">Аналітик</SelectItem>
                        <SelectItem value="duty_officer">Черговий офіцер</SelectItem>
                        <SelectItem value="section_lead">Керівник напряму</SelectItem>
                        <SelectItem value="commander">Командир</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Дедлайн</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* ===== Позивний + ПІБ ===== */}
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="assignee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Позивний виконавця</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Беркут, Лорд, Омега…" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assigneeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ПІБ (необовʼязково)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="ст. лейтенант Іваненко І.І." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* ===== Пріоритет ===== */}
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пріоритет</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex gap-4 flex-wrap"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="high" />
                      <FormLabel className="font-normal">Високий</FormLabel>
                    </div>

                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="medium" />
                      <FormLabel className="font-normal">Середній</FormLabel>
                    </div>

                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="low" />
                      <FormLabel className="font-normal">Низький</FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ===== BUTTON ===== */}
          <Button type="submit" className="w-full sm:w-auto">
            Створити задачу
          </Button>

        </form>
      </Form>
    </div>
  )
}
