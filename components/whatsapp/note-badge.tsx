"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { NotepadText, Loader2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

interface NoteHistoryEntry {
  id: string
  chat_id: string
  event_type: string
  event_data: {
    content?: string
    previous_content?: string
    new_content?: string
  }
  performed_by_name: string
  created_at: string
}

interface NoteBadgeProps {
  chatId: string
  chatName: string
  hasNote: boolean
  noteContent?: string | null
  size?: "sm" | "md"
  onClick?: (e: React.MouseEvent) => void
  onSelectChat?: () => void
}

export function NoteBadge({ 
  chatId, 
  chatName, 
  hasNote, 
  noteContent,
  size = "md",
  onClick,
  onSelectChat
}: NoteBadgeProps) {
  const [showHistoryDialog, setShowHistoryDialog] = useState(false)
  const [noteHistory, setNoteHistory] = useState<NoteHistoryEntry[]>([])
  const [loading, setLoading] = useState(false)

  const loadNoteHistory = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/whatsapp/chat-history?chatId=${chatId}&type=notes`)
      
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          // Filtra apenas eventos de notas
          const notesOnly = (data.history || []).filter((entry: NoteHistoryEntry) => 
            entry.event_type === "note_created" || entry.event_type === "note_updated"
          )
          setNoteHistory(notesOnly)
        }
      }
    } catch (error) {
      console.error("Erro ao carregar histórico de notas:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Seleciona o chat primeiro
    if (onSelectChat) {
      onSelectChat()
      // Aguarda um momento para o chat ser selecionado antes de abrir o modal
      setTimeout(() => {
        loadNoteHistory()
        setShowHistoryDialog(true)
      }, 150)
    } else if (onClick) {
      onClick(e)
    } else {
      loadNoteHistory()
      setShowHistoryDialog(true)
    }
  }

  if (!hasNote) return null

  const truncatedContent = noteContent 
    ? noteContent.length > 100 
      ? noteContent.substring(0, 100) + "..." 
      : noteContent
    : "Nota disponível"

  const sizeClasses = size === "sm" 
    ? "text-[10px] px-1.5 py-0 h-5" 
    : "text-xs px-2 py-0.5"

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge
              variant="secondary"
              className={`${sizeClasses} flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white border-amber-500 cursor-pointer rounded-sm`}
              onClick={handleClick}
            >
              <NotepadText className={size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3"} />
              {size === "md" && "Nota"}
            </Badge>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p className="text-sm font-medium mb-1">📝 Nota</p>
            <p className="text-xs whitespace-pre-wrap">{truncatedContent}</p>
            <p className="text-[10px] text-muted-foreground mt-1">Clique para ver histórico</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <NotepadText className="w-5 h-5 text-amber-500" />
              Histórico de Notas
            </DialogTitle>
            <DialogDescription>{chatName}</DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[500px] pr-4">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : noteHistory.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>Nenhum histórico de notas encontrado</p>
              </div>
            ) : (
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-amber-200" />

                <div className="space-y-4">
                  {noteHistory.map((entry) => (
                    <div key={entry.id} className="relative flex gap-4 group">
                      {/* Timeline dot */}
                      <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-amber-500 text-white">
                        <NotepadText className="w-4 h-4" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-2">
                        <div className="bg-card border rounded-lg p-3 shadow-sm group-hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <Badge variant="outline" className="text-[10px] bg-amber-100 text-amber-700 border-amber-200 rounded-sm">
                              {entry.event_type === "note_created" ? "Criada" : "Atualizada"}
                            </Badge>
                            <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                              {formatDistanceToNow(new Date(entry.created_at), {
                                addSuffix: true,
                                locale: ptBR,
                              })}
                            </span>
                          </div>

                          <p className="text-sm mt-1">
                            <strong>{entry.performed_by_name}</strong>
                            {entry.event_type === "note_created" ? " criou uma nota" : " atualizou a nota"}
                          </p>

                          {/* Conteúdo da nota */}
                          {entry.event_type === "note_created" && entry.event_data.content && (
                            <div className="mt-2 p-2 bg-amber-50 border border-amber-100 rounded text-sm">
                              <p className="text-foreground whitespace-pre-wrap text-xs">{entry.event_data.content}</p>
                            </div>
                          )}

                          {entry.event_type === "note_updated" && (
                            <div className="mt-2 space-y-2">
                              {entry.event_data.previous_content && (
                                <div className="p-2 bg-red-50 border border-red-100 rounded text-sm">
                                  <p className="text-xs text-red-600 font-medium mb-1">Anterior:</p>
                                  <p className="text-muted-foreground whitespace-pre-wrap text-xs line-through">
                                    {entry.event_data.previous_content}
                                  </p>
                                </div>
                              )}
                              {entry.event_data.new_content && (
                                <div className="p-2 bg-green-50 border border-green-100 rounded text-sm">
                                  <p className="text-xs text-green-600 font-medium mb-1">Nova:</p>
                                  <p className="text-foreground whitespace-pre-wrap text-xs">{entry.event_data.new_content}</p>
                                </div>
                              )}
                            </div>
                          )}

                          <p className="text-[10px] text-muted-foreground mt-2">
                            {new Date(entry.created_at).toLocaleString("pt-BR", {
                              dateStyle: "short",
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
    </>
  )
}
