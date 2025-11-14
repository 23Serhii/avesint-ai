import { z } from 'zod'

export const eventTypes = [
  { value: 'artillery', label: 'Artillery strike' },
  { value: 'uav', label: 'UAV activity' },
  { value: 'ground_assault', label: 'Ground assault' },
  { value: 'sabotage', label: 'Sabotage / DRG' },
  { value: 'cyber', label: 'Cyber incident' },
  { value: 'other', label: 'Other' },
] as const

export const eventSeverities = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
] as const

export const eventStatuses = [
  { value: 'new', label: 'New' },
  { value: 'in_review', label: 'In review' },
  { value: 'verified', label: 'Verified' },
  { value: 'rejected', label: 'Rejected / Fake' },
] as const

export const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string().optional(),
  type: z.enum(eventTypes.map((t) => t.value)),
  severity: z.enum(eventSeverities.map((s) => s.value)),
  status: z.enum(eventStatuses.map((s) => s.value)),
  confidence: z.number().min(0).max(1).optional(), // 0–1, як у ТЗ
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
  // один інцидент може групувати кілька подій — поки просто optional
  incidentId: z.string().nullable().optional(),
  // список джерел, які дали/підтвердили подію
  sourceIds: z.array(z.string()).default([]),

  occurredAt: z.string(), // ISO datetime
  createdAt: z.string(),
  updatedAt: z.string().optional(),

  // додаткові поля для UI / аналітики
  tags: z.array(z.string()).optional(),
})

export type Event = z.infer<typeof eventSchema>
export type EventStatus = (typeof eventStatuses)[number]['value']
export type EventSeverity = (typeof eventSeverities)[number]['value']
export type EventType = (typeof eventTypes)[number]['value']
