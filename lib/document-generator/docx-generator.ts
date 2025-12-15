/**
 * Gerador de documentos DOCX a partir de templates
 * 
 * Instalação necessária:
 * npm install docxtemplater pizzip
 * 
 * Como usar templates DOCX:
 * 1. Crie seu arquivo .docx no Word
 * 2. Use {variavel} para placeholders
 * 3. Salve em /public/templates/
 * 4. Use esta classe para gerar documentos
 */

import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'

export class DocxGenerator {
  /**
   * Gera documento DOCX a partir de template
   * 
   * @param templateBuffer - Buffer do arquivo template (.docx)
   * @param data - Dados para substituir no template
   * @returns Buffer do documento gerado
   * 
   * @example
   * ```typescript
   * // No seu template.docx:
   * // Nome: {nome}
   * // CPF: {cpf}
   * // Valor: R$ {valor}
   * 
   * const templateBuffer = await fetch('/templates/contrato.docx')
   *   .then(res => res.arrayBuffer())
   * 
   * const docBuffer = await DocxGenerator.generateFromTemplate(
   *   Buffer.from(templateBuffer),
   *   {
   *     nome: 'João Silva',
   *     cpf: '123.456.789-00',
   *     valor: '1.500,00'
   *   }
   * )
   * 
   * // Download do arquivo gerado
   * const blob = new Blob([docBuffer], { 
   *   type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
   * })
   * const url = URL.createObjectURL(blob)
   * const link = document.createElement('a')
   * link.href = url
   * link.download = 'contrato.docx'
   * link.click()
   * ```
   */
  static async generateFromTemplate(
    templateBuffer: Buffer | ArrayBuffer,
    data: Record<string, any>
  ): Promise<Buffer> {
    try {
      // Converter ArrayBuffer para Buffer se necessário
      const buffer = templateBuffer instanceof ArrayBuffer 
        ? Buffer.from(templateBuffer) 
        : templateBuffer

      // Carregar template
      const zip = new PizZip(buffer)
      
      // Criar documento
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        delimiters: {
          start: '{',
          end: '}'
        }
      })
      
      // Substituir variáveis
      doc.setData(data)
      
      try {
        doc.render()
      } catch (error: any) {
        // Erros de template (variável não encontrada, sintaxe errada, etc)
        if (error.properties && error.properties.errors) {
          const errorMessages = error.properties.errors
            .map((err: any) => `${err.message} (${err.name})`)
            .join(', ')
          throw new Error(`Erro no template: ${errorMessages}`)
        }
        throw error
      }
      
      // Gerar arquivo final
      const outputBuffer = doc.getZip().generate({
        type: 'nodebuffer',
        compression: 'DEFLATE',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      })
      
      return outputBuffer as Buffer
      
    } catch (error: any) {
      console.error('[DocxGenerator] Erro ao gerar documento:', error)
      throw new Error(`Falha ao gerar documento DOCX: ${error.message}`)
    }
  }

  /**
   * Gera documento DOCX a partir de arquivo template do servidor
   * (Para uso em API routes do Next.js)
   */
  static async generateFromServerTemplate(
    templatePath: string,
    data: Record<string, any>
  ): Promise<Buffer> {
    const fs = await import('fs/promises')
    const path = await import('path')
    
    try {
      // Ler arquivo template do sistema de arquivos
      const fullPath = path.join(process.cwd(), templatePath)
      const templateBuffer = await fs.readFile(fullPath)
      
      return await this.generateFromTemplate(templateBuffer, data)
      
    } catch (error: any) {
      console.error('[DocxGenerator] Erro ao ler template:', error)
      throw new Error(`Template não encontrado: ${templatePath}`)
    }
  }

  /**
   * Formata dados antes de inserir no template
   * Útil para garantir formatação consistente
   */
  static formatData(data: Record<string, any>): Record<string, any> {
    const formatted: Record<string, any> = {}
    
    for (const [key, value] of Object.entries(data)) {
      if (value === null || value === undefined) {
        formatted[key] = ''
      } else if (typeof value === 'object' && !(value instanceof Date)) {
        // Processar objetos aninhados
        formatted[key] = this.formatData(value)
      } else if (value instanceof Date) {
        // Formatar datas
        formatted[key] = value.toLocaleDateString('pt-BR')
      } else {
        formatted[key] = String(value)
      }
    }
    
    return formatted
  }

  /**
   * Valida se arquivo é DOCX válido
   */
  static isValidDocx(buffer: Buffer | ArrayBuffer): boolean {
    try {
      const bytes = buffer instanceof ArrayBuffer 
        ? new Uint8Array(buffer) 
        : new Uint8Array(buffer)
      
      // DOCX é um arquivo ZIP que começa com PK
      return bytes[0] === 0x50 && bytes[1] === 0x4B
    } catch {
      return false
    }
  }
}
