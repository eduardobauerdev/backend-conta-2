"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Loader2, UserPlus, ArrowRightLeft, UserMinus, CheckCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { toast } from "sonner"

interface AssignmentLog {
  id: string
  chat_id: string
  chat_name: string
  action: string
  from_user_id: string | null
  from_user_name: string | null
  to_user_id: string | null
  to_user_name: string | null
  performed_by_id: string | null
  performed_by_name: string | null
  notes: string | null
  created_at: string
}

interface AssignmentHistoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  chatId: string
  chatName: string
}

export function AssignmentHistoryDialog({ open, onOpenChange, chatId, chatName }: AssignmentHistoryDialogProps) {
  const [logs, setLogs] = useState<AssignmentLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (open && chatId) {
      loadLogs()
    }
  }, [open, chatId])

  async function loadLogs() {
    try {
      setLoading(true)
      const response = await fetch(`/api/whatsapp/assignment-logs?chatId=${chatId}`)

      if (!response.ok) {
        console.error("[API] Erro ao buscar logs:", response.status)
        toast.error("Erro ao carregar histórico")
        return
      }
      const text = await response.text()
      if (!text) return
      const data = JSON.parse(text)

      if (data.success) {
        setLogs(data.logs || [])
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
      case "assigned":
        return <UserPlus className="w-4 h-4" />
      case "transferred":
        return <ArrowRightLeft className="w-4 h-4" />
      case "released":
        return <UserMinus className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  function getActionText(log: AssignmentLog) {
    switch (log.action) {
      case "assigned":
        return `Atribuído para ${log.to_user_name}`
      case "transferred":
        return `Transferido de ${log.from_user_name} para ${log.to_user_name}`
      case "released":
        return `Liberado por ${log.performed_by_name}`
      case "completed":
        return "Conversa concluída"
      default:
        return "Ação desconhecida"
    }
  }

  function getActionColor(action: string) {
    switch (action) {
      case "assigned":
        return "bg-green-500/10 text-green-600"
      case "transferred":
        return "bg-blue-500/10 text-blue-600"
      case "released":
        return "bg-yellow-500/10 text-yellow-600"
      case "completed":
        return "bg-gray-500/10 text-gray-600"
      default:
        return "bg-gray-500/10 text-gray-600"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Histórico de Atribuições</DialogTitle>
          <DialogDescription>{chatName}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[500px] pr-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhum registro de atribuição encontrado</p>
            </div>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />

              <div className="space-y-6">
                {logs.map((log, index) => (
                  <div key={log.id} className="relative flex gap-4 group">
                    {/* Timeline dot */}
                    <div
                      className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full ${getActionColor(log.action)}`}
                    >
                      {getActionIcon(log.action)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-6">
                      <div className="bg-card border rounded-lg p-4 shadow-sm group-hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{getActionText(log)}</p>
                            {log.performed_by_name &&
                              log.performed_by_id !== log.to_user_id &&
                              log.action === "transferred" && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  Realizado por: {log.performed_by_name}
                                </p>
                              )}
                          </div>
                          <Badge variant="outline" className="text-xs whitespace-nowrap">
                            {formatDistanceToNow(new Date(log.created_at), {
                              addSuffix: true,
                              locale: ptBR,
                            })}
                          </Badge>
                        </div>

                        {log.notes && (
                          <div className="mt-2 p-2 bg-muted rounded text-sm">
                            <p className="text-muted-foreground">{log.notes}</p>
                          </div>
                        )}

                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(log.created_at).toLocaleString("pt-BR", {
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
