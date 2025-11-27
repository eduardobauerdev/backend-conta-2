"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/user-context"
import { Spinner } from "@/components/ui/spinner"

export default function BancoDeDadosPage() {
  const { user, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user || (user.cargo !== "Administrador" && user.cargo !== "Desenvolvedor")) {
        router.push("/visao-geral")
      } else {
        router.push("/banco-de-dados/leads")
      }
    }
  }, [user, loading, router])

  return (
    <div className="flex-1 flex items-center justify-center min-h-screen">
      <Spinner className="w-8 h-8" />
    </div>
  )
}
