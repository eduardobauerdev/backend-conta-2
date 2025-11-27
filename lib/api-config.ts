// Central API configuration for backend communication
export const API_CONFIG = {
  // Base URL for the WhatsApp backend API (Railway)
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  
  ENDPOINTS: {
    START_SESSION: '/start-session',
    STATUS: '/status',
    SEND_MESSAGE: '/send',
    GET_CHATS: '/chats',
    GET_MESSAGES: '/messages',
    GET_QR: '/qr',
  }
} as const

// Helper function to build full API URL
export function getApiUrl(endpoint: string): string {
  if (!API_CONFIG.BASE_URL) {
    throw new Error('API_BASE_URL não configurada. Configure a variável de ambiente NEXT_PUBLIC_API_BASE_URL.')
  }
  return `${API_CONFIG.BASE_URL}${endpoint}`
}

// Check if API is configured
export function isApiConfigured(): boolean {
  return Boolean(API_CONFIG.BASE_URL && API_CONFIG.BASE_URL.trim() !== '')
}
