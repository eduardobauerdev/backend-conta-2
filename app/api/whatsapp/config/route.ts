import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createServerClient()

    const { data, error } = await supabase.from("whatsapp_config").select("*").single()

    if (error && error.code !== "PGRST116") {
      throw error
    }

    return NextResponse.json({
      success: true,
      config: data || null,
    })
  } catch (error) {
    console.error("Erro ao buscar configuração:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao buscar configuração",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createServerClient()
    const body = await request.json()

    let { server_url } = body

    if (!server_url) {
      return NextResponse.json(
        {
          success: false,
          message: "URL do servidor é obrigatória",
        },
        { status: 400 },
      )
    }

    server_url = server_url.replace(/\/+$/, "")

    // Verificar se já existe configuração
    const { data: existing } = await supabase.from("whatsapp_config").select("*").single()

    if (existing) {
      // Atualizar
      const { error } = await supabase.from("whatsapp_config").update({ server_url }).eq("id", existing.id)

      if (error) throw error
    } else {
      // Criar
      const { error } = await supabase.from("whatsapp_config").insert({ server_url })

      if (error) throw error
    }

    return NextResponse.json({
      success: true,
      message: "Configuração salva com sucesso",
    })
  } catch (error) {
    console.error("Erro ao salvar configuração:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao salvar configuração",
      },
      { status: 500 },
    )
  }
}
