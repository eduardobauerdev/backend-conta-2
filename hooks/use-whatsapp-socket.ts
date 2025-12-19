"use client"

import * as React from "react"
import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react"
import { toast } from "sonner"
import { useWhatsAppCache } from "@/contexts/whatsapp-cache-context"

// ==========================================
// TIPAGEM (Baseada no seu código)
// ==========================================
type SocketEventType =
  | "connection_status"
  | "new_message"
  | "message_ack"
  | "new_chat"
  | "chat_update"
  | "presence_update"
  | "typing"
  | "qr_code" // Adicionado para lidar com QR

interface SocketEvent {
  type: SocketEventType
  data: any
}

interface WhatsAppSocketContextType {
  isConnected: boolean
  isConnecting: boolean
  connect: () => void
  disconnect: () => void
  send: (event: SocketEvent) => void
  typingStatus: Record<string, boolean>
}

const WhatsAppSocketContext = createContext<WhatsAppSocketContextType | null>(null)

// ==========================================
// PROVIDER
// ==========================================
export function WhatsAppSocketProvider({ children }: { children: React.ReactNode }) {
  // Estados
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [typingStatus, setTypingStatus] = useState<Record<string, boolean>>({})

  // Refs de controle
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>()
  const reconnectAttemptsRef = useRef(0)
  const maxReconnectAttempts = 5

  // Integração com o Cache (Code 1)
  const { 
    selectedChatId, 
    setSelectedChatId, 
    invalidateChatsCache, 
    appendMessages 
  } = useWhatsAppCache()

  // Ref para acessar o chat selecionado dentro do callback do socket sem recriar a função
  const selectedChatIdRef = useRef<string | null>(null)
  
  useEffect(() => {
    selectedChatIdRef.current = selectedChatId
  }, [selectedChatId])

  // URL do WebSocket
  const getWebSocketUrl = useCallback(() => {
    const wsUrl = process.env.NEXT_PUBLIC_BACKEND_WS_URL || process.env.NEXT_PUBLIC_WS_URL
    if (!wsUrl) {
      console.error("[WebSocket] URL não configurada no .env")
      return null
    }
    return wsUrl
  }, [])

  // ==========================================
  // PROCESSAMENTO DE EVENTOS
  // ==========================================
  const handleEvent = useCallback((event: SocketEvent) => {
    const { type, data } = event

    switch (type) {
      case "connection_status":
        setIsConnected(data.connected)
        break

      case "qr_code":
        setIsConnected(false)
        break

      case "new_message":
        // 1. Atualiza o Cache de mensagens visualmente se o chat estiver aberto
        if (data.id.remote === selectedChatIdRef.current) {
           appendMessages(data.id.remote, [data], false)
        }

        // 2. Notificação (Toast) se NÃO estiver no chat aberto e for mensagem recebida
        if (data.id.remote !== selectedChatIdRef.current && !data.fromMe) {
          toast(`Nova mensagem de ${data.pushName || "WhatsApp"}`, {
            description: data.body,
            action: {
              label: "Ver",
              onClick: () => setSelectedChatId(data.id.remote),
            },
          })
        }

        // 3. Força atualização da lista lateral de conversas
        invalidateChatsCache()
        break

      case "message_ack":
        // Opcional: Atualizar status da mensagem no cache se necessário
        // invalidateMessagesCache(data.chatId) - pode ser custoso, melhor usar evento local
        break

      case "new_chat":
      case "chat_update":
        invalidateChatsCache()
        break

      case "typing":
        setTypingStatus((prev) => ({
          ...prev,
          [data.chatId]: data.isTyping,
        }))
        break
        
      default:
        // console.log("[WebSocket] Evento ignorado:", type)
        break
    }
  }, [appendMessages, invalidateChatsCache, setSelectedChatId])

  // ==========================================
  // CONEXÃO & RECONEXÃO
  // ==========================================
  const connect = useCallback(() => {
    const wsUrl = getWebSocketUrl()
    if (!wsUrl) return

    if (wsRef.current?.readyState === WebSocket.OPEN) return

    setIsConnecting(true)

    try {
      const ws = new WebSocket(wsUrl)

      ws.onopen = () => {
        console.log("✅ [WebSocket] Conectado")
        setIsConnected(true)
        setIsConnecting(false)
        reconnectAttemptsRef.current = 0
        if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current)
      }

      ws.onmessage = (event) => {
        try {
          const socketEvent: SocketEvent = JSON.parse(event.data)
          handleEvent(socketEvent)
        } catch (error) {
          console.error("❌ [WebSocket] Erro JSON:", error)
        }
      }

      ws.onerror = (error) => {
        console.error("❌ [WebSocket] Erro:", error)
      }

      ws.onclose = () => {
        console.log("🔌 [WebSocket] Desconectado")
        setIsConnected(false)
        setIsConnecting(false)
        wsRef.current = null

        // Lógica de Reconexão Exponencial
        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          reconnectAttemptsRef.current++
          const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000)
          console.log(`🔄 Reconectando em ${delay}ms (Tentativa ${reconnectAttemptsRef.current})`)

          reconnectTimeoutRef.current = setTimeout(() => {
            connect()
          }, delay)
        } else {
          console.error("❌ [WebSocket] Máximo de tentativas atingido")
        }
      }

      wsRef.current = ws
    } catch (error) {
      console.error("❌ [WebSocket] Falha fatal:", error)
      setIsConnecting(false)
    }
  }, [getWebSocketUrl, handleEvent, maxReconnectAttempts])

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current)
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
    setIsConnected(false)
    setIsConnecting(false)
    reconnectAttemptsRef.current = 0
  }, [])

  const send = useCallback((event: SocketEvent) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(event))
    } else {
      console.warn("⚠️ [WebSocket] Tentativa de envio desconectado")
    }
  }, [])

  // Auto-connect ao montar
  useEffect(() => {
    connect()
    return () => disconnect()
  }, [connect, disconnect])

  return (
    <WhatsAppSocketContext.Provider
      value={{
        isConnected,
        isConnecting,
        connect,
        disconnect,
        send,
        typingStatus
      }}
    >
      {children}
    </WhatsAppSocketContext.Provider>
  )
}

// ==========================================
// HOOK PARA CONSUMO
// ==========================================
export function useWhatsAppSocket() {
  const context = useContext(WhatsAppSocketContext)
  if (!context) {
    throw new Error("useWhatsAppSocket deve ser usado dentro de WhatsAppSocketProvider")
  }
  return context
}