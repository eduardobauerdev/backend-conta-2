import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

// GET - Buscar histórico de notas de um chat
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

    const { data: history, error } = await supabase
      .from("chat_notes_history")
      .select("*")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[API] Erro ao buscar histórico de notas:", error)
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
    console.error("[API] Erro ao buscar histórico de notas:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}
