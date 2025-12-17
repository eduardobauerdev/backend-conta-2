"use client"

import type { Chat, Message } from "./whatsapp-types"

/**
 * Cache local em memória para dados do WhatsApp
 * Reduz chamadas à API e melhora performance
 */
class WhatsAppCache {
  private chats: Map<string, Chat> = new Map()
  private messages: Map<string, Message[]> = new Map()
  private chatListeners: Set<(chats: Chat[]) => void> = new Set()
  private messageListeners: Map<string, Set<(messages: Message[]) => void>> = new Map()

  // ========== CHATS ==========

  setChats(chats: Chat[]) {
    this.chats.clear()
    chats.forEach((chat) => this.chats.set(chat.id._serialized || chat.id, chat))
    this.notifyChatListeners()
  }

  addChat(chat: Chat) {
    this.chats.set(chat.id._serialized || chat.id, chat)
    this.notifyChatListeners()
  }

  updateChat(chatId: string, updates: Partial<Chat>) {
    const chat = this.chats.get(chatId)
    if (chat) {
      const updatedChat = { ...chat, ...updates }
      this.chats.set(chatId, updatedChat)
      this.notifyChatListeners()
    }
  }

  getChat(chatId: string): Chat | undefined {
    return this.chats.get(chatId)
  }

  getAllChats(): Chat[] {
    return Array.from(this.chats.values())
  }

  deleteChat(chatId: string) {
    this.chats.delete(chatId)
    this.notifyChatListeners()
  }

  // ========== MESSAGES ==========

  setMessages(chatId: string, messages: Message[]) {
    this.messages.set(chatId, messages)
    this.notifyMessageListeners(chatId)
  }

  addMessage(chatId: string, message: Message) {
    const messages = this.messages.get(chatId) || []
    
    // Evitar duplicatas
    const exists = messages.some((m) => m.id._serialized === message.id._serialized)
    if (!exists) {
      this.messages.set(chatId, [...messages, message])
      this.notifyMessageListeners(chatId)

      // Atualizar última mensagem do chat
      const chat = this.chats.get(chatId)
      if (chat) {
        this.updateChat(chatId, {
          lastMessage: {
            body: message.body,
            timestamp: message.timestamp,
            fromMe: message.fromMe,
          },
        })
      }
    }
  }

  updateMessage(chatId: string, messageId: string, updates: Partial<Message>) {
    const messages = this.messages.get(chatId)
    if (messages) {
      const updatedMessages = messages.map((msg) =>
        msg.id._serialized === messageId ? { ...msg, ...updates } : msg,
      )
      this.messages.set(chatId, updatedMessages)
      this.notifyMessageListeners(chatId)
    }
  }

  getMessages(chatId: string): Message[] {
    return this.messages.get(chatId) || []
  }

  clearMessages(chatId: string) {
    this.messages.delete(chatId)
    this.notifyMessageListeners(chatId)
  }

  // ========== LISTENERS ==========

  subscribeToChatList(callback: (chats: Chat[]) => void) {
    this.chatListeners.add(callback)
    // Notificar imediatamente com dados atuais
    callback(this.getAllChats())

    return () => {
      this.chatListeners.delete(callback)
    }
  }

  subscribeToMessages(chatId: string, callback: (messages: Message[]) => void) {
    if (!this.messageListeners.has(chatId)) {
      this.messageListeners.set(chatId, new Set())
    }

    this.messageListeners.get(chatId)!.add(callback)
    // Notificar imediatamente com dados atuais
    callback(this.getMessages(chatId))

    return () => {
      const listeners = this.messageListeners.get(chatId)
      if (listeners) {
        listeners.delete(callback)
        if (listeners.size === 0) {
          this.messageListeners.delete(chatId)
        }
      }
    }
  }

  private notifyChatListeners() {
    const chats = this.getAllChats()
    this.chatListeners.forEach((callback) => callback(chats))
  }

  private notifyMessageListeners(chatId: string) {
    const messages = this.getMessages(chatId)
    const listeners = this.messageListeners.get(chatId)
    if (listeners) {
      listeners.forEach((callback) => callback(messages))
    }
  }

  // ========== UTILS ==========

  clear() {
    this.chats.clear()
    this.messages.clear()
    this.notifyChatListeners()
  }

  getCacheSize() {
    let totalMessages = 0
    this.messages.forEach((messages) => {
      totalMessages += messages.length
    })

    return {
      chats: this.chats.size,
      messages: totalMessages,
      chatRooms: this.messages.size,
    }
  }
}

// Singleton
export const whatsappCache = new WhatsAppCache()
