'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    
    // Não proteger a rota de login
    if (pathname === '/login') {
      setIsChecking(false)
      return
    }

    // Verificar se está autenticado
    const authenticated = isAuthenticated()
    
    if (!authenticated) {
      router.push('/login')
      return
    }

    setIsChecking(false)
  }, [pathname, router])

  // Mostrar loading enquanto verifica
  if (isChecking && pathname !== '/login') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 mx-auto mb-4"></div>
          <p className="text-neutral-600">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
