import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

// GET - Buscar histórico de atribuições de um chat
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

    const { data: logs, error } = await supabase
      .from("assignment_logs")
      .select("*")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[API] Erro ao buscar logs:", error)
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
      logs: logs || [],
    })
  } catch (error) {
    console.error("[API] Erro ao buscar logs:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}
