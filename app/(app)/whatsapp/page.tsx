"use client"

import { useState, useRef } from "react"
import { ChatList } from "@/components/whatsapp/chat-list"
import { ChatWindow } from "@/components/whatsapp/chat-window"
import { ConnectionStatus } from "@/components/whatsapp/connection-status"
import { Card } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useWhatsAppCache } from "@/contexts/whatsapp-cache-context"
import { QuickLeadForm } from "@/components/whatsapp/quick-lead-form"
import { toast } from "react-toastify"
import { NewContactDialog } from "@/components/whatsapp/new-contact-dialog"
import type { Chat } from "@/lib/whatsapp-types"   // 👈 importa o tipo

export default function WhatsAppPage() {
  const { selectedChatId, setSelectedChatId, selectedChatName, setSelectedChatName, invalidateChatsCache } =
    useWhatsAppCache()
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [isConnected, setIsConnected] = useState(false)
  const [showLeadPanel, setShowLeadPanel] = useState(false)
  const chatListRef = useRef<any>(null)

  // agora recebe um Chat (1 argumento), não mais (chatId, chatName)
  function handleSelectChat(chat: Chat) {
    setSelectedChatId(chat.id)
    // usa o melhor nome que existir, com fallback pro id
    const displayName =
      (chat as any).name ??
      (chat as any).pushName ??
      chat.id
    setSelectedChatName(displayName)
  }

  function handleRefreshChats() {
    invalidateChatsCache()
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div className="p-6 h-screen flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">WhatsApp Business</h1>
          <p className="text-muted-foreground mt-1">Gerencie suas conversas do WhatsApp</p>
        </div>
        <div className="flex flex-col gap-2">
          <ConnectionStatus onStatusChange={setIsConnected} />
          <NewContactDialog
            onContactCreated={(chatId) => {
              handleRefreshChats()
              setTimeout(() => {
                setSelectedChatId(chatId)
              }, 500)
              toast.success("Conversa iniciada com sucesso!")
            }}
          />
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        {/* Container 1: Lista de Chats - largura fixa */}
        <Card className="flex flex-col overflow-hidden w-[380px] flex-shrink-0">
          {!isConnected && (
            <Alert variant="destructive" className="m-4 mb-0">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                WhatsApp desconectado.{" "}
                <Link href="/ajustes" className="underline font-medium">
                  Configure em Ajustes
                </Link>
              </AlertDescription>
            </Alert>
          )}
          <ChatList
            ref={chatListRef}
            onSelectChat={handleSelectChat}     // ✅ agora bate com o tipo esperado
            selectedChatId={selectedChatId}
            refreshTrigger={refreshTrigger}
          />
        </Card>

        {/* Container 2: Mensagens do Chat */}
        <Card
          className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
            showLeadPanel ? "flex-[0.75]" : "flex-1"
          }`}
        >
          {selectedChatId ? (
            <ChatWindow
              chatId={selectedChatId}
              chatName={selectedChatName}
              onRefresh={handleRefreshChats}
              onToggleLeadPanel={setShowLeadPanel}
              showLeadPanel={showLeadPanel}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-2">
                <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">Selecione uma conversa para começar</p>
              </div>
            </div>
          )}
        </Card>

        {/* Container 3: Painel de Lead */}
        {showLeadPanel && selectedChatId && (
          <Card className="flex-[0.25] flex flex-col overflow-hidden transition-all duration-300 ease-in-out animate-in slide-in-from-right-5 fade-in-0">
            <div className="animate-in fade-in-0 slide-in-from-top-3 duration-500 h-full overflow-y-auto">
              <QuickLeadForm
                key={selectedChatId}
                chatId={selectedChatId}
                chatName={selectedChatName}
                onSuccess={() => {
                  setShowLeadPanel(false)
                  toast.success("Lead criado com sucesso!")
                }}
                onCancel={() => {
                  setShowLeadPanel(false)
                }}
              />
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
