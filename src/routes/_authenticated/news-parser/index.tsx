import { createFileRoute } from '@tanstack/react-router'
import { NewsParser } from '@/features/news-parser'

export const Route = createFileRoute('/_authenticated/news-parser/')({
  component: NewsParser,
})
