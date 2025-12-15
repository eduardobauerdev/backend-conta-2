/**
 * Processador de templates DOCX para gerar PDFs
 * Baseado no fluxo N8N existente
 */

import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import { PDFDocument } from 'pdf-lib'

export interface ContratoFisicaData {
  tipo_projeto: string
  nome_contratante: string
  telefone_contratante: string
  endereco_contratante: string
  cpf_contratante: string
  forma_pagamento_nao_parcelado: string
  valor_produtos_instalacao: string
  valor_entrada: string
  valor_desconto: string
  quantidade_parcelas: string
  forma_pagamento_parcelas: string
  observacao_pagamento: string
  data_emissao_contrato: string // será formatado para DD/MM/YYYY
  valor_parcelas: string
  valor_total_extenso: string
  valor_final: string
  foto_orcamento_base64?: string
}

export interface ContratoJuridicaData extends ContratoFisicaData {
  cnpj_contratante: string
  nome_representante: string
  cargo_representante: string
  cpf_representante: string
  telefone_representante: string
}

export class DocxToPdfProcessor {
  /**
   * Formata data para DD/MM/YYYY
   */
  private static formatDate(dateString: string): string {
    if (!dateString) return ''
    
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString
    
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    
    return `${day}/${month}/${year}`
  }

  /**
   * Prepara dados para substituição no template
   */
  private static prepareData(data: ContratoFisicaData | ContratoJuridicaData): Record<string, string> {
    const prepared: Record<string, string> = {}
    
    for (const [key, value] of Object.entries(data)) {
      // Formatar data especialmente
      if (key === 'data_emissao_contrato') {
        prepared[key] = this.formatDate(value as string)
      }
      // Ignorar foto (será processada separadamente)
      else if (key === 'foto_orcamento_base64') {
        continue
      }
      // Outros campos
      else {
        prepared[key] = value ? String(value) : ''
      }
    }
    
    // Campos duplicados conforme N8N
    if (prepared.valor_total_extenso) {
      prepared.valor_parcela_extenso = prepared.valor_total_extenso
    }
    
    return prepared
  }

