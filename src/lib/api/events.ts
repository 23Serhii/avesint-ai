import { api } from './client'
import type { Event } from '@/features/events/data/schema'

export interface ListEventsParams {
  page?: number
  pageSize?: number
  status?: string[]
  severity?: string[]
  type?: string[]
  search?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  page: number
  pageSize: number
  total: number
}

export async function listEvents(params: ListEventsParams) {
  const res = await api.get<PaginatedResponse<Event>>('/events', { params })
  return res.data
}

export async function getEvent(id: string) {
  const res = await api.get<Event>(`/events/${id}`)
  return res.data
}

export async function createEvent(payload: Partial<Event>) {
  const res = await api.post<Event>('/events', payload)
  return res.data
}

export async function updateEvent(id: string, payload: Partial<Event>) {
  const res = await api.patch<Event>(`/events/${id}`, payload)
  return res.data
}

export async function deleteEvent(id: string) {
  await api.delete(`/events/${id}`)
}
