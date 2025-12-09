"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { createClient } from "@/lib/supabase/client"
import { Spinner } from "@/components/ui/spinner"
import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { History } from 'lucide-react'

type LeadLog = {
  id: string
  created_at: string
  usuario_nome: string
  acao: string
  campo_alterado: string
  valor_antigo: string
  valor_novo: string
  detalhes: string
}

type LeadHistoryDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  leadId: string | null
  leadName: string
}

export function LeadHistoryDialog({ open, onOpenChange, leadId, leadName }: LeadHistoryDialogProps) {
  const [logs, setLogs] = useState<LeadLog[]>([])
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    if (open && leadId) {
      fetchLogs()
    }
  }, [open, leadId])

  const fetchLogs = async () => {
    if (!leadId) return
    
    setLoading(true)
    const { data, error } = await supabase
      .from("lead_logs")
      .select("*")
      .eq("lead_id", leadId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching logs:", error)
    } else {
      setLogs(data || [])
    }
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] flex flex-col">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 bg-primary/10 rounded-md">
              <History className="w-5 h-5 text-primary" />
            </div>
            Histórico de Alterações
          </DialogTitle>
          <DialogDescription className="text-sm mt-2">
            Registro completo de todas as alterações feitas no lead <strong className="text-foreground">{leadName}</strong>
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <Spinner className="w-8 h-8 text-primary" />
              <p className="text-sm text-muted-foreground">Carregando histórico...</p>
            </div>
          </div>
        ) : logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-4 bg-muted/50 rounded-full mb-4">
              <History className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Nenhuma alteração registrada</p>
            <p className="text-xs text-muted-foreground mt-1">Este lead ainda não possui histórico de modificações</p>
          </div>
        ) : (
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-[450px] pr-4">
              <div className="space-y-4 py-2">
                {logs.map((log, index) => (
                  <div 
                    key={log.id} 
                    className="relative pl-6 pb-6 last:pb-0"
                  >
                    {/* Timeline line */}
                    {index !== logs.length - 1 && (
                      <div className="absolute left-[11px] top-6 bottom-0 w-px bg-border" />
                    )}
                    
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>

                    <div className="bg-card border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-sm text-foreground">{log.usuario_nome}</p>
                          {log.campo_alterado && (
                            <Badge variant="outline" className="mt-1.5 text-xs rounded-sm">
                              {log.campo_alterado}
                            </Badge>
                          )}
                        </div>
                        <Badge variant="secondary" className="text-xs rounded-sm whitespace-nowrap">
                          {format(parseISO(log.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {log.detalhes}
                      </p>

                      {log.valor_antigo && log.valor_novo && (
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-red-50 border border-red-200 rounded-md p-2">
                            <span className="font-semibold text-red-700 block mb-1">Anterior:</span>
                            <span className="text-red-600">{log.valor_antigo}</span>
                          </div>
                          <div className="bg-green-50 border border-green-200 rounded-md p-2">
                            <span className="font-semibold text-green-700 block mb-1">Novo:</span>
                            <span className="text-green-600">{log.valor_novo}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
