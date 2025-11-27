"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import bcrypt from "bcryptjs"

interface AdminPasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
  action: string
}

export function AdminPasswordDialog({ open, onOpenChange, onSuccess, action }: AdminPasswordDialogProps) {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleVerify = async () => {
    if (!password.trim()) {
      toast.error("Por favor, insira a senha")
      return
    }

    setLoading(true)
    try {
      // Buscar todos os administradores
      const { data: admins, error } = await supabase
        .from("perfis")
        .select("senha")
        .eq("cargo", "Administrador")

      if (error) throw error

      // Verificar se a senha corresponde a algum administrador
      let isValid = false
      for (const admin of admins || []) {
        if (admin.senha) {
          const match = await bcrypt.compare(password, admin.senha)
          if (match) {
            isValid = true
            break
          }
        }
      }

      if (isValid) {
        toast.success("Senha verificada com sucesso")
        onSuccess()
        onOpenChange(false)
        setPassword("")
      } else {
        toast.error("Senha incorreta")
      }
    } catch (error) {
      console.error("[v0] Error verifying password:", error)
      toast.error("Erro ao verificar senha")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Autenticação Necessária</DialogTitle>
          <DialogDescription>
            Para {action}, insira a senha de um administrador.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="admin-password">Senha do Administrador</Label>
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleVerify()
                }
              }}
              placeholder="Digite a senha"
              disabled={loading}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false)
              setPassword("")
            }}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button onClick={handleVerify} disabled={loading}>
            {loading ? <Spinner className="w-4 h-4" /> : "Verificar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
