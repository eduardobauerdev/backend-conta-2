import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

// GET - Buscar histórico completo de um chat (incluindo conversões/desconversões)
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

    // Buscar histórico normal da tabela chat_history
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

    // Helper para buscar cores dos cargos dos usuários
    const getUserColors = async (userIds: string[]) => {
      if (!userIds || userIds.length === 0) return {}
      
      const uniqueIds = Array.from(new Set(userIds)).filter(Boolean)
      const { data: profiles } = await supabase
        .from("perfis")
        .select("id, cargo")
        .in("id", uniqueIds)

      if (!profiles) return {}

      const cargos = Array.from(new Set(profiles.map(p => p.cargo).filter(Boolean)))
      const { data: cargosData } = await supabase
        .from("cargos")
        .select("nome, cor")
        .in("nome", cargos)

      const coresMap: Record<string, string> = {}
      cargosData?.forEach(c => coresMap[c.nome] = c.cor)

      const usersColorsMap: Record<string, string> = {}
      profiles.forEach(p => {
        usersColorsMap[p.id] = p.cargo ? coresMap[p.cargo] : "#6b7280"
      })

      return usersColorsMap
    }

    // Coletar todos os IDs de usuários do histórico para buscar cores uma única vez
    const allUserIds = history?.flatMap(entry => {
      const ids: string[] = []
      if (entry.performed_by_id) ids.push(entry.performed_by_id)
      if (entry.event_data?.assigned_to_id) ids.push(entry.event_data.assigned_to_id)
      if (entry.event_data?.from_user_id) ids.push(entry.event_data.from_user_id)
      if (entry.event_data?.to_user_id) ids.push(entry.event_data.to_user_id)
      if (entry.event_data?.removed_user_id) ids.push(entry.event_data.removed_user_id)
      return ids
    }) || []

    const userColors = await getUserColors(allUserIds)

    // Enriquecer histórico com cores dos cargos
    const enrichedHistory = (history || []).map(entry => ({
      ...entry,
      event_data: {
        ...entry.event_data,
        performed_by_cor: userColors[entry.performed_by_id],
        assigned_to_cor: userColors[entry.event_data?.assigned_to_id],
        from_user_cor: userColors[entry.event_data?.from_user_id],
        to_user_cor: userColors[entry.event_data?.to_user_id],
        removed_user_cor: userColors[entry.event_data?.removed_user_id],
      }
    }))

    // Buscar UUID do chat para cruzar com leads
    const { data: chatData } = await supabase
      .from("chats")
      .select("uuid")
      .eq("id", chatId)
      .single()

    let allHistory = [...enrichedHistory]

    // Se temos UUID do chat, buscar conversões/desconversões do lead vinculado
    if (chatData?.uuid) {
      // Buscar lead vinculado ao chat
      const { data: leadData } = await supabase
        .from("leads")
        .select("id")
        .eq("chat_uuid", chatData.uuid)
        .single()

      if (leadData?.id) {
        // Buscar conversões deste lead
        const { data: conversoes } = await supabase
          .from("conversoes")
          .select("*")
          .eq("lead_id", leadData.id)
          .order("created_at", { ascending: false })

        // Buscar desconversões deste lead
        const { data: desconversoes } = await supabase
          .from("desconversoes")
          .select("*")
          .eq("lead_id", leadData.id)
          .order("created_at", { ascending: false })

        // Transformar conversões em formato de histórico
        if (conversoes && conversoes.length > 0) {
          const conversaoEntries = conversoes.map((conv) => ({
            id: conv.id,
            chat_id: chatId,
            chat_name: conv.lead_nome,
            event_type: "lead_converted",
            event_data: {
              lead_id: conv.lead_id,
              lead_nome: conv.lead_nome,
              lead_cidade: conv.lead_cidade,
              lead_interesse: conv.lead_interesse,
              lead_temperatura: conv.lead_temperatura,
              valor: conv.valor,
              valor_formatado: new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(conv.valor),
              performed_by_cor: userColors[conv.convertido_por_id],
            },
            performed_by_id: conv.convertido_por_id,
            performed_by_name: conv.convertido_por_nome,
            created_at: conv.created_at,
          }))
          allHistory = [...allHistory, ...conversaoEntries]
        }

        // Transformar desconversões em formato de histórico
        if (desconversoes && desconversoes.length > 0) {
          const desconversaoEntries = desconversoes.map((desc) => ({
            id: desc.id,
            chat_id: chatId,
            chat_name: desc.lead_nome,
            event_type: "lead_unconverted",
            event_data: {
              lead_id: desc.lead_id,
              lead_nome: desc.lead_nome,
              lead_cidade: desc.lead_cidade,
              lead_interesse: desc.lead_interesse,
              lead_temperatura: desc.lead_temperatura,
              motivo: desc.motivo,
              performed_by_cor: userColors[desc.desconvertido_por_id],
            },
            performed_by_id: desc.desconvertido_por_id,
            performed_by_name: desc.desconvertido_por_nome,
            created_at: desc.created_at,
          }))
          allHistory = [...allHistory, ...desconversaoEntries]
        }

        // Reordenar tudo por data
        allHistory.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      }
    }

    return NextResponse.json({
      success: true,
      history: allHistory,
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
