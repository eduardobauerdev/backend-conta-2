"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, Phone, MessageCircle, MapPin, FileText, RefreshCw, Users, MoreHorizontal } from "lucide-react"
import { useUser } from "@/contexts/user-context"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import type { Lead } from "@/types/crm"

type EditLeadDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  lead: Lead | null
  onSuccess: () => void
}

export function EditLeadDialog({ open, onOpenChange, lead, onSuccess }: EditLeadDialogProps) {
  const [nome, setNome] = useState("")
  const [cidade, setCidade] = useState("")
  const [interesse, setInteresse] = useState<string[]>([])
  const [interesseOutro, setInteresseOutro] = useState("")
  const [cargo, setCargo] = useState("")
  const [endereco, setEndereco] = useState("")
  const [telefone, setTelefone] = useState("")
  const [temperatura, setTemperatura] = useState<"Quente" | "Morno" | "Frio">("Morno")
  const [proximoContato, setProximoContato] = useState<Date | undefined>(undefined)
  const [acao, setAcao] = useState("")
  const [observacao, setObservacao] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useUser()
  const supabase = createClient()

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, (_, ddd, p1, p2) => {
        return `(${ddd}) ${p1}${p2 ? "-" + p2 : ""}`
      })
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, (_, ddd, p1, p2) => {
      return `(${ddd}) ${p1}${p2 ? "-" + p2 : ""}`
    })
  }

  const parseInteresse = (interesseStr: string) => {
    const items = interesseStr.split(/,\s*|\s+e\s+/)
    const knownItems = ["Guarda-corpo", "Corrimão", "Box"]
    const selected: string[] = []
    let outro = ""

    items.forEach((item) => {
      if (knownItems.includes(item)) {
        selected.push(item)
      } else if (item.trim()) {
        selected.push("Outro")
        outro = item
      }
    })

    return { selected, outro }
  }

  const formatInteresse = () => {
    const items = [...interesse]
    if (items.includes("Outro") && interesseOutro.trim()) {
      items[items.indexOf("Outro")] = interesseOutro.trim()
    }

    if (items.length === 0) return ""
    if (items.length === 1) return items[0]
    if (items.length === 2) return items.join(" e ")

    const last = items.pop()
    return items.join(", ") + " e " + last
  }

  const formatDateDDMMYY = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
    return `${year}-${month}-${day}`
  }

  const parseDateDDMMYY = (dateStr: string): Date => {
    return new Date(dateStr + "T00:00:00")
  }

  useEffect(() => {
    if (lead) {
      setNome(lead.nome)
      setCidade(lead.cidade || "")
      if (lead.interesse) {
        const { selected, outro } = parseInteresse(lead.interesse)
        setInteresse(selected)
        setInteresseOutro(outro)
      } else {
        setInteresse([])
        setInteresseOutro("")
      }
      setCargo(lead.cargo || "")
      setEndereco(lead.endereco || "")
      setTelefone(lead.telefone || "")
      setTemperatura(lead.temperatura)
      setProximoContato(lead.proximo_contato ? parseDateDDMMYY(lead.proximo_contato) : undefined)
      setAcao(lead.acao || "")
      setObservacao(lead.observacao || "")
    }
  }, [lead])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user || !lead || !nome.trim() || !cidade.trim() || interesse.length === 0) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }

    setIsSubmitting(true)

    const interesseFormatado = formatInteresse()
    const proximoContatoStr = proximoContato ? formatDateDDMMYY(proximoContato) : null

    const { error } = await supabase
      .from("leads")
      .update({
        nome: nome.trim(),
        cidade: cidade.trim(),
        interesse: interesseFormatado,
        telefone: telefone.trim() || null,
        endereco: endereco.trim() || null,
        cargo: cargo.trim() || null,
        temperatura,
        proximo_contato: proximoContatoStr,
        acao: acao.trim() || null,
        observacao: observacao.trim() || null,
      })
      .eq("id", lead.id)

    if (error) {
      console.error("[v0] Error updating lead:", error)
      toast.error("Erro ao atualizar lead")
      setIsSubmitting(false)
      return
    }

    await supabase.from("lead_logs").insert({
      lead_id: lead.id,
      usuario_id: user.id,
      usuario_nome: user.nome,
      acao: "editado",
      detalhes: `Lead "${nome}" editado`,
    })

    toast.success("Lead atualizado com sucesso")
    setIsSubmitting(false)
    onOpenChange(false)
    onSuccess()
  }

  if (!lead) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Lead</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome *</Label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome do lead"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cidade">Cidade *</Label>
            <Input
              id="cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              placeholder="Cidade do lead"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interesse-edit">Interesse *</Label>
            <div className="border rounded-md p-3 space-y-2">
              {["Guarda-corpo", "Corrimão", "Box", "Outro"].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox
                    id={`interesse-edit-${item}`}
                    checked={interesse.includes(item)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setInteresse([...interesse, item])
                      } else {
                        setInteresse(interesse.filter((i) => i !== item))
                        if (item === "Outro") setInteresseOutro("")
                      }
                    }}
                  />
                  <label htmlFor={`interesse-edit-${item}`} className="text-sm font-medium leading-none cursor-pointer">
                    {item}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {interesse.includes("Outro") && (
            <div className="space-y-2">
              <Input
                id="interesse-outro-edit"
                value={interesseOutro}
                onChange={(e) => setInteresseOutro(e.target.value)}
                placeholder="Especifique o interesse"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(formatPhone(e.target.value))}
              placeholder="(00) 00000-0000"
              maxLength={15}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endereco">Endereço (Opcional)</Label>
            <Input
              id="endereco"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              placeholder="Endereço completo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cargo">Cargo (Opcional)</Label>
            <Input
              id="cargo"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              placeholder="Ex: Gerente, Proprietário, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="temperatura">Temperatura *</Label>
            <Select value={temperatura} onValueChange={(v) => setTemperatura(v as any)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Quente">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-flame"
                    >
                      <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" />
                    </svg>
                    <span>Quente</span>
                  </div>
                </SelectItem>
                <SelectItem value="Morno">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-coffee"
                    >
                      <path d="M10 2v2" />
                      <path d="M14 2v2" />
                      <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
                      <path d="M6 2v2" />
                    </svg>
                    <span>Morno</span>
                  </div>
                </SelectItem>
                <SelectItem value="Frio">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-snowflake"
                    >
                      <path d="m10 20-1.25-2.5L6 18" />
                      <path d="M10 4 8.75 6.5 6 6" />
                      <path d="m14 20 1.25-2.5L18 18" />
                      <path d="m14 4 1.25 2.5L18 6" />
                      <path d="m17 21-3-6h-4" />
                      <path d="m17 3-3 6 1.5 3" />
                      <path d="M2 12h6.5L10 9" />
                      <path d="m20 10-1.5 2 1.5 2" />
                      <path d="M22 12h-6.5L14 15" />
                      <path d="m4 10 1.5 2L4 14" />
                      <path d="m7 21 3-6-1.5-3" />
                      <path d="m7 3 3 6h4" />
                    </svg>
                    <span>Frio</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="proximo-contato">Próximo Contato</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="proximo-contato"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !proximoContato && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {proximoContato ? format(proximoContato, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={proximoContato} onSelect={setProximoContato} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="acao">Ação</Label>
            <Select value={acao} onValueChange={setAcao}>
              <SelectTrigger id="acao">
                <SelectValue placeholder="O que fazer quando chegar o dia?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ligar">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>Ligar</span>
                  </div>
                </SelectItem>
                <SelectItem value="Enviar mensagem">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>Enviar mensagem</span>
                  </div>
                </SelectItem>
                <SelectItem value="Visitar">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Visitar</span>
                  </div>
                </SelectItem>
                <SelectItem value="Enviar proposta">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Enviar proposta</span>
                  </div>
                </SelectItem>
                <SelectItem value="Follow-up">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    <span>Follow-up</span>
                  </div>
                </SelectItem>
                <SelectItem value="Reunião">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Reunião</span>
                  </div>
                </SelectItem>
                <SelectItem value="Outro">
                  <div className="flex items-center gap-2">
                    <MoreHorizontal className="w-4 h-4" />
                    <span>Outro</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacao">Observação</Label>
            <Textarea
              id="observacao"
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              placeholder="Adicione detalhes importantes sobre este lead..."
              rows={3}
            />
          </div>

          <div className="bg-neutral-50 p-3 rounded-lg">
            <Label className="text-xs text-neutral-500">Adicionado por</Label>
            <p className="text-sm font-medium">{lead.adicionado_por_nome}</p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
