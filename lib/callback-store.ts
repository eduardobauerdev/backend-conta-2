// Armazena os links do Google Drive retornados pelo n8n
type CallbackData = {
  driveLink: string
  timestamp: number
  type: "contrato-fisica" | "contrato-juridica" | "ordem-servico"
}

const callbacks = new Map<string, CallbackData>()

// Limpa callbacks antigos (mais de 1 hora)
function cleanOldCallbacks() {
  const oneHourAgo = Date.now() - 60 * 60 * 1000
  for (const [id, data] of callbacks.entries()) {
    if (data.timestamp < oneHourAgo) {
      callbacks.delete(id)
    }
  }
}

export function storeCallback(id: string, driveLink: string, type: CallbackData["type"]) {
  cleanOldCallbacks()

  callbacks.set(id, {
    driveLink,
    timestamp: Date.now(),
    type,
  })
}

export function getCallback(id: string): string | null {
  cleanOldCallbacks()
  const data = callbacks.get(id)
  return data ? data.driveLink : null
}

export function generateCallbackId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
}
