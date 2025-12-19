import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';

const WhatsAppContext = createContext<any>(null);

// URL do seu servidor em produção (SquareCloud exige wss://)
const WS_URL = "wss://backend-ii.squareweb.app";

export const WhatsAppProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState({ connected: false });
  const [typingStatus, setTypingStatus] = useState<Record<string, boolean>>({});
  
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  // Função para processar eventos do WebSocket
  const handleSocketEvent = useCallback((event: any) => {
    const { type, data } = event;

    switch (type) {
      case 'connection_status':
        setConnectionStatus(data);
        break;

      case 'new_chat':
        setChats(prev => {
          const exists = prev.find(c => c.id._serialized === data.id._serialized);
          if (exists) return prev;
          return [data, ...prev];
        });
        break;

      case 'new_message':
        // 1. Atualiza mensagens se for o chat ativo OU se eu enviei (fromMe)
        if (data.id.remote === activeChatId || data.fromMe) {
          setMessages(prev => {
            if (prev.find(m => m.id.id === data.id.id)) return prev;
            return [...prev, data];
          });
        }
        
        // 2. Atualiza o preview na lista de chats e move para o topo
        setChats(prev => prev.map(chat => 
          chat.id._serialized === data.id.remote 
            ? { 
                ...chat, 
                lastMessage: { body: data.body, timestamp: data.timestamp }, 
                timestamp: data.timestamp,
                unreadCount: (chat.id._serialized !== activeChatId && !data.fromMe) 
                  ? (chat.unreadCount || 0) + 1 
                  : chat.unreadCount
              }
            : chat
        ).sort((a, b) => b.timestamp - a.timestamp));
        break;

      case 'chat_update':
        setChats(prev => prev.map(chat => 
          chat.id._serialized === data.chatId ? { ...chat, ...data.updates } : chat
        ));
        break;
        
      case 'message_ack':
        setMessages(prev => prev.map(m => 
          m.id.id === data.messageId ? { ...m, ack: data.ack } : m
        ));
        break;

      case 'typing':
        setTypingStatus(prev => ({
          ...prev,
          [data.chatId]: data.isTyping
        }));
        break;
    }
  }, [activeChatId]);

  // Função de conexão com Lógica de Reconexão
  const connect = useCallback(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) return;

    console.log("🔌 Conectando ao WhatsApp WebSocket...");
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("✅ WebSocket conectado com sucesso");
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    };

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        handleSocketEvent(payload);
      } catch (error) {
        console.error("❌ Erro no parse do WS:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("⚠️ Erro no WebSocket:", error);
    };

    ws.onclose = () => {
      console.log("🔌 WebSocket fechado. Tentando reconectar em 5s...");
      // Evita loops de reconexão se já houver um agendado
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = setTimeout(connect, 5000);
    };

    socketRef.current = ws;
  }, [handleSocketEvent]);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      socketRef.current?.close();
    };
  }, [connect]);

  return (
    <WhatsAppContext.Provider value={{ 
      chats, setChats, 
      messages, setMessages, 
      activeChatId, setActiveChatId,
      connectionStatus,
      typingStatus 
    }}>
      {children}
    </WhatsAppContext.Provider>
  );
};

export const useWhatsApp = () => useContext(WhatsAppContext);