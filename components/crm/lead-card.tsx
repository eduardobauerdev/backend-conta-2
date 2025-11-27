"use client"

import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import type { Lead } from "@/types/crm"
import { cn } from "@/lib/utils"
import { Phone, MessageCircle, MapPin, FileText, RefreshCw, Users, MoreHorizontal, CheckCircle, XCircle } from 'lucide-react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { useUser } from "@/contexts/user-context"

type LeadCardProps = {
  lead: Lead
  onClick?: () => void
  onView?: () => void
  onMove?: () => void
  onDelete?: () => void
  onConvert?: () => void
  onUnconvert?: () => void
}

export function LeadCard({ lead, onClick, onView, onMove, onDelete, onConvert, onUnconvert }: LeadCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: lead.id,
  })
  const { user } = useUser()

  const style = {
    transform: CSS.Translate.toString(transform),
    transition: isDragging ? 'none' : 'transform 200ms ease',
  }

  const canEdit = user && (
    user.cargo === "Administrador" || 
    user.cargo === "Desenvolvedor" || 
    lead.adicionado_por_id === user.id
  )

  const getTemperaturaColor = () => {
    if (lead.status === "convertido") {
      return "border-green-300/50 bg-green-50/50"
    }
    
    switch (lead.temperatura) {
      case "Quente":
        return "border-red-300/50 bg-red-50/50"
      case "Morno":
        return "border-orange-300/50 bg-orange-50/50"
      case "Frio":
        return "border-blue-300/50 bg-blue-50/50"
    }
  }

  const getTemperaturaEmoji = () => {
    switch (lead.temperatura) {
      case "Frio":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-snowflake text-blue-400">
            <path d="m10 20-1.25-2.5L6 18"/>
            <path d="M10 4 8.75 6.5 6 6"/>
            <path d="m14 20 1.25-2.5L18 18"/>
            <path d="m14 4 1.25 2.5L18 6"/>
            <path d="m17 21-3-6h-4"/>
            <path d="m17 3-3 6 1.5 3"/>
            <path d="M2 12h6.5L10 9"/>
            <path d="m20 10-1.5 2 1.5 2"/>
            <path d="M22 12h-6.5L14 15"/>
            <path d="m4 10 1.5 2L4 14"/>
            <path d="m7 21 3-6-1.5-3"/>
            <path d="m7 3 3 6h4"/>
          </svg>
        )
      case "Morno":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-coffee text-orange-500">
            <path d="M10 2v2"/>
            <path d="M14 2v2"/>
            <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/>
            <path d="M6 2v2"/>
          </svg>
        )
      case "Quente":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flame text-red-500">
            <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"/>
          </svg>
        )
    }
  }

  const getPrimeiroNome = (nomeCompleto: string) => {
    return nomeCompleto.split(' ')[0]
  }

  const getActionIcon = (acao: string) => {
    const iconClass = "w-3 h-3"
    switch (acao) {
      case "Ligar":
        return <Phone className={iconClass} />
      case "Enviar mensagem":
        return <MessageCircle className={iconClass} />
      case "Visitar local":
        return <MapPin className={iconClass} />
      case "Enviar proposta":
        return <FileText className={iconClass} />
      case "Acompanhamento":
        return <RefreshCw className={iconClass} />
      case "Reunião":
        return <Users className={iconClass} />
      default:
        return <MoreHorizontal className={iconClass} />
    }
  }

  return (
    <ContextMenu modal={false}>
      <ContextMenuTrigger asChild>
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          className={cn(
            "bg-white rounded-lg p-3 border-2 shadow-sm hover:shadow-md transition-shadow",
            getTemperaturaColor(),
            isDragging && "opacity-50"
          )}
        >
          <div {...listeners} className="cursor-grab active:cursor-grabbing">
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <h4 
                    className="font-semibold text-neutral-900 mb-1 cursor-pointer hover:text-neutral-700 inline-flex items-center gap-1.5"
                    onClick={(e) => {
                      e.stopPropagation()
                      onClick?.()
                    }}
                  >
                    <span>{getPrimeiroNome(lead.nome)}</span>
                    {getTemperaturaEmoji()}
                  </h4>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-xs">{lead.nome}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <p className="text-xs text-neutral-500 mb-2">
              <span className="font-medium">Vendedor:</span> {lead.adicionado_por_nome}
            </p>
            
            {lead.acao && (
              <Badge variant="secondary" className="mb-2 text-xs flex items-center gap-1.5 w-fit">
                {getActionIcon(lead.acao)}
                <span>{lead.acao}</span>
              </Badge>
            )}

            {lead.status === "convertido" && (
              <Badge className="mb-2 text-xs flex items-center gap-1.5 w-fit bg-green-100 text-green-700 border-green-300">
                <CheckCircle className="w-3 h-3" />
                <span>Convertido</span>
              </Badge>
            )}
            
            {lead.observacao && (
              <TooltipProvider>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <div className="inline-block">
                      <span className="text-[10px] px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded border border-neutral-200 cursor-help">
                        Observação
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs">
                    <p className="text-xs">{lead.observacao}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent 
        className="w-auto"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <ContextMenuItem 
          onSelect={(e) => {
            e.preventDefault()
            onView?.()
          }}
        >
          Ver dados
        </ContextMenuItem>
        {canEdit && (
          <>
            <ContextMenuItem 
              onSelect={(e) => {
                e.preventDefault()
                onMove?.()
              }}
            >
              Mover lead
            </ContextMenuItem>
            {lead.status === "convertido" ? (
              <ContextMenuItem 
                onSelect={(e) => {
                  e.preventDefault()
                  onUnconvert?.()
                }}
                className="text-orange-600 focus:text-orange-600 focus:bg-orange-50"
              >
                Desconverter
              </ContextMenuItem>
            ) : (
              <ContextMenuItem 
                onSelect={(e) => {
                  e.preventDefault()
                  onConvert?.()
                }}
                className="text-green-600 focus:text-green-600 focus:bg-green-50"
              >
                Convertido
              </ContextMenuItem>
            )}
            <ContextMenuItem 
              onSelect={(e) => {
                e.preventDefault()
                onDelete?.()
              }}
              className="text-red-600 focus:text-red-600"
            >
              Excluir
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  )
}