  /**
   * Processa template DOCX com find & replace
   * O template deve usar {variavel} para os placeholders
   */
  static async processDocxTemplate(
    templateBuffer: Buffer,
    data: ContratoFisicaData | ContratoJuridicaData
  ): Promise<Buffer> {
    try {
      // Carregar template
      const zip = new PizZip(templateBuffer)
      
      // DEBUG: Verificar conteúdo do template
      const documentXml = zip.file('word/document.xml')?.asText() || ''
      const placeholderRegex = /\{([^}]+)\}/g
      const foundPlaceholders: string[] = []
      let match
      while ((match = placeholderRegex.exec(documentXml)) !== null) {
        if (!foundPlaceholders.includes(match[1])) {
          foundPlaceholders.push(match[1])
        }
      }
      console.log('[DocxToPdf] Placeholders encontrados no template:', foundPlaceholders)
      
      // Criar documento com docxtemplater
      // Usa {variavel} como delimitadores padrão
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        nullGetter: () => '', // Retorna string vazia para valores nulos
        delimiters: {
          start: '{',
          end: '}'
        }
      })
      
      // Preparar dados
      const preparedData = this.prepareData(data)
      
      console.log('[DocxToPdf] Dados preparados para substituição:')
      for (const [key, value] of Object.entries(preparedData)) {
        console.log(`  ${key}: "${value?.substring(0, 50)}${value?.length > 50 ? '...' : ''}"`)
      }
      
      // Verificar quais placeholders serão substituídos
      const willBeReplaced = foundPlaceholders.filter(p => preparedData[p] !== undefined)
      const willNotBeReplaced = foundPlaceholders.filter(p => preparedData[p] === undefined)
      console.log('[DocxToPdf] Placeholders que serão substituídos:', willBeReplaced)
      if (willNotBeReplaced.length > 0) {
        console.warn('[DocxToPdf] ⚠️ Placeholders sem dados:', willNotBeReplaced)
      }
      
      // Substituir variáveis
      doc.setData(preparedData)
      
      try {
        doc.render()
        console.log('[DocxToPdf] ✅ Template renderizado com sucesso!')
      } catch (error: any) {
        console.error('[DocxToPdf] Erro ao renderizar template:', error)
        if (error.properties?.errors) {
          const errorDetails = error.properties.errors
            .map((e: any) => `${e.message} em ${e.part}`)
            .join(', ')
          throw new Error(`Erro no template DOCX: ${errorDetails}`)
        }
        throw error
      }
      
      // Gerar buffer do DOCX preenchido
      const buffer = doc.getZip().generate({
        type: 'nodebuffer',
        compression: 'DEFLATE',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      })
      
      return buffer as Buffer
      
    } catch (error: any) {
      console.error('[DocxToPdf] Erro ao processar template:', error)
      throw new Error(`Falha ao processar template DOCX: ${error.message}`)
    }
  }

  /**
   * Converte DOCX para PDF usando conversão client-side
   * Nota: Como não podemos usar LibreOffice no servidor Next.js facilmente,
   * retornamos o DOCX e deixamos o cliente abrir em janela de impressão
   */
  static async convertDocxToPdf(
    docxBuffer: Buffer,
    filename: string = 'document.pdf'
  ): Promise<{ success: boolean; docxBuffer: Buffer; message: string }> {
    // Por enquanto, retornamos o DOCX
    // O cliente pode:
    // 1. Baixar o DOCX
    // 2. Abrir em nova janela e usar Print to PDF
    // 3. Ou usar API externa de conversão
    
    return {
      success: true,
      docxBuffer,
      message: 'DOCX gerado com sucesso. Use Print to PDF no navegador ou baixe o DOCX.'
    }
  }

  /**
   * Gera contrato pessoa física
   */
  static async gerarContratoFisica(
    templatePath: string,
    data: ContratoFisicaData
  ): Promise<Buffer> {
    const fs = await import('fs/promises')
    const path = await import('path')
    
    try {
      const fullPath = path.join(process.cwd(), templatePath)
      const templateBuffer = await fs.readFile(fullPath)
      
      const docxBuffer = await this.processDocxTemplate(templateBuffer, data)
      
      return docxBuffer
      
    } catch (error: any) {
      console.error('[DocxToPdf] Erro ao gerar contrato física:', error)
      throw new Error(`Falha ao gerar contrato: ${error.message}`)
    }
  }

  /**
   * Gera contrato pessoa jurídica
   */
  static async gerarContratoJuridica(
    templatePath: string,
    data: ContratoJuridicaData
  ): Promise<Buffer> {
    const fs = await import('fs/promises')
    const path = await import('path')
    
    try {
      const fullPath = path.join(process.cwd(), templatePath)
      const templateBuffer = await fs.readFile(fullPath)
      
      const docxBuffer = await this.processDocxTemplate(templateBuffer, data)
      
      return docxBuffer
      
    } catch (error: any) {
      console.error('[DocxToPdf] Erro ao gerar contrato jurídica:', error)
      throw new Error(`Falha ao gerar contrato: ${error.message}`)
    }
  }

  /**
   * Valida dados do contrato
   */
  static validateContratoFisica(data: Partial<ContratoFisicaData>): { valid: boolean; missing: string[] } {
    const required = [
      'tipo_projeto',
      'nome_contratante',
      'telefone_contratante',
      'endereco_contratante',
      'cpf_contratante',
      'valor_final',
      'data_emissao_contrato'
    ]
    
    const missing = required.filter(field => !data[field as keyof ContratoFisicaData])
    
    return {
      valid: missing.length === 0,
      missing
    }
  }

  /**
   * Valida dados do contrato jurídico
   */
  static validateContratoJuridica(data: Partial<ContratoJuridicaData>): { valid: boolean; missing: string[] } {
    const required = [
      'tipo_projeto',
      'nome_contratante',
      'telefone_contratante',
      'endereco_contratante',
      'cnpj_contratante',
      'nome_representante',
      'cpf_representante',
      'valor_final',
      'data_emissao_contrato'
    ]
    
    const missing = required.filter(field => !data[field as keyof ContratoJuridicaData])
    
    return {
      valid: missing.length === 0,
      missing
    }
  }
}
