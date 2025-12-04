"use client"

import { useState, useRef, useEffect } from "react"
import { ChatList } from "@/components/whatsapp/chat-list"
import { ChatWindow } from "@/components/whatsapp/chat-window"
import { ConnectionStatus } from "@/components/whatsapp/connection-status"
import { Card } from "@/components/ui/card"
import { MessageSquare, Unplug, Settings } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useWhatsAppCache } from "@/contexts/whatsapp-cache-context"
import { QuickLeadForm } from "@/components/whatsapp/quick-lead-form"
import { toast } from "sonner"
import { NewContactDialog } from "@/components/whatsapp/new-contact-dialog"
import type { Chat } from "@/lib/whatsapp-types"
import { createClient } from "@/lib/supabase/client"

// URL do Backend (Proxy de Imagens)
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://backend-sobt.onrender.com";

export default function WhatsAppPage() {
  const { selectedChatId, setSelectedChatId, selectedChatName, setSelectedChatName, invalidateChatsCache } =
    useWhatsAppCache()
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [isConnected, setIsConnected] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [showLeadPanel, setShowLeadPanel] = useState(false)
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const chatListRef = useRef<any>(null)
  const supabase = createClient()

  useEffect(() => {
      const checkStatus = async () => {
          const { data } = await supabase.from('instance_settings').select('status').eq('id', 1).single()
          setIsConnected(data?.status === 'connected')
          setIsChecking(false)
      }
      checkStatus()
  }, [supabase])

  function handleSelectChat(chat: Chat) {
    setSelectedChatId(chat.id)
    const displayName = (chat as any).name ?? (chat as any).pushName ?? chat.id
    setSelectedChatName(displayName)
    setSelectedChat(chat)
  }

  function handleRefreshChats() {
    invalidateChatsCache()
    setRefreshTrigger((prev) => prev + 1)
  }

  if (isChecking) {
      return <div className="h-screen flex items-center justify-center bg-neutral-50"><p className="text-neutral-500 animate-pulse">Verificando conexão...</p></div>
  }

  return (
    <div className="p-6 h-screen flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">WhatsApp Business</h1>
          <p className="text-muted-foreground mt-1">Gerencie suas conversas do WhatsApp</p>
        </div>
        
        {isConnected && (
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
        )}
      </div>

      {!isConnected ? (
        <div className="flex-1 flex items-center justify-center">
            <Card className="w-full max-w-md p-12 flex flex-col items-center text-center gap-6 border-2 border-dashed border-neutral-300 bg-neutral-50/50">
                <div className="p-6 bg-white rounded-full shadow-sm border border-neutral-200">
                    <Unplug className="w-12 h-12 text-neutral-400" />
                </div>
                
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-neutral-900">WhatsApp Desconectado</h2>
                    <p className="text-sm text-neutral-500 max-w-xs mx-auto">
                        Para visualizar suas conversas e enviar mensagens, você precisa conectar seu aparelho.
                    </p>
                </div>

                <Link href="/ajustes?tab=whatsapp">
                    <Button size="lg" className="gap-2">
                        <Settings className="w-4 h-4" />
                        Ir para Configurações
                    </Button>
                </Link>

                <div className="hidden">
                    <ConnectionStatus onStatusChange={setIsConnected} />
                </div>
            </Card>
        </div>
      ) : (
        <div className="flex-1 flex gap-4 min-h-0">
            {/* Container 1: Lista de Chats */}
            <Card className="flex flex-col overflow-hidden w-[380px] flex-shrink-0">
            <ChatList
                ref={chatListRef}
                onSelectChat={handleSelectChat}
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
                // 🔥 AQUI: Passamos a URL do proxy diretamente para o filho
                chatPicture={`${BACKEND_URL}/chats/avatar/${selectedChatId}`}
                chatTelefone={selectedChat?.telefone || null}
                chatEtiquetas={selectedChat?.etiquetas || []}
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
      )}
    </div>
  )
}