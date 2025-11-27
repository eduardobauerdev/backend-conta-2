import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

function joinUrl(base: string, path: string): string {
  const cleanBase = base.replace(/\/+$/, "")
  const cleanPath = path.replace(/^\/+/, "")
  return `${cleanBase}/${cleanPath}`
}

export async function GET(request: Request, { params }: { params: Promise<{ chatId: string }> }) {
  try {
    const { chatId } = await params

    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") || "10"
    const offset = searchParams.get("offset") || "0"

    const supabase = await createServerClient()

    const { data: config, error: configError } = await supabase.from("whatsapp_config").select("*").single()

    if (configError || !config || !config.server_url) {
      console.error("[v0] Erro de configuração:", configError)
      return NextResponse.json(
        {
          success: false,
          message: "Configure a URL da API do servidor WhatsApp primeiro",
          messages: [],
        },
        { status: 400 },
      )
    }

    const targetUrl = joinUrl(config.server_url, `chats/${chatId}/messages?limit=${limit}&offset=${offset}`)

    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] Erro do backend:", errorText)
      return NextResponse.json(
        {
          success: false,
          message: "Erro ao carregar mensagens",
          messages: [],
        },
        { status: response.status },
      )
    }

    const data = await response.json()

    console.log(
      "[v0] Mensagens carregadas:",
      data.messages?.length || 0,
      "| Total:",
      data.total,
      "| Tem mais:",
      data.hasMore,
    )

    return NextResponse.json({
      success: true,
      messages: data.messages || [],
      hasMore: data.hasMore || false,
      total: data.total || 0,
      offset: Number.parseInt(offset),
      limit: Number.parseInt(limit),
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
    console.error("[v0] Erro ao buscar mensagens:", errorMessage)
    return NextResponse.json(
      {
        success: false,
        message: "Não foi possível conectar ao servidor. Verifique a configuração da API.",
        messages: [],
        error: errorMessage,
      },
      { status: 500 },
    )
  }
}
