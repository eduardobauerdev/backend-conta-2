"use client"

import type React from "react"
import { SWRConfig } from "swr"
import { ATTR_CACHE_KEY } from "@/lib/swr-config"
import type { AtribuicoesMap } from "@/lib/swr-config"

interface SWRHydrationProps {
  children: React.ReactNode
  initialAssignments: AtribuicoesMap
}

export function SWRHydration({ children, initialAssignments }: SWRHydrationProps) {
  return (
    <SWRConfig
      value={{
        fallback: {
          [ATTR_CACHE_KEY]: initialAssignments,
        },
      }}
    >
      {children}
    </SWRConfig>
  )
}
