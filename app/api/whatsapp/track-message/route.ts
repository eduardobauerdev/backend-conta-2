import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

// POST - Rastrear mensagem enviada
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const cookieStore = await cookies()

    const body = await request.json()
    const { messageId, chatId, messageBody, messageType = "text" } = body

    // Buscar usuário atual do cookie
    const userId = cookieStore.get("auth_user_id")?.value
    const userName = cookieStore.get("auth_user_name")?.value

    if (!userId || !userName) {
      return NextResponse.json(
        {
          success: false,
          message: "Usuário não autenticado",
        },
        { status: 401 },
      )
    }

    if (!messageId || !chatId) {
      return NextResponse.json(
        {
          success: false,
          message: "Dados incompletos",
        },
        { status: 400 },
      )
    }

    // Salvar rastreamento da mensagem
    const { error } = await supabase.from("message_tracking").insert({
      message_id: messageId,
      chat_id: chatId,
      sent_by_id: userId,
      sent_by_name: userName,
      message_body: messageBody,
      message_type: messageType,
    })

    if (error) {
      console.error("[API] Erro ao rastrear mensagem:", error)
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error("[API] Erro ao rastrear mensagem:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}
