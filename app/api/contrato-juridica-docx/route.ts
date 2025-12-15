import { NextResponse } from "next/server"
import { DocxToPdfProcessor, ContratoJuridicaData } from "@/lib/document-generator/docx-to-pdf"

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
    
    console.log('[ContratoJuridica] Gerando contrato para:', body.nome_contratante)
    
    // Preparar dados no formato esperado
    const data: ContratoJuridicaData = {
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
      foto_orcamento_base64: body.foto_orcamento_base64,
      // Campos específicos de pessoa jurídica
      cnpj_contratante: body.cnpj_contratante || '',
      nome_representante: body.nome_representante || '',
      cargo_representante: body.cargo_representante || '',
      cpf_representante: body.cpf_representante || '',
      telefone_representante: body.telefone_representante || ''
    }
    
    // Validar dados obrigatórios
    const validation = DocxToPdfProcessor.validateContratoJuridica(data)
    if (!validation.valid) {
      return NextResponse.json({
        success: false,
        error: `Campos obrigatórios ausentes: ${validation.missing.join(', ')}`
      }, { status: 400, headers: corsHeaders })
    }
    
    // Gerar DOCX a partir do template
    const docxBuffer = await DocxToPdfProcessor.gerarContratoJuridica(
      'public/templates/contrato-juridica.docx',
      data
    )
    
    const filename = `contrato-${data.nome_contratante.replace(/\s+/g, '-').toLowerCase()}.docx`
    
    console.log('[ContratoJuridica] Contrato gerado com sucesso:', filename)
    
    // Retornar DOCX para download
    return new NextResponse(docxBuffer, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': docxBuffer.length.toString(),
      }
    })
    
  } catch (error: any) {
    console.error('[ContratoJuridica] Erro:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Erro ao gerar contrato'
    }, { status: 500, headers: corsHeaders })
  }
}
