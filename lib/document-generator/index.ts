// Sistema completo de geração de documentos
import { TemplateEngine, type TemplateVariables } from './template-engine'
import { PDFGenerator } from './pdf-generator'

export interface DocumentTemplate {
  id: string
  name: string
  type: 'contrato-fisica' | 'contrato-juridica' | 'ordem-servico'
  html: string
  requiredFields: string[]
  description?: string
}

export interface GenerateDocumentOptions {
  templateId: string
  data: TemplateVariables
  filename?: string
  format?: 'pdf' | 'html'
  preview?: boolean
}

export class DocumentGenerator {
  private static templates: Map<string, DocumentTemplate> = new Map()

  /**
   * Registra um novo template
   */
  static registerTemplate(template: DocumentTemplate): void {
    this.templates.set(template.id, template)
  }

  /**
   * Obtém template por ID
   */
  static getTemplate(id: string): DocumentTemplate | undefined {
    return this.templates.get(id)
  }

  /**
   * Lista todos os templates disponíveis
   */
  static getAvailableTemplates(): DocumentTemplate[] {
    return Array.from(this.templates.values())
  }

  /**
   * Valida se os dados contêm todos os campos obrigatórios
   */
  static validateData(templateId: string, data: TemplateVariables): { valid: boolean; missing: string[] } {
    const template = this.getTemplate(templateId)
    if (!template) {
      return { valid: false, missing: ['Template não encontrado'] }
    }

    const missing: string[] = []
    for (const field of template.requiredFields) {
      const value = TemplateEngine['getNestedValue'](data, field)
      if (value === undefined || value === null || value === '') {
        missing.push(field)
      }
    }

    return { valid: missing.length === 0, missing }
  }

  /**
   * Gera documento processado
   */
  static generateDocument(options: GenerateDocumentOptions): Promise<{ html: string; filename: string }> {
    return new Promise((resolve, reject) => {
      try {
        const { templateId, data, filename, format = 'pdf', preview = false } = options
        
        const template = this.getTemplate(templateId)
        if (!template) {
          throw new Error(`Template '${templateId}' não encontrado`)
        }

        // Validar dados
        const validation = this.validateData(templateId, data)
        if (!validation.valid && !preview) {
          throw new Error(`Campos obrigatórios ausentes: ${validation.missing.join(', ')}`)
        }

        // Processar template
        const processedHTML = TemplateEngine.processTemplateWithFormatters(template.html, data)
        
        // Gerar nome do arquivo
        const finalFilename = filename || `${template.name}_${new Date().toISOString().split('T')[0]}`
        
        resolve({
          html: processedHTML,
          filename: format === 'html' ? `${finalFilename}.html` : `${finalFilename}.pdf`
        })
        
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * Gera e baixa documento
   */
  static async generateAndDownload(options: GenerateDocumentOptions): Promise<void> {
    const { html, filename } = await this.generateDocument(options)
    
    if (options.format === 'html' || options.preview) {
      PDFGenerator.downloadHTML(html, filename)
    } else {
      await PDFGenerator.generateFromHTML(html, filename)
    }
  }

  /**
   * Gera preview do documento para exibição
   */
  static async generatePreview(templateId: string, data: TemplateVariables): Promise<string> {
    const { html } = await this.generateDocument({
      templateId,
      data,
      preview: true
    })
    return html
  }
}

// Re-exportar classes principais
export { TemplateEngine, PDFGenerator }
export type { TemplateVariables }