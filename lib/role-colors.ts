import type React from "react"
// Utility functions for role colors

export function getRoleColor(cargo: string): string {
  // Default colors for built-in roles (fallback)
  const defaultColors: Record<string, string> = {
    Administrador: "#ef4444",
    Desenvolvedor: "#a855f7",
    Vendedor: "#3b82f6",
    Financeiro: "#22c55e",
  }

  return defaultColors[cargo] || "#71717a"
}

export function getRoleColorWithOpacity(cargo: string, opacity = 0.2): string {
  const color = getRoleColor(cargo)
  return (
    color +
    Math.round(opacity * 255)
      .toString(16)
      .padStart(2, "0")
  )
}

export async function getRoleColorFromDB(cargo: string): Promise<string> {
  try {
    const { createClient } = await import("@/lib/supabase/client")
    const supabase = createClient()

    const { data, error } = await supabase.from("cargos").select("cor").eq("nome", cargo).single()

    if (error || !data?.cor) {
      // Fallback to default colors
      return getRoleColor(cargo)
    }

    return data.cor
  } catch (error) {
    console.error("[v0] Error fetching role color from DB:", error)
    return getRoleColor(cargo)
  }
}

export function getBadgeClasses(cargo: string, customColor?: string): string {
  const color = customColor || getRoleColor(cargo)

  // We'll use inline styles for custom colors
  return "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
}

export function getBadgeStyles(cargo: string, customColor?: string): React.CSSProperties {
  const color = customColor || getRoleColor(cargo)

  return {
    backgroundColor: color + "33", // 20% opacity
    borderColor: color,
    color: color,
  }
}

// Check if a color is light or dark to determine text color
export function isColorLight(hexColor: string): boolean {
  const hex = hexColor.replace("#", "")
  const r = Number.parseInt(hex.substr(0, 2), 16)
  const g = Number.parseInt(hex.substr(2, 2), 16)
  const b = Number.parseInt(hex.substr(4, 2), 16)

  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  return luminance > 0.5
}
