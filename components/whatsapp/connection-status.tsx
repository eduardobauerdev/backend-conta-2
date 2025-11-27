"use client"

import { useState, useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Unplug, CheckCircle2, XCircle, AlertTriangle, Check } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { ConnectionStatus as ConnectionStatusType } from "@/lib/whatsapp-types"

interface ConnectionStatusProps {
  onStatusChange?: (connected: boolean) => void
}

function formatPhoneNumber(phone: string): string {
  // Remove caracteres especiais como :23@s.whatsapp.net
  const cleanPhone = phone.replace(/@.*$/, "").replace(/:\d+$/, "")

  if (cleanPhone.startsWith("55")) {
    const withoutCountryCode = cleanPhone.substring(2)

    if (withoutCountryCode.length === 10) {
      // Número com 10 dígitos após o 55: DDD (2) + número (8)
      // Exemplo: 555193498226 -> adiciona 9 após 51 -> 5551993498226
      const ddd = withoutCountryCode.substring(0, 2) // 51
      const number = withoutCountryCode.substring(2) // 93498226

      // Insere o 9 após o DDD
      const fullNumber = "9" + number // 993498226
      const firstPart = fullNumber.substring(0, 5) // 99349
      const secondPart = fullNumber.substring(5) // 8226

      return `+55 (${ddd}) ${firstPart}-${secondPart}` // +55 (51) 99349-8226
    } else if (withoutCountryCode.length === 11) {
      // Número já com 11 dígitos após o 55: DDD (2) + 9 (1) + número (8)
      const ddd = withoutCountryCode.substring(0, 2)
      const firstPart = withoutCountryCode.substring(2, 7) // 5 dígitos (9XXXX)
      const secondPart = withoutCountryCode.substring(7) // 4 dígitos
      return `+55 (${ddd}) ${firstPart}-${secondPart}`
    } else if (withoutCountryCode.length === 8) {
      // Número fixo com 8 dígitos: XXXX-XXXX
      const ddd = "00" // DDD desconhecido
      const firstPart = withoutCountryCode.substring(0, 4)
      const secondPart = withoutCountryCode.substring(4)
      return `+55 (${ddd}) ${firstPart}-${secondPart}`
    }
  }

  // Se não for formato brasileiro, retorna com + na frente
  return `+${cleanPhone}`
}

export function ConnectionStatus({ onStatusChange }: ConnectionStatusProps) {
  const [status, setStatus] = useState<ConnectionStatusType & { loading: boolean }>({
    connected: false,
    phone: null,
    qr: null,
    loading: true,
  })
  const [error, setError] = useState<string | null>(null)
  const [needsConfiguration, setNeedsConfiguration] = useState(false)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleConfigChange = () => {
      // Recarregar status quando houver mudança na config
      checkStatus()
    }

    window.addEventListener("whatsapp:config", handleConfigChange as EventListener)

    return () => {
      window.removeEventListener("whatsapp:config", handleConfigChange as EventListener)
    }
  }, [])

  useEffect(() => {
    checkStatus()

    // Limpar interval anterior
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    // Só fazer polling se NÃO estiver conectado
    if (!status.connected) {
      intervalRef.current = setInterval(checkStatus, 30000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [status.connected]) // Re-executar quando status.connected mudar

  async function checkStatus() {
    try {
      setError(null)
      const response = await fetch("/api/whatsapp/status")

      const data = await response.json()

      if (data.success) {
        setStatus({
          connected: data.connected,
          phone: data.phone,
          qr: data.qr,
          status: data.status,
          device: data.device,
          loading: false,
        })
        setNeedsConfiguration(false)
        onStatusChange?.(data.connected)
      } else {
        setError(data.message || "Erro ao verificar status")
        setNeedsConfiguration(data.needsConfiguration || false)
        setStatus((prev) => ({ ...prev, loading: false }))
      }
    } catch (err) {
      console.error("[v0] 💥 Erro:", err)
      setError("Não foi possível conectar ao servidor")
      setNeedsConfiguration(true)
      setStatus((prev) => ({ ...prev, loading: false, connected: false }))
      onStatusChange?.(false)
    }
  }

  if (status.loading) {
    return <Badge variant="secondary">Verificando...</Badge>
  }

  if (error) {
    if (needsConfiguration) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="destructive" className="gap-1 cursor-help">
                <AlertTriangle className="w-3 h-3" />
                Servidor Offline
              </Badge>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <div className="space-y-2">
                <p className="text-sm font-medium">{error}</p>
                <p className="text-xs text-muted-foreground">
                  Verifique em Ajustes se a URL do servidor está correta e se o serviço está ativo no Railway.
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="destructive" className="gap-1 cursor-help">
              <XCircle className="w-3 h-3" />
              Erro de Conexão
            </Badge>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p className="text-sm">{error}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  if (status.connected) {
    const formattedPhone = status.phone ? formatPhoneNumber(status.phone) : null

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="default" className="gap-2 cursor-help bg-green-600 hover:bg-green-700 px-4 py-2 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Conectado {formattedPhone}</span>
              <Check className="w-4 h-4 ml-1" />
            </Badge>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p className="text-sm">
              WhatsApp conectado e funcionando
              {status.device && ` • ${status.device.name || status.device.platform}`}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="secondary" className="gap-1 cursor-help">
            <Unplug className="w-3 h-3" />
            Desconectado
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-sm">WhatsApp não está conectado. Configure o servidor e escaneie o QR Code.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
