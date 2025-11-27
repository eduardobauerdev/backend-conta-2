import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

function joinUrl(base: string, path: string): string {
  const cleanBase = base.replace(/\/+$/, "")
  const cleanPath = path.replace(/^\/+/, "")
  return `${cleanBase}/${cleanPath}`
}

export async function POST(request: Request) {
  try {
    const supabase = await createServerClient()
    const body = await request.json()

    const { chatId, message } = body

    if (!chatId || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "chatId e message são obrigatórios",
        },
        { status: 400 },
      )
    }

    const { data: config, error: configError } = await supabase.from("whatsapp_config").select("*").single()

    if (configError || !config || !config.server_url) {
      return NextResponse.json(
        {
          success: false,
          message: "Configure a URL da API do servidor WhatsApp primeiro",
        },
        { status: 400 },
      )
    }

    const targetUrl = joinUrl(config.server_url, "chats/send")

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatId, message }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        {
          success: false,
          message: "Erro ao enviar mensagem",
        },
        { status: response.status },
      )
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      ...data,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Não foi possível enviar a mensagem. Verifique a conexão com o servidor.",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
