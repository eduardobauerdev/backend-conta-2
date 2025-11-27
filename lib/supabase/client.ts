"use client"

import { createBrowserClient } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"

let supabaseInstance: SupabaseClient | null = null

export function getSupabaseClient() {
  if (supabaseInstance) {
    return supabaseInstance
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing Supabase environment variables. " +
        "Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.",
    )
  }

  supabaseInstance = createBrowserClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      storageKey: "projeto62-auth-client", // Diferente do servidor
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
    },
  })

  return supabaseInstance
}

// Alias para compatibilidade
export const createClient = getSupabaseClient
