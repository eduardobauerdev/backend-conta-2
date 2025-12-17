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

// Proxy para o backend - GET /api/chats/:chatId/messages
export async function GET(request: Request, { params }: { params: Promise<{ chatId: string }> }) {
  try {
    const backendUrl = await getBackendUrl()
    
    if (!backendUrl) {
      return NextResponse.json({
        success: false,
        message: "Configure a URL da API do WhatsApp nas configurações",
        messages: [],
      })
    }

    const { chatId } = await params
    const { searchParams } = new URL(request.url)
    const queryString = searchParams.toString()
    
    const targetUrl = `${backendUrl}/api/chats/${chatId}/messages${queryString ? `?${queryString}` : ""}`

    console.log("[API /messages] Buscando:", targetUrl)

    const response = await fetch(targetUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[API /messages] Erro:", errorText)
      
      return NextResponse.json({
        success: false,
        message: "Erro ao carregar mensagens do backend",
        messages: [],
      })
    }

    const data = await response.json()
    return NextResponse.json(data)
    
  } catch (error) {
    console.error("[API /messages] Erro:", error)
    return NextResponse.json({
      success: false,
      message: "Não foi possível conectar ao servidor WhatsApp",
      messages: [],
    })
  }
}
