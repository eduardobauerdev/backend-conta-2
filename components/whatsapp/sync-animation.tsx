"use client"

import { Smartphone, Server } from "lucide-react"

export function SyncAnimation() {
  return (
    <div className="flex items-center justify-center gap-4">
      {/* Celular */}
      <div className="relative">
        <div className="p-3 bg-green-100 rounded-xl border-2 border-green-200 shadow-sm">
          <Smartphone className="w-8 h-8 text-green-600" />
        </div>
        {/* Indicador de ativo */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
      </div>

      {/* Animação de dados fluindo */}
      <div className="flex items-center gap-1 w-20">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-data-flow-1" />
        <div className="w-2 h-2 rounded-full bg-green-500 animate-data-flow-2" />
        <div className="w-2 h-2 rounded-full bg-green-500 animate-data-flow-3" />
        <div className="w-2 h-2 rounded-full bg-green-500 animate-data-flow-4" />
        <div className="w-2 h-2 rounded-full bg-green-500 animate-data-flow-5" />
      </div>

      {/* Servidor */}
      <div className="relative">
        <div className="p-3 bg-blue-100 rounded-xl border-2 border-blue-200 shadow-sm">
          <Server className="w-8 h-8 text-blue-600" />
        </div>
        {/* Luzinhas piscando */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-blink-1" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-blink-2" />
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-blink-3" />
        </div>
      </div>
    </div>
  )
}
