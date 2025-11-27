"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { useUser } from "@/contexts/user-context"
import { Copy, Check } from 'lucide-react'

interface CreateInviteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateInviteDialog({ open, onOpenChange }: CreateInviteDialogProps) {
  const { user } = useUser()
  const supabase = createClient()
  const [cargo, setCargo] = useState<string>("")
  const [duracao, setDuracao] = useState<string>("24")
  const [loading, setLoading] = useState(false)
  const [inviteLink, setInviteLink] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleCreateInvite = async () => {
    if (!cargo) {
      toast.error("Selecione um cargo")
      return
    }

    if (!user) {
      toast.error("Usuário não autenticado")
      return
    }

    setLoading(true)

    try {
      // Generate unique token
      const token = crypto.randomUUID()
      
      // Calculate expiration date
      const expiresAt = new Date()
      expiresAt.setHours(expiresAt.getHours() + parseInt(duracao))

      // Insert invite into database
      const { error } = await supabase
        .from("convites")
        .insert({
          token,
          cargo,
          criado_por_id: user.id,
          criado_por_nome: user.nome,
          expira_em: expiresAt.toISOString(),
        })

      if (error) {
        console.error("[v0] Error creating invite:", error)
        toast.error("Erro ao criar convite")
        return
      }

      // Generate invite link
      const baseUrl = window.location.origin
      const link = `${baseUrl}/cadastro?convite=${token}`
      setInviteLink(link)
      
      toast.success("Link de convite criado com sucesso!")
    } catch (error) {
      console.error("[v0] Error creating invite:", error)
      toast.error("Erro ao criar convite")
    } finally {
      setLoading(false)
    }
  }

  const handleCopyLink = async () => {
    if (!inviteLink) return

    try {
      await navigator.clipboard.writeText(inviteLink)
      setCopied(true)
      toast.success("Link copiado!")
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error("Erro ao copiar link")
    }
  }

  const handleClose = () => {
    setCargo("")
    setDuracao("24")
    setInviteLink(null)
    setCopied(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Criar Link de Convite</DialogTitle>
          <DialogDescription>
            Gere um link de convite para cadastrar um novo usuário
          </DialogDescription>
        </DialogHeader>

        {!inviteLink ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cargo">Cargo</Label>
              <Select value={cargo} onValueChange={setCargo}>
                <SelectTrigger id="cargo">
                  <SelectValue placeholder="Selecione o cargo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Desenvolvedor">Desenvolvedor</SelectItem>
                  <SelectItem value="Administrador">Administrador</SelectItem>
                  <SelectItem value="Vendedor">Vendedor</SelectItem>
                  <SelectItem value="Financeiro">Financeiro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duracao">Duração do Convite</Label>
              <Select value={duracao} onValueChange={setDuracao}>
                <SelectTrigger id="duracao">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hora</SelectItem>
                  <SelectItem value="6">6 horas</SelectItem>
                  <SelectItem value="12">12 horas</SelectItem>
                  <SelectItem value="24">24 horas</SelectItem>
                  <SelectItem value="48">48 horas</SelectItem>
                  <SelectItem value="72">3 dias</SelectItem>
                  <SelectItem value="168">7 dias</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Link de Convite</Label>
              <div className="flex gap-2">
                <Input
                  value={inviteLink}
                  readOnly
                  className="flex-1 font-mono text-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleCopyLink}
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-neutral-600">
                Este link expira em {duracao} {parseInt(duracao) === 1 ? "hora" : "horas"}
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          {!inviteLink ? (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              <Button onClick={handleCreateInvite} disabled={loading}>
                {loading ? "Criando..." : "Criar Convite"}
              </Button>
            </>
          ) : (
            <Button onClick={handleClose} className="w-full">
              Fechar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
