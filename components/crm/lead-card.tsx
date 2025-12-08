"use client"

import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { useRouter } from "next/navigation"
import type { Lead } from "@/types/crm"
import { cn } from "@/lib/utils"
import { Phone, MessageCircle, MapPin, FileText, RefreshCw, Users, MoreHorizontal, CheckCircle, XCircle, Eye, ArrowRightLeft, Trash2, Pencil, User, Tag, StickyNote, X, Tags } from 'lucide-react'
import { toast } from "sonner"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
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
import { getContrastTextColor } from "@/lib/utils"

type LeadCardProps = {
  lead: Lead
  onClick?: () => void
  onView?: () => void
  onMove?: () => void
  onDelete?: () => void
  onConvert?: () => void
  onUnconvert?: () => void
  isHighlighted?: boolean
  assignment?: { assigned_to_name: string; assigned_to_cargo?: string; assigned_to_color?: string } | null
  etiquetas?: Array<{ id: string; nome: string; cor: string }>
  hasNotes?: boolean
  onRemoveAssignment?: () => void
  onRemoveEtiqueta?: (etiquetaId: string) => void
  onShowEtiquetas?: () => void
}

// Ícone SVG do WhatsApp (mesmo da Sidebar)
const WhatsAppChatIcon = () => (
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
    className="mr-2"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

export function LeadCard({ lead, onClick, onView, onMove, onDelete, onConvert, onUnconvert, isHighlighted, assignment, etiquetas, hasNotes, onRemoveAssignment, onRemoveEtiqueta, onShowEtiquetas }: LeadCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: lead.id,
  })
  const { user } = useUser()
  const router = useRouter()

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
          id={`lead-card-${lead.id}`}
          ref={setNodeRef}
          style={style}
          {...attributes}
          className={cn(
            "bg-white rounded-lg p-3 border-2 shadow-sm hover:shadow-md transition-shadow",
            getTemperaturaColor(),
            isDragging && "opacity-50",
            isHighlighted && "lead-highlight"
          )}
        >
          <div {...listeners} className="cursor-grab active:cursor-grabbing">
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <h4 
                    className="font-semibold text-neutral-900 mb-1 inline-flex items-center gap-1.5"
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
            
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <p className="text-xs text-neutral-500">
                <span className="font-medium">Vendedor:</span> {lead.adicionado_por_nome}
              </p>
              
              {/* Etiquetas ao lado do vendedor */}
              {etiquetas && etiquetas.length > 0 && (
                <div className="flex items-center gap-1">
                  {etiquetas.slice(0, 2).map((etiqueta) => (
                    <ContextMenu key={etiqueta.id}>
                      <ContextMenuTrigger asChild>
                        <div onClick={(e) => e.stopPropagation()}>
                          <TooltipProvider>
                            <Tooltip delayDuration={200}>
                              <TooltipTrigger asChild>
                                <Badge
                                  variant="secondary"
                                  className="text-[10px] px-1.5 py-0 h-4 flex items-center gap-1 border cursor-pointer"
                                  style={{ 
                                    backgroundColor: etiqueta.cor, 
                                    borderColor: etiqueta.cor, 
                                    color: getContrastTextColor(etiqueta.cor) 
                                  }}
                                >
                                  <Tag className="w-2.5 h-2.5" />
                                  <span className="max-w-[50px] truncate">{etiqueta.nome}</span>
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{etiqueta.nome}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </ContextMenuTrigger>
                      <ContextMenuContent className="w-48">
                        <ContextMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            onRemoveEtiqueta?.(etiqueta.id)
                          }}
                          className="text-destructive focus:text-destructive"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Remover essa etiqueta
                        </ContextMenuItem>
                        {onShowEtiquetas && (
                          <>
                            <ContextMenuSeparator />
                            <ContextMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                onShowEtiquetas()
                              }}
                            >
                              <Tags className="w-4 h-4 mr-2" />
                              Ver todas etiquetas
                            </ContextMenuItem>
                          </>
                        )}
                      </ContextMenuContent>
                    </ContextMenu>
                  ))}
                  {etiquetas.length > 2 && (
                    <Badge 
                      variant="secondary" 
                      className="text-[10px] px-1.5 py-0 h-4 cursor-pointer hover:bg-secondary/80"
                      onClick={(e) => {
                        e.stopPropagation()
                        onShowEtiquetas?.()
                      }}
                    >
                      +{etiquetas.length - 2}
                    </Badge>
                  )}
                </div>
              )}
            </div>
            
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
            
            {/* Badge de atribuição com context menu */}
            {assignment && (
              <ContextMenu>
                <ContextMenuTrigger asChild>
                  <div onClick={(e) => e.stopPropagation()}>
                    <TooltipProvider>
                      <Tooltip delayDuration={200}>
                        <TooltipTrigger asChild>
                          <Badge 
                            variant="secondary" 
                            className="mb-2 text-xs flex items-center gap-1.5 w-fit border cursor-pointer"
                            style={{ 
                              backgroundColor: assignment.assigned_to_color || "#6366f1", 
                              color: "#ffffff", 
                              borderColor: assignment.assigned_to_color || "#6366f1" 
                            }}
                          >
                            <User className="w-3 h-3" />
                            <span>{assignment.assigned_to_name.split(' ')[0]}</span>
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{assignment.assigned_to_name} - {assignment.assigned_to_cargo || ''}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-48">
                  <ContextMenuItem
                    onClick={(e) => {
                      e.stopPropagation()
                      onRemoveAssignment?.()
                    }}
                    className="text-destructive focus:text-destructive"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remover atribuição
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            )}
            
            {/* Badge de notas */}
            {hasNotes && (
              <Badge variant="secondary" className="mb-2 text-xs flex items-center gap-1.5 w-fit bg-amber-50 text-amber-700 border-amber-300">
                <StickyNote className="w-3 h-3" />
                <span>Notas</span>
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
          <Eye className="w-4 h-4 mr-2" />
          Ver dados
        </ContextMenuItem>
        {canEdit && (
          <ContextMenuItem 
            onSelect={(e) => {
              e.preventDefault()
              onClick?.()
            }}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Editar lead
          </ContextMenuItem>
        )}
        {lead.chat_uuid && (
          <ContextMenuItem 
            onSelect={(e) => {
              e.preventDefault()
              router.push(`/whatsapp?chatUuid=${lead.chat_uuid}`)
            }}
          >
            <WhatsAppChatIcon />
            Ver chat
          </ContextMenuItem>
        )}
        {lead.telefone && !lead.chat_uuid && (
          <ContextMenuItem 
            onSelect={(e) => {
              e.preventDefault()
              router.push(`/whatsapp?telefone=${lead.telefone}`)
            }}
          >
            <WhatsAppChatIcon />
            Ver chat
          </ContextMenuItem>
        )}
        {canEdit && (
          <>
            <ContextMenuItem 
              onSelect={(e) => {
                e.preventDefault()
                onMove?.()
              }}
            >
              <ArrowRightLeft className="w-4 h-4 mr-2" />
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
                <XCircle className="w-4 h-4 mr-2 text-orange-600" />
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
                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                Converter
              </ContextMenuItem>
            )}
            <ContextMenuItem 
              onSelect={(e) => {
                e.preventDefault()
                onDelete?.()
              }}
              className="text-red-600 focus:text-red-600 focus:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2 text-red-600" />
              Excluir
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  )
}
