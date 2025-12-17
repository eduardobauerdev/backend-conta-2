"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import { whatsappCache } from "@/lib/whatsapp-cache"

interface WhatsAppContextType {
  isConnected: boolean
  setIsConnected: (connected: boolean) => void
  refreshChats: () => void
  sendMessage: (chatId: string, message: string) => Promise<void>
}

const WhatsAppContext = createContext<WhatsAppContextType | undefined>(undefined)

export function WhatsAppProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)

  // Carregar chats via HTTP
  const refreshChats = useCallback(async () => {
    try {
      const response = await fetch("/api/whatsapp/chats")
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.chats) {
          whatsappCache.setChats(data.chats)
        }
      }
    } catch (error) {
      console.error("[WhatsApp] Erro ao carregar chats:", error)
    }
  }, [])

  // Enviar mensagem via HTTP
  const sendMessage = useCallback(async (chatId: string, message: string) => {
    const response = await fetch("/api/whatsapp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId, message }),
    })

    if (!response.ok) {
      throw new Error("Erro ao enviar mensagem")
    }
  }, [])

  return (
    <WhatsAppContext.Provider
      value={{
        isConnected,
        setIsConnected,
        refreshChats,
        sendMessage,
      }}
    >
      {children}
    </WhatsAppContext.Provider>
  )
}

export function useWhatsApp() {
  const context = useContext(WhatsAppContext)
  if (context === undefined) {
    throw new Error("useWhatsApp must be used within a WhatsAppProvider")
  }
  return context
}
