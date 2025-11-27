import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

// POST - Registrar atividade (viewing/typing)
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = await createServerClient()

    const body = await request.json()
    const { chatId, activityType } = body

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

    if (!chatId || !activityType) {
      return NextResponse.json(
        {
          success: false,
          message: "Dados incompletos",
        },
        { status: 400 },
      )
    }

    // Upsert atividade (atualiza se existe, cria se não existe)
    const { error } = await supabase.from("chat_activity").upsert(
      {
        chat_id: chatId,
        user_id: userId,
        user_name: userName,
        activity_type: activityType,
        last_activity_at: new Date().toISOString(),
      },
      {
        onConflict: "chat_id,user_id,activity_type",
      },
    )

    if (error) {
      console.error("[API] Erro ao registrar atividade:", error)
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error("[API] Erro ao registrar atividade:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}

// GET - Buscar atividades de um chat
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = await createServerClient()

    const { searchParams } = new URL(request.url)
    const chatId = searchParams.get("chatId")

    if (!chatId) {
      return NextResponse.json(
        {
          success: false,
          message: "chatId é obrigatório",
        },
        { status: 400 },
      )
    }

    // Buscar usuário atual para excluir da lista
    const currentUserId = cookieStore.get("auth_user_id")?.value

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
    await supabase.from("chat_activity").delete().lt("last_activity_at", fiveMinutesAgo)

    // Buscar atividades ativas (últimos 5 minutos)
    const { data: activities, error } = await supabase
      .from("chat_activity")
      .select("*")
      .eq("chat_id", chatId)
      .neq("user_id", currentUserId || "")
      .gte("last_activity_at", fiveMinutesAgo)

    if (error) {
      console.error("[API] Erro ao buscar atividades:", error)
      return NextResponse.json(
        {
          success: false,
          message: "Erro ao buscar atividades",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      activities: activities || [],
    })
  } catch (error) {
    console.error("[API] Erro ao buscar atividades:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}
