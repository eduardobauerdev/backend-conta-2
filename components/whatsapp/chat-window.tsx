"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, RefreshCw, Zap, Loader2, Paperclip, X, User, History, UserPlus, Plus, Tag, Pencil, Tags, StickyNote, Copy, Phone, FileText, CheckCircle, DollarSign, XCircle, Check } from "lucide-react"
import { QuickRepliesPanel } from "./quick-replies-panel"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger, ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent, ContextMenuPortal } from "@/components/ui/context-menu"
import { MessageBubble } from "./message-bubble"
import { toast } from "sonner"
import type { Message, ChatAssignmentDB, ChatActivity } from "@/lib/whatsapp-types"
import { useWhatsAppCache } from "@/contexts/whatsapp-cache-context"
import { Badge } from "@/components/ui/badge"
import { ChatHistoryDialog } from "./chat-history-dialog"
import { getCookie } from "@/lib/auth"
import { useUser } from "@/contexts/user-context"
import { createClient } from "@/lib/supabase/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getRoleColor } from "@/lib/role-colors"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useRealtimeSubscription } from "@/hooks/use-realtime-subscription"
import { EditChatNameDialog } from "./edit-chat-name-dialog"
import { TagSelector } from "./tag-selector"
import { ChatEtiquetasDialog } from "./chat-etiquetas-dialog"
import { ChatNotesDialog } from "./chat-notes-dialog"
import { NoteBadge } from "./note-badge"
import { ProfilePictureModal } from "./profile-picture-modal"
import { DateSeparator, shouldShowDateSeparator } from "./date-separator"
import type { Etiqueta, EtiquetaSimple } from "@/lib/whatsapp-types"
import { cn, getContrastTextColor, formatPhoneNumber } from "@/lib/utils"
import { ConvertLeadDialog } from "@/components/crm/convert-lead-dialog"
import { UnconvertLeadDialog } from "@/components/crm/unconvert-lead-dialog"
import type { Lead } from "@/types/crm"

const MESSAGES_PER_PAGE = 20
const SCROLL_THRESHOLD = 100

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://backend-sobt.onrender.com";

const CRMIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2"
  >
    <path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z" />
    <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
  </svg>
);

const TemperaturaIcon = ({ temperatura, size = 14 }: { temperatura: string; size?: number }) => {
  switch (temperatura) {
    case "Frio":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
          <path d="m10 20-1.25-2.5L6 18"/><path d="M10 4 8.75 6.5 6 6"/><path d="m14 20 1.25-2.5L18 18"/><path d="m14 4 1.25 2.5L18 6"/><path d="m17 21-3-6h-4"/><path d="m17 3-3 6 1.5 3"/><path d="M2 12h6.5L10 9"/><path d="m20 10-1.5 2 1.5 2"/><path d="M22 12h-6.5L14 15"/><path d="m4 10 1.5 2L4 14"/><path d="m7 21 3-6-1.5-3"/><path d="m7 3 3 6h4"/>
        </svg>
      );
    case "Morno":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
          <path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/>
        </svg>
      );
    case "Quente":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
          <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"/>
        </svg>
      );
    default:
      return null;
  }
};

interface ChatWindowProps {
  chatId: string
  chatUuid?: string | null
  chatName?: string | null
  chatPicture?: string | null
  chatTelefone?: string | null
  chatEtiquetas?: EtiquetaSimple[]
  onRefresh: () => void
  onToggleLeadPanel: (show: boolean) => void
  showLeadPanel: boolean
  refreshTrigger?: number 
}

