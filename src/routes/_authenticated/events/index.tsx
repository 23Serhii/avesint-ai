import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Events } from '@/features/events'
import {
  eventSeverities,
  eventStatuses,
  eventTypes,
} from '@/features/events/data/schema'

const eventSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  status: z
    .array(z.enum(eventStatuses.map((s) => s.value)))
    .optional()
    .catch([]),
  severity: z
    .array(z.enum(eventSeverities.map((s) => s.value)))
    .optional()
    .catch([]),
  type: z
    .array(z.enum(eventTypes.map((t) => t.value)))
    .optional()
    .catch([]),
  // важливо: key 'filter' — під useTableUrlState
  filter: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/events/')({
  validateSearch: eventSearchSchema,
  component: Events,
})
