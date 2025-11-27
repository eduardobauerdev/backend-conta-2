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
      <DialogContent className="sm:max-w-[700px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Histórico de Alterações
          </DialogTitle>
          <DialogDescription>
            Registro completo de todas as alterações feitas no lead: {leadName}
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Spinner className="w-6 h-6" />
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-8 text-neutral-500">
            Nenhuma alteração registrada para este lead
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {logs.map((log) => (
                <div key={log.id} className="border-l-2 border-primary pl-4 pb-4">
                  <div className="flex items-start justify-between mb-1">
                    <div className="font-medium text-sm">{log.usuario_nome}</div>
                    <div className="text-xs text-neutral-500">
                      {format(parseISO(log.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                    </div>
                  </div>
                  
                  {log.campo_alterado && (
                    <Badge variant="outline" className="mb-2 text-xs">
                      {log.campo_alterado}
                    </Badge>
                  )}
                  
                  <div className="text-sm text-neutral-700">
                    {log.detalhes}
                  </div>

                  {log.valor_antigo && log.valor_novo && (
                    <div className="mt-2 text-xs bg-neutral-50 rounded p-2 space-y-1">
                      <div className="text-red-600">
                        <span className="font-semibold">Anterior:</span> {log.valor_antigo}
                      </div>
                      <div className="text-green-600">
                        <span className="font-semibold">Novo:</span> {log.valor_novo}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  )
}
