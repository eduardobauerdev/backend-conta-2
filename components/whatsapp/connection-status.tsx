"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Unplug, CheckCircle2, QrCode, Loader2, Check, Radio } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ConnectionStatusProps {
  onStatusChange?: (connected: boolean) => void
}

// Função auxiliar de formatação de telefone
function formatPhoneNumber(phone: string): string {
  if (!phone) return ""
  // Remove sufixos do WhatsApp (ex: :12@s.whatsapp.net)
  const cleanPhone = phone.replace(/@.*$/, "").replace(/:\d+$/, "")

  if (cleanPhone.startsWith("55")) {
    const withoutCountryCode = cleanPhone.substring(2)

    if (withoutCountryCode.length === 10) {
      const ddd = withoutCountryCode.substring(0, 2)
      const number = withoutCountryCode.substring(2)
      return `+55 (${ddd}) 9${number.substring(0, 4)}-${number.substring(4)}`
    } else if (withoutCountryCode.length === 11) {
      const ddd = withoutCountryCode.substring(0, 2)
      return `+55 (${ddd}) ${withoutCountryCode.substring(2, 7)}-${withoutCountryCode.substring(7)}`
    }
  }
  return `+${cleanPhone}`
}

export function ConnectionStatus({ onStatusChange }: ConnectionStatusProps) {
  const [state, setState] = useState<{
    connected: boolean
    phone: string | null
    status: string
    loading: boolean
    uptime?: number
    memory?: { chats: number; messages: number }
  }>({
    connected: false,
    phone: null,
    status: "disconnected",
    loading: true,
  })

  useEffect(() => {
    // 1. Busca o status inicial da API
    const fetchInitialStatus = async () => {
      try {
        const response = await fetch("/api/whatsapp/status")
        const data = await response.json()

        if (data.success && data.connected) {
          setState({
            connected: true,
            phone: data.phoneNumber,
            status: "connected",
            loading: false,
            uptime: data.uptime,
            memory: data.memory,
          })
          if (onStatusChange) onStatusChange(true)
        } else {
          setState({
            connected: false,
            phone: null,
            status: "disconnected",
            loading: false,
          })
          if (onStatusChange) onStatusChange(false)
        }
      } catch (error) {
        console.error("Erro ao buscar status:", error)
        setState(prev => ({ ...prev, loading: false, connected: false }))
        if (onStatusChange) onStatusChange(false)
      }
    }

    fetchInitialStatus()

    // 2. Polling a cada 10 segundos para atualizar status
    const intervalId = setInterval(fetchInitialStatus, 10000)

    return () => {
      clearInterval(intervalId)
    }
  }, [onStatusChange])

  // --- RENDERIZAÇÃO ---

  if (state.loading) {
    return (
      <Badge variant="outline" className="gap-1 text-muted-foreground border-muted rounded-md">
        <Loader2 className="w-3 h-3 animate-spin" />
        <span className="hidden sm:inline">Verificando...</span>
      </Badge>
    )
  }

  // CASO 1: CONECTADO (inclui "syncing" - conectado e sincronizando)
  if (state.connected) {
    const formattedPhone = state.phone ? formatPhoneNumber(state.phone) : "Online"
    const isSyncing = state.status === "syncing"

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="default" className="gap-2 cursor-help bg-green-600 hover:bg-green-700 px-3 py-1 text-xs font-medium">
              {isSyncing ? (
                <Radio className="w-3.5 h-3.5 animate-pulse" />
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">{isSyncing ? "Sincronizando..." : formattedPhone}</span>
              <span className="sm:hidden">{isSyncing ? "Sync..." : "Online"}</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">
              {isSyncing 
                ? "WhatsApp conectado - Sincronizando mensagens..." 
                : "WhatsApp conectado e sincronizado"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  // CASO 2: AGUARDANDO LEITURA (QR)
  if (state.status === "qr") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="outline" className="gap-2 cursor-help border-yellow-500 text-yellow-600 bg-yellow-50 text-xs">
              <QrCode className="w-3.5 h-3.5" />
              <span>Aguardando Leitura</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">Novo QR Code gerado. Vá em Ajustes para escanear.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  // CASO 3: DESCONECTADO (Padrão)
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="destructive" className="gap-1.5 cursor-help text-xs">
            <Unplug className="w-3.5 h-3.5" />
            <span>Desconectado</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-sm">
             O servidor está parado ou sem conexão. Vá em Ajustes para conectar.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}