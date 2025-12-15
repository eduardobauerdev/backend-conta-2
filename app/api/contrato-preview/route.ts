import { NextResponse } from "next/server"
import PizZip from 'pizzip'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

/**
 * GET: Analisa o template e retorna os placeholders encontrados
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const tipo = searchParams.get('tipo') || 'fisica'
    
    const fs = await import('fs/promises')
    const path = await import('path')
    
    const templateName = tipo === 'juridica' ? 'contrato-juridica.docx' : 'contrato-fisica.docx'
    const templatePath = path.join(process.cwd(), 'public/templates', templateName)
    
    // Verificar se o template existe
    try {
      await fs.access(templatePath)
    } catch {
      return NextResponse.json({
        success: false,
        error: `Template não encontrado: ${templateName}`,
        path: templatePath
      }, { status: 404, headers: corsHeaders })
    }
    
    // Ler o template
    const templateBuffer = await fs.readFile(templatePath)
    const zip = new PizZip(templateBuffer)
    
    // Extrair XML do documento
    const documentXml = zip.file('word/document.xml')?.asText() || ''
    
    // Encontrar todos os placeholders no formato {variavel}
    const placeholderRegex = /\{([^}]+)\}/g
    const placeholders: string[] = []
    let match
    
    while ((match = placeholderRegex.exec(documentXml)) !== null) {
      if (!placeholders.includes(match[1])) {
        placeholders.push(match[1])
      }
    }
    
    // Verificar se há placeholders divididos pelo Word (ex: {nome_<w:r>contratante})
    const brokenPlaceholderRegex = /\{[^}]*<w:[^>]+>[^}]*\}/g
    const brokenMatches = documentXml.match(brokenPlaceholderRegex) || []
    
    // Variáveis esperadas
    const expectedVariables = tipo === 'juridica' ? [
      'tipo_projeto', 'nome_contratante', 'telefone_contratante', 'endereco_contratante',
      'cnpj_contratante', 'nome_representante', 'cargo_representante', 'cpf_representante',
      'telefone_representante', 'forma_pagamento_nao_parcelado', 'valor_produtos_instalacao',
      'valor_entrada', 'valor_desconto', 'quantidade_parcelas', 'forma_pagamento_parcelas',
      'observacao_pagamento', 'data_emissao_contrato', 'valor_parcelas', 'valor_total_extenso',
      'valor_parcela_extenso', 'valor_final'
    ] : [
      'tipo_projeto', 'nome_contratante', 'telefone_contratante', 'endereco_contratante',
      'cpf_contratante', 'forma_pagamento_nao_parcelado', 'valor_produtos_instalacao',
      'valor_entrada', 'valor_desconto', 'quantidade_parcelas', 'forma_pagamento_parcelas',
      'observacao_pagamento', 'data_emissao_contrato', 'valor_parcelas', 'valor_total_extenso',
      'valor_parcela_extenso', 'valor_final'
    ]
    
    const missingInTemplate = expectedVariables.filter(v => !placeholders.includes(v))
    const extraInTemplate = placeholders.filter(v => !expectedVariables.includes(v))
    
    return NextResponse.json({
      success: true,
      template: templateName,
      analysis: {
        totalPlaceholders: placeholders.length,
        placeholdersFound: placeholders,
        expectedVariables,
        missingInTemplate,
        extraInTemplate,
        hasBrokenPlaceholders: brokenMatches.length > 0,
        brokenPlaceholders: brokenMatches.slice(0, 5), // Mostrar apenas alguns exemplos
      },
      hint: missingInTemplate.length > 0 
        ? `⚠️ O template está faltando ${missingInTemplate.length} variável(is). Verifique se usou a sintaxe {variavel} corretamente no Word.`
        : brokenMatches.length > 0
        ? '⚠️ Alguns placeholders podem estar quebrados (o Word dividiu o texto). Selecione e redigite cada {variavel} de uma vez só.'
        : '✅ Template parece estar configurado corretamente!'
    }, { headers: corsHeaders })
    
  } catch (error: any) {
    console.error('[Preview] Erro:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500, headers: corsHeaders })
  }
}

/**
 * POST: Gera preview dos dados que serão substituídos
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { tipo = 'fisica', dados } = body
    
    // Formatar data
    const formatDate = (dateString: string): string => {
      if (!dateString) return ''
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return dateString
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      return `${day}/${month}/${year}`
    }
    
    // Preparar dados como seriam enviados ao template
    const preparedData: Record<string, string> = {}
    
    for (const [key, value] of Object.entries(dados || {})) {
      if (key === 'data_emissao_contrato') {
        preparedData[key] = formatDate(value as string)
      } else if (key !== 'foto_orcamento_base64') {
        preparedData[key] = value ? String(value) : ''
      }
    }
    
    // Adicionar campo duplicado
    if (preparedData.valor_total_extenso) {
      preparedData.valor_parcela_extenso = preparedData.valor_total_extenso
    }
    
    // Variáveis esperadas
    const expectedVariables = tipo === 'juridica' ? [
      'tipo_projeto', 'nome_contratante', 'telefone_contratante', 'endereco_contratante',
      'cnpj_contratante', 'nome_representante', 'cargo_representante', 'cpf_representante',
      'telefone_representante', 'forma_pagamento_nao_parcelado', 'valor_produtos_instalacao',
      'valor_entrada', 'valor_desconto', 'quantidade_parcelas', 'forma_pagamento_parcelas',
      'observacao_pagamento', 'data_emissao_contrato', 'valor_parcelas', 'valor_total_extenso',
      'valor_parcela_extenso', 'valor_final'
    ] : [
      'tipo_projeto', 'nome_contratante', 'telefone_contratante', 'endereco_contratante',
      'cpf_contratante', 'forma_pagamento_nao_parcelado', 'valor_produtos_instalacao',
      'valor_entrada', 'valor_desconto', 'quantidade_parcelas', 'forma_pagamento_parcelas',
      'observacao_pagamento', 'data_emissao_contrato', 'valor_parcelas', 'valor_total_extenso',
      'valor_parcela_extenso', 'valor_final'
    ]
    
    // Verificar quais campos estão preenchidos
    const filledFields = expectedVariables.filter(v => preparedData[v] && preparedData[v].trim() !== '')
    const emptyFields = expectedVariables.filter(v => !preparedData[v] || preparedData[v].trim() === '')
    
    return NextResponse.json({
      success: true,
      preview: {
        dados: preparedData,
        resumo: {
          totalEsperado: expectedVariables.length,
          preenchidos: filledFields.length,
          vazios: emptyFields.length,
          camposVazios: emptyFields,
          camposPreenchidos: filledFields.map(f => ({ campo: f, valor: preparedData[f] }))
        }
      }
    }, { headers: corsHeaders })
    
  } catch (error: any) {
    console.error('[Preview] Erro:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500, headers: corsHeaders })
  }
}
