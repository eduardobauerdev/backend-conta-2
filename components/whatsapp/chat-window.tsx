"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, RefreshCw, Zap, Loader2, Paperclip, X, User, History, UserPlus, Plus, Tag, Pencil, Tags, StickyNote, Copy, Phone } from "lucide-react"
import { QuickRepliesPanel } from "./quick-replies-panel"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu"
import { MessageBubble } from "./message-bubble"
import { toast } from "sonner"
import type { Message, ChatAssignmentDB, ChatActivity } from "@/lib/whatsapp-types"
import { useWhatsAppCache } from "@/contexts/whatsapp-cache-context"
import { Badge } from "@/components/ui/badge"
import { ChatHistoryDialog } from "./chat-history-dialog"
import { AssignToUserDialog } from "./assign-to-user-dialog"
import { getCookie } from "@/lib/auth"
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
import { getContrastTextColor, formatPhoneNumber } from "@/lib/utils"

const MESSAGES_PER_PAGE = 20
const SCROLL_THRESHOLD = 100

// URL do Backend para Proxy de Imagens/Mídia
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://backend-sobt.onrender.com";

// Ícone SVG do CRM (mesmo usado na Sidebar)
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
}: ChatWindowProps) {
  const { getCachedMessages, setCachedMessages, appendMessages, addNewMessage } = useWhatsAppCache()
  const supabase = createClient()
  const router = useRouter()

  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [quickRepliesOpen, setQuickRepliesOpen] = useState(false)
  const [assignment, setAssignment] = useState<ChatAssignmentDB | null>(null)
  const [assignedUserName, setAssignedUserName] = useState<string | null>(null)
  const [assignedUserCargo, setAssignedUserCargo] = useState<string | null>(null)
  const [activities, setActivities] = useState<ChatActivity[]>([])
  const [showHistoryDialog, setShowHistoryDialog] = useState(false)
  const [showAssignToUserDialog, setShowAssignToUserDialog] = useState(false)
  const [showEditNameDialog, setShowEditNameDialog] = useState(false)
  const [showEtiquetasDialog, setShowEtiquetasDialog] = useState(false)
  const [showNotesDialog, setShowNotesDialog] = useState(false)
  const [showProfilePictureModal, setShowProfilePictureModal] = useState(false)
  const [hasNotes, setHasNotes] = useState(false)
  const [noteContent, setNoteContent] = useState<string | null>(null)
  const [hasHistory, setHasHistory] = useState(false)
  const [roleColor, setRoleColor] = useState<string | null>(null)
  const userDataCache = useRef<Record<string, { nome: string | null; cargo: string | null; color: string | null }>>({})

  // Estado para lead existente
  const [existingLead, setExistingLead] = useState<{ id: string; nome: string; proximo_contato: string | null } | null>(null)

  // Estados locais para nome e etiquetas (atualizados via realtime)
  const [chatName, setChatName] = useState<string | null>(initialChatName || null)
  const [chatEtiquetas, setChatEtiquetas] = useState<EtiquetaSimple[]>(initialEtiquetas)

  const userId = getCookie("auth_user_id")

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const isLoadingRef = useRef(false)
  // Ref para guardar a altura antes de carregar mensagens antigas
  const previousScrollHeightRef = useRef(0)
  
  const isInitialLoadRef = useRef(true)
  const [hasMore, setHasMore] = useState(false)
  const [offset, setOffset] = useState(0)
  const [loadingMore, setLoadingMore] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Prioriza: nome > phone > id.split('@')[0] > id
  const safeChatName = chatName && chatName.trim().length > 0 
    ? chatName 
    : chatTelefone || (chatId?.includes('@') ? chatId.split('@')[0] : chatId) || "Contato"
  const telefone = chatTelefone || (chatId?.includes('@') ? chatId.split('@')[0] : chatId) || ""
  const profilePictureUrl = `${BACKEND_URL}/chats/avatar/${chatId}`;

  // Verifica se existe lead vinculado ao chat
  useEffect(() => {
    async function checkExistingLead() {
      try {
        let query = supabase.from("leads").select("id, nome, proximo_contato")
        
        if (chatUuid) {
          query = query.eq("chat_uuid", chatUuid)
        } else {
          // Usa chatTelefone se disponível, caso contrário extrai do chatId
          const telefoneNum = chatTelefone || (chatId.includes("@") ? chatId.split("@")[0] : chatId)
          query = query.eq("telefone", telefoneNum)
        }
        
        const { data } = await query.limit(1).single()
        
        if (data) {
          setExistingLead(data)
        } else {
          setExistingLead(null)
        }
      } catch {
        setExistingLead(null)
      }
    }
    
    checkExistingLead()
  }, [chatId, chatUuid, supabase])

  // Função para navegar até o lead no CRM
  const handleViewLeadInCRM = () => {
    if (existingLead) {
      const leadDate = existingLead.proximo_contato || new Date().toISOString().split('T')[0]
      router.push(`/crm?leadId=${existingLead.id}&date=${leadDate}`)
    }
  }

  // ----------------------------------------------------
  // --- REALTIME SUBSCRIPTIONS
  // ----------------------------------------------------

  useRealtimeSubscription({
    table: "messages",
    filter: `chat_id=eq.${chatId}`,
    onInsert: (newMsgRow: any) => {
      const newMessage: Message = {
        id: newMsgRow.id,
        body: newMsgRow.content || "",
        timestamp: Number(newMsgRow.timestamp),
        from: newMsgRow.sender_id || "Desconhecido",
        to: newMsgRow.chat_id,
        fromMe: newMsgRow.from_me,
        type: newMsgRow.type || "text",
        hasMedia: newMsgRow.has_media,
        ack: newMsgRow.ack || 0,
        mediaUrl: newMsgRow.has_media ? `${BACKEND_URL}/media/${chatId}/${newMsgRow.id}` : null,
        mimeType: newMsgRow.media_meta?.mimetype,
        caption: null
      }

      setMessages((prev) => {
        if (prev.some(m => m.id === newMessage.id)) return prev;
        return [...prev, newMessage]
      });
      
      if (newMessage.fromMe || isNearBottom()) {
          setTimeout(() => scrollToBottom("smooth"), 100);
      }
    },
    onUpdate: (updatedRow: any) => {
        setMessages(prev => prev.map(m => m.id === updatedRow.id ? { ...m, ack: updatedRow.ack } : m))
    }
  })

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
    onDelete: () => {
      setAssignment(null)
      setAssignedUserName(null)
      setAssignedUserCargo(null)
      setRoleColor(null)
    },
  })

  // Realtime para atualização do botão de histórico
  useRealtimeSubscription({
    table: "chat_history",
    filter: `chat_id=eq.${chatId}`,
    onInsert: () => {
      // Quando qualquer entrada é adicionada ao histórico, ativa o botão
      setHasHistory(true)
    },
  })

  // Realtime para atualização de nome e etiquetas do chat
  useEffect(() => {
    const channel = supabase
      .channel(`chat:${chatId}`)
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'chats',
        filter: `id=eq.${chatId}`
      }, async (payload) => {
        const updatedChat = payload.new as any;
        
        // Atualiza o nome imediatamente
        if (updatedChat.name !== undefined) {
          setChatName(updatedChat.name);
        }
        
        // Usa o array etiqueta_ids diretamente
        const etiquetaIds: string[] = updatedChat.etiqueta_ids || [];

        if (etiquetaIds.length > 0) {
          const { data: etiquetasData } = await supabase
            .from('whatsapp_etiquetas')
            .select('id, nome, cor, descricao')
            .in('id', etiquetaIds);
          
          if (etiquetasData) {
            const etiquetas = etiquetaIds
              .map(id => etiquetasData.find(e => e.id === id))
              .filter(Boolean) as EtiquetaSimple[];
            setChatEtiquetas(etiquetas);
          }
        } else {
          setChatEtiquetas([]);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId, supabase]);

  // Atualiza estados quando props mudam
  useEffect(() => {
    setChatName(initialChatName || null);
  }, [initialChatName]);

  useEffect(() => {
    setChatEtiquetas(initialEtiquetas);
  }, [initialEtiquetas]);

  const handleAssignmentUpdate = async (assignment: any) => {
      if (assignment.status === "active") {
        setAssignment(assignment)
        if (assignment.assigned_to_id) {
            updateUserDataCache(assignment.assigned_to_id)
        }
      }
  }

  const updateUserDataCache = async (userId: string) => {
      if (userDataCache.current[userId]) {
          const cached = userDataCache.current[userId]
          setAssignedUserName(cached.nome)
          setAssignedUserCargo(cached.cargo)
          setRoleColor(cached.color)
      } else {
          const userData = await loadAssignmentUserData(userId)
          userDataCache.current[userId] = userData
          setAssignedUserName(userData.nome)
          setAssignedUserCargo(userData.cargo)
          setRoleColor(userData.color)
      }
  }

  // ----------------------------------------------------
  // --- LIFECYCLE
  // ----------------------------------------------------

  useEffect(() => {
    // 🔥 CORREÇÃO: Limpa a atribuição anterior ANTES de carregar a nova
    setAssignment(null)
    setAssignedUserName(null)
    setAssignedUserCargo(null)
    setRoleColor(null)
    setHasNotes(false)
    setNoteContent(null)
    setHasHistory(false)
    
    loadAssignment()
    loadActivities()
    checkNotes()
    checkHistory()
    registerActivity("viewing")
  }, [chatId])

  useEffect(() => {
    setMessages([])
    setOffset(0)
    setHasMore(true)
    setLoading(true)
    isInitialLoadRef.current = true
    isLoadingRef.current = false
    previousScrollHeightRef.current = 0 // Reseta a referência de scroll
    loadMessages(0, true)
  }, [chatId])

  useEffect(() => {
    // Scroll inicial para o fundo
    if (isInitialLoadRef.current && messages.length > 0 && !loading) {
      // Pequeno timeout para garantir renderização
      setTimeout(() => {
        scrollToBottom("auto")
        isInitialLoadRef.current = false
      }, 50)
    }
  }, [messages, loading])

  // 🔥 CORREÇÃO DO SCROLL (UseLayoutEffect)
  // Isso roda SÍNCRONO após a renderização do DOM, mas antes de pintar na tela.
  // Evita o "pulo" visual quando carregamos mensagens antigas.
  useLayoutEffect(() => {
    if (!loading && previousScrollHeightRef.current > 0 && scrollContainerRef.current) {
      const newScrollHeight = scrollContainerRef.current.scrollHeight
      const heightDifference = newScrollHeight - previousScrollHeightRef.current
      
      // Mantém a posição relativa do scroll
      scrollContainerRef.current.scrollTop = heightDifference
      
      // Reseta a referência
      previousScrollHeightRef.current = 0
    }
  }, [messages, loading])

  // ----------------------------------------------------
  // --- DATA LOADING
  // ----------------------------------------------------

  async function loadMessages(currentOffset: number, isInitial = false) {
    if (isLoadingRef.current) return
    isLoadingRef.current = true

    try {
      if (isInitial) setLoading(true)
      else setLoadingMore(true)

      const rangeEnd = currentOffset + MESSAGES_PER_PAGE - 1

      const { data, error, count } = await supabase
        .from('messages')
        .select('*', { count: 'exact' })
        .eq('chat_id', chatId)
        .order('timestamp', { ascending: false })
        .range(currentOffset, rangeEnd)

      if (error) throw error

      if (data) {
        const normalizedMessages: Message[] = data.map((msg: any) => ({
          id: msg.id,
          body: msg.content || "",
          timestamp: Number(msg.timestamp),
          from: msg.sender_id || "Desconhecido",
          to: msg.chat_id,
          fromMe: msg.from_me,
          type: msg.type || "text",
          hasMedia: msg.has_media,
          ack: msg.ack || 0,
          mediaUrl: msg.has_media ? `${BACKEND_URL}/media/${chatId}/${msg.id}` : null,
          mimeType: msg.media_meta?.mimetype || null,
          caption: null,
        })).reverse()

        if (isInitial) {
          setMessages(normalizedMessages)
        } else {
          // 🛑 AQUI É O TRUQUE:
          // Antes de atualizar o estado, salvamos a altura atual do container
          if (scrollContainerRef.current) {
              previousScrollHeightRef.current = scrollContainerRef.current.scrollHeight
          }
          
          setMessages((prev) => [...normalizedMessages, ...prev])
        }

        const hasMoreData = count ? (currentOffset + data.length) < count : false
        setHasMore(hasMoreData)
        setOffset(prev => prev + data.length)
      }

    } catch (error) {
      console.error("Erro msgs:", error)
      toast.error("Erro ao carregar.")
    } finally {
      setLoading(false)
      setLoadingMore(false)
      isLoadingRef.current = false
    }
  }

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
          if(res.ok) {
              const data = await res.json()
              if(data.success && data.assignment) handleAssignmentUpdate(data.assignment)
          }
      } catch (e) { console.error(e) }
  }

  async function loadActivities() {
      try {
          const res = await fetch(`/api/whatsapp/activity?chatId=${chatId}`)
          if(res.ok) {
              const data = await res.json()
              if(data.success) setActivities(data.activities || [])
          }
      } catch (e) { console.error(e) }
  }

  async function checkHistory() {
      try {
          const res = await fetch(`/api/whatsapp/chat-history?chatId=${chatId}`)
          if(res.ok) {
              const data = await res.json()
              if(data.success && data.history?.length > 0) setHasHistory(true)
          }
      } catch (e) { console.error(e) }
  }

  async function checkNotes() {
      try {
          const res = await fetch(`/api/whatsapp/notes?chatId=${chatId}`)
          if(res.ok) {
              const data = await res.json()
              if(data.success && data.note) {
                setHasNotes(true)
                setNoteContent(data.note.content || null)
              } else {
                setHasNotes(false)
                setNoteContent(null)
              }
          }
      } catch (e) { console.error(e) }
  }

  // ----------------------------------------------------
  // --- UI HANDLERS
  // ----------------------------------------------------

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const scrollTop = target.scrollTop
    // Se chegou no topo e tem mais mensagens, carrega mais
    if (scrollTop < SCROLL_THRESHOLD && hasMore && !isLoadingRef.current && !isInitialLoadRef.current) {
      loadMessages(offset, false)
    }
  }, [offset, hasMore])

  function isNearBottom() {
      if (!scrollContainerRef.current) return false;
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      return (scrollHeight - scrollTop - clientHeight) < 150;
  }

  function scrollToBottom(behavior: ScrollBehavior = "smooth") {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: behavior,
      })
    }
  }

  async function handleSendMessage() {
    if ((!newMessage.trim() && !selectedFile) || sending) return

    if (assignment && assignment.assigned_to_id !== userId) {
      toast.error(`Conversa atribuída a ${assignment.assigned_to_name}`)
      return
    }

    setSending(true)

    try {
        let response;

        if (selectedFile) {
            const formData = new FormData()
            formData.append("chatId", chatId)
            formData.append("file", selectedFile)
            if (newMessage.trim()) formData.append("caption", newMessage.trim())
            
            response = await fetch("/api/whatsapp/send-media", { method: "POST", body: formData })
        } else {
            response = await fetch("/api/whatsapp/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chatId, message: newMessage.trim() })
            })
        }

        const data = await response.json()

        if (data.success) {
            setNewMessage("")
            setSelectedFile(null)
            if (fileInputRef.current) fileInputRef.current.value = ""
            setTimeout(() => scrollToBottom("smooth"), 100)
        } else {
            toast.error(data.message || "Erro ao enviar")
        }

    } catch (err) {
        toast.error("Erro de conexão")
    } finally {
        setSending(false)
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 16 * 1024 * 1024) return toast.error("Máximo 16MB")
      setSelectedFile(file)
    }
  }

  function handleQuickReply(msg: string) { setNewMessage(msg); setQuickRepliesOpen(false); }
  function removeSelectedFile() { setSelectedFile(null); if(fileInputRef.current) fileInputRef.current.value = ""; }
  async function registerActivity(type: "viewing" | "typing") {
      try { await fetch("/api/whatsapp/activity", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chatId, activityType: type }) }) } catch {}
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // ----------------------------------------------------
  // --- RENDER
  // ----------------------------------------------------

  if (loading && offset === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* HEADER */}
      <div className="border-b flex-shrink-0">
        {/* Linha 0: Badge de telefone no canto direito */}
        <div className="flex items-center justify-end px-4 pt-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge 
                  variant="secondary" 
                  className="text-xs bg-gray-300 hover:bg-gray-400 text-gray-800 cursor-pointer flex items-center gap-1"
                  onClick={() => {
                    navigator.clipboard.writeText(telefone)
                    toast.success("Telefone copiado!")
                  }}
                >
                  <Phone className="w-3 h-3" />
                  {telefone}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copiar telefone</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {/* Linha 1: Avatar, Nome, Atribuição, Etiquetas, Notas e Botões */}
        <div className="flex items-center justify-between px-4 pt-1 pb-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar 
              className="w-10 h-10 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setShowProfilePictureModal(true)}
            >
              <AvatarImage 
                src={profilePictureUrl}
                alt={safeChatName} 
                className="object-cover"
              />
              <AvatarFallback className="bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold truncate">{safeChatName}</h3>
                {chatName && chatName.trim() ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => setShowEditNameDialog(true)}
                        >
                          <Pencil className="w-3 h-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Editar nome</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : null}
                
                {/* Badge de atribuição com context menu */}
                {assignedUserName && roleColor && (
                  <ContextMenu>
                    <ContextMenuTrigger asChild>
                      <div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="secondary" className="text-xs flex items-center gap-1 border-2 cursor-context-menu" style={{ backgroundColor: roleColor, color: "#ffffff", borderColor: roleColor }}>
                                <User className="w-3 h-3" />
                                {assignedUserName.split(' ')[0]}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{assignedUserName.split(' ')[0]} {assignedUserCargo || ''}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-48">
                      <ContextMenuItem
                        onClick={async () => {
                          try {
                            if (assignment?.id) {
                              const res = await fetch("/api/whatsapp/assignment", {
                                method: "DELETE",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ assignmentId: assignment.id, chatId })
                              })
                              
                              const data = await res.json()
                              
                              if (res.ok && data.success) {
                                setAssignment(null)
                                setAssignedUserName(null)
                                setAssignedUserCargo(null)
                                setRoleColor(null)
                                toast.success("Atribuição removida")
                                onRefresh()
                              } else {
                                toast.error(data.message || "Erro ao remover atribuição")
                              }
                            }
                          } catch (error) {
                            console.error("Erro ao remover atribuição:", error)
                            toast.error("Erro ao remover atribuição")
                          }
                        }}
                        className="text-destructive focus:text-destructive"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Remover atribuição
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                )}
                
                {/* Etiquetas na mesma linha */}
                {chatEtiquetas && chatEtiquetas.length > 0 && (
                  <>
                    {chatEtiquetas.map((etiqueta) => (
                      <ContextMenu key={etiqueta.id}>
                        <ContextMenuTrigger asChild>
                          <div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Badge
                                    variant="secondary"
                                    className="text-xs flex items-center gap-1 border cursor-context-menu"
                                    style={{ backgroundColor: etiqueta.cor, borderColor: etiqueta.cor, color: getContrastTextColor(etiqueta.cor) }}
                                  >
                                    <Tag className="w-3 h-3" />
                                    {etiqueta.nome}
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{etiqueta.descricao || etiqueta.nome}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </ContextMenuTrigger>
                        <ContextMenuContent className="w-48">
                          <ContextMenuItem
                            onClick={async () => {
                              try {
                                const res = await fetch("/api/whatsapp/assign-tag", {
                                  method: "DELETE",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ chatId, etiquetaId: etiqueta.id })
                                })
                                if (res.ok) {
                                  toast.success("Etiqueta removida")
                                  setChatEtiquetas(prev => prev.filter(e => e.id !== etiqueta.id))
                                  onRefresh()
                                }
                              } catch {
                                toast.error("Erro ao remover etiqueta")
                              }
                            }}
                            className="text-destructive focus:text-destructive"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Remover essa etiqueta
                          </ContextMenuItem>
                          <ContextMenuSeparator />
                          <ContextMenuItem onClick={() => setShowEtiquetasDialog(true)}>
                            <Tags className="w-4 h-4 mr-2" />
                            Ver todas etiquetas
                          </ContextMenuItem>
                        </ContextMenuContent>
                      </ContextMenu>
                    ))}
                  </>
                )}
                
                {/* Badge de Notas */}
                {hasNotes && (
                  <NoteBadge 
                    chatId={chatId} 
                    chatName={safeChatName} 
                    hasNote={hasNotes}
                    noteContent={noteContent}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <TooltipProvider>
                 {hasHistory && (
                    <Tooltip><TooltipTrigger asChild><Button variant="outline" size="sm" onClick={() => setShowHistoryDialog(true)}><History className="w-4 h-4" /></Button></TooltipTrigger><TooltipContent><p>Histórico</p></TooltipContent></Tooltip>
                 )}
                 {!chatName || !chatName.trim() ? (
                   <Tooltip>
                     <TooltipTrigger asChild>
                       <Button variant="outline" size="sm" onClick={() => setShowEditNameDialog(true)}>
                         <Plus className="w-4 h-4 mr-2" /> Adicionar Nome
                       </Button>
                     </TooltipTrigger>
                     <TooltipContent><p>Adicionar nome ao contato</p></TooltipContent>
                   </Tooltip>
                 ) : null}
                 {existingLead ? (
                   <Tooltip>
                     <TooltipTrigger asChild>
                       <Button variant="outline" size="sm" onClick={handleViewLeadInCRM}>
                         <CRMIcon /> Ver Lead
                       </Button>
                     </TooltipTrigger>
                     <TooltipContent><p>Ver lead no CRM</p></TooltipContent>
                   </Tooltip>
                 ) : (
                   <Tooltip>
                     <TooltipTrigger asChild>
                       <Button variant="outline" size="sm" onClick={() => onToggleLeadPanel(!showLeadPanel)}>
                         <UserPlus className="w-4 h-4 mr-2" /> Novo Lead
                       </Button>
                     </TooltipTrigger>
                     <TooltipContent><p>Criar Lead</p></TooltipContent>
                   </Tooltip>
                 )}
                 <Tooltip><TooltipTrigger asChild><Button variant="outline" size="sm" onClick={() => setShowAssignToUserDialog(true)}><User className="w-4 h-4 mr-2" /> Atribuir</Button></TooltipTrigger><TooltipContent><p>Atribuir</p></TooltipContent></Tooltip>
                 <Tooltip>
                   <TooltipTrigger asChild>
                     <div>
                       <TagSelector chatId={chatId} currentEtiquetaId={chatEtiquetas?.[0]?.id || null} currentEtiquetaIds={chatEtiquetas?.map(e => e.id) || []} onTagAssigned={onRefresh} />
                     </div>
                   </TooltipTrigger>
                   <TooltipContent><p>Adicionar etiqueta</p></TooltipContent>
                 </Tooltip>
                 <Tooltip>
                   <TooltipTrigger asChild>
                     <Button 
                       variant="outline" 
                       size="sm" 
                       onClick={() => setShowNotesDialog(true)}
                     >
                       <StickyNote className="w-4 h-4" />
                     </Button>
                   </TooltipTrigger>
                   <TooltipContent><p>Notas</p></TooltipContent>
                 </Tooltip>
                 <Tooltip><TooltipTrigger asChild><Button variant="outline" size="sm" onClick={onRefresh}><RefreshCw className="w-4 h-4" /></Button></TooltipTrigger><TooltipContent><p>Atualizar</p></TooltipContent></Tooltip>
             </TooltipProvider>
          </div>
        </div>
      </div>

      {/* MESSAGES AREA */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex flex-col w-full">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-4 space-y-4"
            style={{ overscrollBehavior: "contain", WebkitOverflowScrolling: "touch" }}
          >
            {loadingMore && (
              <div className="flex items-center justify-center gap-2 py-4">
                <Loader2 className="w-4 h-4 animate-spin" />
                <p className="text-sm text-muted-foreground">Carregando antigas...</p>
              </div>
            )}

            {!hasMore && messages.length > 0 && (
              <div className="text-center py-4"><p className="text-xs text-muted-foreground">Início da conversa</p></div>
            )}

            <div className="space-y-3">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full"><p className="text-muted-foreground">Nenhuma mensagem ainda</p></div>
              ) : (
                messages.map((message, index) => {
                  const previousMessage = index > 0 ? messages[index - 1] : null
                  const showDateSeparator = shouldShowDateSeparator(
                    message.timestamp,
                    previousMessage?.timestamp || null
                  )
                  
                  return (
                    <div key={message.id}>
                      {showDateSeparator && (
                        <DateSeparator date={new Date(message.timestamp)} />
                      )}
                      <MessageBubble message={message} />
                    </div>
                  )
                })
              )}
              <div ref={scrollRef} />
            </div>
          </div>

          {/* INPUT AREA */}
          <div className="border-t p-4 flex-shrink-0 bg-white">
            {selectedFile && (
              <div className="mb-2 flex items-center gap-2 p-2 bg-muted rounded-lg">
                <Paperclip className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm flex-1 truncate">{selectedFile.name}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={removeSelectedFile}><X className="w-4 h-4" /></Button>
              </div>
            )}
            <div className="flex gap-2">
              <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileSelect} />
              <Button variant="outline" size="icon" className="h-[60px] w-[60px] flex-shrink-0" onClick={() => fileInputRef.current?.click()} disabled={sending}><Paperclip className="w-5 h-5" /></Button>
              <Button variant="outline" size="icon" className="h-[60px] w-[60px] flex-shrink-0" onClick={() => setQuickRepliesOpen(true)}><Zap className="w-5 h-5" /></Button>
              <Textarea
                value={newMessage}
                onChange={(e) => { setNewMessage(e.target.value); registerActivity("typing"); }}
                onKeyDown={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="resize-none min-h-[60px] max-h-[200px]"
              />
              <Button onClick={handleSendMessage} disabled={(!newMessage.trim() && !selectedFile) || sending} size="icon" className="h-[60px] w-[60px] flex-shrink-0">
                {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* DIALOGS E SHEETS */}
      <Sheet open={quickRepliesOpen} onOpenChange={setQuickRepliesOpen}>
        <SheetContent side="right">
          <SheetHeader><SheetTitle>Respostas Rápidas</SheetTitle><SheetDescription>Selecione para enviar</SheetDescription></SheetHeader>
          <QuickRepliesPanel onSelectReply={handleQuickReply} />
        </SheetContent>
      </Sheet>

      <ChatHistoryDialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog} chatId={chatId} chatName={safeChatName} />
      
      <AssignToUserDialog
        open={showAssignToUserDialog}
        onOpenChange={setShowAssignToUserDialog}
        chatId={chatId}
        chatName={safeChatName}
        currentUserId={userId}
        currentAssignment={assignment}
        chatAssignment={assignment}
        onAssignSuccess={loadAssignment}
      />

      <EditChatNameDialog
        open={showEditNameDialog}
        onOpenChange={setShowEditNameDialog}
        chatId={chatId}
        currentName={chatName || chatId}
        onSuccess={onRefresh}
      />

      <ChatEtiquetasDialog
        open={showEtiquetasDialog}
        onOpenChange={setShowEtiquetasDialog}
        chatId={chatId}
        etiquetas={chatEtiquetas}
        onEtiquetaRemoved={() => {
          onRefresh()
        }}
      />

      <ChatNotesDialog
        open={showNotesDialog}
        onOpenChange={setShowNotesDialog}
        chatId={chatId}
        chatName={safeChatName}
        onNotesChange={() => {
          checkNotes()
          checkHistory()
        }}
      />

      <ProfilePictureModal
        open={showProfilePictureModal}
        onOpenChange={setShowProfilePictureModal}
        imageUrl={profilePictureUrl}
        name={safeChatName}
      />
    </div>
  )
}