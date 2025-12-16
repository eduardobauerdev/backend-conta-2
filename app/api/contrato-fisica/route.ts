import { NextResponse } from "next/server"
import { DocxToPdfProcessor, ContratoFisicaData } from "@/lib/document-generator/docx-to-pdf"

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
    
    console.log('[ContratoFisica] Gerando contrato DOCX para:', body.nome_contratante)
    
    // Preparar dados no formato esperado
    const data: ContratoFisicaData = {
      tipo_projeto: body.tipo_projeto || '',
      nome_contratante: body.nome_contratante || '',
      telefone_contratante: body.telefone_contratante || '',
      endereco_contratante: body.endereco_contratante || '',
      cpf_contratante: body.cpf_contratante || '',
      forma_pagamento_nao_parcelado: body.forma_pagamento_nao_parcelado || '',
      valor_produtos_instalacao: body.valor_produtos_instalacao || '',
      valor_entrada: body.valor_entrada || '',
      valor_desconto: body.valor_desconto || '',
      quantidade_parcelas: body.quantidade_parcelas || '',
      forma_pagamento_parcelas: body.forma_pagamento_parcelas || '',
      observacao_pagamento: body.observacao_pagamento || '',
      data_emissao_contrato: body.data_emissao_contrato || new Date().toISOString(),
      valor_parcelas: body.valor_parcelas || '',
      valor_total_extenso: body.valor_total_extenso || '',
      valor_final: body.valor_final || '',
      foto_orcamento_base64: body.foto_orcamento_base64
    }
    
    // Validar dados obrigatórios
    const validation = DocxToPdfProcessor.validateContratoFisica(data)
    if (!validation.valid) {
      return NextResponse.json({
        success: false,
        error: `Campos obrigatórios ausentes: ${validation.missing.join(', ')}`
      }, { status: 400, headers: corsHeaders })
    }
    
    // Gerar DOCX a partir do template
    try {
      const docxBuffer = await DocxToPdfProcessor.gerarContratoFisica(
        'public/templates/contrato-fisica.docx',
        data
      )
      
      // Formato: Contrato - Nome do Cliente + Data
      const dataFormatada = new Date(data.data_emissao_contrato).toLocaleDateString('pt-BR').replace(/\//g, '-')
      
      // Sanitizar nome para remover caracteres especiais
      const nomeSanitizado = data.nome_contratante
        .normalize('NFD') // Decompor caracteres acentuados
        .replace(/[\u0300-\u036f]/g, '') // Remover marcas diacríticas
        .replace(/[^a-zA-Z0-9\s-]/g, '') // Remover caracteres especiais exceto espaços e hífens
        .replace(/\s+/g, ' ') // Normalizar espaços múltiplos
        .trim()
      
      const filename = `Contrato - ${nomeSanitizado} ${dataFormatada}.docx`
      
      console.log('[ContratoFisica] Contrato DOCX gerado com sucesso:', filename)
      
      // Retornar DOCX para download
      return new NextResponse(docxBuffer, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
          'Content-Length': docxBuffer.length.toString(),
        }
      })
      
    } catch (templateError: any) {
      console.error('[ContratoFisica] Erro ao processar template:', templateError)
      return NextResponse.json({
        success: false,
        error: `Erro ao processar template DOCX: ${templateError.message}. Certifique-se de que o arquivo contrato-fisica.docx existe em /public/templates/`
      }, { status: 500, headers: corsHeaders })
    }
    
  } catch (error: any) {
    console.error('[ContratoFisica] Erro geral:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Erro ao gerar contrato'
    }, { status: 500, headers: corsHeaders })
  }
}
