"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { getRoleColor } from "@/lib/role-colors"

interface RoleBadgeProps {
  cargo: string
  className?: string
}

// Cache roles to avoid repeated DB calls
const roleColorCache = new Map<string, string>()

export default function RoleBadge({ cargo, className }: RoleBadgeProps) {
  const [roleColor, setRoleColor] = useState<string>(() => {
    // Check cache first
    return roleColorCache.get(cargo) || getRoleColor(cargo)
  })

  useEffect(() => {
    // If already in cache, don't fetch again
    if (roleColorCache.has(cargo)) {
      return
    }

    const fetchRoleColor = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("cargos").select("cor").eq("nome", cargo).single()

      if (!error && data) {
        roleColorCache.set(cargo, data.cor)
        setRoleColor(data.cor)
      } else {
        // Use default color if not found in database
        const defaultColor = getRoleColor(cargo)
        roleColorCache.set(cargo, defaultColor)
        setRoleColor(defaultColor)
      }
    }

    fetchRoleColor()
  }, [cargo])

  return (
    <Badge
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${className || ""}`}
      style={{
        backgroundColor: roleColor + "33", // 20% opacity
        borderColor: roleColor,
        color: roleColor,
      }}
    >
      {cargo}
    </Badge>
  )
}
