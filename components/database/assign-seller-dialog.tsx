"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface AssignSellerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedLeadIds: string[]
  onSuccess: () => void
}

export function AssignSellerDialog({ open, onOpenChange, selectedLeadIds, onSuccess }: AssignSellerDialogProps) {
  const [sellers, setSellers] = useState<Array<{ id: string; nome: string }>>([])
  const [selectedSeller, setSelectedSeller] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    if (open) {
      fetchSellers()
    }
  }, [open])

  const fetchSellers = async () => {
    const { data, error } = await supabase
      .from("perfis")
      .select("id, nome")
      .order("nome")

    if (error) {
      console.error("[v0] Error fetching sellers:", error)
      toast.error("Erro ao carregar vendedores")
    } else {
      setSellers(data || [])
    }
  }

  const handleAssign = async () => {
    if (!selectedSeller) {
      toast.error("Selecione um vendedor")
      return
    }

    setLoading(true)
    try {
      const seller = sellers.find(s => s.id === selectedSeller)
      
      const { error } = await supabase
        .from("leads")
        .update({
          adicionado_por_id: selectedSeller,
          adicionado_por_nome: seller?.nome || "",
          updated_at: new Date().toISOString()
        })
        .in("id", selectedLeadIds)

      if (error) throw error

      toast.success(`${selectedLeadIds.length} lead(s) atribuído(s) com sucesso`)
      onSuccess()
      onOpenChange(false)
      setSelectedSeller("")
    } catch (error) {
      console.error("[v0] Error assigning leads:", error)
      toast.error("Erro ao atribuir leads")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atribuir Vendedor</DialogTitle>
          <DialogDescription>
            Atribuir {selectedLeadIds.length} lead(s) selecionado(s) a um vendedor.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="seller">Vendedor</Label>
            <Select value={selectedSeller} onValueChange={setSelectedSeller}>
              <SelectTrigger id="seller">
                <SelectValue placeholder="Selecione um vendedor" />
              </SelectTrigger>
              <SelectContent>
                {sellers.map((seller) => (
                  <SelectItem key={seller.id} value={seller.id}>
                    {seller.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false)
              setSelectedSeller("")
            }}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button onClick={handleAssign} disabled={loading}>
            {loading ? <Spinner className="w-4 h-4" /> : "Atribuir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
