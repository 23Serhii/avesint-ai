// src/routes/_authenticated/tasks/index.tsx
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { Tasks } from '@/features/tasks'

const CAN_VIEW_ALL = ['admin', 'officer']
const CAN_VIEW_MY = ['user', 'analyst', 'officer'] // admin — свідомо нема

function normalizeRoles(raw: unknown): string[] {
  if (!raw) return []

  if (Array.isArray(raw)) {
    return raw.map((r) => String(r).toLowerCase().replace(/^role_/, ''))
  }

  return String(raw)
    .split(',')
    .map((r) => r.trim().toLowerCase().replace(/^role_/, ''))
}

export const Route = createFileRoute('/_authenticated/tasks/')({
  beforeLoad: () => {
    const { auth } = useAuthStore.getState()
    if (!auth.user) throw redirect({ to: '/sign-in' })

    const roles = normalizeRoles(auth.user.role ?? auth.user.roles)

    // Якщо немає жодної ролі — тимчасово пропускаємо (dev mode)
    if (roles.length === 0) return

    const canAccess = roles.some(
      (r) => CAN_VIEW_ALL.includes(r) || CAN_VIEW_MY.includes(r)
    )

    if (!canAccess) {
      throw redirect({ to: '/403' })
    }
  },
  component: Tasks,
})
