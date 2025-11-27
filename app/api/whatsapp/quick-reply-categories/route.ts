import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from("quick_reply_categories").select("*").order("name", { ascending: true })

    if (error) {
      console.error("Erro ao buscar categorias:", error)
      return NextResponse.json({ success: false, message: "Erro ao buscar categorias" }, { status: 500 })
    }

    return NextResponse.json({ success: true, categories: data || [] })
  } catch (error) {
    console.error("Erro ao buscar categorias:", error)
    return NextResponse.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const cookieStore = await cookies()
    const userId = cookieStore.get("auth_user_id")?.value

    const { name } = body

    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, message: "Nome da categoria é obrigatório" }, { status: 400 })
    }

    // Buscar nome do usuário
    let createdByName = "Sistema"
    if (userId) {
      const { data: userData } = await supabase.from("perfis").select("nome").eq("id", userId).single()
      if (userData) {
        createdByName = userData.nome
      }
    }

    const { data, error } = await supabase
      .from("quick_reply_categories")
      .insert({
        name: name.trim(),
        created_by_id: userId || null,
        created_by_name: createdByName,
      })
      .select()
      .single()

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ success: false, message: "Categoria já existe" }, { status: 400 })
      }
      console.error("Erro ao criar categoria:", error)
      return NextResponse.json({ success: false, message: "Erro ao criar categoria" }, { status: 500 })
    }

    return NextResponse.json({ success: true, category: data })
  } catch (error) {
    console.error("Erro ao criar categoria:", error)
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

    // Verificar se há respostas rápidas usando esta categoria
    const { data: replies } = await supabase.from("quick_replies").select("id").eq("category_id", id).limit(1)

    if (replies && replies.length > 0) {
      return NextResponse.json(
        { success: false, message: "Não é possível deletar categoria com respostas rápidas associadas" },
        { status: 400 },
      )
    }

    const { error } = await supabase.from("quick_reply_categories").delete().eq("id", id)

    if (error) {
      console.error("Erro ao deletar categoria:", error)
      return NextResponse.json({ success: false, message: "Erro ao deletar categoria" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao deletar categoria:", error)
    return NextResponse.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}
