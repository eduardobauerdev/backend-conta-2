import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

// GET - Listar catálogos
export async function GET() {
  try {
    const supabase = await createServerClient()
    
    const { data, error } = await supabase
      .from('catalogos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      // Se a tabela não existir ou houver erro de relação, retorna array vazio
      // Códigos comuns: 42P01 (undefined_table), PGRST116 (relation not found)
      const isTableMissing = 
        error.code === '42P01' || 
        error.code === 'PGRST116' ||
        error.message?.toLowerCase().includes('does not exist') ||
        error.message?.toLowerCase().includes('relation') ||
        error.message?.toLowerCase().includes('not found')
      
      if (isTableMissing) {
        console.warn('Tabela catalogos não existe no banco de dados. Execute o script 011_create_catalog_tables.sql para criá-la.')
        return NextResponse.json([])
      }
      
      console.error('Erro Supabase ao buscar catálogos:', error)
      throw error
    }

    // Garante que sempre retorna um array
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Erro ao buscar catálogos:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar catálogos' },
      { status: 500 }
    )
  }
}

// POST - Criar catálogo
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const body = await request.json()
    
    const { nome, descricao, logo_url, cor_primaria, created_by_id, created_by_name } = body

    if (!nome) {
      return NextResponse.json(
        { error: 'Nome é obrigatório' },
        { status: 400 }
      )
    }

    // Gerar slug
    const { data: slugData, error: slugError } = await supabase
      .rpc('generate_catalog_slug', { p_nome: nome })

    if (slugError) {
      console.error('Erro ao gerar slug:', slugError)
      // Fallback: gerar slug simples
      const baseSlug = nome.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      const { data, error } = await supabase
        .from('catalogos')
        .insert({
          nome,
          slug: baseSlug + '-' + Date.now(),
          descricao,
          logo_url,
          cor_primaria,
          created_by_id,
          created_by_name,
        })
        .select()
        .single()

      if (error) throw error
      return NextResponse.json(data)
    }

    const { data, error } = await supabase
      .from('catalogos')
      .insert({
        nome,
        slug: slugData,
        descricao,
        logo_url,
        cor_primaria,
        created_by_id,
        created_by_name,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Erro ao criar catálogo:', error)
    return NextResponse.json(
      { error: 'Erro ao criar catálogo' },
      { status: 500 }
    )
  }
}

// PATCH - Atualizar catálogo
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const body = await request.json()
    
    const { id, nome, descricao, logo_url, cor_primaria, ativo } = body

    if (!id) {
      return NextResponse.json(
        { error: 'ID é obrigatório' },
        { status: 400 }
      )
    }

    const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() }
    if (nome !== undefined) updateData.nome = nome
    if (descricao !== undefined) updateData.descricao = descricao
    if (logo_url !== undefined) updateData.logo_url = logo_url
    if (cor_primaria !== undefined) updateData.cor_primaria = cor_primaria
    if (ativo !== undefined) updateData.ativo = ativo

    const { data, error } = await supabase
      .from('catalogos')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Erro ao atualizar catálogo:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar catálogo' },
      { status: 500 }
    )
  }
}

// DELETE - Excluir catálogo
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const body = await request.json()
    
    const { id } = body

    if (!id) {
      return NextResponse.json(
        { error: 'ID é obrigatório' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('catalogos')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao excluir catálogo:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir catálogo' },
      { status: 500 }
    )
  }
}
