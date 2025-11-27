"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import type { RealtimeChannel } from "@supabase/supabase-js"

type RealtimeEvent = {
  table: string
  eventType: "INSERT" | "UPDATE" | "DELETE"
  new: any
  old: any
}

type RealtimeCallback = (event: RealtimeEvent) => void

interface RealtimeContextType {
  subscribe: (table: string, callback: RealtimeCallback) => () => void
  isConnected: boolean
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined)

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const channelRef = useRef<RealtimeChannel | null>(null)
  const callbacksRef = useRef<Map<string, Set<RealtimeCallback>>>(new Map())

  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel("realtime-all-tables")
      .on("postgres_changes", { event: "*", schema: "public" }, (payload) => {
        const table = payload.table
        const callbacks = callbacksRef.current.get(table)

        if (callbacks && callbacks.size > 0) {
          const event: RealtimeEvent = {
            table,
            eventType: payload.eventType as "INSERT" | "UPDATE" | "DELETE",
            new: payload.new,
            old: payload.old,
          }

          callbacks.forEach((callback) => {
            try {
              callback(event)
            } catch (error) {
              console.error(`Error in realtime callback for ${table}:`, error)
            }
          })
        }
      })
      .subscribe((status) => {
        setIsConnected(status === "SUBSCRIBED")
      })

    channelRef.current = channel

    return () => {
      channel.unsubscribe()
    }
  }, [])

  const subscribe = useCallback((table: string, callback: RealtimeCallback) => {
    if (!callbacksRef.current.has(table)) {
      callbacksRef.current.set(table, new Set())
    }

    callbacksRef.current.get(table)!.add(callback)

    // Return unsubscribe function
    return () => {
      const callbacks = callbacksRef.current.get(table)
      if (callbacks) {
        callbacks.delete(callback)
        if (callbacks.size === 0) {
          callbacksRef.current.delete(table)
        }
      }
    }
  }, [])

  return <RealtimeContext.Provider value={{ subscribe, isConnected }}>{children}</RealtimeContext.Provider>
}

export function useRealtime() {
  const context = useContext(RealtimeContext)
  if (!context) {
    throw new Error("useRealtime must be used within RealtimeProvider")
  }
  return context
}

export function useRealtimeTable<T>(
  table: string,
  onInsert?: (record: T) => void,
  onUpdate?: (record: T, old: T) => void,
  onDelete?: (old: T) => void,
) {
  const { subscribe, isConnected } = useRealtime()

  useEffect(() => {
    const unsubscribe = subscribe(table, (event) => {
      if (event.eventType === "INSERT" && onInsert) {
        onInsert(event.new as T)
      } else if (event.eventType === "UPDATE" && onUpdate) {
        onUpdate(event.new as T, event.old as T)
      } else if (event.eventType === "DELETE" && onDelete) {
        onDelete(event.old as T)
      }
    })

    return unsubscribe
  }, [table, subscribe, onInsert, onUpdate, onDelete])

  return { isConnected }
}
