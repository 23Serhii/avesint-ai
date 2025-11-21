import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { Loader2, LogIn } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { cn } from '@/lib/utils'
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
import { PasswordInput } from '@/components/password-input'

const formSchema = z.object({
  callsign: z
    .string()
    .min(1, 'Введіть позивний')
    .min(2, 'Позивний надто короткий'),
  password: z
    .string()
    .min(1, 'Введіть пароль')
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  redirectTo?: string
}

export function UserAuthForm({
  className,
  redirectTo,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { auth } = useAuthStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      callsign: '',
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          callsign: data.callsign,
          password: data.password,
        }),
      })

      if (!res.ok) {
        let message = 'Помилка входу'
        try {
          const body = await res.json()
          if (body?.message) message = body.message
        } catch {
          // ignore
        }
        throw new Error(message)
      }

      const result = await res.json()

      // Якщо 2FA вимкнено – одразу зберігаємо токен і юзера
      if (!result.requires2FA) {
        auth.setUser(result.user)
        auth.setAccessToken(result.accessToken)

        const targetPath = redirectTo || '/'
        await navigate({ to: targetPath, replace: true })

        toast.success(
          `Вітаємо, ${result.user.displayName || result.user.callsign}!`
        )
        return
      }

      // Якщо 2FA увімкнено – переходимо на сторінку OTP
      // tempAccessToken будем передавати через search
      await navigate({
        to: '/otp',
        search: {
          token: result.tempAccessToken,
          redirect: redirectTo || '/',
        },
        replace: true,
      })

      toast.message('Введіть одноразовий код із додатку аутентифікації')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Не вдалося увійти'
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='callsign'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Позивний</FormLabel>
              <FormControl>
                <Input
                  placeholder='Напр. VORON'
                  autoComplete='username'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder='********'
                  autoComplete='current-password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <Link
                to='/forgot-password'
                className='text-muted-foreground absolute end-0 -top-0.5 text-sm font-medium hover:opacity-75'
              >
                Забули пароль?
              </Link>
            </FormItem>
          )}
        />

        <Button className='mt-2' disabled={isLoading}>
          {isLoading ? <Loader2 className='animate-spin' /> : <LogIn />}
          Увійти
        </Button>
      </form>
    </Form>
  )
}
