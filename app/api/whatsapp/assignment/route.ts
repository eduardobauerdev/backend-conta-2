import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

// GET - Buscar atribuição de um chat
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

    const { data: assignment, error } = await supabase
      .from("chat_assignments")
      .select("*")
      .eq("chat_id", chatId)
      .eq("status", "active")
      .maybeSingle()

    if (error) {
      console.error("[API] Erro ao buscar atribuição:", error)
      return NextResponse.json(
        {
          success: false,
          message: "Erro ao buscar atribuição",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      assignment: assignment || null,
    })
  } catch (error) {
    console.error("[API] Erro ao buscar atribuição:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}

// DELETE - Remover atribuição
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const cookieStore = await cookies()
    
    const userId = cookieStore.get("auth_user_id")?.value
    const userName = cookieStore.get("auth_user_name")?.value
    
    const body = await request.json()
    const { assignmentId, chatId } = body

    if (!assignmentId && !chatId) {
      return NextResponse.json(
        {
          success: false,
          message: "assignmentId ou chatId é obrigatório",
        },
        { status: 400 },
      )
    }

    let activeAssignment = null

    // Se assignmentId foi fornecido, busca por ID
    if (assignmentId) {
      const { data, error } = await supabase
        .from("chat_assignments")
        .select("*")
        .eq("id", assignmentId)
        .maybeSingle()
      
      if (error) {
        console.error("[API] Erro ao buscar atribuição por ID:", error)
      }
      activeAssignment = data
    }
    // Caso contrário, busca por chatId
    else if (chatId) {
      const { data, error } = await supabase
        .from("chat_assignments")
        .select("*")
        .eq("chat_id", chatId)
        .eq("status", "active")
        .maybeSingle()
      
      if (error) {
        console.error("[API] Erro ao buscar atribuição por chatId:", error)
      }
      activeAssignment = data
    }

    if (!activeAssignment) {
      return NextResponse.json(
        {
          success: false,
          message: "Atribuição não encontrada",
        },
        { status: 404 },
      )
    }

    // Deleta o registro da tabela
    const { error: deleteError } = await supabase
      .from("chat_assignments")
      .delete()
      .eq("id", activeAssignment.id)

    if (deleteError) {
      console.error("[API] Erro ao deletar atribuição:", deleteError)
      return NextResponse.json(
        {
          success: false,
          message: "Erro ao remover atribuição",
        },
        { status: 500 },
      )
    }

    // Registra o log de auditoria (não bloqueia se falhar)
    try {
      // Histórico unificado
      await supabase.from("chat_history").insert({
        chat_id: activeAssignment.chat_id,
        chat_name: activeAssignment.chat_name,
        event_type: "assignment_removed",
        event_data: {
          removed_user_id: activeAssignment.assigned_to_id,
          removed_user_name: activeAssignment.assigned_to_name,
        },
        performed_by_id: userId || activeAssignment.assigned_to_id,
        performed_by_name: userName || activeAssignment.assigned_to_name,
      })
    } catch (logError) {
      console.error("[API] Erro ao registrar log:", logError)
    }

    return NextResponse.json({
      success: true,
      message: "Atribuição removida com sucesso",
    })
  } catch (error) {
    console.error("[API] Erro ao remover atribuição:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}
