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

// Proxy para o backend - POST /api/logout
export async function POST() {
  try {
    const backendUrl = await getBackendUrl()
    
    if (!backendUrl) {
      return NextResponse.json({
        success: false,
        message: "Configure a URL da API do WhatsApp nas configurações"
      })
    }

    const logoutUrl = `${backendUrl}/api/logout`

    console.log("[API /logout] Desconectando:", logoutUrl)

    const response = await fetch(logoutUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json({
        success: false,
        message: errorData.message || "Erro ao desconectar"
      })
    }

    const data = await response.json()
    return NextResponse.json(data)
    
  } catch (error) {
    console.error("[API /logout] Erro:", error)
    return NextResponse.json({
      success: false,
      message: "Erro ao desconectar do WhatsApp"
    })
  }
}

      return NextResponse.json({ success: false, message: "Resposta inválida do servidor" }, { status: 500 })
    }
  } catch (error) {
    console.error("[v0] ❌ Erro ao desconectar WhatsApp:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao conectar com o servidor. Verifique se a URL está correta.",
      },
      { status: 500 },
    )
  }
}
