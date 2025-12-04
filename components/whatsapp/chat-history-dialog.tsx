"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Loader2, UserPlus, ArrowRightLeft, UserMinus, StickyNote, Edit, Tag, Pencil, Plus } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { toast } from "sonner"

interface ChatHistoryEntry {
  id: string
  chat_id: string
  chat_name: string
  event_type: string
  event_data: Record<string, any>
  performed_by_id: string
  performed_by_name: string
  created_at: string
}

interface ChatHistoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  chatId: string
  chatName: string
}

export function ChatHistoryDialog({ open, onOpenChange, chatId, chatName }: ChatHistoryDialogProps) {
  const [history, setHistory] = useState<ChatHistoryEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (open && chatId) {
      loadHistory()
    }
  }, [open, chatId])

  async function loadHistory() {
    try {
      setLoading(true)
      const response = await fetch(`/api/whatsapp/chat-history?chatId=${chatId}`)

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

  function getEventIcon(eventType: string) {
    switch (eventType) {
      case "assignment_created":
        return <UserPlus className="w-4 h-4" />
      case "assignment_transferred":
        return <ArrowRightLeft className="w-4 h-4" />
      case "assignment_removed":
        return <UserMinus className="w-4 h-4" />
      case "note_created":
        return <Plus className="w-4 h-4" />
      case "note_updated":
        return <Edit className="w-4 h-4" />
      case "etiqueta_added":
        return <Tag className="w-4 h-4" />
      case "etiqueta_removed":
        return <Tag className="w-4 h-4" />
      case "name_changed":
        return <Pencil className="w-4 h-4" />
      default:
        return <StickyNote className="w-4 h-4" />
    }
  }

  function getEventColor(eventType: string) {
    switch (eventType) {
      case "assignment_created":
        return "bg-green-500/10 text-green-600"
      case "assignment_transferred":
        return "bg-blue-500/10 text-blue-600"
      case "assignment_removed":
        return "bg-red-500/10 text-red-600"
      case "note_created":
        return "bg-amber-500/10 text-amber-600"
      case "note_updated":
        return "bg-amber-500/10 text-amber-600"
      case "etiqueta_added":
        return "bg-purple-500/10 text-purple-600"
      case "etiqueta_removed":
        return "bg-purple-500/10 text-purple-600"
      case "name_changed":
        return "bg-cyan-500/10 text-cyan-600"
      default:
        return "bg-gray-500/10 text-gray-600"
    }
  }

  function getEventBadge(eventType: string) {
    switch (eventType) {
      case "assignment_created":
        return { label: "Atribuição", color: "bg-green-100 text-green-700 border-green-200" }
      case "assignment_transferred":
        return { label: "Transferência", color: "bg-blue-100 text-blue-700 border-blue-200" }
      case "assignment_removed":
        return { label: "Atribuição", color: "bg-red-100 text-red-700 border-red-200" }
      case "note_created":
      case "note_updated":
        return { label: "Nota", color: "bg-amber-100 text-amber-700 border-amber-200" }
      case "etiqueta_added":
      case "etiqueta_removed":
        return { label: "Etiqueta", color: "bg-purple-100 text-purple-700 border-purple-200" }
      case "name_changed":
        return { label: "Nome", color: "bg-cyan-100 text-cyan-700 border-cyan-200" }
      default:
        return { label: "Evento", color: "bg-gray-100 text-gray-700 border-gray-200" }
    }
  }

  function getEventDescription(entry: ChatHistoryEntry) {
    const { event_type, event_data, performed_by_name } = entry

    switch (event_type) {
      case "assignment_created":
        return (
          <span>
            <strong>{performed_by_name}</strong> atribuiu o chat para{" "}
            <strong>{event_data.assigned_to_name}</strong>
          </span>
        )
      case "assignment_transferred":
        return (
          <span>
            <strong>{performed_by_name}</strong> transferiu de{" "}
            <strong>{event_data.from_user_name}</strong> para{" "}
            <strong>{event_data.to_user_name}</strong>
          </span>
        )
      case "assignment_removed":
        return (
          <span>
            <strong>{performed_by_name}</strong> removeu a atribuição de{" "}
            <strong>{event_data.removed_user_name}</strong>
          </span>
        )
      case "note_created":
        return (
          <span>
            <strong>{performed_by_name}</strong> criou uma nota
          </span>
        )
      case "note_updated":
        return (
          <span>
            <strong>{performed_by_name}</strong> atualizou a nota
          </span>
        )
      case "etiqueta_added":
        return (
          <span>
            <strong>{performed_by_name}</strong> adicionou a etiqueta{" "}
            <Badge
              variant="outline"
              className="text-xs ml-1"
              style={{
                backgroundColor: event_data.etiqueta_cor,
                color: "#fff",
                borderColor: event_data.etiqueta_cor,
              }}
            >
              {event_data.etiqueta_nome}
            </Badge>
          </span>
        )
      case "etiqueta_removed":
        return (
          <span>
            <strong>{performed_by_name}</strong> removeu a etiqueta{" "}
            <Badge
              variant="outline"
              className="text-xs ml-1 line-through"
              style={{
                backgroundColor: event_data.etiqueta_cor,
                color: "#fff",
                borderColor: event_data.etiqueta_cor,
              }}
            >
              {event_data.etiqueta_nome}
            </Badge>
          </span>
        )
      case "name_changed":
        return (
          <span>
            <strong>{performed_by_name}</strong> alterou o nome de{" "}
            <span className="line-through text-muted-foreground">{event_data.previous_name}</span> para{" "}
            <strong>{event_data.new_name}</strong>
          </span>
        )
      default:
        return <span>Ação realizada por <strong>{performed_by_name}</strong></span>
    }
  }

  function renderEventDetails(entry: ChatHistoryEntry) {
    const { event_type, event_data } = entry

    if (event_type === "note_created" && event_data.content) {
      return (
        <div className="mt-2 p-2 bg-amber-50 border border-amber-100 rounded text-sm">
          <p className="text-xs text-amber-600 font-medium mb-1">Conteúdo da nota:</p>
          <p className="text-foreground whitespace-pre-wrap text-xs">{event_data.content}</p>
        </div>
      )
    }

    if (event_type === "note_updated") {
      return (
        <div className="mt-2 space-y-2">
          {event_data.previous_content && (
            <div className="p-2 bg-red-50 border border-red-100 rounded text-sm">
              <p className="text-xs text-red-600 font-medium mb-1">Conteúdo anterior:</p>
              <p className="text-muted-foreground whitespace-pre-wrap text-xs line-through">
                {event_data.previous_content}
              </p>
            </div>
          )}
          {event_data.new_content && (
            <div className="p-2 bg-green-50 border border-green-100 rounded text-sm">
              <p className="text-xs text-green-600 font-medium mb-1">Novo conteúdo:</p>
              <p className="text-foreground whitespace-pre-wrap text-xs">{event_data.new_content}</p>
            </div>
          )}
        </div>
      )
    }

    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            📋 Histórico Completo
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
              <p>Nenhum registro encontrado</p>
            </div>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />

              <div className="space-y-4">
                {history.map((entry) => {
                  const badge = getEventBadge(entry.event_type)
                  return (
                    <div key={entry.id} className="relative flex gap-4 group">
                      {/* Timeline dot */}
                      <div
                        className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full ${getEventColor(entry.event_type)}`}
                      >
                        {getEventIcon(entry.event_type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-2">
                        <div className="bg-card border rounded-lg p-3 shadow-sm group-hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <Badge variant="outline" className={`text-[10px] ${badge.color}`}>
                              {badge.label}
                            </Badge>
                            <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                              {formatDistanceToNow(new Date(entry.created_at), {
                                addSuffix: true,
                                locale: ptBR,
                              })}
                            </span>
                          </div>

                          <p className="text-sm mt-1">{getEventDescription(entry)}</p>

                          {renderEventDetails(entry)}

                          <p className="text-[10px] text-muted-foreground mt-2">
                            {new Date(entry.created_at).toLocaleString("pt-BR", {
                              dateStyle: "short",
                              timeStyle: "short",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
