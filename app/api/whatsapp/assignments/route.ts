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

// POST - Atribuir ou transferir conversa
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = await createServerClient()

    const body = await request.json()
    const { chatId, chatName, assignToId, assignToName, notes, autoAssign = false } = body

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

    if (!chatId || !chatName || !assignToId || !assignToName) {
      return NextResponse.json(
        {
          success: false,
          message: "Dados incompletos",
        },
        { status: 400 },
      )
    }

    const { data: previousAssignment, error: fetchError } = await supabase
      .from("chat_assignments")
      .select("*")
      .eq("chat_id", chatId)
      .eq("status", "active")
      .maybeSingle()

    if (fetchError) {
      console.error("Erro ao buscar atribuição anterior:", fetchError)
    }

    if (previousAssignment) {
      // Histórico unificado - transferência
      await supabase.from("chat_history").insert({
        chat_id: chatId,
        chat_name: chatName,
        event_type: "assignment_transferred",
        event_data: {
          from_user_id: previousAssignment.assigned_to_id,
          from_user_name: previousAssignment.assigned_to_name,
          to_user_id: assignToId,
          to_user_name: assignToName,
        },
        performed_by_id: userId,
        performed_by_name: userName,
      })

      const { error: deleteError } = await supabase
        .from("chat_assignments")
        .delete()
        .eq("chat_id", chatId)
        .eq("status", "active")

      if (deleteError) {
        console.error("Erro ao remover atribuição anterior:", deleteError)
        return NextResponse.json(
          {
            success: false,
            message: "Erro ao remover atribuição anterior",
          },
          { status: 500 },
        )
      }
    }

    const newAssignmentData = {
      chat_id: chatId,
      chat_name: chatName,
      assigned_to_id: assignToId,
      assigned_to_name: assignToName,
      assigned_by_id: autoAssign ? null : userId,
      assigned_by_name: autoAssign ? null : userName,
      notes: notes || null,
      status: "active",
      assigned_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { data: newAssignment, error } = await supabase
      .from("chat_assignments")
      .insert(newAssignmentData)
      .select()
      .single()

    if (error) {
      console.error("Erro ao criar atribuição:", error)
      return NextResponse.json(
        {
          success: false,
          message: `Erro ao atribuir conversa: ${error.message}`,
        },
        { status: 500 },
      )
    }

    if (!previousAssignment) {
      // Histórico unificado - nova atribuição
      await supabase.from("chat_history").insert({
        chat_id: chatId,
        chat_name: chatName,
        event_type: "assignment_created",
        event_data: {
          assigned_to_id: assignToId,
          assigned_to_name: assignToName,
        },
        performed_by_id: userId,
        performed_by_name: userName,
      })
    }

    return NextResponse.json({
      success: true,
      assignment: newAssignment,
    })
  } catch (error) {
    console.error("Erro geral ao atribuir conversa:", error)
    return NextResponse.json(
      {
        success: false,
        message: `Erro interno do servidor: ${error instanceof Error ? error.message : "Erro desconhecido"}`,
      },
      { status: 500 },
    )
  }
}

// DELETE - Liberar conversa (marcar como completa)
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createServerClient()

    const { searchParams } = new URL(request.url)
    const chatIdParam = searchParams.get("chatId")
    
    // Tenta ler do body também (para compatibilidade com POST/DELETE em JSON)
    let body: any = {}
    try {
      body = await request.json()
    } catch {
      // Ignore parse errors
    }

    const chatId = chatIdParam || body.chatId
    const assignmentId = body.assignmentId

    if (!chatId && !assignmentId) {
      return NextResponse.json(
        {
          success: false,
          message: "chatId ou assignmentId é obrigatório",
        },
        { status: 400 },
      )
    }

    let activeAssignment = null

    // Se assignmentId foi fornecido, busca por ID
    if (assignmentId) {
      const { data } = await supabase
        .from("chat_assignments")
        .select("*")
        .eq("id", assignmentId)
        .maybeSingle()
      activeAssignment = data
    } 
    // Caso contrário, busca por chatId
    else if (chatId) {
      const { data } = await supabase
        .from("chat_assignments")
        .select("*")
        .eq("chat_id", chatId)
        .eq("status", "active")
        .maybeSingle()
      activeAssignment = data
    }

    if (activeAssignment) {
      const { error } = await supabase
        .from("chat_assignments")
        .update({ status: "completed", updated_at: new Date().toISOString() })
        .eq("id", activeAssignment.id)

      if (error) {
        console.error("[API] Erro ao liberar conversa:", error)
        return NextResponse.json(
          {
            success: false,
            message: "Erro ao liberar conversa",
          },
          { status: 500 },
        )
      }

      // Histórico unificado - liberação
      await supabase.from("chat_history").insert({
        chat_id: activeAssignment.chat_id,
        chat_name: activeAssignment.chat_name,
        event_type: "assignment_removed",
        event_data: {
          removed_user_id: activeAssignment.assigned_to_id,
          removed_user_name: activeAssignment.assigned_to_name,
        },
        performed_by_id: activeAssignment.assigned_to_id,
        performed_by_name: activeAssignment.assigned_to_name,
      })
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error("[API] Erro ao liberar conversa:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}
