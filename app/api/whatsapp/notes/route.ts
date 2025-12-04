import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

// GET - Buscar nota atual de um chat
export async function GET(request: NextRequest) {
  try {
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

    const { data: note, error } = await supabase
      .from("chat_notes")
      .select("*")
      .eq("chat_id", chatId)
      .maybeSingle()

    if (error) {
      console.error("[API] Erro ao buscar nota:", error)
      return NextResponse.json(
        {
          success: false,
          message: "Erro ao buscar nota",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      note: note || null,
    })
  } catch (error) {
    console.error("[API] Erro ao buscar nota:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}

// POST - Criar ou atualizar nota
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
    const { chatId, chatName, content, previousContent } = body

    if (!chatId) {
      return NextResponse.json(
        {
          success: false,
          message: "chatId é obrigatório",
        },
        { status: 400 },
      )
    }

    // Verifica se já existe uma nota para este chat
    const { data: existingNote } = await supabase
      .from("chat_notes")
      .select("*")
      .eq("chat_id", chatId)
      .maybeSingle()

    let note;
    let action: "created" | "updated";

    if (existingNote) {
      // Atualizar nota existente
      const { data, error } = await supabase
        .from("chat_notes")
        .update({
          content: content,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingNote.id)
        .select()
        .single()

      if (error) {
        console.error("[API] Erro ao atualizar nota:", error)
        return NextResponse.json(
          {
            success: false,
            message: "Erro ao atualizar nota",
          },
          { status: 500 },
        )
      }

      note = data
      action = "updated"
    } else {
      // Criar nova nota
      const { data, error } = await supabase
        .from("chat_notes")
        .insert({
          chat_id: chatId,
          chat_name: chatName || chatId,
          content: content,
          created_by_id: userId,
          created_by_name: userName,
        })
        .select()
        .single()

      if (error) {
        console.error("[API] Erro ao criar nota:", error)
        return NextResponse.json(
          {
            success: false,
            message: "Erro ao criar nota",
          },
          { status: 500 },
        )
      }

      note = data
      action = "created"
    }

    // Registrar no histórico antigo (manter compatibilidade)
    const { error: historyError } = await supabase
      .from("chat_notes_history")
      .insert({
        chat_id: chatId,
        chat_name: chatName || chatId,
        action: action,
        previous_content: previousContent || null,
        new_content: content,
        performed_by_id: userId,
        performed_by_name: userName,
      })

    if (historyError) {
      console.error("[API] Erro ao registrar histórico:", historyError)
    }

    // Registrar no histórico unificado
    await supabase.from("chat_history").insert({
      chat_id: chatId,
      chat_name: chatName || chatId,
      event_type: action === "created" ? "note_created" : "note_updated",
      event_data: action === "created" 
        ? { content: content }
        : { previous_content: previousContent || null, new_content: content },
      performed_by_id: userId,
      performed_by_name: userName,
    })

    return NextResponse.json({
      success: true,
      note: note,
      action: action,
    })
  } catch (error) {
    console.error("[API] Erro ao salvar nota:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}
