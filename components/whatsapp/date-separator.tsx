"use client"

import { cn } from "@/lib/utils"

interface DateSeparatorProps {
  date: Date
  className?: string
}

export function DateSeparator({ date, className }: DateSeparatorProps) {
  const formatDate = (d: Date): string => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
    const messageDate = new Date(d.getFullYear(), d.getMonth(), d.getDate())
    
    if (messageDate.getTime() === today.getTime()) {
      return "Hoje"
    }
    
    if (messageDate.getTime() === yesterday.getTime()) {
      return "Ontem"
    }
    
    // Se for da mesma semana, mostrar dia da semana
    const diffDays = Math.floor((today.getTime() - messageDate.getTime()) / (24 * 60 * 60 * 1000))
    if (diffDays < 7) {
      const dias = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]
      return dias[d.getDay()]
    }
    
    // Formato completo para datas mais antigas
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined
    })
  }

  return (
    <div className={cn("flex items-center justify-center my-4", className)}>
      <div className="bg-gray-200/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-300 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
        {formatDate(date)}
      </div>
    </div>
  )
}

// Helper function para determinar se deve mostrar separador
export function shouldShowDateSeparator(
  currentTimestamp: number,
  previousTimestamp: number | null
): boolean {
  if (!previousTimestamp) return true
  
  const currentDate = new Date(currentTimestamp)
  const previousDate = new Date(previousTimestamp)
  
  // Compara apenas as datas (sem horário)
  return (
    currentDate.getFullYear() !== previousDate.getFullYear() ||
    currentDate.getMonth() !== previousDate.getMonth() ||
    currentDate.getDate() !== previousDate.getDate()
  )
}
