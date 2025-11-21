import { z } from 'zod'

export const targetKindSchema = z.enum(['object', 'target'])
export type TargetKind = z.infer<typeof targetKindSchema>

export const targetTypeSchema = z.enum([
  'infrastructure',
  'vehicle',
  'personnel',
  'position',
  'other',
])
export type TargetType = z.infer<typeof targetTypeSchema>

export const targetStatusSchema = z.enum([
  'candidate',      // потенційна ціль / об’єкт
  'observed',       // спостерігається
  'confirmed',      // підтверджений
  'tasked',         // є бойова задача
  'engaged',        // поцілено / уражається
  'neutralized',    // знищено / нейтралізовано
])
export type TargetStatus = z.infer<typeof targetStatusSchema>

export const targetPrioritySchema = z.enum(['high', 'medium', 'low'])
export type TargetPriority = z.infer<typeof targetPrioritySchema>

export const targetSchema = z.object({
  id: z.string(),
  title: z.string(),               // Назва об’єкта/цілі
  kind: targetKindSchema,          // object / target
  type: targetTypeSchema,          // інфраструктура, техніка тощо
  priority: targetPrioritySchema,  // пріоритет
  status: targetStatusSchema,      // статус по циклу цілі

  gridRef: z.string().optional(),      // MGRS / умовні координати
  locationText: z.string().optional(), // описово: «пн.-сх. околиця Бахмута»
  lat: z.number().optional(),
  lon: z.number().optional(),

  firstSeenAt: z.coerce.date().optional(),
  lastSeenAt: z.coerce.date().optional(),

  source: z.string().optional(),   // джерело: БПЛА, HUMINT, SIGINT…
  notes: z.string().optional(),    // короткі коментарі штабу
})

export type TargetObject = z.infer<typeof targetSchema>
export const targetListSchema = z.array(targetSchema)
