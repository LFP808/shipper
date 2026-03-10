import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Package, LayoutDashboard } from 'lucide-react'
import { SignOutButton } from '@/components/auth/SignOutButton'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-slate-200 flex flex-col">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-200">
          <Package className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-slate-800 text-lg">Shipper</span>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1">
          <NavLink href="/dashboard" icon={<LayoutDashboard className="h-4 w-4" />}>
            Dashboard
          </NavLink>
          <NavLink href="/pack" icon={<Package className="h-4 w-4" />}>
            Pack Items
          </NavLink>
        </nav>

        <div className="px-4 py-4 border-t border-slate-200">
          <p className="text-xs text-slate-400 truncate mb-2">{user.email}</p>
          <SignOutButton />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}

function NavLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
    >
      {icon}
      {children}
    </Link>
  )
}
