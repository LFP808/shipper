'use client'

import { useState } from 'react'
import type { Item } from '@/lib/packing/types'
import type { PackResult } from '@/lib/packing/types'

let idCounter = 0
function nextId() { return `item-${++idCounter}` }

export function usePackingSession() {
  const [items, setItems] = useState<Item[]>([
    { id: nextId(), name: 'Item 1', length: 6, width: 4, height: 3, weightLb: 1 },
  ])
  const [result, setResult] = useState<PackResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function addItem() {
    setItems(prev => [...prev, { id: nextId(), name: `Item ${prev.length + 1}`, length: 6, width: 4, height: 3, weightLb: 1 }])
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
    }
    setItems(prev => [...prev, newItem])
  }

  async function pack() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/pack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
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

  return { items, result, loading, error, addItem, removeItem, updateItem, loadTemplate, pack }
}
