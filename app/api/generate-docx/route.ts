import { NextResponse } from "next/server"
import { DocxGenerator } from "@/lib/document-generator/docx-generator"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

/**
 * API para geração de documentos DOCX a partir de templates
 * 
 * POST /api/generate-docx
 * 
 * Body:
 * {
 *   "templateId": "contrato-fisica" | "contrato-juridica" | "ordem-servico",
 *   "data": {
 *     // Dados do contrato/ordem de serviço
 *   },
 *   "filename": "contrato.docx" (opcional)
 * }
 * 
 * Retorna: Arquivo DOCX para download
 */
export async function POST(request: Request) {
  try {
    const { templateId, data, filename } = await request.json()
    
    if (!templateId) {
      return NextResponse.json(
        { success: false, error: 'templateId é obrigatório' },
        { status: 400, headers: corsHeaders }
      )
    }

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'data é obrigatório' },
        { status: 400, headers: corsHeaders }
      )
    }

    // Templates disponíveis
    const templates = {
      'contrato-fisica': 'public/templates/contrato-fisica.docx',
      'contrato-juridica': 'public/templates/contrato-juridica.docx',
      'ordem-servico': 'public/templates/ordem-servico.docx',
    }

    const templatePath = templates[templateId as keyof typeof templates]
    
    if (!templatePath) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Template '${templateId}' não encontrado. Disponíveis: ${Object.keys(templates).join(', ')}` 
        },
        { status: 404, headers: corsHeaders }
      )
    }

    console.log('[DocxAPI] Gerando documento:', templateId)
    
    // Formatar dados (datas, valores, etc)
    const formattedData = DocxGenerator.formatData(data)
    
    // Gerar documento
    const docBuffer = await DocxGenerator.generateFromServerTemplate(
      templatePath,
      formattedData
    )
    
    // Determinar nome do arquivo
    const outputFilename = filename || `${templateId}_${new Date().toISOString().split('T')[0]}.docx`
    
    console.log('[DocxAPI] Documento gerado com sucesso:', outputFilename)
    
    // Retornar arquivo para download
    return new NextResponse(docBuffer, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${outputFilename}"`,
        'Content-Length': docBuffer.length.toString(),
      }
    })
    
  } catch (error: any) {
    console.error('[DocxAPI] Erro:', error)
    
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Erro ao gerar documento DOCX'
      },
      { status: 500, headers: corsHeaders }
    )
  }
}
