"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { getCookie } from "@/lib/auth"

interface EditChatNameDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  chatId: string
  currentName: string
  onSuccess?: () => void
}

export function EditChatNameDialog({
  open,
  onOpenChange,
  chatId,
  currentName,
  onSuccess,
}: EditChatNameDialogProps) {
  const [name, setName] = useState(currentName)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("O nome não pode estar vazio")
      return
    }

    setSaving(true)
    try {
      // Primeiro verifica se o chat existe
      const { data: chatExists } = await supabase
        .from("chats")
        .select("id")
        .eq("id", chatId)
        .single()

      let error = null

      if (chatExists) {
        // Chat existe, faz update
        const result = await supabase
          .from("chats")
          .update({ name: name.trim() })
          .eq("id", chatId)
        error = result.error
      } else {
        // Chat não existe, faz insert
        const result = await supabase
          .from("chats")
          .insert({ 
            id: chatId, 
            name: name.trim(),
            is_archived: false,
            unread_count: 0,
            last_message_time: Date.now()
          })
        error = result.error
      }

      if (error) {
        console.error("Erro Supabase detalhado:", error)
        throw error
      }

      // Registra no histórico unificado
      const userId = getCookie("auth_user_id")
      const userName = getCookie("auth_user_name")
      
      if (userId && userName && currentName !== name.trim()) {
        await supabase.from("chat_history").insert({
          chat_id: chatId,
          chat_name: name.trim(),
          event_type: "name_changed",
          event_data: {
            previous_name: currentName || chatId,
            new_name: name.trim(),
          },
          performed_by_id: userId,
          performed_by_name: userName,
        })
      }

      // Atualiza o nome do lead vinculado ao chat, se existir
      try {
        // Busca lead por chat_id ou por telefone
        const telefoneNum = chatId.includes("@") ? chatId.split("@")[0] : chatId
        
        const { data: leadData } = await supabase
          .from("leads")
          .select("id, chat_uuid, telefone")
          .or(`chat_uuid.eq.${chatId},telefone.eq.${telefoneNum}`)
          .maybeSingle()

        if (leadData) {
          await supabase
            .from("leads")
            .update({ nome: name.trim() })
            .eq("id", leadData.id)
          
          console.log("[EditChatName] Nome do lead atualizado também:", leadData.id)
        }
      } catch (leadUpdateError) {
        console.error("[EditChatName] Erro ao atualizar nome do lead:", leadUpdateError)
        // Não falha se não conseguir atualizar o lead
      }

      toast.success("Nome atualizado com sucesso!")
      onSuccess?.()
      onOpenChange(false)
    } catch (error: any) {
      console.error("Erro ao atualizar nome:", error)
      console.error("Detalhes do erro:", JSON.stringify(error, null, 2))
      toast.error(`Erro ao atualizar o nome: ${error?.message || 'Desconhecido'}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{currentName && currentName.trim() ? "Editar Nome do Lead" : "Adicionar Nome ao Lead"}</DialogTitle>
          <DialogDescription>
            {currentName && currentName.trim() ? "Altere o nome de exibição deste contato" : "Defina um nome de exibição para este contato"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="chat-name">Nome</Label>
            <Input
              id="chat-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome do lead"
              disabled={saving}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={saving}
          >
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              "Salvar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
