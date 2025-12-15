/**
 * Script de diagnóstico para templates DOCX
 * Execute com: npx tsx scripts/diagnose-template.ts
 */

import * as fs from 'fs'
import * as path from 'path'
import PizZip from 'pizzip'

const TEMPLATES_DIR = path.join(process.cwd(), 'public/templates')

// Cores para console
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function analyzeTemplate(templatePath: string) {
  const templateName = path.basename(templatePath)
  log(`\n${'='.repeat(60)}`, 'cyan')
  log(`📄 Analisando: ${templateName}`, 'cyan')
  log('='.repeat(60), 'cyan')
  
  try {
    const buffer = fs.readFileSync(templatePath)
    const zip = new PizZip(buffer)
    
    // Ler o XML do documento
    const documentXml = zip.file('word/document.xml')?.asText() || ''
    
    if (!documentXml) {
      log('❌ Não foi possível ler word/document.xml', 'red')
      return
    }
    
    log(`\n📊 Tamanho do XML: ${documentXml.length} caracteres`, 'blue')
    
    // 1. Procurar placeholders no formato correto {variavel}
    const correctPlaceholders: string[] = []
    const correctRegex = /\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g
    let match
    while ((match = correctRegex.exec(documentXml)) !== null) {
      if (!correctPlaceholders.includes(match[1])) {
        correctPlaceholders.push(match[1])
      }
    }
    
    if (correctPlaceholders.length > 0) {
      log(`\n✅ Placeholders encontrados no formato correto {variavel}:`, 'green')
      correctPlaceholders.forEach(p => log(`   • {${p}}`, 'green'))
    } else {
      log('\n⚠️  NENHUM placeholder {variavel} encontrado!', 'yellow')
    }
    
    // 2. Verificar se há placeholders quebrados pelo Word
    // O Word às vezes divide {nome_contratante} em {nome_<w:r>...contratante}
    const brokenRegex = /\{[^}]*?<w:[^>]+>[^}]*?\}/g
    const brokenMatches = documentXml.match(brokenRegex) || []
    
    if (brokenMatches.length > 0) {
      log(`\n❌ PROBLEMA ENCONTRADO: Placeholders quebrados pelo Word!`, 'red')
      log('   O Word dividiu alguns placeholders em múltiplos elementos XML.', 'red')
      log('   Isso impede a substituição. Exemplos:', 'red')
      brokenMatches.slice(0, 3).forEach(b => {
        // Limpar para exibição
        const cleaned = b.replace(/<[^>]+>/g, '█')
        log(`   • ${cleaned.substring(0, 80)}...`, 'yellow')
      })
      log('\n   🔧 SOLUÇÃO: Abra o Word, selecione cada placeholder e redigite', 'cyan')
      log('      de uma vez só, sem pausas.', 'cyan')
    }
    
    // 3. Procurar outros formatos de placeholder
    const altFormats = [
      { name: 'Duplo {{}}', regex: /\{\{([^}]+)\}\}/g },
      { name: 'Angulo <<>>', regex: /<<([^>]+)>>/g },
      { name: 'Dólar $$', regex: /\$\$([^$]+)\$\$/g },
      { name: 'Percentual %%', regex: /%%([^%]+)%%/g },
      { name: 'Colchetes [[]]', regex: /\[\[([^\]]+)\]\]/g },
      { name: 'Underline __', regex: /__([^_]+)__/g },
    ]
    
    for (const format of altFormats) {
      const matches: string[] = []
      let altMatch
      while ((altMatch = format.regex.exec(documentXml)) !== null) {
        if (!matches.includes(altMatch[1])) {
          matches.push(altMatch[1])
        }
      }
      
      if (matches.length > 0) {
        log(`\n⚠️  Encontrado formato alternativo (${format.name}):`, 'yellow')
        matches.slice(0, 5).forEach(m => log(`   • ${m}`, 'yellow'))
        log('   Você precisa converter para o formato {variavel}', 'cyan')
      }
    }
    
    // 4. Procurar texto que PARECE ser placeholder mas não está entre {}
    const possiblePlaceholders = [
      'nome_contratante', 'cpf_contratante', 'cnpj_contratante',
      'telefone_contratante', 'endereco_contratante', 'valor_final',
      'tipo_projeto', 'data_emissao_contrato', 'valor_entrada',
      'valor_desconto', 'quantidade_parcelas', 'valor_parcelas',
      'valor_total_extenso', 'forma_pagamento', 'observacao_pagamento'
    ]
    
    const foundWithoutBraces: string[] = []
    for (const placeholder of possiblePlaceholders) {
      // Verificar se existe no XML mas não entre {}
      if (documentXml.includes(placeholder)) {
        // Verificar se está corretamente formatado
        const correctFormat = `{${placeholder}}`
        if (!documentXml.includes(correctFormat)) {
          foundWithoutBraces.push(placeholder)
        }
      }
    }
    
    if (foundWithoutBraces.length > 0) {
      log(`\n⚠️  Variáveis encontradas SEM chaves {}:`, 'yellow')
      foundWithoutBraces.forEach(p => log(`   • ${p} (deveria ser {${p}})`, 'yellow'))
    }
    
    // 5. Verificar variáveis esperadas
    const expectedFisica = [
      'tipo_projeto', 'nome_contratante', 'telefone_contratante', 'endereco_contratante',
      'cpf_contratante', 'forma_pagamento_nao_parcelado', 'valor_produtos_instalacao',
      'valor_entrada', 'valor_desconto', 'quantidade_parcelas', 'forma_pagamento_parcelas',
      'observacao_pagamento', 'data_emissao_contrato', 'valor_parcelas', 'valor_total_extenso',
      'valor_parcela_extenso', 'valor_final'
    ]
    
    const expectedJuridica = [
      ...expectedFisica,
      'cnpj_contratante', 'nome_representante', 'cargo_representante',
      'cpf_representante', 'telefone_representante'
    ]
    
    const expected = templateName.includes('juridica') ? expectedJuridica : expectedFisica
    const missing = expected.filter(v => !correctPlaceholders.includes(v))
    
    if (missing.length > 0) {
      log(`\n⚠️  Variáveis esperadas que FALTAM no template:`, 'yellow')
      missing.forEach(m => log(`   • {${m}}`, 'yellow'))
    }
    
    // 6. Mostrar um trecho do XML para debug
    log('\n📝 Trecho do document.xml (primeiros 2000 chars do body):', 'blue')
    const bodyMatch = documentXml.match(/<w:body>([\s\S]*?)<\/w:body>/i)
    if (bodyMatch) {
      // Remover tags XML para facilitar leitura
      const textOnly = bodyMatch[1]
        .replace(/<w:t[^>]*>([^<]*)<\/w:t>/g, '【$1】')
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim()
      log(textOnly.substring(0, 2000), 'reset')
    }
    
    // 7. Resumo final
    log('\n' + '='.repeat(60), 'cyan')
    log('📋 RESUMO', 'cyan')
    log('='.repeat(60), 'cyan')
    
    if (correctPlaceholders.length === 0 && brokenMatches.length === 0) {
      log('❌ O template NÃO possui placeholders válidos!', 'red')
      log('   Você precisa adicionar placeholders no formato {variavel}', 'red')
      log('   Veja: public/templates/INSTRUCOES_TEMPLATE.md', 'cyan')
    } else if (brokenMatches.length > 0) {
      log('⚠️  Template tem placeholders mas alguns estão QUEBRADOS', 'yellow')
      log('   Abra o Word e redigite cada {variavel} de uma vez só', 'cyan')
    } else if (missing.length > 0) {
      log(`⚠️  Template tem ${correctPlaceholders.length} placeholders mas faltam ${missing.length}`, 'yellow')
    } else {
      log(`✅ Template OK! ${correctPlaceholders.length} placeholders configurados.`, 'green')
    }
    
  } catch (error: any) {
    log(`❌ Erro ao analisar: ${error.message}`, 'red')
  }
}

// Executar
console.log('🔍 Diagnóstico de Templates DOCX')
console.log('================================\n')

const templates = ['contrato-fisica.docx', 'contrato-juridica.docx']

for (const template of templates) {
  const templatePath = path.join(TEMPLATES_DIR, template)
  if (fs.existsSync(templatePath)) {
    analyzeTemplate(templatePath)
  } else {
    log(`\n⚠️  Template não encontrado: ${template}`, 'yellow')
  }
}

console.log('\n')
