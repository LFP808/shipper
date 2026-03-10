'use client'

import useSWR from 'swr'

export interface Template {
  id: string
  name: string
  length_in: number
  width_in: number
  height_in: number
  weight_lb: number
  created_at: string
}

const fetcher = (url: string) => fetch(url).then(r => {
  if (!r.ok) throw new Error('Failed to load templates')
  return r.json()
})

export function useTemplates() {
  const { data, error, mutate, isLoading } = useSWR<Template[]>('/api/templates', fetcher)

  async function saveTemplate(template: Omit<Template, 'id' | 'created_at'>) {
    const res = await fetch('/api/templates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(template),
    })
    if (!res.ok) throw new Error('Failed to save template')
    await mutate()
  }

  async function deleteTemplate(id: string) {
    const res = await fetch(`/api/templates/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to delete template')
    await mutate()
  }

  return {
    templates: data ?? [],
    isLoading,
    error,
    saveTemplate,
    deleteTemplate,
  }
}
