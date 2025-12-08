import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

// POST - Criar/Atualizar atribuição
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const cookieStore = await cookies()
    
    const body = await request.json()
    const { chatId, chatName, assignToId, assignToName, assignedById, assignedByName } = body

    if (!chatId || !assignToId || !assignToName) {
      return NextResponse.json(
        {
          success: false,
          message: "chatId, assignToId e assignToName são obrigatórios",
        },
        { status: 400 },
      )
    }

    // Verifica se já existe uma atribuição ativa para este chat
    const { data: existingAssignment } = await supabase
      .from("chat_assignments")
      .select("*")
      .eq("chat_id", chatId)
      .eq("status", "active")
      .maybeSingle()

    // Se já existe, verifica se é o mesmo usuário
    if (existingAssignment) {
      // Se já está atribuído ao mesmo usuário, retorna sem fazer nada (não salva no histórico)
      if (existingAssignment.assigned_to_id === assignToId) {
        return NextResponse.json({
          success: false,
          message: `Este chat já está atribuído a ${assignToName}`,
          alreadyAssigned: true,
        })
      }
      
      // Se é um usuário diferente, atualiza
      const { error: updateError } = await supabase
        .from("chat_assignments")
        .update({
          assigned_to_id: assignToId,
          assigned_to_name: assignToName,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingAssignment.id)

      if (updateError) {
        console.error("[API] Erro ao atualizar atribuição:", updateError)
        return NextResponse.json(
          {
            success: false,
            message: "Erro ao atualizar atribuição",
          },
          { status: 500 },
        )
      }

      // Registra no histórico
      try {
        const { error: historyError } = await supabase.from("chat_history").insert({
          chat_id: chatId,
          chat_name: chatName || chatId,
          event_type: "assignment_transferred",
          event_data: {
            from_user_id: existingAssignment.assigned_to_id,
            from_user_name: existingAssignment.assigned_to_name,
            to_user_id: assignToId,
            to_user_name: assignToName,
          },
          performed_by_id: assignedById,
          performed_by_name: assignedByName || "Sistema",
        })
        
        if (historyError) {
          console.error("[API] Erro ao registrar histórico (assignment_transferred):", historyError)
        } else {
          console.log("[API] Histórico registrado com sucesso (assignment_transferred)")
        }
      } catch (logError) {
        console.error("[API] Erro ao registrar histórico:", logError)
      }

      return NextResponse.json({
        success: true,
        message: "Atribuição atualizada com sucesso",
      })
    }

    // Se não existe, cria nova
    const { error: insertError } = await supabase
      .from("chat_assignments")
      .insert({
        chat_id: chatId,
        chat_name: chatName || chatId,
        assigned_to_id: assignToId,
        assigned_to_name: assignToName,
        assigned_by_id: assignedById,
        assigned_by_name: assignedByName || "Sistema",
        status: "active",
      })

    if (insertError) {
      console.error("[API] Erro ao criar atribuição:", insertError)
      return NextResponse.json(
        {
          success: false,
          message: "Erro ao criar atribuição",
        },
        { status: 500 },
      )
    }

    // Registra no histórico
    try {
      const { error: historyError } = await supabase.from("chat_history").insert({
        chat_id: chatId,
        chat_name: chatName || chatId,
        event_type: "assignment_created",
        event_data: {
          user_id: assignToId,
          user_name: assignToName,
        },
        performed_by_id: assignedById,
        performed_by_name: assignedByName || "Sistema",
      })
      
      if (historyError) {
        console.error("[API] Erro ao registrar histórico (assignment_created):", historyError)
      } else {
        console.log("[API] Histórico registrado com sucesso (assignment_created)")
      }
    } catch (logError) {
      console.error("[API] Erro ao registrar histórico:", logError)
    }

    return NextResponse.json({
      success: true,
      message: "Atribuição criada com sucesso",
    })
  } catch (error) {
    console.error("[API] Erro ao processar atribuição:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}

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
