'use client'

import { useState } from 'react'
import { useTemplates } from '@/hooks/useTemplates'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import type { Item } from '@/lib/packing/types'

interface Props {
  onLoad: (template: { name: string; length_in: number; width_in: number; height_in: number; weight_lb: number }) => void
  currentItem?: Item
}

export function TemplateSelector({ onLoad, currentItem }: Props) {
  const { templates, saveTemplate, deleteTemplate } = useTemplates()
  const [saving, setSaving] = useState(false)
  const [open, setOpen] = useState(false)

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
      {/* Templates dropdown */}
      {templates.length > 0 && (
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs"
            onClick={() => setOpen(v => !v)}
          >
            Load template
          </Button>

          {open && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
              <div className="absolute left-0 bottom-9 z-20 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden">
                <div className="max-h-48 overflow-y-auto">
                  {templates.map(t => (
                    <div
                      key={t.id}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 border-b border-slate-50 last:border-0 group"
                    >
                      <button
                        className="flex-1 text-left"
                        onClick={() => { onLoad(t); setOpen(false) }}
                      >
                        <p className="text-xs font-medium text-slate-800">{t.name}</p>
                        <p className="text-[10px] text-slate-400 tabular-nums">
                          {t.length_in}×{t.width_in}×{t.height_in}″
                        </p>
                      </button>
                      <button
                        onClick={() => deleteTemplate(t.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-300 hover:text-red-500 p-1"
                        title={`Delete "${t.name}"`}
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Save current item as template */}
      {currentItem && (
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : '+ Save as Template'}
        </Button>
      )}
    </div>
  )
}
