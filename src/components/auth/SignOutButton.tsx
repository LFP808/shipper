'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export function SignOutButton() {
  const router = useRouter()

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
    router.refresh()
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-full justify-start text-slate-500 hover:text-slate-800 px-2"
      onClick={signOut}
    >
      <LogOut className="h-4 w-4 mr-2" />
      Sign Out
    </Button>
  )
}
