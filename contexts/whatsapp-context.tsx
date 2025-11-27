"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface WhatsAppContextType {
  isConnected: boolean
  setIsConnected: (connected: boolean) => void
}

const WhatsAppContext = createContext<WhatsAppContextType | undefined>(undefined)

export function WhatsAppProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    async function checkInitialStatus() {
      try {
        const response = await fetch("/api/whatsapp/status")

        // Se a resposta não for ok, não considerar como erro crítico
        if (!response.ok) {
          setIsConnected(false)
          return
        }

        const data = await response.json()

        // Atualizar estado baseado na resposta
        if (data.success && data.connected) {
          setIsConnected(true)
        } else {
          setIsConnected(false)
        }
      } catch (error) {
        // Falha silenciosa - WhatsApp não configurado ainda
        setIsConnected(false)
      }
    }

    checkInitialStatus()

    // Polling a cada 30 segundos
    const interval = setInterval(checkInitialStatus, 30000)

    return () => clearInterval(interval)
  }, [])

  return <WhatsAppContext.Provider value={{ isConnected, setIsConnected }}>{children}</WhatsAppContext.Provider>
}

export function useWhatsApp() {
  const context = useContext(WhatsAppContext)
  if (context === undefined) {
    throw new Error("useWhatsApp must be used within a WhatsAppProvider")
  }
  return context
}
