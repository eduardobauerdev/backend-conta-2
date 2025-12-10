"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Loader2, UserPlus, ArrowRightLeft, UserMinus, StickyNote, Edit, Tag, Pencil, Plus, ClipboardList, DollarSign, Undo2, User } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { toast } from "sonner"
import { getContrastTextColor } from "@/lib/utils"

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
      case "lead_converted":
        return <DollarSign className="w-4 h-4" />
      case "lead_unconverted":
        return <Undo2 className="w-4 h-4" />
      default:
        return <StickyNote className="w-4 h-4" />
    }
  }

  function getEventColor(eventType: string) {
    switch (eventType) {
      case "assignment_created":
        return "bg-green-500 text-white"
      case "assignment_transferred":
        return "bg-blue-500 text-white"
      case "assignment_removed":
        return "bg-red-500 text-white"
      case "note_created":
        return "bg-amber-500 text-white"
      case "note_updated":
        return "bg-amber-500 text-white"
      case "etiqueta_added":
        return "bg-purple-500 text-white"
      case "etiqueta_removed":
        return "bg-purple-500 text-white"
      case "name_changed":
        return "bg-cyan-500 text-white"
      case "lead_converted":
        return "bg-emerald-500 text-white"
      case "lead_unconverted":
        return "bg-orange-500 text-white"
      default:
        return "bg-gray-500 text-white"
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
      case "lead_converted":
        return { label: "Conversão", color: "bg-emerald-100 text-emerald-700 border-emerald-200" }
      case "lead_unconverted":
        return { label: "Desconversão", color: "bg-orange-100 text-orange-700 border-orange-200" }
      default:
        return { label: "Evento", color: "bg-gray-100 text-gray-700 border-gray-200" }
    }
  }

  // Badge de usuário no estilo do badge de atribuição
  function UserBadge({ name, color }: { name: string; color?: string }) {
    const displayName = name || "Usuário"
    const bgColor = color || "#6b7280" // cinza padrão
    return (
      <Badge
        variant="secondary"
        className="text-xs h-6 px-1.5 flex items-center gap-1 cursor-pointer rounded-md border"
        style={{
          backgroundColor: `color-mix(in srgb, ${bgColor} 20%, white)`,
          borderColor: bgColor,
          color: bgColor
        }}
      >
        <User className="w-3.5 h-3.5" />
        <span className="text-xs max-w-[60px] truncate">{displayName.split(' ')[0]}</span>
      </Badge>
    )
  }

  function getEventDescription(entry: ChatHistoryEntry) {
    const { event_type, event_data, performed_by_name } = entry

    switch (event_type) {
      case "assignment_created":
        return (
          <span className="flex flex-wrap items-center gap-1">
            <UserBadge name={performed_by_name} color={event_data?.performed_by_cor} /> atribuiu o chat para{" "}
            <UserBadge name={event_data?.assigned_to_name} color={event_data?.assigned_to_cor} />
          </span>
        )
      case "assignment_transferred":
        return (
          <span className="flex flex-wrap items-center gap-1">
            <UserBadge name={performed_by_name} color={event_data?.performed_by_cor} /> transferiu de{" "}
            <UserBadge name={event_data?.from_user_name} color={event_data?.from_user_cor} /> para{" "}
            <UserBadge name={event_data?.to_user_name} color={event_data?.to_user_cor} />
          </span>
        )
      case "assignment_removed":
        return (
          <span className="flex flex-wrap items-center gap-1">
            <UserBadge name={performed_by_name} color={event_data?.performed_by_cor} /> removeu a atribuição de{" "}
            <UserBadge name={event_data?.removed_user_name} color={event_data?.removed_user_cor} />
          </span>
        )
      case "note_created":
        return (
          <span className="flex flex-wrap items-center gap-1">
            <UserBadge name={performed_by_name} color={event_data?.performed_by_cor} /> criou uma nota
          </span>
        )
      case "note_updated":
        return (
          <span className="flex flex-wrap items-center gap-1">
            <UserBadge name={performed_by_name} color={event_data?.performed_by_cor} /> atualizou a nota
          </span>
        )
      case "etiqueta_added":
        return (
          <span className="flex flex-wrap items-center gap-1">
            <UserBadge name={performed_by_name} color={event_data?.performed_by_cor} /> adicionou a etiqueta{" "}
            <Badge
              variant="outline"
              className="text-xs ml-1"
              style={{
                backgroundColor: event_data?.etiqueta_cor,
                color: getContrastTextColor(event_data?.etiqueta_cor || "#000000"),
                borderColor: event_data?.etiqueta_cor,
              }}
            >
              {event_data?.etiqueta_nome}
            </Badge>
          </span>
        )
      case "etiqueta_removed":
        return (
          <span className="flex flex-wrap items-center gap-1">
            <UserBadge name={performed_by_name} color={event_data?.performed_by_cor} /> removeu a etiqueta{" "}
            <Badge
              variant="outline"
              className="text-xs ml-1 line-through"
              style={{
                backgroundColor: event_data?.etiqueta_cor,
                color: getContrastTextColor(event_data?.etiqueta_cor || "#000000"),
                borderColor: event_data?.etiqueta_cor,
              }}
            >
              {event_data?.etiqueta_nome}
            </Badge>
          </span>
        )
      case "name_changed":
        return (
          <span className="flex flex-wrap items-center gap-1">
            <UserBadge name={performed_by_name} color={event_data?.performed_by_cor} /> alterou o nome de{" "}
            <span className="line-through text-muted-foreground">{event_data?.previous_name}</span> para{" "}
            <strong>{event_data?.new_name}</strong>
          </span>
        )
      case "lead_converted":
        return (
          <span className="flex flex-wrap items-center gap-1">
            <UserBadge name={performed_by_name} color={event_data?.performed_by_cor} /> converteu o lead{" "}
            <strong>{event_data?.lead_nome}</strong> com valor de{" "}
            <span className="text-emerald-600 font-semibold">R$ {event_data?.valor_formatado || event_data?.valor}</span>
          </span>
        )
      case "lead_unconverted":
        return (
          <span className="flex flex-wrap items-center gap-1">
            <UserBadge name={performed_by_name} color={event_data?.performed_by_cor} /> desconverteu o lead{" "}
            <strong>{event_data?.lead_nome}</strong>
            {event_data?.motivo && (
              <span className="text-muted-foreground"> - Motivo: {event_data?.motivo}</span>
            )}
          </span>
        )
      default:
        return <span className="flex flex-wrap items-center gap-1">Ação realizada por <UserBadge name={performed_by_name} color={event_data?.performed_by_cor} /></span>
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
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5" /> Histórico Completo
          </DialogTitle>
          <DialogDescription>{chatName}</DialogDescription>
        </DialogHeader>

        <div className="flex-1 min-h-0 max-h-[calc(80vh-100px)] overflow-y-auto pr-4">
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
                          <div className="flex items-start justify-between gap-2 mb-3">
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

                          <p className="text-sm">{getEventDescription(entry)}</p>

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
        </div>
      </DialogContent>
    </Dialog>
  )
}
