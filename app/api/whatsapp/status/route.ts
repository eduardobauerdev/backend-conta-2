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

// Proxy para o backend - GET /api/status
export async function GET() {
  try {
    const backendUrl = await getBackendUrl()
    
    if (!backendUrl) {
      return NextResponse.json({
        success: false,
        connected: false,
        message: "Configure a URL da API do WhatsApp nas configurações"
      })
    }

    const targetUrl = `${backendUrl}/api/status`
    
    console.log("[API /status] Verificando:", targetUrl)

    const response = await fetch(targetUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        connected: false,
        message: "Backend indisponível"
      })
    }

    const data = await response.json()
    return NextResponse.json(data)
    
  } catch (error) {
    console.error("[API /status] Erro:", error)
    return NextResponse.json({
      success: false,
      connected: false,
      message: "Erro ao verificar status"
    })
  }
}
