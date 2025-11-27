"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Coffee, Flame, Calendar, Phone, MapPin, Target, FileText, CheckCircle, User } from 'lucide-react'
import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { Lead } from "@/types/crm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare } from 'lucide-react'
import dynamic from 'next/dynamic'

const ChatWindow = dynamic(
  () => import('@/components/whatsapp/chat-window').then(mod => ({ default: mod.ChatWindow })),
  { ssr: false }
)

type ViewLeadDetailsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  lead: Lead | null
}

export function ViewLeadDetailsDialog({ open, onOpenChange, lead }: ViewLeadDetailsDialogProps) {
  if (!lead) return null

  const getTemperaturaIcon = () => {
    switch (lead.temperatura) {
      case "Frio":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
            <path d="m10 20-1.25-2.5L6 18"/><path d="M10 4 8.75 6.5 6 6"/><path d="m14 20 1.25-2.5L18 18"/><path d="m14 4 1.25 2.5L18 6"/><path d="m17 21-3-6h-4"/><path d="m17 3-3 6 1.5 3"/><path d="M2 12h6.5L10 9"/><path d="m20 10-1.5 2 1.5 2"/><path d="M22 12h-6.5L14 15"/><path d="m4 10 1.5 2L4 14"/><path d="m7 21 3-6-1.5-3"/><path d="m7 3 3 6h4"/>
          </svg>
        )
      case "Morno":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
            <path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/>
          </svg>
        )
      case "Quente":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
            <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"/>
          </svg>
        )
    }
  }

  const getTemperaturaColor = (temp: string) => {
    switch (temp) {
      case "Quente":
        return "bg-red-100 text-red-700 border-red-300"
      case "Morno":
        return "bg-orange-100 text-orange-700 border-orange-300"
      case "Frio":
        return "bg-blue-100 text-blue-700 border-blue-300"
      default:
        return "bg-neutral-100 text-neutral-700 border-neutral-300"
    }
  }

  const getChatId = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '')
    const formatted = cleaned.startsWith('55') ? cleaned : '55' + cleaned
    return formatted + '@c.us'
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Detalhes do Lead</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="detalhes" className="flex-1">
          <TabsList className="w-full">
            <TabsTrigger value="detalhes" className="flex-1">
              Detalhes
            </TabsTrigger>
            {lead.telefone && (
              <TabsTrigger value="whatsapp" className="flex-1 gap-2">
                <MessageSquare className="w-4 h-4" />
                WhatsApp
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="detalhes" className="mt-4">
            <div className="space-y-6 max-h-[60vh] overflow-y-auto">
              <div className="bg-neutral-50 p-4 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-2xl font-bold text-neutral-900">{lead.nome}</h3>
                  {lead.status === "convertido" && (
                    <Badge className="bg-green-100 text-green-700 border-green-300 gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Convertido
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <User className="w-4 h-4" />
                  <span>Adicionado por {lead.adicionado_por_nome}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {lead.telefone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-neutral-400 mt-0.5" />
                    <div className="flex-1">
                      <Label className="text-xs text-neutral-500">Telefone</Label>
                      <p className="text-sm font-medium">{lead.telefone}</p>
                    </div>
                  </div>
                )}

                {lead.cidade && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-neutral-400 mt-0.5" />
                    <div className="flex-1">
                      <Label className="text-xs text-neutral-500">Cidade</Label>
                      <p className="text-sm font-medium">{lead.cidade}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  {getTemperaturaIcon()}
                  <div className="flex-1">
                    <Label className="text-xs text-neutral-500">Temperatura</Label>
                    <Badge className={getTemperaturaColor(lead.temperatura)}>
                      {lead.temperatura}
                    </Badge>
                  </div>
                </div>

                {lead.cargo && (
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-neutral-400 mt-0.5" />
                    <div className="flex-1">
                      <Label className="text-xs text-neutral-500">Cargo</Label>
                      <p className="text-sm font-medium">{lead.cargo}</p>
                    </div>
                  </div>
                )}
              </div>

              {lead.endereco && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-neutral-400 mt-0.5" />
                  <div className="flex-1">
                    <Label className="text-xs text-neutral-500">Endereço</Label>
                    <p className="text-sm font-medium">{lead.endereco}</p>
                  </div>
                </div>
              )}

              {lead.interesse && (
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-neutral-400 mt-0.5" />
                  <div className="flex-1">
                    <Label className="text-xs text-neutral-500">Interesse</Label>
                    <p className="text-sm font-medium">{lead.interesse}</p>
                  </div>
                </div>
              )}

              {lead.proximo_contato && (
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-neutral-400 mt-0.5" />
                  <div className="flex-1">
                    <Label className="text-xs text-neutral-500">Próximo Contato</Label>
                    <p className="text-sm font-medium">
                      {format(parseISO(lead.proximo_contato), "PPP", { locale: ptBR })}
                    </p>
                  </div>
                </div>
              )}

              {lead.acao && (
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-neutral-400 mt-0.5" />
                  <div className="flex-1">
                    <Label className="text-xs text-neutral-500">Ação</Label>
                    <p className="text-sm font-medium">{lead.acao}</p>
                  </div>
                </div>
              )}

              {lead.observacao && (
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-neutral-400 mt-0.5" />
                  <div className="flex-1">
                    <Label className="text-xs text-neutral-500">Observação</Label>
                    <p className="text-sm font-medium whitespace-pre-wrap">{lead.observacao}</p>
                  </div>
                </div>
              )}

              <div className="bg-neutral-50 p-3 rounded-lg text-xs text-neutral-500 space-y-1">
                <p>Criado em {format(parseISO(lead.created_at), "PPP 'às' HH:mm", { locale: ptBR })}</p>
                {lead.updated_at !== lead.created_at && (
                  <p>Atualizado em {format(parseISO(lead.updated_at), "PPP 'às' HH:mm", { locale: ptBR })}</p>
                )}
              </div>

              <Button onClick={() => onOpenChange(false)} className="w-full">
                Fechar
              </Button>
            </div>
          </TabsContent>

          {lead.telefone && (
            <TabsContent value="whatsapp" className="mt-4">
              <div className="h-[60vh] border rounded-lg overflow-hidden">
                <ChatWindow
                  chatId={getChatId(lead.telefone)}
                  chatName={lead.nome}
                  onRefresh={() => {}}
                />
              </div>
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
