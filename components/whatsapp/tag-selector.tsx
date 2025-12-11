"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tag, Check } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import type { Etiqueta } from "@/lib/whatsapp-types"

interface TagSelectorProps {
  chatId: string
  currentEtiquetaId?: string | null
  currentEtiquetaIds?: string[]
  onTagAssigned?: () => void
  availableTags?: Etiqueta[]
}

export function TagSelector({ chatId, currentEtiquetaId, currentEtiquetaIds = [], onTagAssigned, availableTags }: TagSelectorProps) {
  const [etiquetas, setEtiquetas] = useState<Etiqueta[]>(availableTags || [])
  const [loading, setLoading] = useState(!availableTags)
  const [assigning, setAssigning] = useState(false)

  useEffect(() => {
    if (!availableTags) {
      loadEtiquetas()
    } else {
      setEtiquetas(availableTags)
      setLoading(false)
    }
  }, [availableTags])

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

  async function handleAssignTag(etiquetaId: string | null, isCurrentlySelected: boolean = false) {
    try {
      setAssigning(true)
      
      // Se a etiqueta clicada já está selecionada, remove ela (toggle)
      if (isCurrentlySelected && etiquetaId) {
        console.log("🏷️ Removendo etiqueta (toggle):", { chatId, etiquetaId })
        
        const response = await fetch("/api/whatsapp/assign-tag", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chatId, etiquetaId }),
        })
        
        const data = await response.json()
        
        if (data.success) {
          toast.success("Etiqueta removida")
          onTagAssigned?.()
        } else {
          toast.error(data.message || "Erro ao remover etiqueta")
        }
      } else {
        console.log("🏷️ Atribuindo etiqueta:", { chatId, etiquetaId })
        
        const response = await fetch("/api/whatsapp/assign-tag", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chatId, etiquetaId }),
        })

        console.log("📡 Response status:", response.status)
        
        const data = await response.json()
        console.log("📦 Response data:", data)

        if (data.success) {
          toast.success(etiquetaId ? "Etiqueta atribuída" : "Etiqueta removida")
          onTagAssigned?.()
        } else {
          toast.error(data.message || "Erro ao atribuir etiqueta")
        }
      }
    } catch (error) {
      console.error("❌ Erro ao atribuir/remover etiqueta:", error)
      toast.error("Erro ao processar etiqueta")
    } finally {
      setAssigning(false)
    }
  }

  if (loading) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={assigning}>
          <Tag className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {etiquetas.length === 0 ? (
          <div className="p-2 text-sm text-neutral-500 text-center">
            Nenhuma etiqueta disponível
          </div>
        ) : (
          <>
            {etiquetas.map((etiqueta) => {
              const isSelected = currentEtiquetaIds.includes(etiqueta.id) || currentEtiquetaId === etiqueta.id
              return (
                <DropdownMenuItem
                  key={etiqueta.id}
                  onClick={() => handleAssignTag(etiqueta.id, isSelected)}
                  className={`cursor-pointer ${isSelected ? 'bg-accent' : ''}`}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: etiqueta.cor }}
                    />
                    <span className="flex-1">{etiqueta.nome}</span>
                    {isSelected && (
                      <Check className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                </DropdownMenuItem>
              )
            })}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
