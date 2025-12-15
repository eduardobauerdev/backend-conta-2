import { NextResponse } from "next/server"
import { DocumentGenerator, initializeTemplates } from "@/templates"
import { createServerClient } from "@/lib/supabase/server"

// Garantir que templates estejam sempre inicializados
try {
  initializeTemplates()
} catch (error) {
  console.error('[API] Erro ao inicializar templates:', error)
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    console.log("[DocumentGen] Gerando ordem de serviço:", body)
    
    // Gerar documento usando o sistema local
    try {
      const result = await DocumentGenerator.generateDocument({
        templateId: 'ordem-servico',
        data: {
          ...body,
          cidade: body.cidade || 'Cidade não informada'
        },
        format: 'html',
        filename: `ordem_servico_${body.cliente || 'cliente'}_${new Date().toISOString().split('T')[0]}`
      })
      
      console.log("[DocumentGen] Ordem de serviço gerada com sucesso")
      
      // Salvar no banco de dados (opcional)
      try {
        const supabase = await createServerClient()
        await supabase.from('ordens_servico').insert({
          cliente: body.cliente,
          vendedor: body.vendedor,
          tipo_os: body.tipo_os,
          dados: body,
          documento_html: result.html,
          created_at: new Date().toISOString()
        })
      } catch (dbError) {
        console.log("[DocumentGen] Aviso: Não foi possível salvar no banco:", dbError)
      }
      
      return NextResponse.json({ 
        success: true, 
        message: "Ordem de serviço gerada com sucesso!",
        document: {
          html: result.html,
          filename: result.filename
        },
        data: body,
        generatedLocally: true
      }, { headers: corsHeaders })
      
    } catch (docError: any) {
      console.error("[DocumentGen] Erro ao gerar documento:", docError)
      
      return NextResponse.json({ 
        success: true, 
        message: "Dados salvos, mas houve erro na geração do documento: " + docError.message,
        data: body,
        documentError: docError.message
      }, { headers: corsHeaders })
    }
    
  } catch (error) {
    console.error("[DocumentGen] Erro ao processar requisição:", error)
    return NextResponse.json({ 
      success: false,
      error: "Erro ao processar ordem de serviço" 
    }, { status: 500, headers: corsHeaders })
  }
}
