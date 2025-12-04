import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

// GET - Buscar histórico completo de um chat
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()

    const { searchParams } = new URL(request.url)
    const chatId = searchParams.get("chatId")
    const type = searchParams.get("type") // Opcional: "notes", "assignments", "etiquetas"

    if (!chatId) {
      return NextResponse.json(
        {
          success: false,
          message: "chatId é obrigatório",
        },
        { status: 400 },
      )
    }

    let query = supabase
      .from("chat_history")
      .select("*")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: false })

    // Filtrar por tipo se especificado
    if (type === "notes") {
      query = query.in("event_type", ["note_created", "note_updated"])
    } else if (type === "assignments") {
      query = query.in("event_type", ["assignment_created", "assignment_transferred", "assignment_removed"])
    } else if (type === "etiquetas") {
      query = query.in("event_type", ["etiqueta_added", "etiqueta_removed"])
    }

    const { data: history, error } = await query

    if (error) {
      console.error("[API] Erro ao buscar histórico:", error)
      return NextResponse.json(
        {
          success: false,
          message: "Erro ao buscar histórico",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      history: history || [],
    })
  } catch (error) {
    console.error("[API] Erro ao buscar histórico:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}

// POST - Registrar evento no histórico
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const cookieStore = await cookies()

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

    const body = await request.json()
    const { chatId, chatName, eventType, eventData } = body

    if (!chatId || !eventType) {
      return NextResponse.json(
        {
          success: false,
          message: "chatId e eventType são obrigatórios",
        },
        { status: 400 },
      )
    }

    const { data, error } = await supabase
      .from("chat_history")
      .insert({
        chat_id: chatId,
        chat_name: chatName || chatId,
        event_type: eventType,
        event_data: eventData || {},
        performed_by_id: userId,
        performed_by_name: userName,
      })
      .select()
      .single()

    if (error) {
      console.error("[API] Erro ao registrar histórico:", error)
      return NextResponse.json(
        {
          success: false,
          message: "Erro ao registrar histórico",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      entry: data,
    })
  } catch (error) {
    console.error("[API] Erro ao registrar histórico:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}
