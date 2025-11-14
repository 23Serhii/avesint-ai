import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'

type ReportType = 'daily' | 'shift' | 'custom'

export function Reports() {
  const [reportType, setReportType] = useState<ReportType>('daily')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [includeEvents, setIncludeEvents] = useState(true)
  const [includeEntities, setIncludeEntities] = useState(true)
  const [includeSources, setIncludeSources] = useState(false)
  const [notes, setNotes] = useState('')

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
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Формування звіту</h1>
          <p className="text-muted-foreground">
            Конструктор зведень для командування: добові, змінні та кастомні звіти
            за подіями, обʼєктами та джерелами.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Форма налаштування звіту */}
          <div className="space-y-4 rounded-lg border p-4 lg:col-span-1">
            <div className="space-y-2">
              <label className="text-sm font-medium">Тип звіту</label>
              <Select
                value={reportType}
                onValueChange={(v: ReportType) => setReportType(v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Добовий звіт</SelectItem>
                  <SelectItem value="shift">Звіт за зміну</SelectItem>
                  <SelectItem value="custom">Кастомний період</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Початок періоду</label>
                <Input
                  type="datetime-local"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Кінець періоду</label>
                <Input
                  type="datetime-local"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Що включати</label>
              <div className="space-y-2 rounded-md border px-3 py-2 text-sm">
                <label className="flex items-center gap-2">
                  <Checkbox
                    checked={includeEvents}
                    onCheckedChange={(v) => setIncludeEvents(Boolean(v))}
                  />
                  <span>Події (артобстріли, БпЛА, диверсії тощо)</span>
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox
                    checked={includeEntities}
                    onCheckedChange={(v) => setIncludeEntities(Boolean(v))}
                  />
                  <span>Обʼєкти та цілі (склади, мости, штаби)</span>
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox
                    checked={includeSources}
                    onCheckedChange={(v) => setIncludeSources(Boolean(v))}
                  />
                  <span>Статистика по джерелах (Telegram, Twitter тощо)</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Додаткові зауваження / акценти
              </label>
              <Textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Що саме треба підсвітити у звіті для командування…"
              />
            </div>

            <Button className="w-full">Згенерувати звіт (чернетка)</Button>
          </div>

          {/* Превʼю звіту */}
          <div className="space-y-4 rounded-lg border p-4 lg:col-span-2">
            <h2 className="text-lg font-semibold">Чернетка звіту</h2>
            <div className="space-y-3 text-sm">
              <p>
                <span className="font-medium">Тип звіту:</span>{' '}
                {reportType === 'daily'
                  ? 'Добовий звіт'
                  : reportType === 'shift'
                    ? 'Звіт за зміну'
                    : 'Кастомний період'}
              </p>
              <p>
                <span className="font-medium">Період:</span>{' '}
                {from ? new Date(from).toLocaleString('uk-UA') : '—'} {' → '}
                {to ? new Date(to).toLocaleString('uk-UA') : '—'}
              </p>

              <p className="font-medium mt-4">Заплановані розділи:</p>
              <ul className="list-disc pl-5 space-y-1">
                {includeEvents && (
                  <li>
                    Зведення по подіях (класифікація за типами, інтенсивність,
                    часові піки).
                  </li>
                )}
                {includeEntities && (
                  <li>
                    Стан ключових обʼєктів та цілей (пріоритети, зміна статусу,
                    нові обʼєкти).
                  </li>
                )}
                {includeSources && (
                  <li>
                    Оцінка роботи джерел (надiйнiсть, обʼєм трафіку, виявлені
                    аномалії).
                  </li>
                )}
                {!includeEvents &&
                  !includeEntities &&
                  !includeSources && <li>Розділи не вибрані.</li>}
              </ul>

              {notes && (
                <div className="mt-4">
                  <p className="font-medium">Додаткові зауваження:</p>
                  <p className="whitespace-pre-wrap text-muted-foreground">
                    {notes}
                  </p>
                </div>
              )}

              <div className="mt-4 rounded-md border px-3 py-2 text-xs text-muted-foreground">
                На наступному етапі тут можна буде експортувати звіт у PDF / DOCX
                або відправляти по захищених каналах згідно ТЗ.
              </div>
            </div>
          </div>
        </div>
      </Main>
    </>
  )
}
