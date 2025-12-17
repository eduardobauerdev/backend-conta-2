"use client"

import { useState, useEffect, useCallback } from "react"
import { whatsappCache } from "@/lib/whatsapp-cache"
import type { Message } from "@/lib/whatsapp-types"

interface UseMessagesOptions {
  chatId: string
  autoLoad?: boolean
}

export function useMessages(options: UseMessagesOptions) {
  const { chatId, autoLoad = true } = options
  
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Carregar mensagens via HTTP
  const loadMessages = useCallback(async () => {
    if (!chatId) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/whatsapp/messages/${chatId}`)
      
      if (!response.ok) {
        throw new Error("Erro ao carregar mensagens")
      }

      const data = await response.json()
      
      if (data.success && data.messages) {
        whatsappCache.setMessages(chatId, data.messages)
      } else {
        throw new Error(data.message || "Erro ao carregar mensagens")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido"
      setError(errorMessage)
      console.error("[useMessages] Erro:", errorMessage)
    } finally {
      setLoading(false)
    }
  }, [chatId])

  // Subscrever às mudanças do cache
  useEffect(() => {
    if (!chatId) return

    const unsubscribe = whatsappCache.subscribeToMessages(chatId, (updatedMessages) => {
      setMessages(updatedMessages)
    })

    return () => {
      unsubscribe()
    }
  }, [chatId])

  // Carregar dados iniciais
  useEffect(() => {
    if (autoLoad && chatId) {
      loadMessages()
    }
  }, [autoLoad, chatId, loadMessages])

  // Enviar mensagem
  const sendMessage = useCallback(async (text: string) => {
    if (!chatId || !text.trim()) return

    try {
      const response = await fetch("/api/whatsapp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId,
          message: text,
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao enviar mensagem")
      }

      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.message || "Erro ao enviar mensagem")
      }

      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido"
      console.error("[useMessages] Erro ao enviar:", errorMessage)
      throw err
    }
  }, [chatId])

  return {
    messages,
    loading,
    error,
    refresh: loadMessages,
    sendMessage,
  }
}
