import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Package, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: sessions } = await supabase
    .from('packing_sessions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Your recent packing sessions</p>
        </div>
        <Link href="/pack">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Package className="h-4 w-4 mr-2" />
            New Pack Session
          </Button>
        </Link>
      </div>

      {sessions && sessions.length > 0 ? (
        <div className="grid gap-3">
          {sessions.map((session: { id: string; label: string; created_at: string; items: unknown[]; result: { box?: { carrier: string; name: string }; utilizationPct?: number } | null }) => {
            const result = session.result
            const items = session.items
            return (
              <Card key={session.id} className="hover:shadow-md transition-shadow">
                <CardContent className="flex items-center justify-between py-4 px-5">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Package className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">
                        {session.label || `Session — ${new Date(session.created_at).toLocaleDateString()}`}
                      </p>
                      <p className="text-xs text-slate-400">
                        {items?.length ?? 0} items
                        {result?.box ? ` · ${result.box.carrier} ${result.box.name}` : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {result?.utilizationPct != null && (
                      <Badge variant="secondary">{result.utilizationPct}% utilized</Badge>
                    )}
                    <span className="text-xs text-slate-400">
                      {new Date(session.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <Package className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 mb-4">No packing sessions yet.</p>
          <Link href="/pack">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Start Packing
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
