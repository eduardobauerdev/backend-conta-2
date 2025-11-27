import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

function joinUrl(base: string, path: string): string {
  const cleanBase = base.replace(/\/+$/, "")
  const cleanPath = path.replace(/^\/+/, "")
  return `${cleanBase}/${cleanPath}`
}

export async function GET() {
  try {
    const supabase = await createServerClient()

    const { data: config, error: configError } = await supabase.from("whatsapp_config").select("*").single()

    if (configError || !config || !config.server_url) {
      return NextResponse.json(
        {
          success: true,
          message: "Configure a URL da API do servidor WhatsApp primeiro",
          connected: false,
          phone: null,
          qr: null,
          needsConfiguration: true,
        },
        { status: 200 },
      )
    }

    const targetUrl = joinUrl(config.server_url, "status")

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    try {
      const response = await fetch(targetUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text()

        return NextResponse.json(
          {
            success: true,
            message:
              "O servidor WhatsApp está temporariamente indisponível. Verifique se o serviço está ativo no Railway.",
            connected: false,
            phone: null,
            qr: null,
            error: `Status ${response.status}: ${errorText}`,
            needsConfiguration: true,
          },
          { status: 200 },
        )
      }

      const data = await response.json()

      const wasConnected = config.is_connected
      const isConnected = data.connected

      if (wasConnected !== isConnected) {
        await supabase
          .from("whatsapp_config")
          .update({
            is_connected: isConnected,
            connected_phone: data.phone,
            connected_at: isConnected ? new Date().toISOString() : null,
          })
          .eq("id", config.id)
      }

      return NextResponse.json({
        success: true,
        connected: data.connected,
        phone: data.phone,
        qr: data.qr,
        status: data.status,
        device: data.device,
        serverUrl: config.server_url,
      })
    } catch (fetchError) {
      clearTimeout(timeoutId)

      if (fetchError instanceof Error) {
        if (fetchError.name === "AbortError") {
          return NextResponse.json(
            {
              success: true,
              message: "O servidor WhatsApp não respondeu em tempo hábil. Verifique se o serviço está ativo.",
              connected: false,
              phone: null,
              qr: null,
              error: "Timeout após 10 segundos",
              needsConfiguration: true,
            },
            { status: 200 },
          )
        }

        return NextResponse.json(
          {
            success: true,
            message:
              "Não foi possível conectar ao servidor WhatsApp. Verifique a URL configurada e se o serviço está ativo no Railway.",
            connected: false,
            phone: null,
            qr: null,
            error: fetchError.message,
            needsConfiguration: true,
          },
          { status: 200 },
        )
      }

      throw fetchError
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: true,
        message: "WhatsApp não configurado",
        connected: false,
        phone: null,
        qr: null,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 200 },
    )
  }
}
