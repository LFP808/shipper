'use client'

import { useState } from 'react'
import { useTemplates } from '@/hooks/useTemplates'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BookOpen, Trash2 } from 'lucide-react'
import type { Item } from '@/lib/packing/types'

interface Props {
  onLoad: (template: { name: string; length_in: number; width_in: number; height_in: number; weight_lb: number }) => void
  currentItem?: Item
}

export function TemplateSelector({ onLoad, currentItem }: Props) {
  const { templates, saveTemplate, deleteTemplate } = useTemplates()
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    if (!currentItem) return
    setSaving(true)
    await saveTemplate({
      name: currentItem.name,
      length_in: currentItem.length,
      width_in: currentItem.width,
      height_in: currentItem.height,
      weight_lb: currentItem.weightLb,
    })
    setSaving(false)
  }

  return (
    <div className="flex gap-2 items-center flex-wrap">
      {templates.length > 0 && (
        <div className="flex gap-1 items-center">
          <Select onValueChange={val => {
            const t = templates.find(t => t.id === val)
            if (t) onLoad(t)
          }}>
            <SelectTrigger className="w-44 h-8 text-xs">
              <SelectValue placeholder="Load template…" />
            </SelectTrigger>
            <SelectContent>
              {templates.map(t => (
                <SelectItem key={t.id} value={t.id}>
                  <div className="flex justify-between items-center gap-2 w-full">
                    <span>{t.name}</span>
                    <span className="text-xs text-slate-400">
                      {t.length_in}×{t.width_in}×{t.height_in}″
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-red-500"
            title="Delete selected template"
            onClick={() => {/* handled per-template */}}
          >
            <BookOpen className="h-4 w-4" />
          </Button>
        </div>
      )}

      {currentItem && (
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving…' : '+ Save as Template'}
        </Button>
      )}

      {templates.length > 0 && (
        <div className="flex gap-1">
          {templates.slice(0, 3).map(t => (
            <Button
              key={t.id}
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              title={`Delete "${t.name}"`}
              onClick={() => deleteTemplate(t.id)}
            >
              <Trash2 className="h-3 w-3 text-slate-300 hover:text-red-400" />
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
