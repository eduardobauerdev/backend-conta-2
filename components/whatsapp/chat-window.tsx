"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, RefreshCw, Zap, Loader2, Paperclip, X, User, History, UserPlus } from "lucide-react"
import { QuickRepliesPanel } from "./quick-replies-panel"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { MessageBubble } from "./message-bubble"
import { toast } from "sonner"
import type { Message, ChatAssignmentDB, ChatActivity } from "@/lib/whatsapp-types"
import { useWhatsAppCache } from "@/contexts/whatsapp-cache-context"
import { Badge } from "@/components/ui/badge"
import { AssignmentHistoryDialog } from "./assignment-history-dialog"
import { AssignToUserDialog } from "./assign-to-user-dialog"
import { getCookie } from "@/lib/auth"
import { createClient } from "@/lib/supabase/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getRoleColor } from "@/lib/role-colors"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useRealtimeSubscription } from "@/hooks/use-realtime-subscription"

const MESSAGES_PER_PAGE = 20
const SCROLL_THRESHOLD = 100

// URL do Backend para Proxy de Imagens/Mídia
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://backend-sobt.onrender.com";

interface ChatWindowProps {
  chatId: string
  chatName?: string | null
  chatPicture?: string | null
  onRefresh: () => void
  onToggleLeadPanel: (show: boolean) => void
  showLeadPanel: boolean
}

export function ChatWindow({
  chatId,
  chatName,
  chatPicture = null,
  onRefresh,
  onToggleLeadPanel,
  showLeadPanel,
}: ChatWindowProps) {
  const { getCachedMessages, setCachedMessages, appendMessages, addNewMessage } = useWhatsAppCache()
  const supabase = createClient()

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
  const [hasAssignmentHistory, setHasAssignmentHistory] = useState(false)
  const [showAssignToUserDialog, setShowAssignToUserDialog] = useState(false)
  const [roleColor, setRoleColor] = useState<string | null>(null)
  const userDataCache = useRef<Record<string, { nome: string | null; cargo: string | null; color: string | null }>>({})

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

  const safeChatName = chatName && chatName.trim().length > 0 ? chatName : chatId || "Contato"
  const profilePictureUrl = `${BACKEND_URL}/chats/avatar/${chatId}`;

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
    loadAssignment()
    loadActivities()
    checkAssignmentHistory()
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

  async function checkAssignmentHistory() {
      try {
          const res = await fetch(`/api/whatsapp/assignment-logs?chatId=${chatId}`)
          if(res.ok) {
              const data = await res.json()
              if(data.success && data.logs?.length > 0) setHasAssignmentHistory(true)
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
      <div className="border-b p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar className="w-10 h-10 flex-shrink-0">
              <AvatarImage 
                src={profilePictureUrl}
                alt={safeChatName} 
                className="object-cover"
              />
              <AvatarFallback className="bg-primary text-primary-foreground">{safeChatName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold truncate">{safeChatName}</h3>
                {assignedUserName && roleColor && (
                  <Badge variant="secondary" className="text-xs flex items-center gap-1 border-2" style={{ backgroundColor: roleColor, color: "#ffffff", borderColor: roleColor }}>
                    <User className="w-3 h-3" />
                    {assignedUserName}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <TooltipProvider>
                 {hasAssignmentHistory && (
                    <Tooltip><TooltipTrigger asChild><Button variant="outline" size="sm" onClick={() => setShowHistoryDialog(true)}><History className="w-4 h-4" /></Button></TooltipTrigger><TooltipContent><p>Histórico</p></TooltipContent></Tooltip>
                 )}
                 <Tooltip><TooltipTrigger asChild><Button variant="outline" size="sm" onClick={() => setShowAssignToUserDialog(true)}><User className="w-4 h-4 mr-2" /> Atribuir</Button></TooltipTrigger><TooltipContent><p>Atribuir</p></TooltipContent></Tooltip>
                 <Tooltip><TooltipTrigger asChild><Button variant="outline" size="sm" onClick={() => onToggleLeadPanel(!showLeadPanel)}><UserPlus className="w-4 h-4 mr-2" /> Novo Lead</Button></TooltipTrigger><TooltipContent><p>Criar Lead</p></TooltipContent></Tooltip>
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
                messages.map((message) => <MessageBubble key={message.id} message={message} />)
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

      <AssignmentHistoryDialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog} chatId={chatId} chatName={safeChatName} />
      
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
    </div>
  )
}