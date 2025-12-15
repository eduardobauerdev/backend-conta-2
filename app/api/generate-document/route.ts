import { NextResponse } from "next/server"
import { DocumentGenerator, initializeTemplates } from "@/templates"

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
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action') || 'generate'
    
    const body = await request.json()
    
    switch (action) {
      case 'preview':
        return handlePreview(body)
      case 'generate':
        return handleGenerate(body)
      case 'validate':
        return handleValidate(body)
      default:
        return NextResponse.json({ 
          success: false, 
          error: 'Ação não reconhecida' 
        }, { status: 400, headers: corsHeaders })
    }
    
  } catch (error) {
    console.error('[DocumentAPI] Erro:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Erro interno do servidor' 
    }, { status: 500, headers: corsHeaders })
  }
}

async function handlePreview(body: any) {
  try {
    const { templateId, data } = body
    
    console.log('[API] Preview solicitado para template:', templateId)
    
    if (!templateId) {
      return NextResponse.json({ 
        success: false, 
        error: 'templateId é obrigatório' 
      }, { status: 400, headers: corsHeaders })
    }

    // Verificar se template existe
    const availableTemplates = DocumentGenerator.getAvailableTemplates()
    console.log('[API] Templates disponíveis:', availableTemplates.map(t => t.id))
    
    if (!availableTemplates.find(t => t.id === templateId)) {
      return NextResponse.json({ 
        success: false, 
        error: `Template '${templateId}' não encontrado. Templates disponíveis: ${availableTemplates.map(t => t.id).join(', ')}` 
      }, { status: 400, headers: corsHeaders })
    }

    const html = await DocumentGenerator.generatePreview(templateId, data)
    
    return NextResponse.json({ 
      success: true,
      html,
      templateId 
    }, { headers: corsHeaders })
    
  } catch (error: any) {
    console.error('[API] Erro no preview:', error)
    return NextResponse.json({ 
      success: false,
      error: error.message || 'Erro ao gerar preview' 
    }, { status: 400, headers: corsHeaders })
  }
}

async function handleGenerate(body: any) {
  try {
    const { templateId, data, format = 'pdf', filename } = body
    
    console.log('[API] Gerar documento solicitado para template:', templateId)
    
    if (!templateId) {
      return NextResponse.json({ 
        success: false, 
        error: 'templateId é obrigatório' 
      }, { status: 400, headers: corsHeaders })
    }

    // Verificar se template existe
    const availableTemplates = DocumentGenerator.getAvailableTemplates()
    console.log('[API] Templates disponíveis:', availableTemplates.map(t => t.id))
    
    if (!availableTemplates.find(t => t.id === templateId)) {
      return NextResponse.json({ 
        success: false, 
        error: `Template '${templateId}' não encontrado. Templates disponíveis: ${availableTemplates.map(t => t.id).join(', ')}` 
      }, { status: 400, headers: corsHeaders })
    }

    const result = await DocumentGenerator.generateDocument({
      templateId,
      data,
      format,
      filename
    })
    
    return NextResponse.json({ 
      success: true,
      html: result.html,
      filename: result.filename,
      format,
      templateId,
      message: 'Documento gerado com sucesso'
    }, { headers: corsHeaders })
    
  } catch (error: any) {
    console.error('[API] Erro na geração:', error)
    return NextResponse.json({ 
      success: false,
      error: error.message || 'Erro ao gerar documento' 
    }, { status: 400, headers: corsHeaders })
  }
}

async function handleValidate(body: any) {
  try {
    const { templateId, data } = body
    
    if (!templateId) {
      return NextResponse.json({ 
        success: false, 
        error: 'templateId é obrigatório' 
      }, { status: 400, headers: corsHeaders })
    }

    const validation = DocumentGenerator.validateData(templateId, data)
    
    return NextResponse.json({ 
      success: true,
      valid: validation.valid,
      missing: validation.missing,
      templateId 
    }, { headers: corsHeaders })
    
  } catch (error: any) {
    return NextResponse.json({ 
      success: false,
      error: error.message || 'Erro ao validar dados' 
    }, { status: 400, headers: corsHeaders })
  }
}

// GET para listar templates disponíveis
export async function GET() {
  try {
    // Garantir inicialização dos templates
    initializeTemplates()

    const templates = DocumentGenerator.getAvailableTemplates()
    
    console.log('[API] Listando templates:', templates.length)
    
    return NextResponse.json({ 
      success: true,
      count: templates.length,
      templates: templates.map(t => ({
        id: t.id,
        name: t.name,
        type: t.type,
        description: t.description,
        requiredFields: t.requiredFields
      }))
    }, { headers: corsHeaders })
    
  } catch (error: any) {
    console.error('[API] Erro ao listar templates:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Erro ao listar templates: ' + error.message 
    }, { status: 500, headers: corsHeaders })
  }
}