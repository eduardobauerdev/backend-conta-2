"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import type { Chat, Message } from "@/lib/whatsapp-types"
import { getCookie } from "@/lib/auth"
import { createClient } from "@/lib/supabase/client"

interface ChatCache {
  chats: Chat[]
  totalChats: number
  hasMore: boolean
  lastFetch: number
}

interface MessageCache {
  [chatId: string]: {
    messages: Message[]
    totalMessages: number
    hasMore: boolean
    lastFetch: number
  }
}

interface WhatsAppCacheContextType {
  // Cache de chats
  getCachedChats: () => ChatCache | null
  setCachedChats: (chats: Chat[], hasMore: boolean, totalChats: number) => void
  appendChats: (newChats: Chat[], hasMore: boolean) => void
  invalidateChatsCache: () => void
  getChatById: (chatId: string) => Chat | null

  // Cache de mensagens
  getCachedMessages: (chatId: string) => { messages: Message[]; hasMore: boolean; totalMessages: number } | null
  setCachedMessages: (chatId: string, messages: Message[], hasMore: boolean, totalMessages: number) => void
  appendMessages: (chatId: string, newMessages: Message[], hasMore: boolean) => void
  addNewMessage: (chatId: string, message: Message) => void
  invalidateMessagesCache: (chatId?: string) => void

  // Estado do chat selecionado
  selectedChatId: string | null
  setSelectedChatId: (chatId: string | null) => void
  selectedChatName: string
  setSelectedChatName: (name: string) => void
}

const WhatsAppCacheContext = createContext<WhatsAppCacheContextType | undefined>(undefined)

const CACHE_TTL = 30 * 60 * 1000 // 30 minutos

function getUserCacheKey(prefix: string): string {
  const userId = getCookie("auth_user_id") || "default"
  return `whatsapp_${prefix}_${userId}`
}

