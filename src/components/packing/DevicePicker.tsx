'use client'

import { useState } from 'react'
import { DEVICE_PRESETS, DEVICE_CATEGORIES, type DevicePreset } from '@/lib/devices'
import { Button } from '@/components/ui/button'
import { Smartphone } from 'lucide-react'

interface Props {
  onAdd: (device: DevicePreset, inBox: boolean) => void
}

export function DevicePicker({ onAdd }: Props) {
  const [open, setOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<typeof DEVICE_CATEGORIES[number]>('iPhone')
  const [inBox, setInBox] = useState(false)

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
            {/* In box toggle */}
            <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-100">
              <span className="text-xs text-slate-600 font-medium">Dimensions</span>
              <div className="flex items-center gap-1 rounded-md border border-slate-200 overflow-hidden text-xs">
                <button
                  onClick={() => setInBox(false)}
                  className={`px-2 py-1 transition-colors ${!inBox ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                >
                  Bare device
                </button>
                <button
                  onClick={() => setInBox(true)}
                  className={`px-2 py-1 transition-colors ${inBox ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                >
                  With box
                </button>
              </div>
            </div>

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
              {devices.map(device => {
                const l = inBox ? device.boxLength : device.length
                const w = inBox ? device.boxWidth  : device.width
                const h = inBox ? device.boxHeight  : device.height
                return (
                  <button
                    key={device.id}
                    onClick={() => { onAdd(device, inBox); setOpen(false) }}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-slate-50 text-left border-b border-slate-50 last:border-0"
                  >
                    <span className="font-medium text-slate-800">{device.name}</span>
                    <span className="text-slate-400 tabular-nums">
                      {l}″ × {w}″ × {h}″
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
