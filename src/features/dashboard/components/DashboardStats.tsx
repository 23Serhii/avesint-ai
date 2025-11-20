'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Radar, MapPin, Target, Flag } from 'lucide-react'

export function DashboardStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Radar size={16} /> Активні події
          </CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">42</CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Target size={16} /> Виявлені цілі
          </CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">118</CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <MapPin size={16} /> Оновлено за 24 години
          </CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">27</CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Flag size={16} /> Задачі в роботі
          </CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">14</CardContent>
      </Card>
    </div>
  )
}
