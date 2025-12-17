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

export async function POST() {
  try {
    const backendUrl = await getBackendUrl()

    if (!backendUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "Configure a URL da API do WhatsApp nas configurações",
        },
        { status: 400 },
      )
    }

    const response = await fetch(`${backendUrl}/api/logout`, {
      method: "POST",
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Erro ao desconectar")
    }

    return NextResponse.json({
      success: true,
      message: "WhatsApp desconectado com sucesso",
    })
  } catch (error) {
    console.error("Erro ao desconectar WhatsApp:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Erro ao desconectar WhatsApp",
      },
      { status: 500 },
    )
  }
}
