"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Unplug, CheckCircle2, QrCode, Loader2, Check, Radio } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { createClient } from "@/lib/supabase/client"

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
    status: string // 'connected' | 'disconnected' | 'qr'
    loading: boolean
  }>({
    connected: false,
    phone: null,
    status: "disconnected",
    loading: true,
  })

  const supabase = createClient()

  useEffect(() => {
    // 1. Busca o status inicial no banco
    const fetchInitialStatus = async () => {
      try {
        const { data } = await supabase
          .from("instance_settings")
          .select("*")
          .eq("id", 1)
          .single()

        if (data) {
          updateState(data)
        } else {
          setState(prev => ({ ...prev, loading: false }))
        }
      } catch (error) {
        console.error("Erro ao buscar status:", error)
        setState(prev => ({ ...prev, loading: false }))
      }
    }

    fetchInitialStatus()

    // 2. Inscreve-se para atualizações em tempo real
    const channel = supabase
      .channel("connection_status_badge")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "instance_settings",
          filter: "id=eq.1",
        },
        (payload) => {
          const newData = payload.new
          updateState(newData)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Atualiza o estado local com base nos dados do banco
  const updateState = (data: any) => {
    // "syncing" também é considerado conectado (está conectado, apenas sincronizando mensagens)
    const isConnected = data.status === "connected" || data.status === "syncing"
    
    setState({
      connected: isConnected,
      phone: data.phone,
      status: data.status,
      loading: false,
    })

    // Notifica componente pai se necessário
    if (onStatusChange) onStatusChange(isConnected)
  }

  // --- RENDERIZAÇÃO ---

  if (state.loading) {
    return (
      <Badge variant="outline" className="gap-1 text-muted-foreground border-muted rounded-sm">
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
            <Badge variant="default" className="gap-2 cursor-help bg-green-600 hover:bg-green-700 px-3 py-1 text-xs font-medium rounded-sm">
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
            <Badge variant="outline" className="gap-2 cursor-help border-yellow-500 text-yellow-600 bg-yellow-50 text-xs rounded-sm">
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
          <Badge variant="destructive" className="gap-1.5 cursor-help text-xs rounded-sm">
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