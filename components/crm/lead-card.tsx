"use client"

import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { useRouter } from "next/navigation"
import type { Lead } from "@/types/crm"
import { cn } from "@/lib/utils"
import { Phone, MessageCircle, MapPin, FileText, RefreshCw, Users, MoreHorizontal, CheckCircle, XCircle, Eye, ArrowRightLeft, Trash2, Pencil, User, Tag, StickyNote, X, Tags, UserPlus, Check } from 'lucide-react'
import { toast } from "sonner"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuPortal,
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
  onShowNotes?: () => void
  onAddEtiqueta?: () => void
  // Novas props para submenus
  availableEtiquetas?: Array<{ id: string; nome: string; cor: string }>
  availableUsers?: Array<{ id: string; nome: string; cargo: string; cor: string }>
  onAssignEtiqueta?: (etiquetaId: string, isSelected: boolean) => void
  onAssignUser?: (userId: string, userName: string) => void
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

export function LeadCard({ lead, onClick, onView, onMove, onDelete, onConvert, onUnconvert, isHighlighted, assignment, etiquetas, hasNotes, onRemoveAssignment, onRemoveEtiqueta, onShowEtiquetas, onShowNotes, onAddEtiqueta, availableEtiquetas, availableUsers, onAssignEtiqueta, onAssignUser }: LeadCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: lead.id,
  })
  const { user } = useUser()
  const router = useRouter()

  const style = {
    transform: CSS.Translate.toString(transform),
    transition: isDragging ? 'none' : 'transform 200ms ease',
  }

  // Duplo clique para visualizar dados do lead
  const handleDoubleClick = () => {
    if (onView) {
      onView()
    }
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

  // Ícones de temperatura (mesmo padrão do WhatsApp)
  const TemperaturaIcon = ({ temperatura, size = 14 }: { temperatura: string; size?: number }) => {
    switch (temperatura) {
      case "Quente":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"/>
          </svg>
        )
      case "Morno":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 2v2"/>
            <path d="M14 2v2"/>
            <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/>
            <path d="M6 2v2"/>
          </svg>
        )
      case "Frio":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      default:
        return null
    }
  }

  const getTemperaturaBadgeClasses = () => {
    switch (lead.temperatura) {
      case "Quente":
        return "bg-red-100 border-red-300 text-red-700"
      case "Morno":
        return "bg-orange-100 border-orange-300 text-orange-700"
      case "Frio":
        return "bg-blue-100 border-blue-300 text-blue-700"
      default:
        return "bg-gray-100 border-gray-300 text-gray-700"
    }
  }

  const getPrimeiroESegundoNome = (nomeCompleto: string) => {
    const partes = nomeCompleto.split(' ').filter(p => p.length > 0)
    if (partes.length >= 2) {
      return `${partes[0]} ${partes[1]}`
    }
    return partes[0] || nomeCompleto
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
          {...listeners}
          onClick={handleDoubleClick}
          className={cn(
            "lead-card bg-white rounded-lg p-5 border-2 shadow-sm hover:shadow-md transition-shadow min-h-[100px]",
            getTemperaturaColor(),
            isDragging && "opacity-50 dragging",
            isHighlighted && "lead-highlight"
          )}
        >
          <div className="flex flex-col h-full">
            {/* Nome do lead + Badge de temperatura */}
            <div className="flex items-center gap-2 mb-3">
              {!isDragging && (
              <TooltipProvider>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <h4 
                      className="font-semibold text-neutral-900 text-sm inline-flex items-center gap-1.5 truncate flex-1 min-w-0"
                    >
                      <span className="truncate">{getPrimeiroESegundoNome(lead.nome)}</span>
                    </h4>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p className="text-xs">{lead.nome}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              )}
              {isDragging && (
                <h4 className="font-semibold text-neutral-900 text-sm inline-flex items-center gap-1.5 truncate flex-1 min-w-0">
                  <span className="truncate">{getPrimeiroESegundoNome(lead.nome)}</span>
                </h4>
              )}
              {/* Badge de temperatura padronizado */}
              <TooltipProvider>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs px-1.5 h-6 flex items-center gap-1 flex-shrink-0 cursor-pointer rounded-md border ${getTemperaturaBadgeClasses()}`}
                    >
                      <TemperaturaIcon temperatura={lead.temperatura} size={14} />
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p className="text-xs">{lead.temperatura}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            {/* Linha de badges: Atribuição à esquerda, etiquetas e notas à direita */}
            {(assignment || (etiquetas && etiquetas.length > 0) || hasNotes) && (
              <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                {/* Badge de atribuição (estilo moderno com cor do cargo) */}
                {assignment && (
                  <ContextMenu>
                    <ContextMenuTrigger asChild>
                      <div onClick={(e) => e.stopPropagation()} className="flex-shrink-0">
                        <TooltipProvider>
                          <Tooltip delayDuration={200}>
                            <TooltipTrigger asChild>
                              <Badge 
                                variant="secondary" 
                                className="text-[11px] px-1.5 h-6 flex items-center gap-1 cursor-pointer rounded-md border"
                                style={{ 
                                  backgroundColor: (assignment.assigned_to_color || "#6b7280") + '33', 
                                  color: assignment.assigned_to_color || "#6b7280", 
                                  borderColor: assignment.assigned_to_color || "#6b7280" 
                                }}
                              >
                                <User className="w-3.5 h-3.5" />
                                <span className="max-w-[50px] truncate">{assignment.assigned_to_name.split(' ')[0]}</span>
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
                
                {/* Badges de etiquetas ao lado do badge de atribuição */}
                {etiquetas && etiquetas.length > 0 && (
                  <>
                    {user?.show_all_tags ? (
                      // Exibe etiquetas coloridas
                      <>
                        {etiquetas.slice(0, 2).map((etiqueta) => (
                          <ContextMenu key={etiqueta.id}>
                            <ContextMenuTrigger asChild>
                              <div onClick={(e) => e.stopPropagation()}>
                                <TooltipProvider>
                                  <Tooltip delayDuration={200}>
                                    <TooltipTrigger asChild>
                                      <Badge
                                        variant="secondary"
                                        className="text-[11px] px-2 py-0.5 h-6 flex items-center gap-1 cursor-pointer rounded-md"
                                        style={{ 
                                          backgroundColor: etiqueta.cor, 
                                          borderColor: etiqueta.cor, 
                                          color: getContrastTextColor(etiqueta.cor) 
                                        }}
                                      >
                                        <Tag className="w-3.5 h-3.5" />
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
                            className="text-[11px] px-1.5 py-0.5 h-6 cursor-pointer rounded-md bg-muted text-muted-foreground"
                            onClick={(e) => {
                              e.stopPropagation()
                              onShowEtiquetas?.()
                            }}
                          >
                            +{etiquetas.length - 2}
                          </Badge>
                        )}
                      </>
                    ) : (
                      // Exibe badge compacto CINZA com número de etiquetas
                      <TooltipProvider>
                        <Tooltip delayDuration={200}>
                          <TooltipTrigger asChild>
                            <Badge 
                              variant="secondary" 
                              className="text-[11px] px-1.5 py-0.5 h-6 flex items-center gap-1 cursor-pointer rounded-md border bg-gray-100 border-gray-300 text-gray-700"
                              onClick={(e) => {
                                e.stopPropagation()
                                onShowEtiquetas?.()
                              }}
                            >
                              <Tag className="w-3.5 h-3.5" />
                              <span>{etiquetas.length}</span>
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-[200px] p-1.5">
                            <div className="flex flex-wrap gap-1 items-center">
                              {etiquetas.map(etiqueta => (
                                <Badge
                                  key={etiqueta.id}
                                  variant="secondary"
                                  className="text-[11px] px-2 py-0.5 flex items-center gap-1 rounded-md border"
                                  style={{ 
                                    backgroundColor: etiqueta.cor, 
                                    borderColor: etiqueta.cor, 
                                    color: getContrastTextColor(etiqueta.cor) 
                                  }}
                                >
                                  <Tag className="w-3.5 h-3.5" />
                                  {etiqueta.nome}
                                </Badge>
                              ))}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </>
                )}
                
                {/* Badge de notas (estilo amarelo padronizado) */}
                {hasNotes && (
                  <TooltipProvider>
                    <Tooltip delayDuration={200}>
                      <TooltipTrigger asChild>
                        <Badge 
                          variant="secondary" 
                          className="text-[11px] px-1.5 py-0.5 h-6 flex items-center gap-1 cursor-pointer rounded-md border bg-yellow-100 border-yellow-300 text-yellow-700"
                          onClick={(e) => {
                            e.stopPropagation()
                            onShowNotes?.()
                          }}
                        >
                          <StickyNote className="w-3.5 h-3.5" />
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Ver notas</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            )}
            
            {/* Ação no canto inferior esquerdo */}
            {lead.acao && (
              <Badge variant="secondary" className="mt-auto text-xs flex items-center gap-1.5 w-fit rounded-md">
                {getActionIcon(lead.acao)}
                <span>{lead.acao}</span>
              </Badge>
            )}

            {lead.status === "convertido" && (
              <Badge className="mt-1 text-xs flex items-center gap-1.5 w-fit bg-green-100 text-green-700 border-green-300 rounded-md">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Convertido</span>
              </Badge>
            )}
            
            {lead.observacao && (
              <TooltipProvider>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <div className="inline-block mt-1">
                      <span className="text-[11px] px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded border border-neutral-200 cursor-help">
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
        className="w-48 rounded-lg"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {/* Editar lead */}
        {canEdit && (
          <ContextMenuItem 
            onSelect={() => onClick?.()}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Editar lead
          </ContextMenuItem>
        )}
        
        {/* Ver dados */}
        <ContextMenuItem 
          onSelect={() => onView?.()}
        >
          <Eye className="w-4 h-4 mr-2" />
          Ver dados
        </ContextMenuItem>
        
        {/* Ver chat */}
        {(lead.chat_uuid || lead.telefone) && (
          <ContextMenuItem 
            onSelect={() => {
              if (lead.chat_uuid) {
                router.push(`/whatsapp?chatUuid=${lead.chat_uuid}`)
              } else if (lead.telefone) {
                router.push(`/whatsapp?telefone=${lead.telefone}`)
              }
            }}
          >
            <WhatsAppChatIcon />
            Ver chat
          </ContextMenuItem>
        )}
        
        <ContextMenuSeparator />
        
        {/* Atribuir com submenu */}
        {availableUsers && availableUsers.length > 0 && (
          <ContextMenuSub>
            <ContextMenuSubTrigger disabled={!lead.chat_uuid}>
              <UserPlus className="w-4 h-4 mr-2" />
              Atribuir
            </ContextMenuSubTrigger>
            <ContextMenuPortal>
              <ContextMenuSubContent className="w-48 rounded-lg">
                {[...availableUsers]
                  .sort((a, b) => {
                    const userCargo = (typeof window !== 'undefined' && document.cookie.match(/auth_user_id=([^;]+)/)?.[1]) || ''
                    const isCurrentUserA = userCargo === a.id
                    const isCurrentUserB = userCargo === b.id
                    const isAssignedA = assignment?.assigned_to_name === a.nome
                    const isAssignedB = assignment?.assigned_to_name === b.nome
                    
                    if (isCurrentUserA && !isCurrentUserB) return -1
                    if (!isCurrentUserA && isCurrentUserB) return 1
                    if (isAssignedA && !isAssignedB) return -1
                    if (!isAssignedA && isAssignedB) return 1
                    return 0
                  })
                  .map((user) => {
                    const userIdFromCookie = (typeof window !== 'undefined' && document.cookie.match(/auth_user_id=([^;]+)/)?.[1]) || ''
                    const isAssigned = assignment?.assigned_to_name === user.nome
                    const isCurrentUser = userIdFromCookie === user.id
                    return (
                      <ContextMenuItem
                        key={user.id}
                        onClick={() => {
                          if (lead.chat_uuid && onAssignUser) {
                            onAssignUser(user.id, user.nome)
                          }
                        }}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-2 w-full">
                          <div
                            className="w-3 h-3 rounded"
                            style={{ backgroundColor: user.cor }}
                          />
                          <span className="flex-1 text-sm">{user.nome}</span>
                          <div className="flex items-center gap-1">
                            {isCurrentUser && (
                              <span className="text-xs text-blue-600 font-medium">Você</span>
                            )}
                            {isAssigned && (
                              <span className="text-xs text-blue-600 font-medium flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-blue-600" />
                                Atual
                              </span>
                            )}
                          </div>
                        </div>
                      </ContextMenuItem>
                    )
                  })}
              </ContextMenuSubContent>
            </ContextMenuPortal>
          </ContextMenuSub>
        )}
        
        {/* Etiqueta com submenu */}
        {availableEtiquetas && availableEtiquetas.length > 0 && (
          <ContextMenuSub>
            <ContextMenuSubTrigger disabled={!lead.chat_uuid}>
              <Tag className="w-4 h-4 mr-2" />
              Etiqueta
            </ContextMenuSubTrigger>
            <ContextMenuPortal>
              <ContextMenuSubContent className="w-48 rounded-lg">
                {availableEtiquetas.map((etiqueta) => {
                  const isSelected = etiquetas?.some(e => e.id === etiqueta.id) || false
                  return (
                    <ContextMenuItem
                      key={etiqueta.id}
                      onClick={() => {
                        if (lead.chat_uuid && onAssignEtiqueta) {
                          onAssignEtiqueta(etiqueta.id, isSelected)
                        }
                      }}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <div
                          className="w-3 h-3 rounded"
                          style={{ backgroundColor: etiqueta.cor }}
                        />
                        <span className="flex-1 text-sm">{etiqueta.nome}</span>
                        {isSelected && (
                          <Check className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                    </ContextMenuItem>
                  )
                })}
              </ContextMenuSubContent>
            </ContextMenuPortal>
          </ContextMenuSub>
        )}
        
        {/* Notas */}
        <ContextMenuItem 
          onSelect={() => {
            if (lead.chat_uuid) {
              onShowNotes?.()
            }
          }}
          disabled={!lead.chat_uuid}
        >
          <StickyNote className="w-4 h-4 mr-2" />
          Notas
        </ContextMenuItem>
        
        {/* Mover lead */}
        {canEdit && (
          <ContextMenuItem 
            onSelect={() => onMove?.()}
          >
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Mover lead
          </ContextMenuItem>
        )}
        
        <ContextMenuSeparator />
        
        {/* Converter/Desconverter */}
        {canEdit && (
          lead.status === "convertido" ? (
            <ContextMenuItem 
              onSelect={() => onUnconvert?.()}
              className="text-orange-600 focus:text-orange-600 focus:bg-orange-50"
            >
              <XCircle className="w-4 h-4 mr-2 text-orange-600" />
              Desconverter
            </ContextMenuItem>
          ) : (
            <ContextMenuItem 
              onSelect={() => onConvert?.()}
              className="text-green-600 focus:text-green-600 focus:bg-green-50"
            >
              <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
              Converter
            </ContextMenuItem>
          )
        )}
        
        {/* Excluir */}
        {canEdit && (
          <ContextMenuItem 
            onSelect={() => onDelete?.()}
            className="text-red-600 focus:text-red-600 focus:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2 text-red-600" />
            Excluir
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  )
}
