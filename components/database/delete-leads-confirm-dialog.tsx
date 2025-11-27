"use client"

import { useState } from "react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type DeleteLeadsConfirmDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedCount: number
  onConfirm: () => void
}

export function DeleteLeadsConfirmDialog({ 
  open, 
  onOpenChange, 
  selectedCount,
  onConfirm 
}: DeleteLeadsConfirmDialogProps) {
  const [confirmText, setConfirmText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const isConfirmed = confirmText === "CONFIRMO"

  const handleConfirm = async () => {
    if (!isConfirmed) return

    setIsDeleting(true)
    await onConfirm()
    setIsDeleting(false)
    setConfirmText("")
    onOpenChange(false)
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setConfirmText("")
    }
    onOpenChange(newOpen)
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. {selectedCount} lead{selectedCount > 1 ? "s" : ""} {selectedCount > 1 ? "serão" : "será"} permanentemente removido{selectedCount > 1 ? "s" : ""} do banco de dados.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="space-y-2 py-4">
          <Label htmlFor="confirm-text" className="text-sm font-medium">
            Digite <span className="font-bold">CONFIRMO</span> para habilitar a exclusão
          </Label>
          <Input
            id="confirm-text"
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Digite CONFIRMO"
            className="border-red-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm} 
            disabled={!isConfirmed || isDeleting}
            className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed"
          >
            {isDeleting ? "Excluindo..." : "Excluir leads"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
