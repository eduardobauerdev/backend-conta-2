import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

// Helper para buscar URL do backend do banco
async function getBackendUrl(): Promise<string | null> {
  const supabase = await createServerClient()
  const { data } = await supabase
    .from('whatsapp_config')
    .select('server_url')
    .limit(1)
    .single()
  
  return data?.server_url?.replace(/\/$/, "") || null
}

// Proxy para o backend - POST /api/chats/send
export async function POST(request: Request) {
  try {
    const backendUrl = await getBackendUrl()
    
    if (!backendUrl) {
      return NextResponse.json({
        success: false,
        message: "Configure a URL da API do WhatsApp nas configurações",
      })
    }

    const body = await request.json()
    const { chatId, message } = body

    if (!chatId || !message) {
      return NextResponse.json({
        success: false,
        message: "chatId e message são obrigatórios",
      }, { status: 400 })
    }

    const targetUrl = `${backendUrl}/api/chats/send`

    console.log("[API /send] Enviando para:", targetUrl)

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId, message }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[API /send] Erro:", errorText)
      
      return NextResponse.json({
        success: false,
        message: "Erro ao enviar mensagem",
      })
    }

    const data = await response.json()
    return NextResponse.json(data)
    
  } catch (error) {
    console.error("[API /send] Erro:", error)
    return NextResponse.json({
      success: false,
      message: "Não foi possível enviar a mensagem",
    })
  }
}
