import { NextResponse } from 'next/server'
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

// Proxy para o backend - POST /api/initialize + GET /api/qr
export async function GET() {
  try {
    const backendUrl = await getBackendUrl()
    
    if (!backendUrl) {
      return NextResponse.json({
        success: false,
        message: "Configure a URL da API do WhatsApp nas configurações"
      })
    }

    // 1. Primeiro inicializa a conexão
    const initUrl = `${backendUrl}/api/initialize`
    console.log('[API /qr] Inicializando:', initUrl)
    
    const initResponse = await fetch(initUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    
    if (!initResponse.ok) {
      const errorData = await initResponse.json().catch(() => ({}))
      return NextResponse.json({
        success: false,
        message: errorData.message || "Erro ao inicializar conexão"
      })
    }
    
    // Aguarda um pouco para o QR Code ser gerado
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 2. Busca o QR Code
    const qrUrl = `${backendUrl}/api/qr`
    console.log('[API /qr] Buscando QR:', qrUrl)
    
    const qrResponse = await fetch(qrUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    
    if (!qrResponse.ok) {
      const errorData = await qrResponse.json().catch(() => ({}))
      return NextResponse.json({
        success: false,
        message: errorData.message || "Erro ao obter QR Code"
      })
    }
    
    const data = await qrResponse.json()
    return NextResponse.json(data)
    
  } catch (error) {
    console.error('[API /qr] Erro:', error)
    return NextResponse.json({
      success: false,
      message: 'Erro ao obter QR Code'
    })
  }
}
