import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("quick_replies")
      .select(
        `
        *,
        category:quick_reply_categories(id, name)
      `,
      )
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Erro ao buscar respostas rápidas:", error)
      return NextResponse.json({ success: false, message: "Erro ao buscar respostas rápidas" }, { status: 500 })
    }

    return NextResponse.json({ success: true, replies: data || [] })
  } catch (error) {
    console.error("Erro ao buscar respostas rápidas:", error)
    return NextResponse.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const cookieStore = await cookies()
    const userId = cookieStore.get("auth_user_id")?.value

    const { title, message, category_id } = body

    if (!title || !message || !category_id) {
      return NextResponse.json({ success: false, message: "Campos obrigatórios faltando" }, { status: 400 })
    }

    let createdByName = "Sistema"
    if (userId) {
      const { data: userData } = await supabase.from("perfis").select("nome").eq("id", userId).single()
      if (userData) {
        createdByName = userData.nome
      }
    }

    const { data, error } = await supabase
      .from("quick_replies")
      .insert({
        title,
        message,
        category_id,
        created_by_id: userId || null,
        created_by_name: createdByName,
      })
      .select()
      .single()

    if (error) {
      console.error("Erro ao criar resposta rápida:", error)
      return NextResponse.json({ success: false, message: "Erro ao criar resposta rápida" }, { status: 500 })
    }

    return NextResponse.json({ success: true, reply: data })
  } catch (error) {
    console.error("Erro ao criar resposta rápida:", error)
    return NextResponse.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { id, title, message, category_id } = body

    if (!id || !title || !message || !category_id) {
      return NextResponse.json({ success: false, message: "Campos obrigatórios faltando" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("quick_replies")
      .update({
        title,
        message,
        category_id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Erro ao atualizar resposta rápida:", error)
      return NextResponse.json({ success: false, message: "Erro ao atualizar resposta rápida" }, { status: 500 })
    }

    return NextResponse.json({ success: true, reply: data })
  } catch (error) {
    console.error("Erro ao atualizar resposta rápida:", error)
    return NextResponse.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, message: "ID é obrigatório" }, { status: 400 })
    }

    const { error } = await supabase.from("quick_replies").delete().eq("id", id)

    if (error) {
      console.error("Erro ao deletar resposta rápida:", error)
      return NextResponse.json({ success: false, message: "Erro ao deletar resposta rápida" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao deletar resposta rápida:", error)
    return NextResponse.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}
