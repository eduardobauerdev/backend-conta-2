// Configuração e inicialização dos templates
import { DocumentGenerator, type DocumentTemplate } from '../lib/document-generator'
import { CONTRATO_FISICA_TEMPLATE } from './contrato-fisica'
import { CONTRATO_JURIDICA_TEMPLATE } from './contrato-juridica'
import { ORDEM_SERVICO_TEMPLATE } from './ordem-servico'

// Templates disponíveis
const templates: DocumentTemplate[] = [
  {
    id: 'contrato-fisica',
    name: 'Contrato Pessoa Física',
    type: 'contrato-fisica',
    html: CONTRATO_FISICA_TEMPLATE,
    requiredFields: [
      'nome',
      'cpf', 
      'telefone',
      'endereco_contrato',
      'tipo_projeto',
      'valor_produtos_instalacao',
      'forma_pagamento',
      'data_emissao_contrato'
    ],
    description: 'Contrato de prestação de serviços para pessoa física'
  },
  {
    id: 'contrato-juridica',
    name: 'Contrato Pessoa Jurídica', 
    type: 'contrato-juridica',
    html: CONTRATO_JURIDICA_TEMPLATE,
    requiredFields: [
      'nome',
      'cnpj',
      'telefone', 
      'endereco_contrato',
      'nome_representante',
      'cpf_representante',
      'cargo_representante',
      'tipo_projeto',
      'valor_produtos_instalacao',
      'forma_pagamento',
      'data_emissao_contrato'
    ],
    description: 'Contrato de prestação de serviços para pessoa jurídica'
  },
  {
    id: 'ordem-servico',
    name: 'Ordem de Serviço',
    type: 'ordem-servico', 
    html: ORDEM_SERVICO_TEMPLATE,
    requiredFields: [
      'cliente',
      'tipo_os',
      'vendedor',
      'ambientes'
    ],
    description: 'Ordem de serviço técnica detalhada'
  }
]

// Inicializar templates automaticamente
let templatesInitialized = false

export function initializeTemplates(): void {
  if (templatesInitialized) return
  
  console.log('[Templates] Inicializando templates...', templates.length)
  
  templates.forEach(template => {
    console.log('[Templates] Registrando template:', template.id)
    DocumentGenerator.registerTemplate(template)
  })
  
  templatesInitialized = true
  console.log('[Templates] Templates inicializados com sucesso')
}

// Garantir inicialização automática
if (typeof window !== 'undefined' || typeof global !== 'undefined') {
  initializeTemplates()
}

// Re-exportar para facilitar uso
export { DocumentGenerator } from '../lib/document-generator'
export type { DocumentTemplate, GenerateDocumentOptions, TemplateVariables } from '../lib/document-generator'