'use client'

import dynamic from 'next/dynamic'
import { usePackingSession } from '@/hooks/usePackingSession'
import { ItemList } from '@/components/packing/ItemList'
import { PackResult } from '@/components/packing/PackResult'

// Dynamically import Three.js scene to avoid SSR issues
const PackScene = dynamic(
  () => import('@/components/visualizer/PackScene').then(m => ({ default: m.PackScene })),
  { ssr: false, loading: () => <div className="w-full h-full bg-slate-50 rounded-lg animate-pulse" /> }
)

export default function PackPage() {
  const { items, result, loading, error, addItem, removeItem, updateItem, loadTemplate, pack } = usePackingSession()

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left panel — items */}
      <div className="w-80 min-w-[300px] border-r border-slate-200 bg-white flex flex-col p-4">
        <ItemList
          items={items}
          loading={loading}
          onAdd={addItem}
          onRemove={removeItem}
          onChange={updateItem}
          onLoadTemplate={loadTemplate}
          onPack={pack}
        />
      </div>

      {/* Right panel — visualizer + result */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
        {/* 3D scene */}
        <div className="flex-1 p-4 min-h-0">
          {result ? (
            <PackScene result={result} />
          ) : (
            <EmptyState loading={loading} error={error} />
          )}
        </div>

        {/* Result panel */}
        {result && (
          <div className="border-t border-slate-200 p-4 bg-white max-h-72 overflow-y-auto">
            <PackResult result={result} />
          </div>
        )}
      </div>
    </div>
  )
}

function EmptyState({ loading, error }: { loading: boolean; error: string | null }) {
  return (
    <div className="w-full h-full flex items-center justify-center rounded-lg border-2 border-dashed border-slate-200">
      <div className="text-center">
        {error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : loading ? (
          <p className="text-slate-400 text-sm">Calculating best fit…</p>
        ) : (
          <>
            <div className="text-5xl mb-3">📦</div>
            <p className="text-slate-500 font-medium">Add items and click &ldquo;Pack It&rdquo;</p>
            <p className="text-slate-400 text-sm mt-1">The 3D visualization will appear here</p>
          </>
        )}
      </div>
    </div>
  )
}
