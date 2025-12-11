"use client"

import { useState, useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ChatList } from "@/components/whatsapp/chat-list"
import { ChatWindow } from "@/components/whatsapp/chat-window"
import { ConnectionStatus } from "@/components/whatsapp/connection-status"
import { Card } from "@/components/ui/card"
import { MessageSquare, Unplug, Settings, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SyncAnimation } from "@/components/whatsapp/sync-animation"
import { useWhatsAppCache } from "@/contexts/whatsapp-cache-context"
import { QuickLeadForm } from "@/components/whatsapp/quick-lead-form"
import { toast } from "sonner"
import { NewContactDialog } from "@/components/whatsapp/new-contact-dialog"
import type { Chat } from "@/lib/whatsapp-types"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/contexts/sidebar-context"

// URL do Backend (Proxy de Imagens)
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://backend-sobt.onrender.com";

export default function WhatsAppPage() {
  const { isCollapsed } = useSidebar();
  const searchParams = useSearchParams()
  const chatUuidParam = searchParams.get("chatUuid")
  const telefoneParam = searchParams.get("telefone")
  
  const { selectedChatId, setSelectedChatId, selectedChatName, setSelectedChatName, invalidateChatsCache } =
    useWhatsAppCache()
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [isConnected, setIsConnected] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [showLeadPanel, setShowLeadPanel] = useState(false)
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const chatListRef = useRef<any>(null)
  const supabase = createClient()

  useEffect(() => {
      const checkStatus = async () => {
          const { data } = await supabase.from('instance_settings').select('status').eq('id', 1).single()
          const status = data?.status
          
          if (status === 'syncing') {
              setIsSyncing(true)
              setIsConnected(false)
          } else if (status === 'connected') {
              setIsConnected(true)
              setIsSyncing(false)
          } else {
              setIsConnected(false)
              setIsSyncing(false)
          }
          
          setIsChecking(false)
      }
      checkStatus()
      
      // Realtime para mudanças no status
      const channel = supabase
          .channel('whatsapp-status')
          .on(
              'postgres_changes',
              { event: 'UPDATE', schema: 'public', table: 'instance_settings', filter: 'id=eq.1' },
              (payload) => {
                  const status = payload.new.status
                  
                  if (status === 'syncing') {
                      setIsSyncing(true)
                      setIsConnected(false)
                  } else if (status === 'connected') {
                      setIsConnected(true)
                      setIsSyncing(false)
                  } else {
                      setIsConnected(false)
                      setIsSyncing(false)
                  }
              }
          )
          .subscribe()

      return () => {
          supabase.removeChannel(channel)
      }
  }, [supabase])

  // Navegar para o chat quando vem por parâmetro de URL
  useEffect(() => {
    async function findAndSelectChat() {
      if ((!isConnected && !isSyncing) || isChecking) return
      
      if (chatUuidParam) {
        // Busca chat pelo UUID
        const { data } = await supabase
          .from("chat_last_message_view")
          .select("*")
          .eq("uuid", chatUuidParam)
          .single()
        
        if (data) {
          handleSelectChat(data as Chat)
          // Limpa o parâmetro da URL
          window.history.replaceState({}, '', '/whatsapp')
        }
      } else if (telefoneParam) {
        // Busca chat pelo telefone
        const { data } = await supabase
          .from("chat_last_message_view")
          .select("*")
          .or(`id.eq.${telefoneParam}@s.whatsapp.net,telefone.eq.${telefoneParam}`)
          .limit(1)
          .single()
        
        if (data) {
          handleSelectChat(data as Chat)
          window.history.replaceState({}, '', '/whatsapp')
        }
      }
    }
    
    findAndSelectChat()
  }, [chatUuidParam, telefoneParam, isConnected, isSyncing, isChecking, supabase])

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
    <div className="p-6 h-screen flex flex-col overflow-hidden">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">WhatsApp Business</h1>
        </div>
        
        {(isConnected || isSyncing) && (
            <div className="flex items-center gap-3 justify-end">
            {isConnected && (
                <NewContactDialog
                    onContactCreated={(chatId) => {
                    handleRefreshChats()
                    setTimeout(() => {
                        setSelectedChatId(chatId)
                    }, 500)
                    toast.success("Conversa iniciada com sucesso!")
                    }}
                />
            )}
            <ConnectionStatus onStatusChange={setIsConnected} />
            </div>
        )}
      </div>

      {isSyncing ? (
        <div className="flex-1 flex items-center justify-center">
            <Card className="w-full max-w-md p-12 flex flex-col items-center text-center gap-6 bg-green-50/50 border-green-200">
                <SyncAnimation />
                
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-green-800">Sincronizando mensagens</h2>
                    <p className="text-sm text-green-600 max-w-xs mx-auto">
                        Seu WhatsApp foi conectado com sucesso! Estamos carregando suas conversas...
                    </p>
                </div>

            </Card>
        </div>
      ) : !isConnected ? (
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
        <div className="flex-1 flex gap-4 min-h-0 overflow-hidden">
            {/* Container 1: Lista de Chats - CORRIGIDO: Largura fixa, nunca encolhe */}
            <Card className="flex flex-col overflow-hidden flex-shrink-0 w-[380px] min-w-[320px] max-w-[400px] transition-all duration-300">
            <ChatList
              ref={chatListRef}
              onSelectChat={handleSelectChat}
              selectedChatId={selectedChatId}
              refreshTrigger={refreshTrigger}
              shrink={false}
              onOpenNewLead={(chat) => {
                setShowLeadPanel(true)
              }}
            />
            </Card>

            {/* Container 2: Mensagens do Chat - Flex-1 faz ele ocupar o espaço restante ou encolher se necessário */}
            <Card
            className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out min-w-0 flex-1"
            >
            {selectedChatId ? (
                <ChatWindow
                chatId={selectedChatId}
                chatUuid={selectedChat?.uuid || null}
                chatName={selectedChatName}
                // 🔥 AQUI: Passamos a URL do proxy diretamente para o filho
                chatPicture={`${BACKEND_URL}/chats/avatar/${selectedChatId}`}
                chatTelefone={selectedChat?.phone || null}
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
            <Card className="w-[360px] min-w-[320px] max-w-[400px] flex-shrink-0 flex flex-col overflow-hidden transition-all duration-300 ease-in-out animate-in slide-in-from-right-5 fade-in-0">
                <div className="animate-in fade-in-0 slide-in-from-top-3 duration-500 h-full flex flex-col overflow-hidden">
                <QuickLeadForm
                    key={selectedChatId}
                    chatId={selectedChatId}
                    chatUuid={selectedChat?.uuid || null}
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