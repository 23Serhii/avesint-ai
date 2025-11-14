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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-2"
      >
        <div>
          <h3 className="mb-1 text-sm font-semibold uppercase text-muted-foreground">
            Створення задачі
          </h3>
          <p className="mb-4 text-xs text-muted-foreground">
            Начальник формує задачу із вказанням виконавця, ролі, пріоритету та
            дедлайну.
          </p>
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Назва задачі</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Напр. «Розвідзвіт по району Бахмут-південь»"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Короткий зміст</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={3}
                  placeholder="Конкретизуй, що саме потрібно зробити, які джерела, формат звіту тощо."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Роль виконавця</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Оберіть роль" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="analyst">Аналітик</SelectItem>
                      <SelectItem value="duty_officer">
                        Черговий офіцер
                      </SelectItem>
                      <SelectItem value="section_lead">
                        Керівник напряму
                      </SelectItem>
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

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="assignee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Позивний виконавця</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Напр. «Беркут», «Лорд», «Омега»"
                  />
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
                  <Input
                    {...field}
                    placeholder="Напр. «ст. лейтенант Іваненко І.І.»"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пріоритет</FormLabel>
              <FormControl>
                <RadioGroup
                  className="flex flex-col gap-2 sm:flex-row"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="high" />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      Високий
                    </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="medium" />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      Середній
                    </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="low" />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      Низький
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full sm:w-auto">
          Створити задачу
        </Button>
      </form>
    </Form>
  )
}
