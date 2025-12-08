import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

// Função para validar UUID
function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

// Função para sanitizar string (previne XSS)
function sanitizeString(str: string | null | undefined): string {
  if (!str) return ''
  return str.trim().replace(/<[^>]*>/g, '') // Remove tags HTML
}

// GET - Listar produtos de um catálogo
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { searchParams } = new URL(request.url)
    const catalogo_id = searchParams.get('catalogo_id')

    if (!catalogo_id) {
      return NextResponse.json(
        { error: 'catalogo_id é obrigatório' },
        { status: 400 }
      )
    }

    // Validar UUID do catálogo
    if (!isValidUUID(catalogo_id)) {
      return NextResponse.json(
        { error: 'catalogo_id inválido' },
        { status: 400 }
      )
    }

    // Buscar produtos com tipo e imagem principal
    const { data: produtos, error } = await supabase
      .from('produtos')
      .select(`
        *,
        tipo:produto_tipos(id, nome),
        imagens:produto_imagens(id, url, ordem, principal)
      `)
      .eq('catalogo_id', catalogo_id)
      .order('ordem', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(produtos)
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar produtos' },
      { status: 500 }
    )
  }
}

// POST - Criar produto
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const body = await request.json()
    
    const { 
      catalogo_id, 
      tipo_id, 
      nome, 
      descricao, 
      preco, 
      preco_promocional,
      ativo,
      destaque,
      ordem,
      created_by_id,
      created_by_name,
      imagens // array de URLs das imagens
    } = body

    if (!catalogo_id || !nome) {
      return NextResponse.json(
        { error: 'catalogo_id e nome são obrigatórios' },
        { status: 400 }
      )
    }

    // Validar UUIDs
    if (!isValidUUID(catalogo_id)) {
      return NextResponse.json(
        { error: 'catalogo_id inválido' },
        { status: 400 }
      )
    }

    if (tipo_id && !isValidUUID(tipo_id)) {
      return NextResponse.json(
        { error: 'tipo_id inválido' },
        { status: 400 }
      )
    }

    // Sanitizar strings
    const nomeSanitizado = sanitizeString(nome)
    const descricaoSanitizada = sanitizeString(descricao)

    if (!nomeSanitizado) {
      return NextResponse.json(
        { error: 'Nome não pode estar vazio' },
        { status: 400 }
      )
    }

    // Validar números
    if (preco !== undefined && (typeof preco !== 'number' || preco < 0)) {
      return NextResponse.json(
        { error: 'Preço inválido' },
        { status: 400 }
      )
    }

    if (preco_promocional !== undefined && (typeof preco_promocional !== 'number' || preco_promocional < 0)) {
      return NextResponse.json(
        { error: 'Preço promocional inválido' },
        { status: 400 }
      )
    }

    // Criar produto
    const { data: produto, error: produtoError } = await supabase
      .from('produtos')
      .insert({
        catalogo_id,
        tipo_id,
        nome: nomeSanitizado,
        descricao: descricaoSanitizada,
        preco,
        preco_promocional,
        ativo: ativo ?? true,
        destaque: destaque ?? false,
        ordem: ordem ?? 0,
        created_by_id,
        created_by_name,
      })
      .select()
      .single()

    if (produtoError) throw produtoError

    // Se tiver imagens, inserir
    if (imagens && imagens.length > 0) {
      const imagensParaInserir = imagens.map((url: string, index: number) => ({
        produto_id: produto.id,
        url,
        ordem: index,
        principal: index === 0,
      }))

      const { error: imagensError } = await supabase
        .from('produto_imagens')
        .insert(imagensParaInserir)

      if (imagensError) {
        console.error('Erro ao inserir imagens:', imagensError)
      }
    }

    // Buscar produto com imagens
    const { data: produtoCompleto, error: fetchError } = await supabase
      .from('produtos')
      .select(`
        *,
        tipo:produto_tipos(id, nome),
        imagens:produto_imagens(id, url, ordem, principal)
      `)
      .eq('id', produto.id)
      .single()

    if (fetchError) throw fetchError

    return NextResponse.json(produtoCompleto)
  } catch (error) {
    console.error('Erro ao criar produto:', error)
    return NextResponse.json(
      { error: 'Erro ao criar produto' },
      { status: 500 }
    )
  }
}

// PATCH - Atualizar produto
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const body = await request.json()
    
    const { 
      id, 
      tipo_id, 
      nome, 
      descricao, 
      preco, 
      preco_promocional,
      ativo,
      destaque,
      ordem,
      imagens // array de URLs das imagens (se fornecido, substitui todas)
    } = body

    if (!id) {
      return NextResponse.json(
        { error: 'ID é obrigatório' },
        { status: 400 }
      )
    }

    // Validar UUIDs
    if (!isValidUUID(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      )
    }

    if (tipo_id !== undefined && tipo_id !== null && !isValidUUID(tipo_id)) {
      return NextResponse.json(
        { error: 'tipo_id inválido' },
        { status: 400 }
      )
    }

    // Validar números se fornecidos
    if (preco !== undefined && preco !== null && (typeof preco !== 'number' || preco < 0)) {
      return NextResponse.json(
        { error: 'Preço inválido' },
        { status: 400 }
      )
    }

    if (preco_promocional !== undefined && preco_promocional !== null && (typeof preco_promocional !== 'number' || preco_promocional < 0)) {
      return NextResponse.json(
        { error: 'Preço promocional inválido' },
        { status: 400 }
      )
    }

    const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() }
    if (tipo_id !== undefined) updateData.tipo_id = tipo_id
    if (nome !== undefined) updateData.nome = sanitizeString(nome)
    if (descricao !== undefined) updateData.descricao = sanitizeString(descricao)
    if (preco !== undefined) updateData.preco = preco
    if (preco_promocional !== undefined) updateData.preco_promocional = preco_promocional
    if (ativo !== undefined) updateData.ativo = ativo
    if (destaque !== undefined) updateData.destaque = destaque
    if (ordem !== undefined) updateData.ordem = ordem

    const { error: updateError } = await supabase
      .from('produtos')
      .update(updateData)
      .eq('id', id)

    if (updateError) throw updateError

    // Se forneceu imagens, substituir todas
    if (imagens !== undefined) {
      // Deletar imagens antigas
      await supabase
        .from('produto_imagens')
        .delete()
        .eq('produto_id', id)

      // Inserir novas imagens
      if (imagens.length > 0) {
        const imagensParaInserir = imagens.map((url: string, index: number) => ({
          produto_id: id,
          url,
          ordem: index,
          principal: index === 0,
        }))

        await supabase
          .from('produto_imagens')
          .insert(imagensParaInserir)
      }
    }

    // Buscar produto atualizado
    const { data: produtoCompleto, error: fetchError } = await supabase
      .from('produtos')
      .select(`
        *,
        tipo:produto_tipos(id, nome),
        imagens:produto_imagens(id, url, ordem, principal)
      `)
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError

    return NextResponse.json(produtoCompleto)
  } catch (error) {
    console.error('Erro ao atualizar produto:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar produto' },
      { status: 500 }
    )
  }
}

// DELETE - Excluir produto
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

    // Imagens serão deletadas automaticamente pelo CASCADE
    const { error } = await supabase
      .from('produtos')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao excluir produto:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir produto' },
      { status: 500 }
    )
  }
}
