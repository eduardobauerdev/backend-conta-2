/**
 * Script para criar templates DOCX de exemplo com placeholders corretos
 * Execute com: npx tsx scripts/create-sample-templates.ts
 */

import * as fs from 'fs'
import * as path from 'path'
import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'

const TEMPLATES_DIR = path.join(process.cwd(), 'public/templates')

// Função para criar um DOCX básico com conteúdo
function createBasicDocx(content: string): Buffer {
  // Template DOCX mínimo válido
  const minimalDocx = {
    'word/document.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p>
      <w:r>
        <w:t>${content}</w:t>
      </w:r>
    </w:p>
  </w:body>
</w:document>`,
    
    '[Content_Types].xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`,
    
    '_rels/.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`,
    
    'word/_rels/document.xml.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
</Relationships>`
  }

  const zip = new PizZip()
  
  // Adicionar todos os arquivos necessários
  Object.entries(minimalDocx).forEach(([path, content]) => {
    zip.file(path, content)
  })

  return zip.generate({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  }) as Buffer
}

// Conteúdo do template para pessoa física
const templateFisicaContent = `CONTRATO DE PRESTAÇÃO DE SERVIÇOS

DADOS DO PROJETO
Tipo de Projeto: {tipo_projeto}

CONTRATANTE (PESSOA FÍSICA)
Nome: {nome_contratante}
CPF: {cpf_contratante}
Telefone: {telefone_contratante}
Endereço: {endereco_contratante}

VALORES E PAGAMENTO
Valor dos Produtos/Instalação: {valor_produtos_instalacao}
Valor de Entrada: {valor_entrada}
Valor de Desconto: {valor_desconto}
Valor Final: {valor_final}
Valor por Extenso: {valor_total_extenso}

PARCELAMENTO
Quantidade de Parcelas: {quantidade_parcelas}
Valor de Cada Parcela: {valor_parcelas}
Valor da Parcela por Extenso: {valor_parcela_extenso}

FORMA DE PAGAMENTO
Pagamento Não Parcelado: {forma_pagamento_nao_parcelado}
Forma de Pagamento das Parcelas: {forma_pagamento_parcelas}

OBSERVAÇÕES
{observacao_pagamento}

Data de Emissão: {data_emissao_contrato}

_______________________
Assinatura do Contratante`

// Conteúdo do template para pessoa jurídica
const templateJuridicaContent = `CONTRATO DE PRESTAÇÃO DE SERVIÇOS

DADOS DO PROJETO
Tipo de Projeto: {tipo_projeto}

CONTRATANTE (PESSOA JURÍDICA)
Nome/Razão Social: {nome_contratante}
CNPJ: {cnpj_contratante}
Telefone: {telefone_contratante}
Endereço: {endereco_contratante}

REPRESENTANTE LEGAL
Nome: {nome_representante}
Cargo: {cargo_representante}
CPF: {cpf_representante}
Telefone: {telefone_representante}

VALORES E PAGAMENTO
Valor dos Produtos/Instalação: {valor_produtos_instalacao}
Valor de Entrada: {valor_entrada}
Valor de Desconto: {valor_desconto}
Valor Final: {valor_final}
Valor por Extenso: {valor_total_extenso}

PARCELAMENTO
Quantidade de Parcelas: {quantidade_parcelas}
Valor de Cada Parcela: {valor_parcelas}
Valor da Parcela por Extenso: {valor_parcela_extenso}

FORMA DE PAGAMENTO
Pagamento Não Parcelado: {forma_pagamento_nao_parcelado}
Forma de Pagamento das Parcelas: {forma_pagamento_parcelas}

OBSERVAÇÕES
{observacao_pagamento}

Data de Emissão: {data_emissao_contrato}

_______________________          _______________________
Assinatura do Contratante        Assinatura do Representante`

function main() {
  console.log('🔧 Criando templates DOCX de exemplo...')
  
  // Criar diretório se não existir
  if (!fs.existsSync(TEMPLATES_DIR)) {
    fs.mkdirSync(TEMPLATES_DIR, { recursive: true })
  }

  // Fazer backup dos templates existentes
  const backupDir = path.join(TEMPLATES_DIR, 'backup-' + Date.now())
  fs.mkdirSync(backupDir, { recursive: true })
  
  const existingTemplates = ['contrato-fisica.docx', 'contrato-juridica.docx']
  for (const template of existingTemplates) {
    const templatePath = path.join(TEMPLATES_DIR, template)
    if (fs.existsSync(templatePath)) {
      const backupPath = path.join(backupDir, template)
      fs.copyFileSync(templatePath, backupPath)
      console.log(`📦 Backup criado: ${backupPath}`)
    }
  }

  // Criar novos templates
  try {
    // Template pessoa física
    const fisicaBuffer = createBasicDocx(templateFisicaContent)
    const fisicaPath = path.join(TEMPLATES_DIR, 'contrato-fisica.docx')
    fs.writeFileSync(fisicaPath, fisicaBuffer)
    console.log(`✅ Criado: ${fisicaPath}`)

    // Template pessoa jurídica  
    const juridicaBuffer = createBasicDocx(templateJuridicaContent)
    const juridicaPath = path.join(TEMPLATES_DIR, 'contrato-juridica.docx')
    fs.writeFileSync(juridicaPath, juridicaBuffer)
    console.log(`✅ Criado: ${juridicaPath}`)

    console.log('\n🎉 Templates criados com sucesso!')
    console.log('\n📋 PRÓXIMOS PASSOS:')
    console.log('1. Abra os arquivos DOCX no Microsoft Word')
    console.log('2. Formate o texto como desejar (fontes, cores, etc.)')
    console.log('3. Adicione seu logotipo e informações da empresa')
    console.log('4. IMPORTANTE: NÃO altere os placeholders {variavel}')
    console.log('5. Salve os arquivos')
    console.log('\n🔍 Para testar: use a função Preview nos formulários')

  } catch (error: any) {
    console.error('❌ Erro ao criar templates:', error.message)
  }
}

main()