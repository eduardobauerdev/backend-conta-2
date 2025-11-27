"use client"

import { useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js"

type EventType = "INSERT" | "UPDATE" | "DELETE" | "*"

interface UseRealtimeSubscriptionOptions<T> {
  table: string
  onInsert?: (payload: T) => void
  onUpdate?: (payload: T) => void
  onDelete?: (payload: T) => void
  filter?: string
  enabled?: boolean
}

export function useRealtimeSubscription<T = any>(options: UseRealtimeSubscriptionOptions<T>) {
  const { table, onInsert, onUpdate, onDelete, filter, enabled = true } = options

  useEffect(() => {
    if (!enabled) return

    const supabase = createClient()

    const channelName = `${table}-changes-${filter || "all"}`

    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes" as any,
        {
          event: "*" as any,
          schema: "public",
          table: table,
          filter: filter,
        },
        (payload: RealtimePostgresChangesPayload<T>) => {
          if (payload.eventType === "INSERT" && onInsert) {
            onInsert(payload.new as T)
          }
          if (payload.eventType === "UPDATE" && onUpdate) {
            onUpdate(payload.new as T)
          }
          if (payload.eventType === "DELETE" && onDelete) {
            onDelete(payload.old as T)
          }
        },
      )
      .subscribe((status, err) => {
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          console.error(`[Realtime] Erro em ${table}:`, err?.message || status)
        }
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [table, onInsert, onUpdate, onDelete, filter, enabled])
}
