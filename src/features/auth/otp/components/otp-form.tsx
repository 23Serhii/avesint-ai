
import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { showSubmittedData } from '@/lib/show-submitted-data'
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp'

const requestSchema = z.object({
  email: z
    .string()
    .email('Введіть коректну службову електронну адресу.'),
})

const otpSchema = z.object({
  otp: z
    .string()
    .min(6, 'Введіть 6-значний код.')
    .max(6, 'Введіть 6-значний код.'),
})

type OtpFormProps = React.HTMLAttributes<HTMLDivElement>

export function OtpForm({ className, ...props }: OtpFormProps) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<'request' | 'verify'>('request')
  const [targetEmail, setTargetEmail] = useState<string | null>(null)

  // Крок 1: запит на відправку ОТП
  const requestForm = useForm<z.infer<typeof requestSchema>>({
    resolver: zodResolver(requestSchema),
    defaultValues: { email: '' },
  })

  // Крок 2: ввід ОТП
  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  })

  const otp = otpForm.watch('otp')

  function onSubmitRequest(data: z.infer<typeof requestSchema>) {
    setIsLoading(true)
    // Тут буде виклик бекенду типу /auth/request-otp
    showSubmittedData({ stage: 'request_otp', ...data })

    setTimeout(() => {
      setIsLoading(false)
      setTargetEmail(data.email)
      setStep('verify')
    }, 800)
  }

  function onSubmitOtp(data: z.infer<typeof otpSchema>) {
    setIsLoading(true)
    // Тут буде виклик бекенду типу /auth/verify-otp
    showSubmittedData({ stage: 'verify_otp', ...data, email: targetEmail })

    setTimeout(() => {
      setIsLoading(false)
      navigate({ to: '/' })
    }, 1000)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      {step === 'request' ? (
        <Form {...requestForm}>
          <form
            onSubmit={requestForm.handleSubmit(onSubmitRequest)}
            className='grid gap-4'
          >
            <div>
              <h2 className='text-lg font-semibold'>
                Підтвердження входу
              </h2>
              <p className='text-sm text-muted-foreground'>
                Вкажіть службову електронну пошту, ми надішлемо одноразовий код
                для входу в систему.
              </p>
            </div>

            <FormField
              control={requestForm.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Службова електронна пошта</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='name@mil.gov.ua'
                      autoComplete='email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' disabled={isLoading}>
              Надіслати код
            </Button>
          </form>
        </Form>
      ) : (
        <Form {...otpForm}>
          <form
            onSubmit={otpForm.handleSubmit(onSubmitOtp)}
            className='grid gap-4'
          >
            <div>
              <h2 className='text-lg font-semibold'>
                Введіть одноразовий код
              </h2>
              <p className='text-sm text-muted-foreground'>
                Ми надіслали 6-значний код на адресу{' '}
                <span className='font-medium'>
                  {targetEmail ?? 'вашу електронну пошту'}
                </span>
                . Введіть його нижче, щоб підтвердити вхід.
              </p>
            </div>

            <FormField
              control={otpForm.control}
              name='otp'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='sr-only'>
                    Одноразовий код
                  </FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      {...field}
                      containerClassName='justify-between sm:[&>[data-slot="input-otp-group"]>div]:w-12'
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex items-center gap-2'>
              <Button
                type='button'
                variant='ghost'
                onClick={() => {
                  // повернутися до кроку запиту коду
                  setStep('request')
                  setTargetEmail(null)
                  otpForm.reset({ otp: '' })
                }}
              >
                Змінити адресу
              </Button>
              <Button
                className='ml-auto'
                type='submit'
                disabled={otp.length < 6 || isLoading}
              >
                Підтвердити
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
