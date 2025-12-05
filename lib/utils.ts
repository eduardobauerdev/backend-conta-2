import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Verifica se uma cor hexadecimal é clara (para usar texto escuro) ou escura (para usar texto claro)
 */
export function isColorLight(hexColor: string): boolean {
  const hex = hexColor.replace("#", "")
  const r = Number.parseInt(hex.substr(0, 2), 16)
  const g = Number.parseInt(hex.substr(2, 2), 16)
  const b = Number.parseInt(hex.substr(4, 2), 16)

  // Calcula a luminância relativa
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  return luminance > 0.55 // Threshold mais baixo para capturar mais cores claras (antes era 0.7)
}

/**
 * Retorna a cor do texto adequada para um fundo de cor hexadecimal
 */
export function getContrastTextColor(hexColor: string): string {
  return isColorLight(hexColor) ? "#000000" : "#ffffff"
}

/**
 * Formata um número de telefone no padrão brasileiro
 * Exemplo: 5551989269053 -> +55 (51) 98926-9053
 */
export function formatPhoneNumber(phone: string): string {
  if (!phone) return ""
  
  // Remove sufixos do WhatsApp (ex: @c.us, @s.whatsapp.net)
  const cleanPhone = phone.replace(/@.*$/, "").replace(/:\d+$/, "").replace(/\D/g, "")

  if (cleanPhone.startsWith("55")) {
    const withoutCountryCode = cleanPhone.substring(2)

    if (withoutCountryCode.length === 10) {
      // Telefone fixo ou celular antigo (sem o 9)
      const ddd = withoutCountryCode.substring(0, 2)
      const number = withoutCountryCode.substring(2)
      return `+55 (${ddd}) ${number.substring(0, 4)}-${number.substring(4)}`
    } else if (withoutCountryCode.length === 11) {
      // Celular com 9
      const ddd = withoutCountryCode.substring(0, 2)
      return `+55 (${ddd}) ${withoutCountryCode.substring(2, 7)}-${withoutCountryCode.substring(7)}`
    }
  }
  
  // Se não for BR ou formato desconhecido, retorna com +
  return cleanPhone.startsWith("+") ? cleanPhone : `+${cleanPhone}`
}