export function WhatsAppCacheProvider({ children }: { children: React.ReactNode }) {
  const [chatsCache, setChatsCache] = useState<ChatCache | null>(null)
  const [messagesCache, setMessagesCache] = useState<MessageCache>({})
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [selectedChatName, setSelectedChatName] = useState<string>("")
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  useEffect(() => {
    const userId = getCookie("auth_user_id")
    setCurrentUserId(userId)

    if (userId) {
      // Carregar cache de chats do localStorage
      const chatsCacheKey = getUserCacheKey("chats")
      const storedChats = localStorage.getItem(chatsCacheKey)
      if (storedChats) {
        try {
          const parsed = JSON.parse(storedChats)
          const isExpired = Date.now() - parsed.lastFetch > CACHE_TTL
          if (!isExpired) {
            setChatsCache(parsed)
          } else {
            localStorage.removeItem(chatsCacheKey)
          }
        } catch (e) {
          localStorage.removeItem(chatsCacheKey)
        }
      }

      // Carregar cache de mensagens do localStorage (apenas dos chats abertos)
      const messagesCacheKey = getUserCacheKey("messages")
      const storedMessages = localStorage.getItem(messagesCacheKey)
      if (storedMessages) {
        try {
          const parsed = JSON.parse(storedMessages)
          // Limpar mensagens expiradas
          const cleaned: MessageCache = {}
          Object.entries(parsed).forEach(([chatId, cache]: [string, any]) => {
            const isExpired = Date.now() - cache.lastFetch > CACHE_TTL
            if (!isExpired) {
              cleaned[chatId] = cache
            }
          })
          setMessagesCache(cleaned)
        } catch (e) {
          localStorage.removeItem(messagesCacheKey)
        }
      }

      const supabase = createClient()

      // Subscribe to chat_assignments changes
      const assignmentsChannel = supabase
        .channel("chat_assignments_changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "chat_assignments",
          },
          (payload) => {
            // Invalidar cache de chats quando há mudança nas atribuições
            invalidateChatsCache()
          },
        )
        .subscribe()

      // Subscribe to chat_activity changes
      const activityChannel = supabase
        .channel("chat_activity_changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "chat_activity",
          },
          (payload) => {
            // Notificar mudanças de atividade (typing, viewing)
            window.dispatchEvent(new CustomEvent("whatsapp:activity", { detail: payload }))
          },
        )
        .subscribe()

      // Subscribe to message_tracking changes
      const messagesChannel = supabase
        .channel("message_tracking_changes")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "message_tracking",
          },
          (payload) => {
            // Invalidar cache de mensagens do chat afetado
            const newMessage = payload.new as any
            if (newMessage.chat_id) {
              window.dispatchEvent(
                new CustomEvent("whatsapp:new_message", {
                  detail: { chatId: newMessage.chat_id, message: newMessage },
                }),
              )
            }
          },
        )
        .subscribe()

      // Subscribe to whatsapp_config changes
      const configChannel = supabase
        .channel("whatsapp_config_changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "whatsapp_config",
          },
          (payload) => {
            // Notificar mudanças de status de conexão
            window.dispatchEvent(new CustomEvent("whatsapp:config", { detail: payload }))
          },
        )
        .subscribe()

      return () => {
        supabase.removeChannel(assignmentsChannel)
        supabase.removeChannel(activityChannel)
        supabase.removeChannel(messagesChannel)
        supabase.removeChannel(configChannel)
      }
    }
  }, [])

  useEffect(() => {
    if (chatsCache && currentUserId) {
      const cacheKey = getUserCacheKey("chats")
      localStorage.setItem(cacheKey, JSON.stringify(chatsCache))
    }
  }, [chatsCache, currentUserId])

  useEffect(() => {
    if (Object.keys(messagesCache).length > 0 && currentUserId) {
      const cacheKey = getUserCacheKey("messages")
      localStorage.setItem(cacheKey, JSON.stringify(messagesCache))
    }
  }, [messagesCache, currentUserId])

  // Cache de chats
  const getCachedChats = useCallback(() => {
    if (!chatsCache) return null

    const isExpired = Date.now() - chatsCache.lastFetch > CACHE_TTL
    if (isExpired) {
      return null
    }

    return chatsCache
  }, [chatsCache])

  const setCachedChats = useCallback((chats: Chat[], hasMore: boolean, totalChats: number) => {
    setChatsCache({
      chats,
      totalChats,
      hasMore,
      lastFetch: Date.now(),
    })
  }, [])

  const appendChats = useCallback((newChats: Chat[], hasMore: boolean) => {
    setChatsCache((prev) => {
      if (!prev) return null

      const existingIds = new Set(prev.chats.map((c) => c.id))
      const uniqueNewChats = newChats.filter((c) => !existingIds.has(c.id))

      return {
        chats: [...prev.chats, ...uniqueNewChats],
        totalChats: prev.totalChats + uniqueNewChats.length,
        hasMore,
        lastFetch: Date.now(),
      }
    })
  }, [])

  const invalidateChatsCache = useCallback(() => {
    setChatsCache(null)
    if (currentUserId) {
      const cacheKey = getUserCacheKey("chats")
      localStorage.removeItem(cacheKey)
    }
  }, [currentUserId])

  // Função para buscar um chat específico pelo ID
  const getChatById = useCallback(
    (chatId: string): Chat | null => {
      if (!chatsCache) return null

      const isExpired = Date.now() - chatsCache.lastFetch > CACHE_TTL
      if (isExpired) return null

      const chat = chatsCache.chats.find((c) => c.id === chatId)
      return chat || null
    },
    [chatsCache],
  )

  // Cache de mensagens
  const getCachedMessages = useCallback(
    (chatId: string) => {
      const cache = messagesCache[chatId]
      if (!cache) return null

      const isExpired = Date.now() - cache.lastFetch > CACHE_TTL
      if (isExpired) {
        return null
      }

      return {
        messages: cache.messages,
        hasMore: cache.hasMore,
        totalMessages: cache.totalMessages,
      }
    },
    [messagesCache],
  )

  const setCachedMessages = useCallback(
    (chatId: string, messages: Message[], hasMore: boolean, totalMessages: number) => {
      setMessagesCache((prev) => ({
        ...prev,
        [chatId]: {
          messages,
          totalMessages,
          hasMore,
          lastFetch: Date.now(),
        },
      }))
    },
    [],
  )

  const appendMessages = useCallback((chatId: string, newMessages: Message[], hasMore: boolean) => {
    setMessagesCache((prev) => {
      const cache = prev[chatId]
      if (!cache) return prev

      const existingIds = new Set(cache.messages.map((m) => m.id))
      const uniqueNewMessages = newMessages.filter((m) => !existingIds.has(m.id))

      return {
        ...prev,
        [chatId]: {
          messages: [...uniqueNewMessages, ...cache.messages],
          totalMessages: cache.totalMessages + uniqueNewMessages.length,
          hasMore,
          lastFetch: Date.now(),
        },
      }
    })
  }, [])

  const addNewMessage = useCallback((chatId: string, message: Message) => {
    setMessagesCache((prev) => {
      const cache = prev[chatId]
      if (!cache) {
        return prev
      }

      return {
        ...prev,
        [chatId]: {
          ...cache,
          messages: [...cache.messages, message],
          totalMessages: cache.totalMessages + 1,
          lastFetch: Date.now(),
        },
      }
    })
  }, [])

  const invalidateMessagesCache = useCallback(
    (chatId?: string) => {
      if (chatId) {
        setMessagesCache((prev) => {
          const newCache = { ...prev }
          delete newCache[chatId]
          return newCache
        })
      } else {
        setMessagesCache({})
        if (currentUserId) {
          const cacheKey = getUserCacheKey("messages")
          localStorage.removeItem(cacheKey)
        }
      }
    },
    [currentUserId],
  )

  return (
    <WhatsAppCacheContext.Provider
      value={{
        getCachedChats,
        setCachedChats,
        appendChats,
        invalidateChatsCache,
        getChatById,
        getCachedMessages,
        setCachedMessages,
        appendMessages,
        addNewMessage,
        invalidateMessagesCache,
        selectedChatId,
        setSelectedChatId,
        selectedChatName,
        setSelectedChatName,
      }}
    >
      {children}
    </WhatsAppCacheContext.Provider>
  )
}

export function useWhatsAppCache() {
  const context = useContext(WhatsAppCacheContext)
  if (!context) {
    throw new Error("useWhatsAppCache must be used within WhatsAppCacheProvider")
  }
  return context
}
