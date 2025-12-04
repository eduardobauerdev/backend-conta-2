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
import { Label } from "@/components/ui/label"
import { useUser } from "@/contexts/user-context"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import type { Lead } from "@/types/crm"
import { XCircle, Loader2 } from "lucide-react"

type UnconvertLeadDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  lead: Lead | null
  onSuccess: () => void
}

export function UnconvertLeadDialog({ open, onOpenChange, lead, onSuccess }: UnconvertLeadDialogProps) {
  const [isUnconverting, setIsUnconverting] = useState(false)
  const [motivo, setMotivo] = useState("")
  const { user } = useUser()
  const supabase = createClient()

  useEffect(() => {
    if (!open) {
      setIsUnconverting(false)
      setMotivo("")
    }
  }, [open])

  const handleUnconvert = async () => {
    if (!user || !lead) return

    if (!motivo.trim()) {
      toast.error("Por favor, informe o motivo da desconversão")
      return
    }

    setIsUnconverting(true)

    try {
      // Atualiza o status do lead para ativo
      const { error: updateError } = await supabase
        .from("leads")
        .update({ status: "ativo" })
        .eq("id", lead.id)

      if (updateError) {
        console.error("Error unconverting lead:", updateError)
        toast.error("Erro ao desconverter lead")
        setIsUnconverting(false)
        return
      }

      // Registra a desconversão na tabela de desconversões
      const { error: desconversaoError } = await supabase.from("desconversoes").insert({
        lead_id: lead.id,
        lead_nome: lead.nome,
        lead_cidade: lead.cidade,
        lead_interesse: lead.interesse,
        lead_temperatura: lead.temperatura,
        lead_telefone: lead.telefone,
        lead_adicionado_por_id: lead.adicionado_por_id,
        lead_adicionado_por_nome: lead.adicionado_por_nome,
        desconvertido_por_id: user.id,
        desconvertido_por_nome: user.nome,
        desconvertido_por_cargo: user.cargo,
        motivo: motivo.trim(),
      })

      if (desconversaoError) {
        console.error("Error registering unconversion:", desconversaoError)
        toast.error("Erro ao registrar desconversão")
        setIsUnconverting(false)
        return
      }

      // Registra no log de leads
      await supabase.from("lead_logs").insert({
        lead_id: lead.id,
        usuario_id: user.id,
        usuario_nome: user.nome,
        acao: "desconvertido",
        detalhes: `Lead "${lead.nome}" desconvertido. Motivo: ${motivo.trim()}`,
      })

      toast.success("Lead desconvertido com sucesso!")
      setIsUnconverting(false)
      onOpenChange(false)
      onSuccess()
    } catch (error) {
      console.error("Error in unconversion:", error)
      toast.error("Erro ao desconverter lead")
      setIsUnconverting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] border-orange-200 bg-gradient-to-br from-orange-50/50 to-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-orange-700">
            <XCircle className="w-5 h-5" />
            Desconverter Lead
          </DialogTitle>
          <DialogDescription>
            Informe o motivo da desconversão do lead <strong className="text-orange-700">{lead?.nome}</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="space-y-4">
            {/* Resumo do lead */}
            <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 space-y-1">
              <p className="text-sm">
                <span className="text-muted-foreground">Temperatura:</span>{" "}
                <span className="font-medium">{lead?.temperatura}</span>
              </p>
              {lead?.interesse && (
                <p className="text-sm">
                  <span className="text-muted-foreground">Interesse:</span>{" "}
                  <span className="font-medium">{lead?.interesse}</span>
                </p>
              )}
              {lead?.cidade && (
                <p className="text-sm">
                  <span className="text-muted-foreground">Cidade:</span>{" "}
                  <span className="font-medium">{lead?.cidade}</span>
                </p>
              )}
              <p className="text-sm">
                <span className="text-muted-foreground">Vendedor:</span>{" "}
                <span className="font-medium">{lead?.adicionado_por_nome}</span>
              </p>
            </div>

            {/* Campo de motivo */}
            <div className="space-y-2">
              <Label htmlFor="motivo" className="text-orange-700">
                Motivo da Desconversão
              </Label>
              <Textarea
                id="motivo"
                placeholder="Descreva o motivo da desconversão..."
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                className="min-h-[100px] border-orange-200 focus-visible:ring-orange-500"
                autoFocus
              />
              <p className="text-xs text-muted-foreground">
                Esta informação será salva para análise posterior
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isUnconverting}>
            Cancelar
          </Button>
          <Button 
            onClick={handleUnconvert} 
            disabled={isUnconverting || !motivo.trim()} 
            className="bg-orange-600 hover:bg-orange-700"
          >
            {isUnconverting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Desconvertendo...
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 mr-2" />
                Confirmar Desconversão
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
