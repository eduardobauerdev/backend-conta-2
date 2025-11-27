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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import type { Lead } from "@/types/crm"
import { useUser } from "@/contexts/user-context"

type EditLeadDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  lead: Lead | null
  onSuccess: () => void
}

const fieldLabels: Record<string, string> = {
  nome: "Nome",
  telefone: "Telefone",
  cidade: "Cidade",
  interesse: "Interesse",
  temperatura: "Temperatura",
  acao: "Ação",
  observacao: "Observação",
  status: "Status"
}

export function EditLeadDialog({ open, onOpenChange, lead, onSuccess }: EditLeadDialogProps) {
  const { user } = useUser()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    cidade: "",
    interesse: "",
    temperatura: "Frio",
    acao: "",
    observacao: "",
    status: "ativo"
  })
  const supabase = createClient()

  const canEdit = user && lead && (
    lead.adicionado_por_id === user.id ||
    user.cargo === "Administrador" ||
    user.cargo === "Desenvolvedor"
  )

  useEffect(() => {
    if (lead) {
      setFormData({
        nome: lead.nome || "",
        telefone: lead.telefone || "",
        cidade: lead.cidade || "",
        interesse: lead.interesse || "",
        temperatura: lead.temperatura || "Frio",
        acao: lead.acao || "",
        observacao: lead.observacao || "",
        status: lead.status || "ativo"
      })
    }
  }, [lead])

  const logChanges = async (leadId: string, changes: Array<{field: string, oldValue: any, newValue: any}>) => {
    if (!user || changes.length === 0) return

    const logEntries = changes.map(change => ({
      lead_id: leadId,
      usuario_id: user.id,
      usuario_nome: user.nome,
      acao: "editar",
      campo_alterado: change.field,
      valor_antigo: String(change.oldValue || ""),
      valor_novo: String(change.newValue || ""),
      detalhes: `${user.nome} alterou ${fieldLabels[change.field] || change.field} do lead, de "${change.oldValue || "(vazio)"}" para "${change.newValue || "(vazio)"}"`
    }))

    const { error } = await supabase
      .from("lead_logs")
      .insert(logEntries)

    if (error) {
      console.error("[v0] Error logging changes:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!lead || !canEdit) {
      toast.error("Você não tem permissão para editar este lead")
      return
    }

    setIsSubmitting(true)

    const changes: Array<{field: string, oldValue: any, newValue: any}> = []
    const fields = ['nome', 'telefone', 'cidade', 'interesse', 'temperatura', 'acao', 'observacao', 'status'] as const
    
    fields.forEach(field => {
      const oldValue = lead[field]
      const newValue = formData[field]
      if (oldValue !== newValue) {
        changes.push({ field, oldValue, newValue })
      }
    })

    const { error } = await supabase
      .from("leads")
      .update({
        nome: formData.nome,
        telefone: formData.telefone,
        cidade: formData.cidade,
        interesse: formData.interesse,
        temperatura: formData.temperatura,
        acao: formData.acao,
        observacao: formData.observacao,
        status: formData.status,
        updated_at: new Date().toISOString()
      })
      .eq("id", lead.id)

    if (error) {
      console.error("[v0] Error updating lead:", error)
      toast.error("Erro ao atualizar lead")
      setIsSubmitting(false)
      return
    }

    await logChanges(lead.id, changes)

    toast.success("Lead atualizado com sucesso")
    setIsSubmitting(false)
    onOpenChange(false)
    onSuccess()
  }

  if (open && !canEdit) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Sem Permissão</DialogTitle>
            <DialogDescription>
              Você não tem permissão para editar este lead. Apenas o criador do lead, Administradores e Desenvolvedores podem editar.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Lead</DialogTitle>
          <DialogDescription>
            Atualize as informações do lead. Suas alterações serão registradas no histórico.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cidade">Cidade</Label>
              <Input
                id="cidade"
                value={formData.cidade}
                onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interesse">Interesse</Label>
              <Input
                id="interesse"
                value={formData.interesse}
                onChange={(e) => setFormData({ ...formData, interesse: e.target.value })}
                placeholder="Ex: Sistema de energia solar"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="temperatura">Temperatura *</Label>
                <Select value={formData.temperatura} onValueChange={(value) => setFormData({ ...formData, temperatura: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a temperatura" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Quente">Quente</SelectItem>
                    <SelectItem value="Morno">Morno</SelectItem>
                    <SelectItem value="Frio">Frio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="convertido">Convertido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="acao">Ação</Label>
              <Input
                id="acao"
                value={formData.acao}
                onChange={(e) => setFormData({ ...formData, acao: e.target.value })}
                placeholder="Ex: Enviar proposta comercial"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacao">Observação</Label>
              <Textarea
                id="observacao"
                value={formData.observacao}
                onChange={(e) => setFormData({ ...formData, observacao: e.target.value })}
                placeholder="Adicione observações sobre o lead..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
