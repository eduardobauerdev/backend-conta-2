export interface Lead {
  id: string
  nome: string
  cidade: string | null
  interesse: string | null
  endereco: string | null
  telefone: string | null
  cargo: string | null
  temperatura: "Quente" | "Morno" | "Frio"
  proximo_contato: string | null
  dia_semana: string
  adicionado_por_id: string
  adicionado_por_nome: string
  acao: string | null
  observacao: string | null
  status: "ativo" | "convertido" | null
  created_at: string
  updated_at: string
}
