import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

function joinUrl(base: string, path: string): string {
  const cleanBase = base.replace(/\/+$/, "")
  const cleanPath = path.replace(/^\/+/, "")
  return `${cleanBase}/${cleanPath}`
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") || "50"
    const offset = searchParams.get("offset") || "0"

    const supabase = await createServerClient()

    const { data: config, error: configError } = await supabase.from("whatsapp_config").select("*").single()

    if (configError || !config || !config.server_url) {
      return NextResponse.json({
        success: false,
        message: "Configure a URL da API do servidor WhatsApp primeiro",
        chats: [],
      })
    }

    const targetUrl = joinUrl(config.server_url, `chats?limit=${limit}&offset=${offset}`)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    try {
      const response = await fetch(targetUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const contentType = response.headers.get("content-type")

        if (contentType?.includes("text/html")) {
          return NextResponse.json({
            success: false,
            message: "Endpoint /chats não disponível no servidor. Verifique se o backend está atualizado.",
            chats: [],
          })
        }

        try {
          const errorData = await response.json()
          return NextResponse.json({
            success: false,
            message: errorData.message || "Erro ao carregar conversas",
            chats: [],
          })
        } catch {
          return NextResponse.json({
            success: false,
            message: `Erro ${response.status}: ${response.statusText}`,
            chats: [],
          })
        }
      }

      const data = await response.json()

      return NextResponse.json({
        success: true,
        chats: data.chats || [],
        hasMore: data.hasMore || false,
        total: data.total || 0,
        offset: Number.parseInt(offset),
        limit: Number.parseInt(limit),
      })
    } catch (fetchError) {
      clearTimeout(timeoutId)

      if (fetchError instanceof Error && fetchError.name === "AbortError") {
        return NextResponse.json({
          success: false,
          message: "Tempo esgotado ao conectar ao servidor",
          chats: [],
        })
      }

      console.error("[API] Erro de rede ao buscar conversas:", fetchError)
      return NextResponse.json({
        success: false,
        message: "Não foi possível conectar ao servidor. Verifique se o backend está online.",
        chats: [],
      })
    }
  } catch (error) {
    console.error("[API] Erro crítico ao processar requisição de conversas:", error)
    return NextResponse.json({
      success: false,
      message: "Erro interno ao processar requisição",
      chats: [],
    })
  }
}
