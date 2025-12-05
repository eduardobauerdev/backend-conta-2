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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUser } from "@/contexts/user-context"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import type { Lead } from "@/types/crm"
import { CheckCircle, DollarSign, Loader2 } from "lucide-react"

type ConvertLeadDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  lead: Lead | null
  onSuccess: () => void
}

export function ConvertLeadDialog({ open, onOpenChange, lead, onSuccess }: ConvertLeadDialogProps) {
  const [isConverting, setIsConverting] = useState(false)
  const [valor, setValor] = useState("")
  const { user } = useUser()
  const supabase = createClient()

  useEffect(() => {
    if (!open) {
      setIsConverting(false)
      setValor("")
    }
  }, [open])

  const formatCurrency = (value: string) => {
    // Remove tudo exceto números
    const numbers = value.replace(/\D/g, "")
    
    // Converte para número e formata como moeda
    const numValue = parseInt(numbers || "0", 10) / 100
    
    return numValue.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value)
    setValor(formatted)
  }

  const parseValue = (formattedValue: string): number => {
    // Remove pontos e substitui vírgula por ponto
    const cleanValue = formattedValue.replace(/\./g, "").replace(",", ".")
    return parseFloat(cleanValue) || 0
  }

  const handleConvert = async () => {
    if (!user || !lead) return

    const valorNumerico = parseValue(valor)
    
    if (valorNumerico <= 0) {
      toast.error("Por favor, informe o valor da venda")
      return
    }

    setIsConverting(true)

    try {
      // Atualiza o status do lead para convertido
      const { error: updateError } = await supabase
        .from("leads")
        .update({ status: "convertido" })
        .eq("id", lead.id)

      if (updateError) {
        console.error("Error converting lead:", updateError)
        toast.error("Erro ao converter lead")
        setIsConverting(false)
        return
      }

      // Registra a conversão na tabela de conversões
      const { error: conversaoError } = await supabase.from("conversoes").insert({
        lead_id: lead.id,
        lead_nome: lead.nome,
        lead_cidade: lead.cidade,
        lead_interesse: lead.interesse,
        lead_temperatura: lead.temperatura,
        lead_telefone: lead.telefone,
        lead_endereco: lead.endereco,
        lead_cargo: lead.cargo,
        lead_observacao: lead.observacao,
        lead_adicionado_por_id: lead.adicionado_por_id,
        lead_adicionado_por_nome: lead.adicionado_por_nome,
        convertido_por_id: user.id,
        convertido_por_nome: user.nome,
        convertido_por_cargo: user.cargo,
        valor: valorNumerico,
      })

      if (conversaoError) {
        console.error("Error registering conversion:", conversaoError)
        toast.error("Erro ao registrar conversão")
        setIsConverting(false)
        return
      }

      // Registra no log de leads
      await supabase.from("lead_logs").insert({
        lead_id: lead.id,
        usuario_id: user.id,
        usuario_nome: user.nome,
        acao: "convertido",
        detalhes: `Lead "${lead.nome}" convertido com valor de R$ ${valor}`,
      })

      // Registra no histórico do chat se houver chat_uuid vinculado
      if (lead.chat_uuid) {
        // Busca o chat_id pelo uuid
        const { data: chatData } = await supabase
          .from('chats')
          .select('id, name')
          .eq('uuid', lead.chat_uuid)
          .single()
        
        if (chatData) {
          await supabase.from("chat_history").insert({
            chat_id: chatData.id,
            chat_name: chatData.name || lead.nome,
            event_type: "lead_converted",
            event_data: {
              lead_id: lead.id,
              lead_nome: lead.nome,
              valor: valorNumerico,
              valor_formatado: valor,
            },
            performed_by_id: user.id,
            performed_by_name: user.nome,
          })
        }
      }

      toast.success("Lead convertido com sucesso!")
      setIsConverting(false)
      onOpenChange(false)
      onSuccess()
    } catch (error) {
      console.error("Error in conversion:", error)
      toast.error("Erro ao converter lead")
      setIsConverting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] border-green-200 bg-gradient-to-br from-green-50/50 to-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-700">
            <CheckCircle className="w-5 h-5" />
            Converter Lead
          </DialogTitle>
          <DialogDescription>
            Confirme a conversão do lead <strong className="text-green-700">{lead?.nome}</strong> e informe o valor da venda.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="space-y-4">
            {/* Resumo do lead */}
            <div className="bg-green-50 p-3 rounded-lg border border-green-100 space-y-1">
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

            {/* Campo de valor */}
            <div className="space-y-2">
              <Label htmlFor="valor" className="text-green-700">
                Valor da Venda
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-600" />
                <Input
                  id="valor"
                  placeholder="0,00"
                  value={valor}
                  onChange={handleValueChange}
                  className="pl-9 border-green-200 focus-visible:ring-green-500"
                  autoFocus
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Digite o valor total da venda em reais
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isConverting}>
            Cancelar
          </Button>
          <Button 
            onClick={handleConvert} 
            disabled={isConverting || !valor} 
            className="bg-green-600 hover:bg-green-700"
          >
            {isConverting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Convertendo...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirmar Conversão
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
