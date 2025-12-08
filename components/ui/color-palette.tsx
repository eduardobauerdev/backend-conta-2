"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

// Paleta de cores do sistema - cores suaves e harmoniosas
export const SYSTEM_COLORS = [
  { name: "Azul", value: "#3B82F6" },
  { name: "Azul Escuro", value: "#1D4ED8" },
  { name: "Verde", value: "#22C55E" },
  { name: "Verde Escuro", value: "#16A34A" },
  { name: "Vermelho", value: "#EF4444" },
  { name: "Vermelho Escuro", value: "#DC2626" },
  { name: "Amarelo", value: "#EAB308" },
  { name: "Laranja", value: "#F97316" },
  { name: "Rosa", value: "#EC4899" },
  { name: "Roxo", value: "#A855F7" },
  { name: "Roxo Escuro", value: "#7C3AED" },
  { name: "Ciano", value: "#06B6D4" },
  { name: "Cinza", value: "#6B7280" },
  { name: "Cinza Escuro", value: "#4B5563" },
  { name: "Neutro", value: "#171717" },
] as const

export type SystemColor = typeof SYSTEM_COLORS[number]

interface ColorPaletteProps {
  value: string
  onChange: (color: string) => void
  className?: string
}

export function ColorPalette({ value, onChange, className }: ColorPaletteProps) {
  return (
    <div className={cn("grid grid-cols-6 gap-2", className)}>
      {SYSTEM_COLORS.map((color) => (
        <button
          key={color.value}
          type="button"
          onClick={() => onChange(color.value)}
          className={cn(
            "w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all hover:scale-110",
            value === color.value
              ? "border-foreground ring-2 ring-ring ring-offset-2"
              : "border-transparent"
          )}
          style={{ backgroundColor: color.value }}
          title={color.name}
        >
          {value === color.value && (
            <Check className="w-4 h-4 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" />
          )}
        </button>
      ))}
    </div>
  )
}
