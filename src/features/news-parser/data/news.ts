export type NewsItem = {
  id: string
  title: string
  sourceId: string
  sourceName: string
  severity: 'low' | 'medium' | 'high'
  link?: string
  createdAt: string
}

export type NewsSource = {
  id: string
  name: string
  type: 'telegram' | 'twitter' | 'website' | 'rss' | 'other'
  reliability: number // 0–1
  isActive: boolean
  lastSeenAt?: string
}

export const newsSources: NewsSource[] = [
  {
    id: 'SRC-TG-001',
    name: 'DeepState UA',
    type: 'telegram',
    reliability: 0.9,
    isActive: true,
    lastSeenAt: new Date().toISOString(),
  },
  {
    id: 'SRC-TW-002',
    name: 'OSINTDefender',
    type: 'twitter',
    reliability: 0.8,
    isActive: true,
    lastSeenAt: new Date().toISOString(),
  },
  {
    id: 'SRC-WS-003',
    name: 'MilitaryLand',
    type: 'website',
    reliability: 0.75,
    isActive: false,
  },
]

export const newsFeed: NewsItem[] = [
  {
    id: 'NEWS-0001',
    title: 'Повідомлення про артобстріл промзони поблизу Авдіївки',
    sourceId: 'SRC-TG-001',
    sourceName: 'DeepState UA',
    severity: 'high',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'NEWS-0002',
    title: 'Зафіксована активність БпЛА над Дніпровською заплавою',
    sourceId: 'SRC-TW-002',
    sourceName: 'OSINTDefender',
    severity: 'medium',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'NEWS-0003',
    title: 'Звіт про можливу диверсію на залізничній гілці',
    sourceId: 'SRC-WS-003',
    sourceName: 'MilitaryLand',
    severity: 'low',
    createdAt: new Date().toISOString(),
  },
]
