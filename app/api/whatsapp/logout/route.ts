import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

function joinUrl(base: string, path: string): string {
  const cleanBase = base.replace(/\/+$/, "")
  const cleanPath = path.replace(/^\/+/, "")
  return `${cleanBase}/${cleanPath}`
}

export async function POST() {
  try {
    const supabase = await createServerClient()

    const { data: config, error: configError } = await supabase.from("whatsapp_config").select("*").single()

    if (configError || !config || !config.server_url) {
      console.error("[v0] ❌ Configuração do WhatsApp não encontrada:", configError)
      return NextResponse.json(
        {
          success: false,
          message: "Configure a URL do servidor WhatsApp nas configurações primeiro",
        },
        { status: 400 },
      )
    }

    const logoutUrl = joinUrl(config.server_url, "logout")

    const response = await fetch(logoutUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })

    const contentType = response.headers.get("content-type")
    if (contentType?.includes("text/html")) {
      const htmlText = await response.text()
      console.error("[v0] ❌ Backend retornou HTML em vez de JSON:", htmlText.substring(0, 200))
      return NextResponse.json(
        {
          success: false,
          message:
            "A rota /logout não existe no backend ou retornou erro. Verifique se o servidor está configurado corretamente.",
        },
        { status: 502 },
      )
    }

    if (!response.ok) {
      let errorMessage = "Erro ao desconectar do WhatsApp"

      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorMessage
        console.error("[v0] ❌ Erro do backend:", errorData)
      } catch {
        const errorText = await response.text()
        console.error("[v0] ❌ Resposta do backend (não-JSON):", errorText)
        errorMessage = "Resposta inválida do servidor"
      }

      return NextResponse.json({ success: false, message: errorMessage }, { status: response.status })
    }

    try {
      const data = await response.json()
      return NextResponse.json(data)
    } catch (error) {
      console.error("[v0] ❌ Resposta do backend não é JSON válido:", error)
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
