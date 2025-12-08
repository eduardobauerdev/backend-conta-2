"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  CalendarIcon,
  Phone,
  MessageCircle,
  MapPin,
  FileText,
  RefreshCw,
  Users,
  MoreHorizontal,
  Loader2,
  X,
} from "lucide-react"
import { useUser } from "@/contexts/user-context"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"

type QuickLeadFormProps = {
  chatId: string
  chatUuid?: string | null  // UUID interno estável do chat
  chatName: string
  onSuccess: () => void
  onCancel: () => void
}

export function QuickLeadForm({ chatId, chatUuid, chatName, onSuccess, onCancel }: QuickLeadFormProps) {
  const [nome, setNome] = useState(chatName)
  const [cidade, setCidade] = useState("")
  const [interesse, setInteresse] = useState<string[]>([])
  const [interesseOutro, setInteresseOutro] = useState("")
  const [showEndereco, setShowEndereco] = useState(false)
  const [showCargo, setShowCargo] = useState(false)
  const [cargo, setCargo] = useState("")
  const [endereco, setEndereco] = useState("")
  const [telefone, setTelefone] = useState(chatId.includes("@") ? chatId.split("@")[0] : "")
  const [temperatura, setTemperatura] = useState<"Quente" | "Morno" | "Frio">("Morno")
  const [proximoContato, setProximoContato] = useState<Date | undefined>(new Date())
  const [acao, setAcao] = useState("")
  const [notas, setNotas] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [existingLead, setExistingLead] = useState<{ id: string; nome: string } | null>(null)
  const [checkingLead, setCheckingLead] = useState(true)
  const { user } = useUser()
  const supabase = createClient()

  // Verifica se já existe lead para este chat
  useEffect(() => {
    async function checkExistingLead() {
      setCheckingLead(true)
      try {
        // Busca por chat_uuid (mais confiável) ou telefone
        let query = supabase.from("leads").select("id, nome")
        
        if (chatUuid) {
          query = query.eq("chat_uuid", chatUuid)
        } else {
          // Fallback: busca por telefone
          const telefoneNum = chatId.includes("@") ? chatId.split("@")[0] : chatId
          query = query.eq("telefone", telefoneNum)
        }
        
        const { data } = await query.limit(1).single()
        
        if (data) {
          setExistingLead(data)
        } else {
          setExistingLead(null)
        }
      } catch {
        setExistingLead(null)
      } finally {
        setCheckingLead(false)
      }
    }
    
    checkExistingLead()
  }, [chatId, chatUuid, supabase])

  // Busca notas existentes do chat
  useEffect(() => {
    async function loadChatNotes() {
      try {
        const response = await fetch(`/api/whatsapp/notes?chatId=${chatId}`)
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.note?.content) {
            setNotas(data.note.content)
          }
        }
      } catch (error) {
        console.error("Erro ao carregar notas do chat:", error)
      }
    }
    
    loadChatNotes()
  }, [chatId])

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

  const formatDateToISO = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
    return `${year}-${month}-${day}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user || !nome.trim() || !cidade.trim() || interesse.length === 0) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }

    // Verifica novamente se já existe lead (pode ter sido criado enquanto preenchia)
    if (existingLead) {
      toast.error(`Já existe um lead "${existingLead.nome}" vinculado a este chat`)
      return
    }

    setIsSubmitting(true)

    const interesseFormatado = formatInteresse()
    const proximoContatoStr = proximoContato ? formatDateToISO(proximoContato) : null

    // Cria o lead
    const { data: leadData, error } = await supabase.from("leads").insert({
      nome: nome.trim(),
      cidade: cidade.trim(),
      interesse: interesseFormatado,
      telefone: telefone.trim() || null,
      endereco: endereco.trim() || null,
      cargo: cargo.trim() || null,
      temperatura,
      proximo_contato: proximoContatoStr,
      dia_semana: proximoContatoStr,
      adicionado_por_id: user.id,
      adicionado_por_nome: user.nome,
      acao: acao.trim() || null,
      observacao: null,
      status: "ativo",
      chat_uuid: chatUuid || null,  // Vincula ao chat pelo UUID estável
    }).select().single()

    if (error) {
      console.error("[v0] Error creating lead:", error)
      toast.error("Erro ao criar lead")
      setIsSubmitting(false)
      return
    }

    // Se houver notas, salva/atualiza no sistema de notas
    if (notas.trim() && leadData) {
      try {
        await fetch("/api/whatsapp/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chatId,
            chatName,
            content: notas.trim(),
            previousContent: null,
          }),
        })
      } catch (error) {
        console.error("Erro ao salvar notas:", error)
      }
    }

    await supabase.from("lead_logs").insert({
      usuario_id: user.id,
      usuario_nome: user.nome,
      acao: "criado",
      detalhes: `Lead "${nome}" criado via WhatsApp`,
    })

    setIsSubmitting(false)
    onSuccess()
  }

  useEffect(() => {
    setNome(chatName)
    setCidade("")
    setInteresse([])
    setInteresseOutro("")
    setShowEndereco(false)
    setShowCargo(false)
    setCargo("")
    setEndereco("")
    setTelefone(chatId.includes("@") ? chatId.split("@")[0] : "")
    setTemperatura("Morno")
    setProximoContato(new Date())
    setAcao("")
    // Não reseta as notas aqui pois elas são carregadas pelo useEffect acima
  }, [chatId, chatName])

  return (
    <div className="p-4 h-full flex flex-col min-h-0">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h2 className="text-2xl font-bold">Novo Lead</h2>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Alerta se já existe lead vinculado */}
      {checkingLead ? (
        <div className="flex items-center gap-2 p-4 mb-4 bg-neutral-100 rounded-lg">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm text-neutral-600">Verificando se já existe lead...</span>
        </div>
      ) : existingLead ? (
        <div className="p-4 mb-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <p className="font-medium text-amber-800">Lead já existe!</p>
              <p className="text-sm text-amber-700 mt-1">
                Já existe um lead <strong>"{existingLead.nome}"</strong> vinculado a este chat.
              </p>
              <p className="text-xs text-amber-600 mt-2">
                Para evitar duplicatas, você pode editar o lead existente no banco de dados.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-3 flex-1 overflow-y-auto min-h-0 pr-1">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome *</Label>
          <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome do lead" required />
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
          <Label htmlFor="interesse">Interesse *</Label>
          <div className="border rounded-md p-3 space-y-2">
            {["Guarda-corpo", "Corrimão", "Box", "Outro"].map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <Checkbox
                  id={`interesse-${item}`}
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
                <label htmlFor={`interesse-${item}`} className="text-sm font-medium leading-none cursor-pointer">
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>

        {interesse.includes("Outro") && (
          <div className="space-y-2">
            <Input
              id="interesse-outro"
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
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-endereco"
              checked={showEndereco}
              onCheckedChange={(checked) => {
                setShowEndereco(checked as boolean)
                if (!checked) setEndereco("")
              }}
            />
            <label
              htmlFor="show-endereco"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Endereço (Opcional)
            </label>
          </div>
          {showEndereco && (
            <Input
              id="endereco"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              placeholder="Endereço completo"
            />
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-cargo"
              checked={showCargo}
              onCheckedChange={(checked) => {
                setShowCargo(checked as boolean)
                if (!checked) setCargo("")
              }}
            />
            <label
              htmlFor="show-cargo"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Cargo (Opcional)
            </label>
          </div>
          {showCargo && (
            <Input
              id="cargo"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              placeholder="Ex: Gerente, Proprietário, etc."
            />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="temperatura">Temperatura *</Label>
          <Select value={temperatura} onValueChange={(v) => setTemperatura(v as any)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
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
                className={cn("w-full justify-start text-left font-normal", !proximoContato && "text-muted-foreground")}
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
          <Label htmlFor="notas">Adicionar notas</Label>
          <Textarea
            id="notas"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Adicione notas sobre este lead (serão salvas no sistema de notas)..."
            rows={3}
          />
        </div>
        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting || checkingLead || !!existingLead} className="flex-1">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : existingLead ? (
              "Lead já existe"
            ) : (
              "Criar Lead"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
