"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, RefreshCw, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface QRScannerProps {
  onConnected: () => void
}

export function QRScanner({ onConnected }: QRScannerProps) {
  const [qrImage, setQrImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [checkingConnection, setCheckingConnection] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [imageLoading, setImageLoading] = useState(false)
  const [imageError, setImageError] = useState(false)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    loadQRCode()

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(checkConnection, 3000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [])

  async function loadQRCode() {
    try {
      setLoading(true)
      setError(null)
      setQrImage(null)
      setImageLoading(false)
      setImageError(false)

      const response = await fetch("/api/whatsapp/qr")

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Erro ao carregar QR Code")
      }

      if (data.qr) {
        setImageLoading(true)
        setQrImage(data.qr)
        setRetryCount(0)
        toast.success("QR Code gerado! Escaneie com seu WhatsApp.")
      } else {
        throw new Error(data.message || "QR Code não disponível")
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Não foi possível gerar o QR Code. Verifique a configuração da API."
      console.error("[v0] 💥 Erro ao carregar QR Code:", error)
      setError(errorMsg)
      setRetryCount((prev) => prev + 1)
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  async function checkConnection() {
    if (checkingConnection) {
      return
    }

    try {
      setCheckingConnection(true)

      const response = await fetch("/api/whatsapp/status")
      const data = await response.json()

      if (data.success && data.connected) {
        toast.success("WhatsApp conectado com sucesso!")
        onConnected()
      }
    } catch (error) {
      // Silent error during polling
    } finally {
      setCheckingConnection(false)
    }
  }

  function handleImageLoad() {
    setImageLoading(false)
    setImageError(false)
  }

  function handleImageError() {
    console.error("[v0] ❌ Erro ao renderizar imagem do QR Code")
    setImageLoading(false)
    setImageError(true)
    setError("Erro ao carregar a imagem do QR Code. Tente gerar um novo.")
  }

  if (loading) {
    return (
      <Card className="p-8">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground">Gerando QR Code...</p>
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="p-8">
        <div className="flex flex-col items-center gap-4">
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Erro ao Gerar QR Code</AlertTitle>
            <AlertDescription className="space-y-2">
              <p>{error}</p>
              {retryCount > 2 && (
                <p className="text-xs mt-2">
                  Múltiplas tentativas falharam. Verifique:
                  <br />• O servidor WhatsApp está ativo no Railway?
                  <br />• A URL em Ajustes está correta?
                  <br />• Há erros nos logs do servidor?
                </p>
              )}
            </AlertDescription>
          </Alert>
          <Button onClick={loadQRCode} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Tentar Novamente {retryCount > 0 && `(${retryCount})`}
          </Button>
        </div>
      </Card>
    )
  }

  if (!qrImage) {
    return (
      <Card className="p-8">
        <div className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground">Não foi possível gerar o QR Code</p>
          <Button onClick={loadQRCode} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Tentar Novamente
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-8">
      <div className="flex flex-col items-center gap-6">
        <div className="text-center space-y-2">
          <h3 className="font-semibold text-lg">Escaneie o QR Code</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Abra o WhatsApp no seu celular, vá em Menu ou Configurações → Aparelhos conectados → Conectar um aparelho
          </p>
        </div>

        <div className="relative w-[260px] h-[260px] flex items-center justify-center">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-lg">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          )}
          {qrImage && !imageError && (
            <img
              src={qrImage || "/placeholder.svg"}
              alt="QR Code do WhatsApp"
              className="rounded-lg shadow-sm"
              style={{ width: 260, height: 260, objectFit: "contain" }}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-lg">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          )}
        </div>

        <Button onClick={loadQRCode} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Gerar Novo QR Code
        </Button>

        {checkingConnection && (
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <Loader2 className="w-3 h-3 animate-spin" />
            Aguardando conexão...
          </p>
        )}
      </div>
    </Card>
  )
}
