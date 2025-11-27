"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { useUser } from "@/contexts/user-context"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { Lead } from "@/types/crm"

type MoveLeadDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  lead: Lead | null
  onSuccess: () => void
}

export function MoveLeadDialog({ open, onOpenChange, lead, onSuccess }: MoveLeadDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useUser()
  const supabase = createClient()

  const formatDateDDMMYY = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
    return `${year}-${month}-${day}`
  }

  useEffect(() => {
    if (!open) {
      setSelectedDate(undefined)
      setIsSubmitting(false)
    }
  }, [open])

  const handleMove = async () => {
    if (!user || !lead || !selectedDate) {
      toast.error("Selecione uma data para mover o lead")
      return
    }

    setIsSubmitting(true)

    const newDate = formatDateDDMMYY(selectedDate)
    const oldDate = lead.proximo_contato

    const { error: updateError } = await supabase.from("leads").update({ proximo_contato: newDate }).eq("id", lead.id)

    if (updateError) {
      console.error("[v0] Error moving lead:", updateError)
      toast.error("Erro ao mover lead")
      setIsSubmitting(false)
      return
    }

    // Registrar log
    await supabase.from("lead_logs").insert({
      lead_id: lead.id,
      usuario_id: user.id,
      usuario_nome: user.nome,
      acao: "movido",
      de_data: oldDate,
      para_data: newDate,
      detalhes: `Lead movido para ${format(selectedDate, "PPP", { locale: ptBR })}`,
    })

    toast.success("Lead movido com sucesso")
    setIsSubmitting(false)
    setSelectedDate(undefined)
    onOpenChange(false)
    onSuccess()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Mover Lead</DialogTitle>
        </DialogHeader>

        {lead && (
          <div className="space-y-4">
            <div className="bg-neutral-50 p-3 rounded-lg">
              <p className="text-sm text-neutral-600">Movendo o lead:</p>
              <p className="font-semibold text-neutral-900">{lead.nome}</p>
            </div>

            <div className="space-y-2">
              <Label>Para quando deseja mover?</Label>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>
            </div>

            {selectedDate && (
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  <span className="font-medium">Nova data:</span> {format(selectedDate, "PPP", { locale: ptBR })}
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={handleMove} disabled={isSubmitting || !selectedDate} className="flex-1">
                {isSubmitting ? "Movendo..." : "Mover"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
