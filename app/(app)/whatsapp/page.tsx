"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
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
import { useSidebar } from "@/contexts/sidebar-context"

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "wss://backend-ii.squareweb.app";

export default function WhatsAppPage() {
  const { isCollapsed } = useSidebar();
  const searchParams = useSearchParams()
  const chatUuidParam = searchParams.get("chatUuid")
  const telefoneParam = searchParams.get("telefone")
  
  const { 
    selectedChatId, 
    setSelectedChatId, 
    selectedChatName, 
    setSelectedChatName, 
    invalidateChatsCache 
  } = useWhatsAppCache()

  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [isConnected, setIsConnected] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [showLeadPanel, setShowLeadPanel] = useState(false)
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  
  const chatListRef = useRef<any>(null)
  const socketRef = useRef<WebSocket | null>(null)
  // Ref para acessar o ID atual dentro do socket sem causar reconexão
  const selectedChatIdRef = useRef(selectedChatId)

  useEffect(() => {
    selectedChatIdRef.current = selectedChatId
  }, [selectedChatId])

  // ==========================================
  // LÓGICA DE WEBSOCKET (REAL-TIME)
  // ==========================================
  const connectWebSocket = useCallback(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) return;

    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("🔌 Conectado ao servidor de eventos");
      setIsChecking(false);
    };

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        const { type, data } = payload;

        switch (type) {
          case 'connection_status':
            setIsConnected(data.connected);
            setIsChecking(false);
            break;

          case 'new_message':
            // 1. Dispara evento customizado para os componentes escutarem
            const chatId = data.to || data.id?.remote || data.chatId || data.key?.remoteJid;
            window.dispatchEvent(new CustomEvent('whatsapp:new_message', {
              detail: { chatId, message: data }
            }));
            
            // 2. Invalida o cache global para forçar re-fetch
            invalidateChatsCache();
            
            // 3. Notifica componentes que dependem do trigger
            setRefreshTrigger(prev => prev + 1);
            
            // 4. Notificação visual se não for o chat aberto
            if (chatId !== selectedChatIdRef.current && !data.fromMe) {
               toast(`Nova mensagem de ${data.pushName || 'WhatsApp'}`, {
                 description: data.body,
                 action: { label: "Ver", onClick: () => setSelectedChatId(chatId) }
               });
            }
            break;

          case 'chat_update':
          case 'new_chat':
            invalidateChatsCache();
            setRefreshTrigger(prev => prev + 1);
            break;

          case 'qr_code':
            setIsConnected(false);
            break;
        }
      } catch (e) {
        console.error("Erro ao processar mensagem WS", e);
      }
    };

    ws.onclose = () => {
      console.log("❌ Conexão WS fechada. Tentando reconectar...");
      setTimeout(connectWebSocket, 3000);
    };

    socketRef.current = ws;
  }, [invalidateChatsCache, setSelectedChatId]); // Removido selectedChatId das dependências

  useEffect(() => {
    connectWebSocket();
    return () => {
      // Opcional: manter o socket vivo se a navegação for interna
      // socketRef.current?.close(); 
    };
  }, [connectWebSocket]);

  useEffect(() => {
    if (chatUuidParam || telefoneParam) {
      window.history.replaceState({}, '', '/whatsapp')
    }
  }, [chatUuidParam, telefoneParam]);

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
    return (
      <div className="h-screen flex items-center justify-center bg-neutral-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-neutral-500">Sincronizando com WhatsApp...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 h-screen flex flex-col overflow-hidden bg-neutral-50/50">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">WhatsApp Business</h1>
          <p className="text-muted-foreground">Gerencie suas conversas em tempo real</p>
        </div>
        
        <div className="flex items-center gap-3">
          {isConnected && (
            <NewContactDialog
              onContactCreated={(chatId) => {
                handleRefreshChats()
                setTimeout(() => setSelectedChatId(chatId), 500)
              }}
            />
          )}
          <ConnectionStatus onStatusChange={setIsConnected} />
        </div>
      </div>

      {!isConnected ? (
        <div className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md p-12 flex flex-col items-center text-center gap-6 border-2 border-dashed">
            <div className="p-6 bg-white rounded-full shadow-sm border">
              <Unplug className="w-12 h-12 text-neutral-400" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Aparelho Desconectado</h2>
              <p className="text-sm text-neutral-500">
                Escaneie o QR Code nas configurações para ativar o tempo real.
              </p>
            </div>
            <Link href="/ajustes?tab=whatsapp">
              <Button size="lg" className="gap-2">
                <Settings className="w-4 h-4" />
                Configurar Conexão
              </Button>
            </Link>
          </Card>
        </div>
      ) : (
        <div className="flex-1 flex gap-4 min-h-0 overflow-hidden">
          <Card className="flex flex-col overflow-hidden flex-shrink-0 w-[380px] border-none shadow-xl shadow-black/5">
            <ChatList
              ref={chatListRef}
              onSelectChat={handleSelectChat}
              selectedChatId={selectedChatId}
              refreshTrigger={refreshTrigger}
              shrink={false}
              onOpenNewLead={() => setShowLeadPanel(true)}
            />
          </Card>

          <Card className="flex flex-col overflow-hidden flex-1 border-none shadow-xl shadow-black/5">
            {selectedChatId ? (
              <ChatWindow
                key={selectedChatId} // O 'key' força reset do componente ao trocar chat
                chatId={selectedChatId}
                chatUuid={selectedChat?.uuid || null}
                chatName={selectedChatName}
                chatPicture={selectedChat?.pictureUrl || null}
                chatTelefone={selectedChat?.phone || null}
                chatEtiquetas={selectedChat?.etiquetas || []}
                onRefresh={handleRefreshChats}
                onToggleLeadPanel={setShowLeadPanel}
                showLeadPanel={showLeadPanel}
                refreshTrigger={refreshTrigger} // Passe o trigger para a Window re-buscar mensagens
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full bg-white">
                <div className="p-6 bg-neutral-50 rounded-full mb-4">
                  <MessageSquare className="w-12 h-12 text-neutral-300" />
                </div>
                <p className="text-neutral-500 font-medium">Selecione uma conversa</p>
                <p className="text-xs text-neutral-400">Suas mensagens aparecerão aqui instantaneamente</p>
              </div>
            )}
          </Card>

          {showLeadPanel && selectedChatId && (
            <Card className="w-[360px] flex-shrink-0 overflow-hidden border-none shadow-xl shadow-black/5 animate-in slide-in-from-right duration-300">
              <QuickLeadForm
                key={selectedChatId}
                chatId={selectedChatId}
                chatUuid={selectedChat?.uuid || null}
                chatName={selectedChatName}
                onSuccess={() => setShowLeadPanel(false)}
                onCancel={() => setShowLeadPanel(false)}
              />
            </Card>
          )}
        </div>
      )}
    </div>
  )
}