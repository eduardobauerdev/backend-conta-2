"use client"

import { useDroppable } from "@dnd-kit/core"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { LeadCard } from "./lead-card"
import type { Lead } from "@/types/crm"
import { cn } from "@/lib/utils"

type KanbanColumnProps = {
  date: Date
  dateStr: string // Added dateStr prop in dd-MM-yy format
  leads: Lead[]
  onLeadClick: (lead: Lead) => void
  onLeadView: (lead: Lead) => void
  onLeadMove: (lead: Lead) => void
  onLeadDelete: (lead: Lead) => void
  onLeadConvert?: (lead: Lead) => void
  onLeadUnconvert?: (lead: Lead) => void
  highlightedLeadId?: string | null
  chatEtiquetasMap?: Record<string, string[]>
  chatAssignmentsMap?: Record<string, { assigned_to_name: string; assigned_to_cargo?: string; assigned_to_color?: string }>
  chatNotesMap?: Record<string, boolean>
  chatIdMap?: Record<string, string>
  etiquetas?: Array<{ id: string; nome: string; cor: string }>
  onRemoveAssignment?: (chatId: string, chatUuid: string) => void
  onRemoveEtiqueta?: (chatId: string, chatUuid: string, etiquetaId: string) => void
  onShowEtiquetas?: (lead: Lead) => void
  onShowNotes?: (lead: Lead) => void
  onAddEtiqueta?: (lead: Lead) => void
  // Novas props para submenus
  availableUsers?: Array<{ id: string; nome: string; cargo: string; cor: string }>
  onAssignEtiqueta?: (lead: Lead, etiquetaId: string, isSelected: boolean) => void
  onAssignUser?: (lead: Lead, userId: string, userName: string) => void
}

export function KanbanColumn({
  date,
  dateStr, // Use dateStr for droppable ID
  leads,
  onLeadClick,
  onLeadView,
  onLeadMove,
  onLeadDelete,
  onLeadConvert,
  onLeadUnconvert,
  highlightedLeadId,
  chatEtiquetasMap = {},
  chatAssignmentsMap = {},
  chatNotesMap = {},
  chatIdMap = {},
  etiquetas = [],
  onRemoveAssignment,
  onRemoveEtiqueta,
  onShowEtiquetas,
  onShowNotes,
  onAddEtiqueta,
  availableUsers = [],
  onAssignEtiqueta,
  onAssignUser,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: dateStr,
  })

  const isToday = format(new Date(), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "bg-neutral-50 rounded-xl p-4 min-h-[500px] border-2 transition-colors",
        isOver && "border-blue-400 bg-blue-50",
        !isOver && "border-neutral-200",
        isToday && "ring-2 ring-blue-500 ring-offset-2",
      )}
    >
      <div className="mb-4">
        <div className="flex flex-col gap-1">
          {isToday && <span className="text-xs text-blue-600 font-semibold uppercase tracking-wide">Hoje</span>}
          <h3 className="font-semibold text-neutral-900 capitalize">{format(date, "EEEE", { locale: ptBR })}</h3>
        </div>
        <p className="text-sm text-neutral-600 mt-1">{format(date, "dd/MM")}</p>
      </div>

      <div className="space-y-3">
        {leads.map((lead) => {
          // Prepara dados de badges
          const leadEtiquetaIds = lead.chat_uuid ? (chatEtiquetasMap[lead.chat_uuid] || []) : []
          const leadEtiquetas = leadEtiquetaIds
            .map(id => etiquetas.find(e => e.id === id))
            .filter(Boolean) as { id: string; nome: string; cor: string }[]
          
          const leadAssignment = lead.chat_uuid ? chatAssignmentsMap[lead.chat_uuid] : undefined
          const hasNotes = lead.chat_uuid ? (chatNotesMap[lead.chat_uuid] || false) : false
          const chatId = lead.chat_uuid ? chatIdMap[lead.chat_uuid] : undefined

          return (
            <LeadCard
              key={lead.id}
              lead={lead}
              onClick={() => onLeadClick(lead)}
              onView={() => onLeadView(lead)}
              onMove={() => onLeadMove(lead)}
              onDelete={() => onLeadDelete(lead)}
              onConvert={() => onLeadConvert?.(lead)}
              onUnconvert={() => onLeadUnconvert?.(lead)}
              isHighlighted={highlightedLeadId === lead.id}
              assignment={leadAssignment}
              etiquetas={leadEtiquetas}
              hasNotes={hasNotes}
              onRemoveAssignment={
                chatId && lead.chat_uuid && onRemoveAssignment
                  ? () => onRemoveAssignment(chatId, lead.chat_uuid!)
                  : undefined
              }
              onRemoveEtiqueta={
                chatId && lead.chat_uuid && onRemoveEtiqueta
                  ? (etiquetaId: string) => onRemoveEtiqueta(chatId, lead.chat_uuid!, etiquetaId)
                  : undefined
              }
              onShowEtiquetas={
                onShowEtiquetas
                  ? () => onShowEtiquetas(lead)
                  : undefined
              }
              onShowNotes={
                onShowNotes
                  ? () => onShowNotes(lead)
                  : undefined
              }
              onAddEtiqueta={
                onAddEtiqueta
                  ? () => onAddEtiqueta(lead)
                  : undefined
              }
              availableEtiquetas={etiquetas}
              availableUsers={availableUsers}
              onAssignEtiqueta={
                onAssignEtiqueta
                  ? (etiquetaId: string, isSelected: boolean) => onAssignEtiqueta(lead, etiquetaId, isSelected)
                  : undefined
              }
              onAssignUser={
                onAssignUser
                  ? (userId: string, userName: string) => onAssignUser(lead, userId, userName)
                  : undefined
              }
            />
          )
        })}
      </div>

      {leads.length === 0 && <div className="text-center text-neutral-400 text-sm mt-8">Nenhum lead</div>}
    </div>
  )
}
