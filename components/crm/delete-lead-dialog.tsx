"use client"

import { useState, useEffect } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useUser } from "@/contexts/user-context"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import type { Lead } from "@/types/crm"

type DeleteLeadDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  lead: Lead | null
  onSuccess: () => void
}

export function DeleteLeadDialog({ open, onOpenChange, lead, onSuccess }: DeleteLeadDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const { user } = useUser()
  const supabase = createClient()

  useEffect(() => {
    if (!open) {
      setIsDeleting(false)
    }
  }, [open])

  const handleDelete = async () => {
    if (!user || !lead) return

    setIsDeleting(true)

    // Registrar log antes de deletar
    await supabase.from("lead_logs").insert({
      lead_id: lead.id,
      usuario_id: user.id,
      usuario_nome: user.nome,
      acao: "excluído",
      detalhes: `Lead "${lead.nome}" foi excluído`,
    })

    const { error } = await supabase.from("leads").delete().eq("id", lead.id)

    if (error) {
      console.error("[v0] Error deleting lead:", error)
      toast.error("Erro ao excluir lead")
      setIsDeleting(false)
      return
    }

    toast.success("Lead excluído com sucesso")
    setIsDeleting(false)
    onOpenChange(false)
    onSuccess()
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. O lead <strong>{lead?.nome}</strong> será
            permanentemente removido do sistema.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-red-600 hover:bg-red-700">
            {isDeleting ? "Excluindo..." : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
