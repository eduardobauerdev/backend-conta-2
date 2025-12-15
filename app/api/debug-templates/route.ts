import { NextResponse } from "next/server"
import { initializeTemplates, DocumentGenerator } from "@/templates"

export async function GET() {
  try {
    console.log('[Debug] Iniciando debug dos templates...')
    
    // Forçar inicialização
    initializeTemplates()
    
    const templates = DocumentGenerator.getAvailableTemplates()
    
    const debug = {
      timestamp: new Date().toISOString(),
      templatesCount: templates.length,
      templates: templates.map(t => ({
        id: t.id,
        name: t.name,
        type: t.type,
        htmlLength: t.html.length,
        requiredFieldsCount: t.requiredFields.length,
        requiredFields: t.requiredFields
      })),
      templateIds: templates.map(t => t.id),
      systemInfo: {
        nodeEnv: process.env.NODE_ENV,
        hasWindow: typeof window !== 'undefined',
        hasGlobal: typeof global !== 'undefined'
      }
    }
    
    console.log('[Debug] Templates carregados:', debug)
    
    return NextResponse.json({
      success: true,
      debug
    })
    
  } catch (error: any) {
    console.error('[Debug] Erro:', error)
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}