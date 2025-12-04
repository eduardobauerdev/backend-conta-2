// @/lib/whatsapp-types.ts

export interface EtiquetaSimple {
  id: string
  nome: string
  cor: string
  descricao: string | null
}

export interface Chat {
  id: string
  name: string
  lastMessage: string | null
  lastMessageTime: number | null
  unreadCount: number
  pictureUrl?: string | null
  profilePic?: string | null
  telefone?: string | null
  // IDs das etiquetas (do banco - array de UUIDs)
  etiqueta_ids?: string[]
  // Array de etiquetas resolvidas (com nome e cor)
  etiquetas?: EtiquetaSimple[]
}

export interface Etiqueta {
  id: string
  nome: string
  cor: string
  descricao: string | null
  created_by_id: string | null
  created_by_name: string | null
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  body: string
  timestamp: number
  from: string
  to: string
  fromMe: boolean
  type: string
  hasMedia: boolean
  ack: number
  mediaUrl?: string | null
  mimeType?: string | null
  caption?: string | null
}

export interface ConnectionStatus {
  connected: boolean
  phone: string | null
  qr: string | null
  status?: "connected" | "disconnected" | "qr_ready" | "loading"
  device?: {
    name?: string
    platform?: string
  }
}

export interface QuickReply {
  id: string
  title: string
  message: string
  category: "saudacao" | "informacao" | "despedida" | "agendamento" | "suporte"
}

export const QUICK_REPLIES: QuickReply[] = [
  {
    id: "1",
    title: "Boas-vindas",
    message: "Olá! Obrigado por entrar em contato. Como posso ajudá-lo hoje?",
    category: "saudacao",
  },
  {
    id: "2",
    title: "Horário de Atendimento",
    message: "Nosso horário de atendimento é de segunda a sexta, das 9h às 18h.",
    category: "informacao",
  },
  {
    id: "3",
    title: "Informações sobre Planos",
    message:
      "Temos 3 planos disponíveis: Básico (R$ 29/mês), Profissional (R$ 79/mês) e Enterprise (R$ 199/mês). Qual te interessa?",
    category: "informacao",
  },
  {
    id: "4",
    title: "Agendar Reunião",
    message: "Gostaria de agendar uma reunião? Por favor, me informe sua disponibilidade.",
    category: "agendamento",
  },
  {
    id: "5",
    title: "Enviar Proposta",
    message: "Vou enviar uma proposta detalhada para seu e-mail. Você receberá em alguns minutos.",
    category: "informacao",
  },
  {
    id: "6",
    title: "Suporte Técnico",
    message: "Vou encaminhar você para nossa equipe de suporte técnico. Aguarde um momento.",
    category: "suporte",
  },
  {
    id: "7",
    title: "Agradecimento",
    message: "Muito obrigado pelo contato! Estamos à disposição para ajudar.",
    category: "despedida",
  },
  {
    id: "8",
    title: "Até Logo",
    message: "Foi um prazer atendê-lo! Tenha um ótimo dia!",
    category: "despedida",
  },
]

// Tipo que reflete o registro no banco
export interface ChatAssignmentDB {
  id: string
  chat_id: string
  chat_name: string
  assigned_to_id: string
  assigned_to_name: string
  assigned_by_id: string | null
  assigned_by_name: string | null
  assigned_at: string
  status: "active" | "completed" | "transferred"
  notes: string | null
  created_at: string
  updated_at: string
}

// DTO usado no front (AssignToUserDialog, etc.)
export interface ChatAssignmentDTO {
  chatId: string
  chatName: string
  assignToId: string
  assignToName: string
  autoAssign: boolean
}

export interface MessageTracking {
  id: string
  message_id: string
  chat_id: string
  sent_by_id: string
  sent_by_name: string
  message_body: string | null
  message_type: string
  sent_at: string
  created_at: string
}

export interface ChatActivity {
  id: string
  chat_id: string
  user_id: string
  user_name: string
  activity_type: "viewing" | "typing"
  last_activity_at: string
  created_at: string
}
