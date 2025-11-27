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
        {leads.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            onClick={() => onLeadClick(lead)}
            onView={() => onLeadView(lead)}
            onMove={() => onLeadMove(lead)}
            onDelete={() => onLeadDelete(lead)}
            onConvert={() => onLeadConvert?.(lead)}
            onUnconvert={() => onLeadUnconvert?.(lead)}
          />
        ))}
      </div>

      {leads.length === 0 && <div className="text-center text-neutral-400 text-sm mt-8">Nenhum lead</div>}
    </div>
  )
}
