'use client'

import { useState } from 'react'
import { DEVICE_PRESETS, DEVICE_CATEGORIES, type DevicePreset } from '@/lib/devices'
import { Button } from '@/components/ui/button'
import { Smartphone } from 'lucide-react'

interface Props {
  onAdd: (device: DevicePreset) => void
}

export function DevicePicker({ onAdd }: Props) {
  const [open, setOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<typeof DEVICE_CATEGORIES[number]>('iPhone')

  const devices = DEVICE_PRESETS.filter(d => d.category === activeCategory)

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        className="h-9 text-sm flex items-center gap-1"
        onClick={() => setOpen(v => !v)}
      >
        <Smartphone className="h-3.5 w-3.5" />
        Add Device
      </Button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />

          {/* Dropdown */}
          <div className="absolute left-0 bottom-9 z-20 w-72 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden">
            {/* Category tabs */}
            <div className="flex border-b border-slate-100">
              {DEVICE_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-1 text-xs py-2 px-1 font-medium transition-colors ${
                    activeCategory === cat
                      ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                      : 'border-b-2 border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Device list */}
            <div className="max-h-64 overflow-y-auto">
              {devices.map(device => (
                <button
                  key={device.id}
                  onClick={() => { onAdd(device); setOpen(false) }}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-slate-50 text-left border-b border-slate-50 last:border-0"
                >
                  <span className="font-medium text-slate-800">{device.name}</span>
                  <span className="text-slate-400 tabular-nums">
                    {device.length}″ × {device.width}″ × {device.height}″
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
