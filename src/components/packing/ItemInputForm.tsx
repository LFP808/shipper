'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Trash2, Minus, Plus } from 'lucide-react'
import type { Item } from '@/lib/packing/types'

interface Props {
  item: Item
  index: number
  onChange: (id: string, patch: Partial<Item>) => void
  onRemove: (id: string) => void
}

// Convert decimal lbs to whole lbs + oz (1 lb = 16 oz)
function toLbOz(weightLb: number): { lbs: number; oz: number } {
  const lbs = Math.floor(weightLb)
  const oz = Math.round((weightLb - lbs) * 16)
  return { lbs, oz }
}

export function ItemInputForm({ item, index, onChange, onRemove }: Props) {
  const { lbs, oz } = toLbOz(item.weightLb)

  function handleLbsChange(newLbs: number) {
    const clamped = Math.max(0, Math.floor(newLbs))
    onChange(item.id, { weightLb: clamped + oz / 16 })
  }

  function handleOzChange(newOz: number) {
    const clamped = Math.min(15, Math.max(0, Math.round(newOz)))
    onChange(item.id, { weightLb: lbs + clamped / 16 })
  }

  function handleQuantityChange(delta: number) {
    const next = Math.max(1, (item.quantity ?? 1) + delta)
    onChange(item.id, { quantity: next })
  }

  const qty = item.quantity ?? 1

  return (
    <div className="flex flex-wrap gap-2 items-center py-2 border-b border-slate-100 last:border-0">
      <span className="text-xs text-slate-400 w-5 text-right">{index + 1}</span>
      <Input
        placeholder="Name"
        value={item.name}
        onChange={e => onChange(item.id, { name: e.target.value })}
        className="flex-1 min-w-[100px]"
      />
      <div className="flex gap-1 items-center">
        <DimInput label="L" value={item.length} onChange={v => onChange(item.id, { length: v })} />
        <span className="text-slate-300 text-xs">×</span>
        <DimInput label="W" value={item.width}  onChange={v => onChange(item.id, { width: v })} />
        <span className="text-slate-300 text-xs">×</span>
        <DimInput label="H" value={item.height} onChange={v => onChange(item.id, { height: v })} />
        <span className="text-xs text-slate-400">in</span>
      </div>
      <div className="flex gap-1 items-center">
        <WeightInput label="lb" value={lbs} min={0} onChange={handleLbsChange} />
        <WeightInput label="oz" value={oz} min={0} max={15} onChange={handleOzChange} />
      </div>
      {/* Quantity stepper */}
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleQuantityChange(-1)}
          disabled={qty <= 1}
          className="h-8 w-8"
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="text-sm font-medium text-slate-700 w-5 text-center">{qty}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleQuantityChange(1)}
          className="h-8 w-8"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(item.id)}
        className="h-8 w-8 text-slate-400 hover:text-red-500"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

function DimInput({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="relative">
      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">{label}</span>
      <Input
        type="number"
        min="0.1"
        step="0.1"
        value={value}
        onChange={e => onChange(parseFloat(e.target.value) || 0)}
        className="w-16 pl-6 pr-1 text-sm"
      />
    </div>
  )
}

function WeightInput({ label, value, min, max, onChange }: {
  label: string
  value: number
  min: number
  max?: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex items-center gap-1">
      <Input
        type="number"
        min={min}
        max={max}
        step="1"
        value={value}
        onChange={e => onChange(parseInt(e.target.value) || 0)}
        className="w-12 text-sm text-right"
      />
      <span className="text-xs text-slate-400 w-4">{label}</span>
    </div>
  )
}
