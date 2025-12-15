// Sistema de Templates para Geração de Documentos
export interface TemplateVariables {
  [key: string]: any
}

export class TemplateEngine {
  /**
   * Substitui variáveis no template usando a sintaxe {{variavel}}
   * @param template Template HTML/texto com variáveis
   * @param variables Objeto com as variáveis a serem substituídas
   * @returns Template processado
   */
  static processTemplate(template: string, variables: TemplateVariables): string {
    return template.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
      const trimmedKey = key.trim()
      
      // Suporte para nested objects (ex: {{cliente.nome}})
      const value = this.getNestedValue(variables, trimmedKey)
      
      if (value === undefined || value === null) {
        console.warn(`Variável '${trimmedKey}' não encontrada no template`)
        return `[${trimmedKey}]` // Mostrar variável não encontrada
      }
      
      return String(value)
    })
  }

  /**
   * Obtém valor de propriedade aninhada (ex: "cliente.nome")
   */
  private static getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined
    }, obj)
  }

  /**
   * Formatadores para diferentes tipos de dados
   */
  static formatters = {
    date: (value: string | Date): string => {
      if (!value) return ''
      const date = typeof value === 'string' ? new Date(value) : value
      return date.toLocaleDateString('pt-BR')
    },
    
    currency: (value: string | number): string => {
      if (!value) return 'R$ 0,00'
      const num = typeof value === 'string' ? parseFloat(value) : value
      return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    },
    
    phone: (value: string): string => {
      if (!value) return ''
      const clean = value.replace(/\D/g, '')
      if (clean.length === 11) {
        return `(${clean.slice(0,2)}) ${clean.slice(2,7)}-${clean.slice(7)}`
      }
      if (clean.length === 10) {
        return `(${clean.slice(0,2)}) ${clean.slice(2,6)}-${clean.slice(6)}`
      }
      return value
    },
    
    cpf: (value: string): string => {
      if (!value) return ''
      const clean = value.replace(/\D/g, '')
      if (clean.length === 11) {
        return `${clean.slice(0,3)}.${clean.slice(3,6)}.${clean.slice(6,9)}-${clean.slice(9)}`
      }
      return value
    },
    
    cnpj: (value: string): string => {
      if (!value) return ''
      const clean = value.replace(/\D/g, '')
      if (clean.length === 14) {
        return `${clean.slice(0,2)}.${clean.slice(2,5)}.${clean.slice(5,8)}/${clean.slice(8,12)}-${clean.slice(12)}`
      }
      return value
    }
  }

  /**
   * Aplica formatadores no template usando sintaxe {{variavel|formatter}}
   */
  static processTemplateWithFormatters(template: string, variables: TemplateVariables): string {
    // Primeiro, processar dados complexos para criar variáveis simples
    const flattenedVars = this.flattenComplexData(variables)
    
    return template.replace(/\{\{([^}]+)\}\}/g, (match, expression) => {
      const parts = expression.trim().split('|')
      const key = parts[0].trim()
      const formatter = parts[1]?.trim()
      
      let value = this.getNestedValue(flattenedVars, key)
      
      if (value === undefined || value === null) {
        return '' // Retornar string vazia em vez de [key] para campos opcionais
      }
      
      // Aplicar formatador se especificado
      if (formatter && this.formatters[formatter as keyof typeof this.formatters]) {
        value = this.formatters[formatter as keyof typeof this.formatters](value)
      }
      
      return String(value)
    })
  }

  /**
   * Converte estruturas complexas (arrays, objetos) em variáveis simples para templates
   */
  private static flattenComplexData(data: any): TemplateVariables {
    const flattened = { ...data }
    
    // Processar tipo_os array
    if (data.tipo_os && Array.isArray(data.tipo_os)) {
      flattened.tipo_os = data.tipo_os.join(', ')
    }
    
    // Processar ambientes array - pegar primeiro ambiente
    if (data.ambientes && Array.isArray(data.ambientes) && data.ambientes.length > 0) {
      const primeiro = data.ambientes[0]
      
      flattened.ambiente_nome = primeiro.ambiente || 'Ambiente Principal'
      flattened.tipo_piso = primeiro.tipo_piso || ''
      flattened.medidas = primeiro.medidas || ''
      
      // INOX
      if (primeiro.inox) {
        flattened.inox_acabamento = Array.isArray(primeiro.inox.acabamento) ? primeiro.inox.acabamento.join(', ') : primeiro.inox.acabamento || ''
        flattened.inox_passamao = Array.isArray(primeiro.inox.passamao) ? primeiro.inox.passamao.join(', ') : primeiro.inox.passamao || ''
        flattened.inox_tubos = Array.isArray(primeiro.inox.tubos) ? primeiro.inox.tubos.join(', ') : primeiro.inox.tubos || ''
        
        // Flags
        if (primeiro.inox.flags) {
          flattened.com_uniao_checked = primeiro.inox.flags.com_uniao ? 'checked' : ''
          flattened.uniao_com_curva_checked = primeiro.inox.flags.uniao_com_curva ? 'checked' : ''
          flattened.inicio_com_curva_checked = primeiro.inox.flags.inicio_com_curva ? 'checked' : ''
          flattened.final_com_curva_checked = primeiro.inox.flags.final_com_curva ? 'checked' : ''
          flattened.pinado_checked = primeiro.inox.flags.pinado ? 'checked' : ''
        }
      }
      
      // HASTES
      if (primeiro.hastes) {
        flattened.hastes_tipo = Array.isArray(primeiro.hastes.tipo) ? primeiro.hastes.tipo.join(', ') : primeiro.hastes.tipo || ''
        
        if (primeiro.hastes.fixacao) {
          flattened.fixacao_lateral_checked = primeiro.hastes.fixacao.lateral ? 'checked' : ''
          flattened.fixacao_superior_checked = primeiro.hastes.fixacao.superior ? 'checked' : ''
          flattened.flange_checked = primeiro.hastes.fixacao.flange ? 'checked' : ''
          flattened.tarugo_padrao_checked = primeiro.hastes.fixacao.tarugo_padrao ? 'checked' : ''
        }
      }
      
      // VIDRO
      if (primeiro.vidro) {
        flattened.vidro_tipo = Array.isArray(primeiro.vidro.tipo) ? primeiro.vidro.tipo.join(', ') : primeiro.vidro.tipo || ''
        flattened.vidro_espessura = Array.isArray(primeiro.vidro.espessura) ? primeiro.vidro.espessura.join(', ') : primeiro.vidro.espessura || ''
        flattened.vidro_acabamento = Array.isArray(primeiro.vidro.acabamento) ? primeiro.vidro.acabamento.join(', ') : primeiro.vidro.acabamento || ''
      }
    }
    
    return flattened
  }
}