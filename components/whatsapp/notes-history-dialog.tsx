"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Loader2, StickyNote, Edit, Plus } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { toast } from "sonner"

interface NotesHistoryEntry {
  id: string
  chat_id: string
  chat_name: string
  action: "created" | "updated"
  previous_content: string | null
  new_content: string
  performed_by_id: string
  performed_by_name: string
  created_at: string
}

interface NotesHistoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  chatId: string
  chatName: string
}

export function NotesHistoryDialog({ open, onOpenChange, chatId, chatName }: NotesHistoryDialogProps) {
  const [history, setHistory] = useState<NotesHistoryEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (open && chatId) {
      loadHistory()
    }
  }, [open, chatId])

  async function loadHistory() {
    try {
      setLoading(true)
      const response = await fetch(`/api/whatsapp/notes-history?chatId=${chatId}`)

      if (!response.ok) {
        console.error("Erro ao buscar histórico:", response.status)
        toast.error("Erro ao carregar histórico")
        return
      }

      const data = await response.json()

      if (data.success) {
        setHistory(data.history || [])
      } else {
        toast.error("Erro ao carregar histórico")
      }
    } catch (error) {
      console.error("Erro ao carregar histórico:", error)
      toast.error("Erro ao carregar histórico")
    } finally {
      setLoading(false)
    }
  }

  function getActionIcon(action: string) {
    switch (action) {
      case "created":
        return <Plus className="w-4 h-4" />
      case "updated":
        return <Edit className="w-4 h-4" />
      default:
        return <StickyNote className="w-4 h-4" />
    }
  }

  function getActionText(entry: NotesHistoryEntry) {
    switch (entry.action) {
      case "created":
        return `Nota criada por ${entry.performed_by_name}`
      case "updated":
        return `Nota atualizada por ${entry.performed_by_name}`
      default:
        return "Ação desconhecida"
    }
  }

  function getActionColor(action: string) {
    switch (action) {
      case "created":
        return "bg-green-500/10 text-green-600"
      case "updated":
        return "bg-blue-500/10 text-blue-600"
      default:
        return "bg-gray-500/10 text-gray-600"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <StickyNote className="w-5 h-5 text-amber-500" />
            Histórico de Notas
          </DialogTitle>
          <DialogDescription>{chatName}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[500px] pr-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhum registro de notas encontrado</p>
            </div>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />

              <div className="space-y-6">
                {history.map((entry) => (
                  <div key={entry.id} className="relative flex gap-4 group">
                    {/* Timeline dot */}
                    <div
                      className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full ${getActionColor(entry.action)}`}
                    >
                      {getActionIcon(entry.action)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-6">
                      <div className="bg-card border rounded-lg p-4 shadow-sm group-hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{getActionText(entry)}</p>
                          </div>
                          <Badge variant="outline" className="text-xs whitespace-nowrap">
                            {formatDistanceToNow(new Date(entry.created_at), {
                              addSuffix: true,
                              locale: ptBR,
                            })}
                          </Badge>
                        </div>

                        {/* Conteúdo da nota */}
                        <div className="mt-3 space-y-2">
                          {entry.action === "updated" && entry.previous_content && (
                            <div className="p-2 bg-red-50 border border-red-100 rounded text-sm">
                              <p className="text-xs text-red-600 font-medium mb-1">Conteúdo anterior:</p>
                              <p className="text-muted-foreground whitespace-pre-wrap text-xs line-through">
                                {entry.previous_content}
                              </p>
                            </div>
                          )}
                          
                          <div className="p-2 bg-green-50 border border-green-100 rounded text-sm">
                            <p className="text-xs text-green-600 font-medium mb-1">
                              {entry.action === "created" ? "Conteúdo:" : "Novo conteúdo:"}
                            </p>
                            <p className="text-foreground whitespace-pre-wrap text-xs">
                              {entry.new_content}
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(entry.created_at).toLocaleString("pt-BR", {
                            dateStyle: "long",
                            timeStyle: "short",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
