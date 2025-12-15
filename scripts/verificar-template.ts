/**
 * Verificador rápido de placeholders no template
 * Execute com: npx tsx scripts/verificar-template.ts
 */

import * as fs from 'fs'
import * as path from 'path'
import PizZip from 'pizzip'

const TEMPLATES_DIR = path.join(process.cwd(), 'public/templates')

function verificar(tipoTemplate: 'fisica' | 'juridica') {
  const templateName = tipoTemplate === 'juridica' ? 'contrato-juridica.docx' : 'contrato-fisica.docx'
  const templatePath = path.join(TEMPLATES_DIR, templateName)
  
  console.log(`\n${'='.repeat(60)}`)
  console.log(`🔍 Verificando: ${templateName}`)
  console.log('='.repeat(60))
  
  if (!fs.existsSync(templatePath)) {
    console.log('❌ Template não encontrado!')
    return
  }
  
  try {
    const buffer = fs.readFileSync(templatePath)
    const zip = new PizZip(buffer)
    const documentXml = zip.file('word/document.xml')?.asText() || ''
    
    // Buscar placeholders no formato {variavel}
    const placeholders: string[] = []
    const regex = /\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g
    let match
    
    while ((match = regex.exec(documentXml)) !== null) {
      if (!placeholders.includes(match[1])) {
        placeholders.push(match[1])
      }
    }
    
    // Verificar placeholders quebrados
    const brokenRegex = /\{[^}]*?<w:[^>]+>[^}]*?\}/g
    const broken = documentXml.match(brokenRegex) || []
    
    console.log(`\n✅ Placeholders encontrados: ${placeholders.length}`)
    
    if (placeholders.length > 0) {
      console.log('\n📝 Lista de placeholders:')
      placeholders.forEach(p => {
        console.log(`   ✓ {${p}}`)
      })
    } else {
      console.log('\n⚠️  NENHUM placeholder encontrado!')
      console.log('   Adicione placeholders no formato {nome_variavel}')
    }
    
    if (broken.length > 0) {
      console.log(`\n❌ ATENÇÃO: ${broken.length} placeholder(s) quebrado(s) detectado(s)!`)
      console.log('   O Word dividiu o texto. Selecione e redigite cada um.')
      console.log('\nExemplos de placeholders quebrados:')
      broken.slice(0, 3).forEach(b => {
        const cleaned = b.replace(/<[^>]+>/g, '█')
        console.log(`   • ${cleaned.substring(0, 60)}...`)
      })
    }
    
    // Variáveis esperadas
    const esperadas = tipoTemplate === 'juridica' ? [
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
    
    const faltando = esperadas.filter(e => !placeholders.includes(e))
    
    if (faltando.length > 0) {
      console.log(`\n⚠️  Variáveis esperadas que ainda faltam: ${faltando.length}`)
      faltando.forEach(f => {
        console.log(`   • {${f}}`)
      })
    }
    
    console.log('\n' + '='.repeat(60))
    if (placeholders.length > 0 && broken.length === 0) {
      console.log('✅ TEMPLATE OK!')
      if (faltando.length === 0) {
        console.log('🎉 Todos os placeholders estão presentes e corretos!')
      }
    } else if (broken.length > 0) {
      console.log('⚠️  TEMPLATE COM PROBLEMAS - Corrija os placeholders quebrados')
    } else {
      console.log('❌ TEMPLATE VAZIO - Adicione os placeholders')
    }
    console.log('='.repeat(60))
    
  } catch (error: any) {
    console.log(`❌ Erro ao ler template: ${error.message}`)
  }
}

// Verificar ambos os templates
verificar('fisica')
verificar('juridica')

console.log('\n💡 Dica: Execute este script sempre que editar os templates!')
console.log('   npx tsx scripts/verificar-template.ts\n')
