"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, Tag, Check } from "lucide-react"
import { toast } from "sonner"
import type { Etiqueta } from "@/lib/whatsapp-types"
import { getContrastTextColor } from "@/lib/utils"

interface EtiquetaSelectorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  chatId: string
  chatName: string
  currentEtiquetaIds?: string[]
  onEtiquetaChanged?: () => void
}

export function EtiquetaSelectorDialog({
  open,
  onOpenChange,
  chatId,
  chatName,
  currentEtiquetaIds = [],
  onEtiquetaChanged
}: EtiquetaSelectorDialogProps) {
  const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>(currentEtiquetaIds)

  useEffect(() => {
    if (open) {
      loadEtiquetas()
      setSelectedIds(currentEtiquetaIds)
    }
  }, [open, currentEtiquetaIds])

  async function loadEtiquetas() {
    try {
      setLoading(true)
      const response = await fetch("/api/whatsapp/etiquetas")
      const data = await response.json()

      if (data.success) {
        setEtiquetas(data.etiquetas || [])
      }
    } catch (error) {
      console.error("Erro ao carregar etiquetas:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleToggleEtiqueta(etiquetaId: string) {
    const isSelected = selectedIds.includes(etiquetaId)
    setProcessingId(etiquetaId)

    try {
      if (isSelected) {
        // Remove etiqueta
        const response = await fetch("/api/whatsapp/assign-tag", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chatId, etiquetaId }),
        })

        const data = await response.json()

        if (data.success) {
          setSelectedIds(prev => prev.filter(id => id !== etiquetaId))
          toast.success("Etiqueta removida")
          onEtiquetaChanged?.()
        } else {
          toast.error(data.message || "Erro ao remover etiqueta")
        }
      } else {
        // Adiciona etiqueta
        const response = await fetch("/api/whatsapp/assign-tag", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chatId, etiquetaId }),
        })

        const data = await response.json()

        if (data.success) {
          setSelectedIds(prev => [...prev, etiquetaId])
          toast.success("Etiqueta adicionada")
          onEtiquetaChanged?.()
        } else {
          toast.error(data.message || "Erro ao adicionar etiqueta")
        }
      }
    } catch (error) {
      console.error("Erro ao processar etiqueta:", error)
      toast.error("Erro ao processar etiqueta")
    } finally {
      setProcessingId(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5" />
            Adicionar Etiqueta
          </DialogTitle>
          <DialogDescription>
            Selecione etiquetas para o lead: <span className="font-medium">{chatName}</span>
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : etiquetas.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <Tag className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Nenhuma etiqueta disponível.</p>
            <p className="text-sm">Crie etiquetas em Ajustes → Etiquetas</p>
          </div>
        ) : (
          <div className="grid gap-2 py-4">
            {etiquetas.map((etiqueta) => {
              const isSelected = selectedIds.includes(etiqueta.id)
              const isProcessing = processingId === etiqueta.id

              return (
                <Button
                  key={etiqueta.id}
                  variant={isSelected ? "default" : "outline"}
                  className="w-full justify-start gap-3 h-auto py-3"
                  style={isSelected ? {
                    backgroundColor: etiqueta.cor,
                    borderColor: etiqueta.cor,
                    color: getContrastTextColor(etiqueta.cor)
                  } : undefined}
                  disabled={isProcessing}
                  onClick={() => handleToggleEtiqueta(etiqueta.id)}
                >
                  {isProcessing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: isSelected ? 'currentColor' : etiqueta.cor }}
                    />
                  )}
                  <span className="flex-1 text-left">{etiqueta.nome}</span>
                  {isSelected && !isProcessing && (
                    <Check className="w-4 h-4" />
                  )}
                </Button>
              )
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
