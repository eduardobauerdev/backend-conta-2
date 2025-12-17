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
    const formData = await request.formData()

    const chatId = formData.get("chatId") as string
    const file = formData.get("file") as File
    const caption = formData.get("caption") as string | null

    if (!chatId || !file) {
      return NextResponse.json(
        {
          success: false,
          message: "chatId e file são obrigatórios",
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

    const arrayBuffer = await file.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString("base64")

    const targetUrl = joinUrl(config.server_url, "api/chats/send-media")

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: chatId,
        type: file.type.startsWith("image/")
          ? "image"
          : file.type.startsWith("video/")
            ? "video"
            : file.type.startsWith("audio/")
              ? "audio"
              : "document",
        mediaUrl: `data:${file.type};base64,${base64}`,
        caption: caption || undefined,
        fileName: file.name,
        mimetype: file.type,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        {
          success: false,
          message: errorData.message || "Erro ao enviar mídia",
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
        message: "Não foi possível enviar a mídia. Verifique a conexão com o servidor.",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
