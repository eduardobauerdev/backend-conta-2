"use client" // ⬅️ CORREÇÃO PRINCIPAL: Adicionado "use client"

import { useEffect, useState, useCallback } from "react" // Adicionado useCallback
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2, UserMinus } from "lucide-react" 
import { createClient } from "@/lib/supabase/client"

interface User {
  id: string
  nome: string
}

// ⚠️ Adicionando um tipo para a atribuição (baseado no seu 'assignmentData')
export interface ChatAssignment {
  chatId: string
  chatName: string
  assignToId: string
  assignToName: string
  autoAssign: boolean
}

export interface AssignToUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  chatId: string
  chatName: string
  currentUserId: string | null
  // ⬅️ [CORREÇÃO 1]: Adição da propriedade 'currentAssignment'
  currentAssignment: ChatAssignment | null
  onAssignSuccess?: () => void
  onRelease?: (chatId: string) => Promise<void> // Adicionado para lidar com desatribuição
}

export function AssignToUserDialog({
  open,
  onOpenChange,
  chatId,
  chatName,
  currentUserId,
  // ⬅️ [CORREÇÃO 2]: Adição de 'currentAssignment' no destructuring
  currentAssignment,
  onAssignSuccess,
  onRelease,
}: AssignToUserDialogProps) {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUserId, setSelectedUserId] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [assigning, setAssigning] = useState(false)
  const [releasing, setReleasing] = useState(false) // Estado para desatribuição
  const supabase = createClient()

  const loadUsers = useCallback(async () => { // Usando useCallback para a função
    try {
      setLoading(true)
      const { data, error } = await supabase.from("perfis").select("id, nome").order("nome")

      if (error) {
        console.error("Erro ao carregar usuários:", error)
        throw error
      }

      setUsers(data || [])
    } catch (error) {
      console.error("Erro ao carregar usuários:", error)
      toast.error("Erro ao carregar usuários")
    } finally {
      setLoading(false)
    }
  }, [supabase]) // Adicionado supabase como dependência para segurança

  useEffect(() => {
    if (open) {
      loadUsers()
      // Se já houver atribuição, pré-selecionar o usuário
      if (currentAssignment) {
        setSelectedUserId(currentAssignment.assignToId)
      } else {
        setSelectedUserId("")
      }
    }
  }, [open, currentAssignment, loadUsers]) // loadUsers adicionado nas dependências

  // Função handleUsers foi substituída por loadUsers
  // async function loadUsers() { ... }

  async function handleAssignToUser() {
    if (!selectedUserId) {
      toast.error("Selecione um usuário")
      return
    }

    const selectedUser = users.find((u) => u.id === selectedUserId)
    if (!selectedUser) {
      toast.error("Usuário não encontrado")
      return
    }

    setAssigning(true)
    try {
      const assignmentData: ChatAssignment = { // Usando o tipo ChatAssignment
        chatId,
        chatName,
        assignToId: selectedUserId,
        assignToName: selectedUser.nome,
        autoAssign: false,
      }

      const response = await fetch("/api/whatsapp/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assignmentData),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Erro na resposta:", errorText)

        try {
          const errorData = JSON.parse(errorText)
          toast.error(errorData.message || "Erro ao atribuir conversa")
        } catch {
          toast.error(`Erro ao atribuir conversa: ${response.status}`)
        }
        return
      }

      const text = await response.text()
      if (!text) {
        console.error("Resposta vazia do servidor")
        toast.error("Resposta vazia do servidor")
        return
      }

      const data = JSON.parse(text)
      if (data.success) {
        toast.success(`Conversa atribuída para ${selectedUser.nome}`)
        onOpenChange(false)
        onAssignSuccess?.()
      } else {
        console.error("Falha na atribuição:", data.message)
        toast.error(data.message || "Erro ao atribuir conversa")
      }
    } catch (error) {
      console.error("Erro ao atribuir:", error)
      toast.error(error instanceof Error ? error.message : "Erro ao atribuir conversa")
    } finally {
      setAssigning(false)
    }
  }

  // ⬅️ [MELHORIA]: Adicionando função para desatribuir a conversa
  async function handleRelease() {
    if (!onRelease) return
    setReleasing(true)
    try {
      await onRelease(chatId)
      toast.success("Conversa liberada com sucesso")
      onOpenChange(false)
      onAssignSuccess?.() // Chama o sucesso para atualizar a lista/estado
    } catch (error) {
      console.error("Erro ao liberar conversa:", error)
      toast.error("Erro ao liberar conversa")
    } finally {
      setReleasing(false)
    }
  }

  const isAssignedToSelectedUser = currentAssignment?.assignToId === selectedUserId
  const isAssigned = !!currentAssignment
  const buttonDisabled = !selectedUserId || assigning || loading || isAssignedToSelectedUser

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atribuir conversa</DialogTitle>
          <DialogDescription>
            {isAssigned 
              ? `Atualmente atribuída a: ${currentAssignment.assignToName}` 
              : "Selecione um usuário para atribuir a conversa"}
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Selecione um usuário</label>
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha um usuário..." />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem 
                      key={user.id} 
                      value={user.id}
                      disabled={isAssigned && currentAssignment?.assignToId === user.id} // Impede re-atribuição para o mesmo usuário
                    >
                      {user.nome}
                      {currentAssignment?.assignToId === user.id ? " (Atual)" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
          {/* Botão de Liberar (apenas se estiver atribuído e a função for fornecida) */}
          {isAssigned && onRelease && (
            <Button 
              variant="destructive" 
              onClick={handleRelease}
              disabled={releasing}
            >
              {releasing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <UserMinus className="w-4 h-4 mr-2" />}
              Liberar Conversa
            </Button>
          )}

          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={assigning || releasing}>
              Cancelar
            </Button>
            <Button 
              onClick={handleAssignToUser} 
              disabled={buttonDisabled}
            >
              {assigning ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              {isAssigned && !isAssignedToSelectedUser ? "Reatribuir" : "Atribuir"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}