export function ChatWindow({
  chatId,
  chatUuid = null,
  chatName: initialChatName,
  chatPicture = null,
  chatTelefone = null,
  chatEtiquetas: initialEtiquetas = [],
  onRefresh,
  onToggleLeadPanel,
  showLeadPanel,
  refreshTrigger = 0,
}: ChatWindowProps) {
  const { addNewMessage } = useWhatsAppCache()
  const { user } = useUser()
  const supabase = createClient()
  const router = useRouter()

  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false) 
  const [hasMore, setHasMore] = useState(true) 
  const [offset, setOffset] = useState(0) 

  const [newMessage, setNewMessage] = useState("")
  const [sending, setSending] = useState(false)
  
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isLoadingRef = useRef(false)
  const isInitialLoadRef = useRef(true)
  const previousScrollHeightRef = useRef(0)
  const lastChatIdRef = useRef<string | null>(null)

  const [quickRepliesOpen, setQuickRepliesOpen] = useState(false)
  const [assignment, setAssignment] = useState<ChatAssignmentDB | null>(null)
  const [assignedUserName, setAssignedUserName] = useState<string | null>(null)
  const [assignedUserCargo, setAssignedUserCargo] = useState<string | null>(null)
  const [activities, setActivities] = useState<ChatActivity[]>([])
  const [showHistoryDialog, setShowHistoryDialog] = useState(false)
  const [showAssignPopover, setShowAssignPopover] = useState(false)
  const [availableUsers, setAvailableUsers] = useState<Array<{ id: string; nome: string; cargo: string; cor: string }>>([])
  const [availableEtiquetas, setAvailableEtiquetas] = useState<Etiqueta[]>([])
  const [assigningUser, setAssigningUser] = useState(false)
  const [showEditNameDialog, setShowEditNameDialog] = useState(false)
  const [showEtiquetasDialog, setShowEtiquetasDialog] = useState(false)
  const [showNotesDialog, setShowNotesDialog] = useState(false)
  const [showProfilePictureModal, setShowProfilePictureModal] = useState(false)
  const [hasProfilePicture, setHasProfilePicture] = useState(false)
  const [hasNotes, setHasNotes] = useState(false)
  const [noteContent, setNoteContent] = useState<string | null>(null)
  const [hasHistory, setHasHistory] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(true)
  const [roleColor, setRoleColor] = useState<string | null>(null)
  const userDataCache = useRef<Record<string, { nome: string | null; cargo: string | null; color: string | null }>>({})

  const [existingLead, setExistingLead] = useState<{ id: string; nome: string; proximo_contato: string | null; temperatura: string; status: string | null; motivo_desconversao: string | null } | null>(null)
  const [changingTemperatura, setChangingTemperatura] = useState(false)
  const [showConvertLeadDialog, setShowConvertLeadDialog] = useState(false)
  const [showUnconvertLeadDialog, setShowUnconvertLeadDialog] = useState(false)

  const [chatName, setChatName] = useState<string | null>(initialChatName || null)
  const [chatEtiquetas, setChatEtiquetas] = useState<EtiquetaSimple[]>(initialEtiquetas)

  const userId = getCookie("auth_user_id")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getPhoneFromChatId = (id: string) => {
    if (!id) return null
    if (id.includes('@')) return id.split('@')[0]
    return id
  }
  
  const safeChatName = (() => {
    if (chatName && chatName.trim().length > 0) return chatName
    if (chatTelefone) return formatPhoneNumber(chatTelefone)
    const phoneFromId = getPhoneFromChatId(chatId)
    if (phoneFromId && /^\d+$/.test(phoneFromId)) return formatPhoneNumber(phoneFromId)
    return chatId || "Contato"
  })() 
  
  const telefone = chatTelefone || (chatId?.includes('@') ? chatId.split('@')[0] : chatId) || ""
  const profilePictureUrl = chatPicture || `${BACKEND_URL}/chats/avatar/${chatId}`;

  function normalizeTimestamp(timestamp: any): number {
    if (!timestamp) return 0
    if (typeof timestamp === 'object' && timestamp.low !== undefined) return timestamp.low * 1000
    if (typeof timestamp === 'string') {
      const parsed = parseInt(timestamp, 10)
      return isNaN(parsed) ? 0 : parsed
    }
    if (typeof timestamp === 'number') return timestamp < 10000000000 ? timestamp * 1000 : timestamp
    return 0
  }

  useEffect(() => {
    async function checkExistingLead() {
      try {
        let query = supabase.from("leads").select("id, nome, proximo_contato, temperatura, status")
        if (chatUuid) {
          query = query.eq("chat_uuid", chatUuid)
        } else {
          const telefoneNum = chatTelefone || (chatId.includes("@") ? chatId.split("@")[0] : chatId)
          query = query.eq("telefone", telefoneNum)
        }
        const { data } = await query.limit(1).single()
        if (data) {
          let motivo_desconversao = null
          if (data.status === "ativo") {
            const { data: desconversao } = await supabase.from('desconversoes').select('motivo').eq('lead_id', data.id).order('created_at', { ascending: false }).limit(1).single()
            if (desconversao) motivo_desconversao = desconversao.motivo
          }
          setExistingLead({ ...data, temperatura: data.temperatura || 'Morno', status: data.status || null, motivo_desconversao })
        } else { setExistingLead(null) }
      } catch { setExistingLead(null) }
    }
    checkExistingLead()
  }, [chatId, chatUuid, chatTelefone, supabase])

  useEffect(() => {
    const telefoneNum = chatTelefone || (chatId.includes("@") ? chatId.split("@")[0] : chatId)
    const channel = supabase
      .channel(`leads-chat-${chatId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, async (payload) => {
          const newRecord = payload.new as any
          const oldRecord = payload.old as any
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            const matchesChatUuid = chatUuid && newRecord.chat_uuid === chatUuid
            const matchesTelefone = newRecord.telefone === telefoneNum
            if (matchesChatUuid || matchesTelefone) {
              let motivo_desconversao = null
              if (newRecord.status === "ativo") {
                const { data: desconversao } = await supabase.from('desconversoes').select('motivo').eq('lead_id', newRecord.id).order('created_at', { ascending: false }).limit(1).single()
                if (desconversao) motivo_desconversao = desconversao.motivo
              }
              setExistingLead({ id: newRecord.id, nome: newRecord.nome, proximo_contato: newRecord.proximo_contato, temperatura: newRecord.temperatura || 'Morno', status: newRecord.status || null, motivo_desconversao })
            }
          } else if (payload.eventType === 'DELETE') { if (existingLead && oldRecord.id === existingLead.id) setExistingLead(null) }
        }
      ).subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [chatId, chatUuid, chatTelefone, supabase, existingLead])

  const handleViewLeadInCRM = () => {
    if (existingLead) {
      const leadDate = existingLead.proximo_contato || new Date().toISOString().split('T')[0]
      router.push(`/crm?leadId=${existingLead.id}&date=${leadDate}`)
    }
  }

  async function loadMessages(currentOffset: number, isInitial = false) {
    if (isLoadingRef.current) return
    isLoadingRef.current = true
    try {
      if (isInitial) setLoading(true)
      else setLoadingMore(true)
      const params = new URLSearchParams()
      params.set('limit', String(MESSAGES_PER_PAGE))
      params.set('offset', String(currentOffset))
      const response = await fetch(`/api/whatsapp/messages/${chatId}?${params.toString()}`)
      const result = await response.json()
      if (!result.success) throw new Error(result.message || "Erro ao carregar mensagens")
      const messagesData = result.messages || []
      const totalCount = result.total || messagesData.length
      if (messagesData.length > 0) {
        const normalizedMessages: Message[] = messagesData.map((msg: any) => {
          const messageId = typeof msg.id === 'string' ? msg.id : (msg.id?._serialized || msg.id?.id || String(msg.id))
          return {
            id: messageId,
            body: msg.body || msg.content || "",
            timestamp: normalizeTimestamp(msg.timestamp),
            from: msg.from || msg.sender_id || "Desconhecido",
            to: msg.to || msg.chat_id || chatId,
            fromMe: msg.fromMe ?? msg.from_me ?? false,
            type: msg.type || "text",
            hasMedia: msg.hasMedia ?? msg.has_media ?? false,
            ack: msg.ack || 0,
            mediaUrl: (msg.hasMedia || msg.has_media) ? `${BACKEND_URL}/media/${chatId}/${messageId}` : msg.mediaUrl || null,
            mimeType: msg.mimeType || msg.media_meta?.mimetype || null,
            caption: msg.caption || null,
          }
        })
        if (isInitial) { setMessages(normalizedMessages) } else {
          if (scrollContainerRef.current) previousScrollHeightRef.current = scrollContainerRef.current.scrollHeight
          setMessages((prev) => [...normalizedMessages, ...prev])
        }
        const hasMoreData = (currentOffset + messagesData.length) < totalCount
        setHasMore(hasMoreData)
        setOffset(prev => prev + messagesData.length)
      } else { setHasMore(false) }
    } catch (error) { toast.error("Erro ao carregar mensagens.") } finally {
      setLoading(false)
      setLoadingMore(false)
      isLoadingRef.current = false
    }
  }

  // --- REALTIME: Escuta mensagens novas via evento customizado do WebSocket ---
  useEffect(() => {
    const handleNewMessage = (event: CustomEvent) => {
      const { chatId: msgChatId, message: newMsgData } = event.detail;
      
      // Só processa se for do chat atual
      if (msgChatId !== chatId) return;
      
      const messageId = newMsgData.id?._serialized || newMsgData.id?.id || newMsgData.id || `msg-${Date.now()}`;
      const newMessage: Message = {
        id: messageId,
        body: newMsgData.body || newMsgData.content || newMsgData.conversation || "",
        timestamp: normalizeTimestamp(newMsgData.timestamp || newMsgData.messageTimestamp || Date.now()),
        from: newMsgData.from || newMsgData.id?.participant || "Desconhecido",
        to: newMsgData.to || chatId,
        fromMe: newMsgData.fromMe ?? false,
        type: newMsgData.type || "chat",
        hasMedia: newMsgData.hasMedia ?? false,
        ack: newMsgData.ack || 1,
        mediaUrl: newMsgData.hasMedia ? `${BACKEND_URL}/media/${chatId}/${messageId}` : null,
        mimeType: newMsgData.mimetype || null,
        caption: newMsgData.caption || null,
      };
      
      setMessages((prev) => {
        // Verifica se já existe essa mensagem (por ID exato)
        const existingMessage = prev.find(m => m.id === newMessage.id);
        if (existingMessage) return prev;
        
        // Se é uma mensagem própria (fromMe), pode ser que já temos uma versão otimista
        // Remove mensagens otimistas (temp-*) com conteúdo similar se houver
        if (newMessage.fromMe) {
          const filtered = prev.filter(m => {
            const msgId = String(m.id);
            if (!msgId.startsWith('temp-')) return true;
            const sameContent = m.body === newMessage.body;
            const recentTime = Math.abs(m.timestamp - newMessage.timestamp) < 30000;
            return !(sameContent && recentTime);
          });
          
          // Substitui mensagem otimista ou adiciona nova
          return [...filtered, newMessage];
        }
        
        return [...prev, newMessage];
      });
      
      addNewMessage(chatId, newMessage);
      if (newMessage.fromMe) setSending(false);
      setTimeout(() => scrollToBottom("smooth"), 100);
    };
    
    window.addEventListener('whatsapp:new_message' as any, handleNewMessage);
    return () => {
      window.removeEventListener('whatsapp:new_message' as any, handleNewMessage);
    };
  }, [chatId, addNewMessage]);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => { messagesEndRef.current?.scrollIntoView({ behavior }); }

  useLayoutEffect(() => {
    if (!loading && messages.length > 0 && isInitialLoadRef.current) {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
        isInitialLoadRef.current = false;
    }
  }, [messages, loading]);

  useLayoutEffect(() => {
    if (!loading && previousScrollHeightRef.current > 0 && scrollContainerRef.current) {
      const newScrollHeight = scrollContainerRef.current.scrollHeight
      const heightDifference = newScrollHeight - previousScrollHeightRef.current
      scrollContainerRef.current.scrollTop = heightDifference
      previousScrollHeightRef.current = 0
    }
  }, [messages, loading])

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const scrollTop = target.scrollTop
    if (scrollTop < SCROLL_THRESHOLD && hasMore && !isLoadingRef.current && !isInitialLoadRef.current) {
      loadMessages(offset, false)
    }
  }, [offset, hasMore])

  useRealtimeSubscription({
    table: "chat_activity",
    filter: `chat_id=eq.${chatId}`,
    onInsert: (activity: any) => {
      setActivities((prev) => {
        const exists = prev.some((a) => a.user_id === activity.user_id)
        return exists ? prev.map((a) => (a.user_id === activity.user_id ? activity : a)) : [...prev, activity]
      })
    },
    onUpdate: (activity: any) => setActivities((prev) => prev.map((a) => (a.user_id === activity.user_id ? activity : a))),
    onDelete: (activity: any) => setActivities((prev) => prev.filter((a) => a.user_id !== activity.user_id)),
  })

  useRealtimeSubscription({
    table: "chat_assignments",
    filter: `chat_id=eq.${chatId}`,
    onInsert: async (assignment: any) => { handleAssignmentUpdate(assignment) },
    onUpdate: async (assignment: any) => { handleAssignmentUpdate(assignment) },
    onDelete: () => { setAssignment(null); setAssignedUserName(null); setAssignedUserCargo(null); setRoleColor(null); },
  })

  useRealtimeSubscription({ table: "chat_history", filter: `chat_id=eq.${chatId}`, onInsert: () => { setHasHistory(true) }, })

  useEffect(() => {
    const channel = supabase
      .channel(`chat:${chatId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'chats', filter: `id=eq.${chatId}` }, async (payload) => {
        const updatedChat = payload.new as any;
        if (updatedChat.name !== undefined) setChatName(updatedChat.name);
        const etiquetaIds: string[] = updatedChat.etiqueta_ids || [];
        if (etiquetaIds.length > 0) {
          const { data: etiquetasData } = await supabase.from('whatsapp_etiquetas').select('id, nome, cor, descricao').in('id', etiquetaIds);
          if (etiquetasData) setChatEtiquetas(etiquetaIds.map(id => etiquetasData.find(e => e.id === id)).filter(Boolean) as EtiquetaSimple[]);
        } else { setChatEtiquetas([]); }
      }).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [chatId, supabase]);

  useEffect(() => { setChatName(initialChatName || null); }, [initialChatName]);
  useEffect(() => { setChatEtiquetas(initialEtiquetas); }, [initialEtiquetas]);

  const handleAssignmentUpdate = async (assignment: any) => {
      if (assignment.status === "active") {
        setAssignment(assignment)
        if (assignment.assigned_to_id) updateUserDataCache(assignment.assigned_to_id)
      }
  }

  const updateUserDataCache = async (userId: string) => {
      if (userDataCache.current[userId]) {
          const cached = userDataCache.current[userId]
          setAssignedUserName(cached.nome); setAssignedUserCargo(cached.cargo); setRoleColor(cached.color)
      } else {
          const userData = await loadAssignmentUserData(userId)
          userDataCache.current[userId] = userData
          setAssignedUserName(userData.nome); setAssignedUserCargo(userData.cargo); setRoleColor(userData.color)
      }
  }

  useEffect(() => {
    const isNewChat = lastChatIdRef.current !== chatId;
    lastChatIdRef.current = chatId;

    if (isNewChat) {
      setAssignment(null); setAssignedUserName(null); setAssignedUserCargo(null); setRoleColor(null);
      setHasNotes(false); setNoteContent(null); setHasHistory(false); setHistoryLoading(true);
      setMessages([]); setOffset(0); setHasMore(true); setLoading(true);
      isInitialLoadRef.current = true; isLoadingRef.current = false; previousScrollHeightRef.current = 0;
    }
    
    loadMessages(0, true);
    loadAssignment();
    loadActivities();
    loadAvailableUsers();
    loadAvailableEtiquetas();
    checkNotes();
    checkHistory();
    registerActivity("viewing");
  }, [chatId, refreshTrigger]);

  async function loadAssignmentUserData(userId: string) {
    const { data } = await supabase.from("perfis").select("nome, cargo").eq("id", userId).single()
    if (data?.cargo) {
        const { data: cargo } = await supabase.from("cargos").select("cor").eq("nome", data.cargo).maybeSingle()
        return { nome: data.nome, cargo: data.cargo, color: cargo?.cor || getRoleColor(data.cargo) }
    }
    return { nome: data?.nome || null, cargo: null, color: null }
  }

  async function loadAssignment() {
      try {
          const res = await fetch(`/api/whatsapp/assignments?chatId=${chatId}`)
          if(res.ok) { const data = await res.json(); if(data.success && data.assignment) handleAssignmentUpdate(data.assignment) }
      } catch (e) { console.error(e) }
  }

  async function loadAvailableUsers() {
    try {
      const { data: perfis } = await supabase.from("perfis").select("id, nome, cargo").order("nome")
      if (!perfis) return
      const cargos = Array.from(new Set(perfis.map(p => p.cargo).filter(Boolean) as string[]))
      const { data: cargosData } = await supabase.from("cargos").select("nome, cor").in("nome", cargos)
      const coresMap: Record<string, string> = {}
      cargosData?.forEach(c => coresMap[c.nome] = c.cor)
      const usersWithColor = perfis.map(p => ({ id: p.id, nome: p.nome || "", cargo: p.cargo || "", cor: p.cargo ? (coresMap[p.cargo] || "#6b7280") : "#6b7280" }))
      setAvailableUsers(usersWithColor)
    } catch (error) { console.error("Erro ao carregar usuários:", error) }
  }

  const loadAvailableEtiquetas = useCallback(async () => {
    try {
      const response = await fetch("/api/whatsapp/etiquetas")
      const data = await response.json()
      if (data.success) setAvailableEtiquetas(data.etiquetas || [])
    } catch (error) { console.error("Erro ao carregar etiquetas:", error) }
  }, [])

  async function handleChangeTemperatura(novaTemperatura: string) {
    if (!existingLead) return
    try {
      setChangingTemperatura(true)
      const currentUserName = getCookie("auth_user_name") || "Sistema"; const currentUserId = getCookie("auth_user_id");
      const temperaturaAnterior = existingLead.temperatura
      const { error } = await supabase.from('leads').update({ temperatura: novaTemperatura }).eq('id', existingLead.id)
      if (error) { toast.error("Erro ao alterar temperatura"); return }
      await supabase.from("chat_history").insert({
        chat_id: chatId, chat_name: safeChatName, event_type: "temperatura_changed",
        event_data: { lead_id: existingLead.id, lead_nome: existingLead.nome, temperatura_anterior: temperaturaAnterior, temperatura_nova: novaTemperatura },
        performed_by_id: currentUserId, performed_by_name: currentUserName
      })
      toast.success(`Temperatura alterada para ${novaTemperatura}`)
      setExistingLead(prev => prev ? { ...prev, temperatura: novaTemperatura } : null)
      onRefresh()
    } catch (error) { toast.error("Erro ao alterar temperatura") } finally { setChangingTemperatura(false) }
  }

  async function handleAssignUser(userId: string, userName: string) {
    try {
      setAssigningUser(true)
      const currentUserId = getCookie("auth_user_id"); const currentUserName = getCookie("auth_user_name");
      const response = await fetch("/api/whatsapp/assignment", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, chatName: safeChatName, assignToId: userId, assignToName: userName, assignedById: currentUserId, assignedByName: currentUserName || "Sistema" }),
      })
      const data = await response.json()
      if (data.success) { toast.success(`Atribuído a ${userName}`); loadAssignment(); setShowAssignPopover(false) }
      else if (data.alreadyAssigned) { toast.warning(data.message); setShowAssignPopover(false) }
      else { toast.error(data.message || "Erro ao atribuir") }
    } catch (error) { toast.error("Erro ao atribuir") } finally { setAssigningUser(false) }
  }

  async function loadActivities() {
      try {
          const res = await fetch(`/api/whatsapp/activity?chatId=${chatId}`)
          if(res.ok) { const data = await res.json(); if(data.success) setActivities(data.activities || []) }
      } catch (e) { console.error(e) }
  }

  async function checkHistory() {
      try {
          const res = await fetch(`/api/whatsapp/chat-history?chatId=${chatId}`)
          if(res.ok) { const data = await res.json(); if(data.success && data.history?.length > 0) setHasHistory(true) }
      } catch (e) { console.error(e) }
      finally { setHistoryLoading(false) }
  }

  async function checkNotes() {
      try {
          const res = await fetch(`/api/whatsapp/notes?chatId=${chatId}`)
          if(res.ok) { const data = await res.json(); if(data.success && data.note) { setHasNotes(true); setNoteContent(data.note.content || null) } else { setHasNotes(false); setNoteContent(null) } }
      } catch (e) { console.error(e) }
  }

  async function handleSendMessage() {
    if ((!newMessage.trim() && !selectedFile) || sending) return
    if (assignment && assignment.assigned_to_id !== userId) { toast.error(`Conversa atribuída a ${assignment.assigned_to_name}`); return }

    const messageContent = newMessage.trim();
    const fileToSend = selectedFile;
    
    // Limpa o input imediatamente para melhor UX
    setNewMessage(""); 
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = ""

    // Cria mensagem otimista para exibir imediatamente
    const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const optimisticMessage: Message = {
      id: tempId,
      body: fileToSend ? (messageContent || `📎 ${fileToSend.name}`) : messageContent,
      timestamp: Date.now(),
      from: chatId,
      to: chatId,
      fromMe: true,
      type: fileToSend ? "document" : "text",
      hasMedia: !!fileToSend,
      ack: 0, // Pendente
      mediaUrl: null,
      mimeType: fileToSend?.type || null,
      caption: fileToSend && messageContent ? messageContent : null,
    };

    // Adiciona a mensagem otimista na lista
    setMessages((prev) => [...prev, optimisticMessage]);
    setTimeout(() => scrollToBottom("smooth"), 50);

    setSending(true)
    try {
        let response;
        if (fileToSend) {
            const formData = new FormData()
            formData.append("chatId", chatId); formData.append("file", fileToSend)
            if (messageContent) formData.append("caption", messageContent)
            response = await fetch("/api/whatsapp/send-media", { method: "POST", body: formData })
        } else {
            response = await fetch("/api/whatsapp/send", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chatId, message: messageContent })
            })
        }
        const data = await response.json()
        if (data.success) {
            // A mensagem otimista será substituída pelo evento do WebSocket
            // que o backend enviará automaticamente após enviar a mensagem
            // Apenas fazemos scroll suave
            setTimeout(() => scrollToBottom("smooth"), 100)
        } else { 
            // Remove a mensagem otimista em caso de erro
            setMessages((prev) => prev.filter(msg => msg.id !== tempId));
            toast.error(data.message || "Erro ao enviar") 
        }
    } catch (err) { 
        // Remove a mensagem otimista em caso de erro
        setMessages((prev) => prev.filter(msg => msg.id !== tempId));
        toast.error("Erro de conexão") 
    } finally { setSending(false) }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) { if (file.size > 16 * 1024 * 1024) return toast.error("Máximo 16MB"); setSelectedFile(file); }
  }

  function handleQuickReply(msg: string) { setNewMessage(msg); setQuickRepliesOpen(false); }
  function removeSelectedFile() { setSelectedFile(null); if(fileInputRef.current) fileInputRef.current.value = ""; }
  async function registerActivity(type: "viewing" | "typing") {
      try { await fetch("/api/whatsapp/activity", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chatId, activityType: type }) }) } catch {}
  }
  function handleKeyPress(e: React.KeyboardEvent) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendMessage() } }

  if (loading && offset === 0) {
    return ( <div className="flex items-center justify-center h-full"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div> )
  }

  return (
    <div className="flex flex-col h-full bg-white relative custom-scrollbar min-w-0 flex-1 overflow-hidden">
      <div className="border-b flex-shrink-0">
        <div className="flex items-center justify-end px-4 pt-2 pb-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="secondary" className="text-xs bg-gray-300 hover:bg-gray-400 text-gray-800 cursor-pointer flex items-center gap-1 rounded-md" onClick={() => { navigator.clipboard.writeText(telefone); toast.success("Telefone copiado!") }} >
                  <Phone className="w-3 h-3" /> {telefone}
                </Badge>
              </TooltipTrigger>
              <TooltipContent><p>Copiar telefone</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex items-center justify-between px-4 pt-1 pb-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar className={cn("w-10 h-10 flex-shrink-0 transition-opacity", hasProfilePicture && "cursor-pointer hover:opacity-80")} onClick={() => hasProfilePicture && setShowProfilePictureModal(true)} >
              <AvatarImage src={profilePictureUrl} alt={safeChatName} className="object-cover" onLoad={() => setHasProfilePicture(true)} onError={() => setHasProfilePicture(false)} />
              <AvatarFallback className="bg-gray-200 dark:bg-gray-700 flex items-center justify-center"> <User className="w-5 h-5 text-gray-500 dark:text-gray-400" /> </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold truncate">{safeChatName}</h3>
                {chatName && chatName.trim() ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowEditNameDialog(true)}> <Pencil className="w-3 h-3" /> </Button>
                      </TooltipTrigger>
                      <TooltipContent><p>Editar nome</p></TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : null}
                
                {assignedUserName && roleColor && (
                  <ContextMenu>
                    <ContextMenuTrigger asChild>
                      <div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="secondary" className="text-xs h-6 px-1.5 flex items-center gap-1 cursor-context-menu rounded-md border" style={{ backgroundColor: `color-mix(in srgb, ${roleColor} 20%, white)`, borderColor: roleColor, color: roleColor }} >
                                <User className="w-3.5 h-3.5" /> {assignedUserName.split(' ')[0]}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent> <p>{assignedUserName.split(' ')[0]} {assignedUserCargo || ''}</p> </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-48">
                      <ContextMenuItem onClick={async () => {
                          try {
                            if (assignment?.id) {
                              const res = await fetch("/api/whatsapp/assignment", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ assignmentId: assignment.id, chatId }) })
                              const data = await res.json()
                              if (res.ok && data.success) { setAssignment(null); setAssignedUserName(null); setAssignedUserCargo(null); setRoleColor(null); toast.success("Atribuição removida"); onRefresh() }
                              else { toast.error(data.message || "Erro ao remover atribuição") }
                            }
                          } catch (error) { toast.error("Erro ao remover atribuição") }
                        }} className="cursor-pointer text-destructive focus:text-destructive" >
                        <X className="w-4 h-4 mr-2" /> Remover atribuição
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                )}
                
                {existingLead && (
                  <ContextMenu>
                    <ContextMenuTrigger asChild>
                      <div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="secondary" className={cn( "text-xs px-1.5 h-6 flex items-center gap-1 cursor-context-menu rounded-md border", existingLead.temperatura === "Quente" && "bg-red-100 border-red-300 text-red-700", existingLead.temperatura === "Morno" && "bg-orange-100 border-orange-300 text-orange-700", existingLead.temperatura === "Frio" && "bg-blue-100 border-blue-300 text-blue-700" )} >
                                <TemperaturaIcon temperatura={existingLead.temperatura} size={14} />
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent side="bottom"><p>{existingLead.temperatura} - Clique com botão direito para alterar</p></TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="min-w-32">
                      {["Quente", "Morno", "Frio"].map((temp) => (
                        <ContextMenuItem key={temp} onClick={() => handleChangeTemperatura(temp)} disabled={changingTemperatura} className="cursor-pointer">
                          <div className="flex items-center gap-2 w-full">
                            <TemperaturaIcon temperatura={temp} size={14} /> <span className="flex-1 text-sm">{temp}</span>
                            {existingLead.temperatura === temp && <Check className="w-4 h-4 text-green-600" />}
                          </div>
                        </ContextMenuItem>
                      ))}
                    </ContextMenuContent>
                  </ContextMenu>
                )}
                
                {existingLead?.status === "convertido" && (
                  <ContextMenu>
                    <ContextMenuTrigger asChild>
                      <div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="secondary" className="text-xs px-1.5 h-6 flex items-center gap-1 cursor-context-menu rounded-md border bg-green-100 border-green-300 text-green-700"> <DollarSign className="w-3.5 h-3.5" /> </Badge>
                            </TooltipTrigger>
                            <TooltipContent side="bottom"><p>Lead Convertido - Clique com botão direito para desconverter</p></TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-48">
                      <ContextMenuItem onClick={() => setShowUnconvertLeadDialog(true)} className="cursor-pointer bg-orange-50 hover:bg-orange-100 text-orange-600 focus:bg-orange-100 focus:text-orange-600">
                        <XCircle className="w-4 h-4 mr-2 text-orange-600" /> Desconverter Lead
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                )}
                
                {existingLead && existingLead.status === "ativo" && existingLead.motivo_desconversao && (
                  <ContextMenu>
                    <ContextMenuTrigger asChild>
                      <div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="secondary" className="text-xs px-1.5 h-6 flex items-center gap-1 cursor-context-menu rounded-md border bg-orange-100 border-orange-300 text-orange-700"> <XCircle className="w-3.5 h-3.5" /> </Badge>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="max-w-[250px]"> <p>Desconvertido: {existingLead.motivo_desconversao.substring(0, 100)}...</p> </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-48">
                      <ContextMenuItem onClick={() => setShowConvertLeadDialog(true)} className="cursor-pointer bg-green-50 hover:bg-green-100 text-green-600 focus:bg-green-100 focus:text-green-600">
                        <DollarSign className="w-4 h-4 mr-2 text-green-600" /> Converter Lead
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                )}
                
                {chatEtiquetas && chatEtiquetas.length > 0 && (
                  <>
                    {user?.show_all_tags ? (
                      chatEtiquetas.map((etiqueta) => (
                        <ContextMenu key={etiqueta.id}>
                          <ContextMenuTrigger asChild>
                            <div>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Badge variant="secondary" className="text-xs h-6 px-1.5 flex items-center gap-1 cursor-context-menu rounded-md border" style={{ backgroundColor: etiqueta.cor, borderColor: etiqueta.cor, color: getContrastTextColor(etiqueta.cor) }}> <Tag className="w-3.5 h-3.5" /> {etiqueta.nome} </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent><p>{etiqueta.descricao || etiqueta.nome}</p></TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </ContextMenuTrigger>
                          <ContextMenuContent className="w-48">
                            <ContextMenuItem onClick={async () => {
                                try {
                                  const res = await fetch("/api/whatsapp/assign-tag", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chatId, etiquetaId: etiqueta.id }) })
                                  if (res.ok) { toast.success("Etiqueta removida"); setChatEtiquetas(prev => prev.filter(e => e.id !== etiqueta.id)); onRefresh() }
                                } catch { toast.error("Erro ao remover etiqueta") }
                              }} className="cursor-pointer text-destructive focus:text-destructive" >
                              <X className="w-4 h-4 mr-2" /> Remover essa etiqueta
                            </ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem onClick={() => setShowEtiquetasDialog(true)} className="cursor-pointer"> <Tags className="w-4 h-4 mr-2" /> Ver todas etiquetas </ContextMenuItem>
                          </ContextMenuContent>
                        </ContextMenu>
                      ))
                    ) : (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="secondary" className="text-xs px-1.5 h-6 flex items-center gap-1 cursor-pointer rounded-md border bg-gray-100 border-gray-300 text-gray-700" onClick={() => setShowEtiquetasDialog(true)}> <Tag className="w-3.5 h-3.5" /> {chatEtiquetas.length} </Badge>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="max-w-[200px] p-1.5">
                            <div className="flex flex-wrap gap-1 items-center">
                              {chatEtiquetas.map((etiqueta) => (
                                <Badge key={etiqueta.id} variant="secondary" className="text-xs px-2 py-0.5 flex items-center gap-1 rounded-md border" style={{ backgroundColor: etiqueta.cor, borderColor: etiqueta.cor, color: getContrastTextColor(etiqueta.cor) }}> <Tag className="w-3.5 h-3.5" /> {etiqueta.nome} </Badge>
                              ))}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </>
                )}
                
                {hasNotes && ( <Badge variant="secondary" className="text-xs px-1.5 h-6 flex items-center gap-1 flex-shrink-0 cursor-pointer rounded-md border bg-yellow-100 border-yellow-300 text-yellow-700" onClick={() => setShowNotesDialog(true)}> <FileText className="w-3.5 h-3.5" /> </Badge> )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 flex-nowrap ml-2">
              {!historyLoading && (
                <TooltipProvider>
                    {hasHistory && ( <Tooltip><TooltipTrigger asChild><Button variant="outline" size="sm" className="h-9" onClick={() => setShowHistoryDialog(true)}><History className="w-4 h-4" /></Button></TooltipTrigger><TooltipContent><p>Histórico</p></TooltipContent></Tooltip> )}
                    {!chatName || !chatName.trim() ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" className="h-9" onClick={() => setShowEditNameDialog(true)}> <Plus className="w-4 h-4 mr-2" /> Adicionar Nome </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Adicionar nome ao contato</p></TooltipContent>
                      </Tooltip>
                    ) : null}
                    {existingLead ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" className="h-9" onClick={handleViewLeadInCRM}> <CRMIcon /> Ver Lead </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Ver lead no CRM</p></TooltipContent>
                      </Tooltip>
                    ) : (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" className="h-9" onClick={() => onToggleLeadPanel(!showLeadPanel)}> <Plus className="w-4 h-4 mr-2" /> Novo Lead </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Criar Lead</p></TooltipContent>
                      </Tooltip>
                    )}
                    <Popover open={showAssignPopover} onOpenChange={setShowAssignPopover}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="h-9"> <UserPlus className="w-4 h-4 mr-2" /> Atribuir </Button>
                          </PopoverTrigger>
                        </TooltipTrigger>
                        <TooltipContent><p>Atribuir</p></TooltipContent>
                      </Tooltip>
                      <PopoverContent className="w-56 p-2" align="start">
                        <div className="space-y-1">
                          {availableUsers.length === 0 ? ( <p className="text-sm text-muted-foreground text-center py-2">Nenhum usuário disponível</p> ) : (
                            availableUsers.map((user) => {
                              const isAssigned = assignment?.assigned_to_id === user.id; const isCurrentUser = userId === user.id
                              return (
                                <button key={user.id} onClick={() => handleAssignUser(user.id, user.nome)} disabled={assigningUser} className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded hover:bg-accent cursor-pointer disabled:opacity-50" >
                                  <div className="w-3 h-3 rounded" style={{ backgroundColor: user.cor }} />
                                  <span className="flex-1 text-left">{user.nome}</span>
                                  <div className="flex items-center gap-1">
                                    {isCurrentUser && <span className="text-xs text-blue-600 font-medium">Você</span>}
                                    {isAssigned && ( <span className="text-xs text-blue-600 font-medium flex items-center gap-1"> <div className="w-2 h-2 rounded-full bg-blue-600" /> Atual </span> )}
                                  </div>
                                </button>
                              )
                            })
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <TagSelector chatId={chatId} currentEtiquetaId={chatEtiquetas?.[0]?.id || null} currentEtiquetaIds={chatEtiquetas?.map(e => e.id) || []} onTagAssigned={onRefresh} availableTags={availableEtiquetas} />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent><p>Adicionar etiqueta</p></TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" className="h-9" onClick={() => setShowNotesDialog(true)}> <StickyNote className="w-4 h-4" /> </Button>
                      </TooltipTrigger>
                      <TooltipContent><p>Notas</p></TooltipContent>
                    </Tooltip>
                    <Tooltip><TooltipTrigger asChild><Button variant="outline" size="sm" className="h-9" onClick={onRefresh}><RefreshCw className="w-4 h-4" /></Button></TooltipTrigger><TooltipContent><p>Atualizar</p></TooltipContent></Tooltip>
                </TooltipProvider>
              )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex flex-col w-full">
          <div ref={scrollContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar" style={{ overscrollBehavior: "contain", WebkitOverflowScrolling: "touch" }} >
            {loadingMore && ( <div className="flex items-center justify-center gap-2 py-4"> <Loader2 className="w-4 h-4 animate-spin" /> <p className="text-sm text-muted-foreground">Carregando antigas...</p> </div> )}
            {!hasMore && messages.length > 0 && ( <div className="text-center py-4"><p className="text-xs text-muted-foreground uppercase tracking-wider">Início da conversa</p></div> )}
            <div className="space-y-3">
              {messages.length === 0 ? ( <div className="flex items-center justify-center h-full"><p className="text-muted-foreground">Nenhuma mensagem ainda</p></div> ) : (
                messages.map((message, index) => {
                  const previousMessage = index > 0 ? messages[index - 1] : null
                  const showDateSeparator = shouldShowDateSeparator(message.timestamp, previousMessage?.timestamp || null)
                  return (
                    <div key={message.id}>
                      {showDateSeparator && ( <DateSeparator date={new Date(message.timestamp)} /> )}
                      <MessageBubble message={message} />
                    </div>
                  )
                })
              )}
              <div ref={messagesEndRef} />
              <div ref={scrollRef} />
            </div>
          </div>

          <div className="border-t p-2 flex-shrink-0 bg-white">
            {selectedFile && (
              <div className="mb-2 flex items-center gap-2 p-2 bg-muted rounded-lg">
                <Paperclip className="w-4 h-4 text-muted-foreground" /> <span className="text-sm flex-1 truncate">{selectedFile.name}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={removeSelectedFile}><X className="w-4 h-4" /></Button>
              </div>
            )}
            <div className="flex gap-2 items-center">
              <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileSelect} />
              <Button variant="outline" size="icon" className="h-10 w-10 flex-shrink-0" onClick={() => fileInputRef.current?.click()} disabled={sending}><Paperclip className="w-5 h-5" /></Button>
              <Button variant="outline" size="icon" className="h-10 w-10 flex-shrink-0" onClick={() => setQuickRepliesOpen(true)}><Zap className="w-5 h-5" /></Button>
              <Textarea value={newMessage} onChange={(e) => { setNewMessage(e.target.value); registerActivity("typing"); }} onKeyDown={handleKeyPress} placeholder="Digite sua mensagem..." className="resize-none min-h-10 max-h-32" />
              <Button onClick={handleSendMessage} disabled={(!newMessage.trim() && !selectedFile) || sending} size="icon" className="h-10 w-10 flex-shrink-0">
                {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Sheet open={quickRepliesOpen} onOpenChange={setQuickRepliesOpen}>
        <SheetContent side="right">
          <SheetHeader><SheetTitle>Respostas Rápidas</SheetTitle><SheetDescription>Selecione para enviar</SheetDescription></SheetHeader>
          <QuickRepliesPanel onSelectReply={handleQuickReply} />
        </SheetContent>
      </Sheet>
      <ChatHistoryDialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog} chatId={chatId} chatName={safeChatName} />
      <EditChatNameDialog open={showEditNameDialog} onOpenChange={setShowEditNameDialog} chatId={chatId} currentName={chatName || chatId} onSuccess={onRefresh} />
      <ChatEtiquetasDialog open={showEtiquetasDialog} onOpenChange={setShowEtiquetasDialog} chatId={chatId} etiquetas={chatEtiquetas} onEtiquetaRemoved={onRefresh} />
      <ChatNotesDialog open={showNotesDialog} onOpenChange={setShowNotesDialog} chatId={chatId} chatName={safeChatName} onNotesChange={() => { checkNotes(); checkHistory() }} />
      <ProfilePictureModal open={showProfilePictureModal} onOpenChange={setShowProfilePictureModal} imageUrl={profilePictureUrl} name={safeChatName} />
      {existingLead && (
        <>
          <ConvertLeadDialog open={showConvertLeadDialog} onOpenChange={setShowConvertLeadDialog} lead={{ id: existingLead.id, nome: existingLead.nome, temperatura: existingLead.temperatura as any, status: existingLead.status as any, proximo_contato: existingLead.proximo_contato, chat_uuid: chatUuid } as Lead} onSuccess={() => { setShowConvertLeadDialog(false); onRefresh() }} />
          <UnconvertLeadDialog open={showUnconvertLeadDialog} onOpenChange={setShowUnconvertLeadDialog} lead={{ id: existingLead.id, nome: existingLead.nome, temperatura: existingLead.temperatura as any, status: "convertido", proximo_contato: existingLead.proximo_contato, chat_uuid: chatUuid } as Lead} onSuccess={() => { setShowUnconvertLeadDialog(false); onRefresh() }} />
        </>
      )}
    </div>
  )
}