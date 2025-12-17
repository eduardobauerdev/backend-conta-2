"use client"

import { useState, useEffect, useCallback } from "react"
import { whatsappCache } from "@/lib/whatsapp-cache"
import type { Chat } from "@/lib/whatsapp-types"

interface UseChatsOptions {
  autoLoad?: boolean
}

export function useChats(options: UseChatsOptions = {}) {
  const { autoLoad = true } = options
  
  const [chats, setChats] = useState<Chat[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Carregar chats iniciais via HTTP
  const loadChats = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/whatsapp/chats")
      
      if (!response.ok) {
        throw new Error("Erro ao carregar chats")
      }

      const data = await response.json()
      
      if (data.success && data.chats) {
        whatsappCache.setChats(data.chats)
      } else {
        throw new Error(data.message || "Erro ao carregar chats")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido"
      setError(errorMessage)
      console.error("[useChats] Erro:", errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  // Subscrever às mudanças do cache
  useEffect(() => {
    const unsubscribe = whatsappCache.subscribeToChatList((updatedChats) => {
      setChats(updatedChats)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  // Carregar dados iniciais
  useEffect(() => {
    if (autoLoad && chats.length === 0) {
      loadChats()
    }
  }, [autoLoad, chats.length, loadChats])

  return {
    chats,
    loading,
    error,
    refresh: loadChats,
  }
}
