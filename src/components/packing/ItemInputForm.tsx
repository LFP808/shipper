'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import type { Item } from '@/lib/packing/types'

interface Props {
  item: Item
  index: number
  onChange: (id: string, patch: Partial<Item>) => void
  onRemove: (id: string) => void
}

export function ItemInputForm({ item, index, onChange, onRemove }: Props) {
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
        <DimInput
          label="L"
          value={item.length}
          onChange={v => onChange(item.id, { length: v })}
        />
        <span className="text-slate-300 text-xs">×</span>
        <DimInput
          label="W"
          value={item.width}
          onChange={v => onChange(item.id, { width: v })}
        />
        <span className="text-slate-300 text-xs">×</span>
        <DimInput
          label="H"
          value={item.height}
          onChange={v => onChange(item.id, { height: v })}
        />
        <span className="text-xs text-slate-400">in</span>
      </div>
      <div className="flex gap-1 items-center">
        <DimInput
          label="lbs"
          value={item.weightLb}
          onChange={v => onChange(item.id, { weightLb: v })}
        />
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
