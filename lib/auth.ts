"use client"

import { createClient } from "@/lib/supabase/client"

export interface UserData {
  id: string
  email: string
  cargo: string
  nome: string
  foto_perfil: string | null
  show_all_tags: boolean
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift() || null;
    // Decodifica valores codificados para evitar %20 e outros caracteres encoded
    return cookieValue ? decodeURIComponent(cookieValue) : null;
  }
  
  return null;
}


export function setCookie(name: string, value: string, days: number): void {
  if (typeof document === "undefined") return

  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`

  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`
}

export function deleteCookie(name: string): void {
  if (typeof document === "undefined") return
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
}

export function getUserIdFromCookie(): string | null {
  try {
    const userId = getCookie("auth_user_id")
    return userId
  } catch (error) {
    console.error("Erro ao ler cookie:", error)
    return null
  }
}

export async function getUserData(userId: string): Promise<UserData | null> {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("perfis")
      .select("id, email, cargo, nome, foto_perfil, show_all_tags")
      .eq("id", userId)
      .single()

    if (error || !data) {
      return null
    }

    return {
      id: data.id,
      email: data.email,
      cargo: data.cargo,
      nome: data.nome || "Usuário",
      foto_perfil: data.foto_perfil || null,
      show_all_tags: data.show_all_tags || false,
    }
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error)
    return null
  }
}

export function isAuthenticated(): boolean {
  return getUserIdFromCookie() !== null
}
