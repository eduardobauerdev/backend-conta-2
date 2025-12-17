"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import type { Chat, Message } from "@/lib/whatsapp-types"

type SocketEventType =
  | "connection_status"
  | "new_message"
  | "message_ack"
  | "new_chat"
  | "chat_update"
  | "presence_update"
  | "typing"

interface SocketEvent {
  type: SocketEventType
  data: any
}

interface UseWhatsAppSocketOptions {
  onMessage?: (message: Message) => void
  onChatUpdate?: (chat: Chat) => void
  onConnectionChange?: (connected: boolean) => void
  onTyping?: (chatId: string, isTyping: boolean) => void
  autoConnect?: boolean
}

export function useWhatsAppSocket(options: UseWhatsAppSocketOptions = {}) {
  const { onMessage, onChatUpdate, onConnectionChange, onTyping, autoConnect = true } = options

  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>()
  const reconnectAttemptsRef = useRef(0)
  const maxReconnectAttempts = 5

  const getWebSocketUrl = useCallback(() => {
    const wsUrl = process.env.NEXT_PUBLIC_BACKEND_WS_URL
    if (!wsUrl) {
      console.error("[WebSocket] NEXT_PUBLIC_BACKEND_WS_URL não configurada")
      return null
    }
    return wsUrl
  }, [])

  const handleEvent = useCallback(
    (event: SocketEvent) => {
      switch (event.type) {
        case "connection_status":
          if (onConnectionChange) {
            onConnectionChange(event.data.connected)
          }
          break

        case "new_message":
          if (onMessage) {
            onMessage(event.data)
          }
          break

        case "message_ack":
          // Atualizar status da mensagem
          break

        case "new_chat":
        case "chat_update":
          if (onChatUpdate) {
            onChatUpdate(event.data)
          }
          break

        case "typing":
          if (onTyping) {
            onTyping(event.data.chatId, event.data.isTyping)
          }
          break

        case "presence_update":
          // Atualizar presença do contato (online/offline)
          break

        default:
          console.log("[WebSocket] Evento desconhecido:", event.type)
      }
    },
    [onMessage, onChatUpdate, onConnectionChange, onTyping],
  )

  const connect = useCallback(() => {
    const wsUrl = getWebSocketUrl()
    if (!wsUrl) return

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      console.log("[WebSocket] Já conectado")
      return
    }

    setIsConnecting(true)

    try {
      const ws = new WebSocket(wsUrl)

      ws.onopen = () => {
        console.log("[WebSocket] Conectado")
        setIsConnected(true)
        setIsConnecting(false)
        reconnectAttemptsRef.current = 0
      }

      ws.onmessage = (event) => {
        try {
          const socketEvent: SocketEvent = JSON.parse(event.data)
          handleEvent(socketEvent)
        } catch (error) {
          console.error("[WebSocket] Erro ao processar mensagem:", error)
        }
      }

      ws.onerror = (error) => {
        console.error("[WebSocket] Erro:", error)
      }

      ws.onclose = () => {
        console.log("[WebSocket] Desconectado")
        setIsConnected(false)
        setIsConnecting(false)
        wsRef.current = null

        // Tentar reconectar
        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          reconnectAttemptsRef.current++
          const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000)
          console.log(`[WebSocket] Tentando reconectar em ${delay}ms (tentativa ${reconnectAttemptsRef.current})`)

          reconnectTimeoutRef.current = setTimeout(() => {
            connect()
          }, delay)
        } else {
          console.error("[WebSocket] Máximo de tentativas de reconexão atingido")
        }
      }

      wsRef.current = ws
    } catch (error) {
      console.error("[WebSocket] Erro ao criar conexão:", error)
      setIsConnecting(false)
    }
  }, [getWebSocketUrl, handleEvent])

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }

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
      console.error("[WebSocket] Não conectado. Não é possível enviar mensagem.")
    }
  }, [])

  useEffect(() => {
    if (autoConnect) {
      connect()
    }

    return () => {
      disconnect()
    }
  }, [autoConnect, connect, disconnect])

  return {
    isConnected,
    isConnecting,
    connect,
    disconnect,
    send,
  }
}
