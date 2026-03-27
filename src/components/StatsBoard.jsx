import { Card, CardContent } from '@heroui/react'

const stats = [
  { key: 'total', label: 'Total', color: 'text-foreground' },
  { key: 'applied', label: 'Applied', color: 'text-primary' },
  { key: 'interview', label: 'Interviews', color: 'text-warning' },
  { key: 'offer', label: 'Offers', color: 'text-success' },
  { key: 'rejected', label: 'Rejected', color: 'text-danger' },
]

export default function StatsBoard({ total, countByStatus }) {
  const getValue = (key) => (key === 'total' ? total : countByStatus(key))

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
      {stats.map((s) => (
        <Card key={s.key}>
          <CardContent className="text-center py-4">
            <p className={`text-3xl font-bold ${s.color}`}>{getValue(s.key)}</p>
            <p className="text-sm text-default-500">{s.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
