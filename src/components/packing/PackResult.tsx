'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Box, CheckCircle2 } from 'lucide-react'
import type { PackResult as TPackResult } from '@/lib/packing/types'

interface Props {
  result: TPackResult
}

export function PackResult({ result }: Props) {
  const { box, placedItems, unpackedItems, utilizationPct, totalWeightLb } = result
  const hasUnpacked = unpackedItems.length > 0

  return (
    <Card className="border-0 bg-slate-50">
      <CardHeader className="pb-2 pt-3 px-4">
        <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Box className="h-4 w-4 text-blue-500" />
          Recommended Box
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-3 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-800">{box.name}</p>
            <p className="text-xs text-slate-500">{box.carrier}</p>
          </div>
          <Badge variant="secondary" className="text-xs">
            {box.length}″ × {box.width}″ × {box.height}″
          </Badge>
        </div>

        <div className="flex gap-4 text-sm">
          <div>
            <p className="text-xs text-slate-400">Space Used</p>
            <p className="font-semibold text-slate-800">{utilizationPct}%</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Total Weight</p>
            <p className="font-semibold text-slate-800">{totalWeightLb.toFixed(1)} lb</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Items Packed</p>
            <p className="font-semibold text-slate-800">{placedItems.length}</p>
          </div>
        </div>

        {/* Utilization bar */}
        <div className="space-y-1">
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(utilizationPct, 100)}%`,
                backgroundColor: utilizationPct > 90 ? '#ef4444' : utilizationPct > 70 ? '#f59e0b' : '#22c55e',
              }}
            />
          </div>
          <p className="text-xs text-slate-400 text-right">{utilizationPct}% of box volume</p>
        </div>

        {/* Item legend */}
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-600">Packing order:</p>
          {placedItems.map((p, i) => (
            <div key={p.itemId} className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">{i + 1}.</span>
              <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: p.color }} />
              <span className="text-slate-700">{p.itemName}</span>
              <span className="text-slate-400 ml-auto">
                {p.length.toFixed(1)}×{p.width.toFixed(1)}×{p.height.toFixed(1)}″
              </span>
            </div>
          ))}
        </div>

        {hasUnpacked ? (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-md p-2 text-xs text-red-700">
            <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">
                {unpackedItems.length} item{unpackedItems.length !== 1 ? 's' : ''} did not fit
              </p>
              <ul className="mt-0.5 space-y-0.5">
                {unpackedItems.map(item => (
                  <li key={item.id} className="font-medium">{item.name}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-md p-2 text-xs text-green-700">
            <CheckCircle2 className="h-4 w-4" />
            All items fit perfectly.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
