'use client'

import { useState } from 'react'
import type { Item } from '@/lib/packing/types'
import type { PackResult } from '@/lib/packing/types'
import type { DevicePreset } from '@/lib/devices'


function nextId() { return crypto.randomUUID() }

export function usePackingSession() {
  const [items, setItems] = useState<Item[]>([
    { id: nextId(), name: 'Item 1', length: 6, width: 4, height: 3, weightLb: 1, quantity: 1 },
  ])
  const [result, setResult] = useState<PackResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [padding, setPadding] = useState(false)

  function addItem() {
    setItems(prev => [...prev, { id: nextId(), name: `Item ${prev.length + 1}`, length: 6, width: 4, height: 3, weightLb: 1, quantity: 1 }])
  }

  function removeItem(id: string) {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  function updateItem(id: string, patch: Partial<Item>) {
    setItems(prev => prev.map(item => item.id === id ? { ...item, ...patch } : item))
  }

  function loadTemplate(template: { name: string; length_in: number; width_in: number; height_in: number; weight_lb: number }) {
    const newItem: Item = {
      id: nextId(),
      name: template.name,
      length: template.length_in,
      width: template.width_in,
      height: template.height_in,
      weightLb: template.weight_lb,
      quantity: 1,
    }
    setItems(prev => [...prev, newItem])
  }

  async function pack() {
    setLoading(true)
    setError(null)
    try {
      const pad = padding ? 0.5 : 0
      const paddedItems = pad > 0
        ? items.map(item => ({ ...item, length: item.length + pad, width: item.width + pad, height: item.height + pad }))
        : items
      const res = await fetch('/api/pack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: paddedItems }),
      })
      if (!res.ok) throw new Error('Packing failed')
      const data: PackResult = await res.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  function addDevice(device: DevicePreset, inBox: boolean) {
    setItems(prev => [...prev, {
      id: nextId(),
      name: device.name,
      length: inBox ? device.boxLength : device.length,
      width:  inBox ? device.boxWidth  : device.width,
      height: inBox ? device.boxHeight : device.height,
      weightLb: device.weightLb,
      quantity: 1,
    }])
  }

  return { items, result, loading, error, padding, setPadding, addItem, removeItem, updateItem, loadTemplate, addDevice, pack }
}
