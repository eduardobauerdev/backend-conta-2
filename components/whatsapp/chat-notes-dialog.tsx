"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Loader2, StickyNote, Save, History, Clock } from "lucide-react"
import { toast } from "sonner"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { getCookie } from "@/lib/auth"

interface ChatNotesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  chatId: string
  chatName: string
  onNotesChange?: () => void
}

interface ChatNote {
  id: string
  chat_id: string
  content: string
  created_by_id: string
  created_by_name: string
  created_at: string
  updated_at: string
}

export function ChatNotesDialog({ open, onOpenChange, chatId, chatName, onNotesChange }: ChatNotesDialogProps) {
  const [note, setNote] = useState("")
  const [currentNote, setCurrentNote] = useState<ChatNote | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [hasHistory, setHasHistory] = useState(false)

  useEffect(() => {
    if (open && chatId) {
      loadCurrentNote()
      checkHistory()
    }
  }, [open, chatId])

  async function loadCurrentNote() {
    try {
      setLoading(true)
      const response = await fetch(`/api/whatsapp/notes?chatId=${chatId}`)

      if (!response.ok) {
        console.error("Erro ao buscar nota:", response.status)
        return
      }

      const data = await response.json()

      if (data.success && data.note) {
        setCurrentNote(data.note)
        setNote(data.note.content || "")
      } else {
        setCurrentNote(null)
        setNote("")
      }
    } catch (error) {
      console.error("Erro ao carregar nota:", error)
    } finally {
      setLoading(false)
    }
  }

  async function checkHistory() {
    try {
      const response = await fetch(`/api/whatsapp/notes-history?chatId=${chatId}`)

      if (response.ok) {
        const data = await response.json()
        setHasHistory(data.success && data.history?.length > 0)
      }
    } catch (error) {
      console.error("Erro ao verificar histórico:", error)
    }
  }

  async function handleSave() {
    const userId = getCookie("auth_user_id")
    const userName = getCookie("auth_user_name")

    if (!userId || !userName) {
      toast.error("Usuário não autenticado")
      return
    }

    setSaving(true)

    try {
      const response = await fetch("/api/whatsapp/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId,
          chatName,
          content: note.trim(),
          previousContent: currentNote?.content || null,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success(currentNote ? "Nota atualizada!" : "Nota salva!")
        setCurrentNote(data.note)
        onNotesChange?.()
        checkHistory()
        // Fecha o modal após salvar
        onOpenChange(false)
      } else {
        toast.error(data.message || "Erro ao salvar nota")
      }
    } catch (error) {
      console.error("Erro ao salvar nota:", error)
      toast.error("Erro ao salvar nota")
    } finally {
      setSaving(false)
    }
  }

  const hasChanges = note.trim() !== (currentNote?.content || "")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <StickyNote className="w-5 h-5 text-amber-500" />
            Notas do Contato
          </DialogTitle>
          <DialogDescription className="flex items-center justify-between">
            <span>{chatName}</span>
            {currentNote && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Última edição:{" "}
                {formatDistanceToNow(new Date(currentNote.updated_at), {
                  addSuffix: true,
                  locale: ptBR,
                })}
              </Badge>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 py-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-4">
              {currentNote && (
                <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                  <span>Criado por: </span>
                  <strong>{currentNote.created_by_name}</strong>
                  <span> em </span>
                  {new Date(currentNote.created_at).toLocaleString("pt-BR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </div>
              )}

              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Escreva suas notas sobre este contato aqui...

Exemplos de informações úteis:
- Preferências do cliente
- Histórico de interações importantes
- Observações sobre negociações
- Dados relevantes para follow-up"
                className="min-h-[300px] resize-none"
                autoFocus
              />

              {hasChanges && (
                <p className="text-xs text-amber-600 flex items-center gap-1">
                  <span className="inline-block w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                  Alterações não salvas
                </p>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="flex-shrink-0 gap-2 sm:gap-2">
          {hasHistory && (
            <Button
              variant="outline"
              onClick={() => {
                onOpenChange(false)
                // O botão de histórico será aberto pelo componente pai
                window.dispatchEvent(
                  new CustomEvent("openNotesHistory", { detail: { chatId, chatName } })
                )
              }}
              className="mr-auto"
            >
              <History className="w-4 h-4 mr-2" />
              Ver Histórico
            </Button>
          )}
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={saving || !hasChanges}>
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Salvar Nota
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
