/**
 * Processador de templates DOCX para gerar documentos
 * Usando easy-template-x (gratuito e com suporte a imagens)
 */

import { TemplateHandler, MimeType } from 'easy-template-x'

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
   * Detecta o formato da imagem a partir do base64
   */
  private static detectImageFormat(base64: string): MimeType {
    if (base64.startsWith('data:image/png')) return MimeType.Png
    if (base64.startsWith('data:image/jpeg') || base64.startsWith('data:image/jpg')) return MimeType.Jpeg
    if (base64.startsWith('data:image/gif')) return MimeType.Gif
    if (base64.startsWith('data:image/bmp')) return MimeType.Bmp
    if (base64.startsWith('data:image/svg')) return MimeType.Svg
    // Default para PNG se não conseguir detectar
    return MimeType.Png
  }

  /**
   * Prepara dados para substituição no template
   * easy-template-x usa formato especial para imagens
   */
  private static prepareData(data: ContratoFisicaData | ContratoJuridicaData): Record<string, any> {
    const prepared: Record<string, any> = {}
    
    for (const [key, value] of Object.entries(data)) {
      // Formatar data especialmente
      if (key === 'data_emissao_contrato') {
        prepared[key] = this.formatDate(value as string)
      }
      // Processar foto: converter para formato easy-template-x
      else if (key === 'foto_orcamento_base64') {
        if (value) {
          try {
            const base64String = value as string
            
            // Detectar formato da imagem
            const format = this.detectImageFormat(base64String)
            
            // Remover prefixo data:image/...;base64, se houver
            const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '')
            
            // Converter base64 para Buffer
            const buffer = Buffer.from(base64Data, 'base64')
            
            if (buffer.length > 0) {
              // Formato especial do easy-template-x para imagens
              prepared['foto_orcamento'] = {
                _type: 'image',
                source: buffer,
                format: format,
                width: 400,  // Largura em pixels
                height: 300, // Altura em pixels
                altText: 'Foto do orçamento'
              }
              console.log('[DocxToPdf] Imagem preparada:', buffer.length, 'bytes, formato:', format)
            } else {
              console.log('[DocxToPdf] Buffer vazio, imagem não será inserida')
            }
          } catch (error) {
            console.error('[DocxToPdf] Erro ao processar imagem:', error)
          }
        }
      }
      // Outros campos
      else if (key !== 'foto_orcamento_base64') {
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
   * Processa template DOCX com find & replace usando easy-template-x
   * O template deve usar {variavel} para os placeholders
   */
  static async processDocxTemplate(
    templateBuffer: Buffer,
    data: ContratoFisicaData | ContratoJuridicaData
  ): Promise<Buffer> {
    try {
      // Criar handler do easy-template-x
      const handler = new TemplateHandler()
      
      // Preparar dados
      const preparedData = this.prepareData(data)
      
      console.log('[DocxToPdf] Dados preparados para substituição:')
      for (const [key, value] of Object.entries(preparedData)) {
        if (value && typeof value === 'object' && value._type === 'image') {
          console.log(`  ${key}: [Imagem: ${value.source.length} bytes, ${value.format}]`)
        } else if (typeof value === 'string') {
          console.log(`  ${key}: "${value?.substring(0, 50)}${value?.length > 50 ? '...' : ''}"`)
        } else {
          console.log(`  ${key}: ${value}`)
        }
      }
      
      // Processar template
      console.log('[DocxToPdf] Processando template com easy-template-x...')
      const doc = await handler.process(templateBuffer, preparedData)
      
      console.log('[DocxToPdf] ✅ Template processado com sucesso!')
      
      // Converter Blob/ArrayBuffer para Buffer
      if (doc instanceof Blob) {
        const arrayBuffer = await doc.arrayBuffer()
        return Buffer.from(arrayBuffer)
      } else if (doc instanceof ArrayBuffer) {
        return Buffer.from(doc)
      } else {
        return Buffer.from(doc as any)
      }
      
    } catch (error: any) {
      console.error('[DocxToPdf] Erro ao processar template:', error)
      throw new Error(`Falha ao processar template DOCX: ${error.message}`)
    }
  }

  /**
   * Converte DOCX para PDF usando conversão client-side
   */
  static async convertDocxToPdf(
    docxBuffer: Buffer,
    filename: string = 'document.pdf'
  ): Promise<{ success: boolean; docxBuffer: Buffer; message: string }> {
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
      console.log('[DocxToPdf] Carregando template:', fullPath)
      
      const templateBuffer = await fs.readFile(fullPath)
      console.log('[DocxToPdf] Template carregado:', templateBuffer.length, 'bytes')
      
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
      console.log('[DocxToPdf] Carregando template:', fullPath)
      
      const templateBuffer = await fs.readFile(fullPath)
      console.log('[DocxToPdf] Template carregado:', templateBuffer.length, 'bytes')
      
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
