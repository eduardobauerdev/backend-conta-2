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

    const { name, phone } = body

    if (!name || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Nome e telefone são obrigatórios",
        },
        { status: 400 },
      )
    }

    // Get WhatsApp server config
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

    const formattedPhone = phone.replace(/\D/g, "") // Remove non-digits
    const chatId = formattedPhone.includes("@") ? formattedPhone : `${formattedPhone}@c.us`

    const targetUrl = joinUrl(config.server_url, "api/chats/send")

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId,
        message: `Olá ${name}! 👋`,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[API] Erro ao criar chat:", errorText)
      return NextResponse.json(
        {
          success: false,
          message: "Erro ao iniciar conversa. Verifique se o número está correto e com WhatsApp ativo.",
        },
        { status: response.status },
      )
    }

    const data = await response.json()

    await supabase.from("whatsapp_chats").upsert(
      {
        chat_id: chatId,
        name: name,
        phone: formattedPhone,
        unread_count: 0,
        last_message: `Olá ${name}! 👋`,
        last_message_timestamp: new Date().toISOString(),
        is_group: false,
      },
      { onConflict: "chat_id" },
    )

    return NextResponse.json({
      success: true,
      chatId: chatId,
      message: "Conversa iniciada com sucesso!",
    })
  } catch (error) {
    console.error("[API] Erro ao criar chat:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Não foi possível criar a conversa. Verifique a conexão com o servidor.",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
