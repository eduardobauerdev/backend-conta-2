export type OrdemDeServico = {
  cliente: string
  ordem_producao?: string
  tipo_os: string[] // ["visita", "molde", "instalacao"]
  endereco?: string
  cidade?: string
  celular?: string
  data_hora_visita?: string // ISO local
  vendedor?: string
  informacoes_complementares?: string
  ambientes: Array<{
    ambiente?: string
    tipo_piso?: string
    medidas?: string
    inox: {
      acabamento: string[] // ["polido","escovado","pintado"]
      passamao: string[] // ["simples","duplo"]
      tubos: string[] // ["1_1_2","1","30x30","40x10"]
      flags: {
        com_uniao?: boolean
        uniao_com_curva?: boolean
        inicio_com_curva?: boolean
        final_com_curva?: boolean
        pinado?: boolean
      }
    }
    hastes: {
      tipo: string[]
      fixacao: {
        lateral?: boolean
        superior?: boolean
        flange?: boolean
        tarugo_padrao?: boolean
      }
    }
    intermediarios: {
      tipo: string[]
      com_uniao?: boolean
      transpassado?: boolean
    }
    vidro: {
      acabamento_superior: string[]
      tubos: string[]
      fixacao: string[]
      acabamento: string[]
      tipo: string[]
      espessura: string[]
    }
    anexos: string[] // nomes ou paths; placeholder por enquanto
  }>
  anexos_gerais: string[] // placeholder
}
