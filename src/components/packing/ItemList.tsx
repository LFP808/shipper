'use client'

import { ItemInputForm } from './ItemInputForm'
import { TemplateSelector } from './TemplateSelector'
import { DevicePicker } from './DevicePicker'
import { Button } from '@/components/ui/button'
import { Plus, Package } from 'lucide-react'
import type { Item } from '@/lib/packing/types'
import type { DevicePreset } from '@/lib/devices'

interface Props {
  items: Item[]
  loading: boolean
  onAdd: () => void
  onRemove: (id: string) => void
  onChange: (id: string, patch: Partial<Item>) => void
  onLoadTemplate: (t: { name: string; length_in: number; width_in: number; height_in: number; weight_lb: number }) => void
  onAddDevice: (device: DevicePreset) => void
  onPack: () => void
}

export function ItemList({ items, loading, onAdd, onRemove, onChange, onLoadTemplate, onAddDevice, onPack }: Props) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-slate-800 flex items-center gap-2">
          <Package className="h-4 w-4 text-blue-500" />
          Items to Ship
        </h2>
        <span className="text-xs text-slate-400">{items.length} item{items.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Column labels */}
      <div className="flex gap-2 items-center text-xs text-slate-400 mb-1 px-1">
        <span className="w-5" />
        <span className="flex-1 min-w-[100px]">Name</span>
        <span>L × W × H</span>
        <span className="ml-1">lb &nbsp; oz</span>
        <span className="ml-1">Qty</span>
        <span className="w-8" />
      </div>

      {/* Item rows */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {items.map((item, i) => (
          <ItemInputForm
            key={item.id}
            item={item}
            index={i}
            onChange={onChange}
            onRemove={onRemove}
          />
        ))}
      </div>

      {/* Template loader */}
      <div className="pt-3 border-t border-slate-100 mt-3">
        <TemplateSelector
          onLoad={onLoadTemplate}
          currentItem={items[items.length - 1]}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-3 flex-wrap">
        <Button variant="outline" size="sm" onClick={onAdd} className="h-9 text-sm flex items-center gap-1">
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
        <DevicePicker onAdd={onAddDevice} />
        <Button
          onClick={onPack}
          disabled={loading || items.length === 0}
          size="sm"
          className="flex-1 min-w-[80px] h-9 text-sm bg-blue-600 hover:bg-blue-700"
        >
          {loading ? 'Packing...' : 'Pack It'}
        </Button>
      </div>
    </div>
  )
}
