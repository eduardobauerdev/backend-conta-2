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
import { Badge } from "@/components/ui/badge"
import { Tag, Trash2, Loader2 } from "lucide-react"
import { toast } from "sonner"
import type { EtiquetaSimple } from "@/lib/whatsapp-types"
import { getContrastTextColor } from "@/lib/utils"

interface ChatEtiquetasDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  chatId: string
  etiquetas: EtiquetaSimple[]
  onEtiquetaRemoved?: () => void
}

export function ChatEtiquetasDialog({
  open,
  onOpenChange,
  chatId,
  etiquetas,
  onEtiquetaRemoved
}: ChatEtiquetasDialogProps) {
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [localEtiquetas, setLocalEtiquetas] = useState<EtiquetaSimple[]>(etiquetas)

  // Atualiza quando props mudam
  useEffect(() => {
    setLocalEtiquetas(etiquetas)
  }, [etiquetas])

  const handleRemoveEtiqueta = async (etiquetaId: string) => {
    setRemovingId(etiquetaId)
    try {
      const res = await fetch("/api/whatsapp/assign-tag", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, etiquetaId })
      })

      if (res.ok) {
        toast.success("Etiqueta removida")
        setLocalEtiquetas(prev => prev.filter(e => e.id !== etiquetaId))
        onEtiquetaRemoved?.()
        
        // Fecha o dialog se não tiver mais etiquetas
        if (localEtiquetas.length <= 1) {
          onOpenChange(false)
        }
      } else {
        toast.error("Erro ao remover etiqueta")
      }
    } catch {
      toast.error("Erro ao remover etiqueta")
    } finally {
      setRemovingId(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5" />
            Etiquetas do Chat
          </DialogTitle>
          <DialogDescription>
            Gerencie as etiquetas atribuídas a este chat
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {localEtiquetas.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Nenhuma etiqueta atribuída
            </p>
          ) : (
            localEtiquetas.map((etiqueta) => (
              <div
                key={etiqueta.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-card"
              >
                <div className="flex items-center gap-3">
                  <Badge
                    variant="secondary"
                    className="text-sm px-3 py-1 flex items-center gap-2 border rounded-sm"
                    style={{ backgroundColor: etiqueta.cor, borderColor: etiqueta.cor, color: getContrastTextColor(etiqueta.cor) }}
                  >
                    <Tag className="w-3.5 h-3.5" />
                    {etiqueta.nome}
                  </Badge>
                  {etiqueta.descricao && (
                    <span className="text-xs text-muted-foreground">
                      {etiqueta.descricao}
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleRemoveEtiqueta(etiqueta.id)}
                  disabled={removingId === etiqueta.id}
                >
                  {removingId === etiqueta.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
