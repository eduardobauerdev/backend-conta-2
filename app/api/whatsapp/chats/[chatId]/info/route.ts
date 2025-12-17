import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest, { params }: { params: { chatId: string } }) {
  try {
    const supabase = await createServerClient()

    // Buscar configuração do servidor WhatsApp
    const { data: config } = await supabase.from("whatsapp_config").select("server_url").single()

    if (!config?.server_url) {
      return NextResponse.json({ success: false, message: "Servidor WhatsApp não configurado" }, { status: 400 })
    }

    // Fazer requisição para o Railway
    const response = await fetch(`${config.server_url}/api/chats/${encodeURIComponent(params.chatId)}/info`)

    if (!response.ok) {
      throw new Error("Falha ao buscar informações do chat")
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("[API] Erro ao buscar info do chat:", error)
    return NextResponse.json({ success: false, message: "Erro ao buscar informações do chat" }, { status: 500 })
  }
}
