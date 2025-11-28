"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
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

const MESSAGES_PER_PAGE = 10
const SCROLL_THRESHOLD = 100

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
  const { getCachedMessages, setCachedMessages, appendMessages, addNewMessage, invalidateMessagesCache } =
    useWhatsAppCache()

  console.log("chatPicture recebido:", chatPicture)

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
  const previousScrollHeightRef = useRef(0)
  const previousScrollTopRef = useRef(0)
  const isInitialLoadRef = useRef(true)
  const [hasMore, setHasMore] = useState(false)
  const [offset, setOffset] = useState(0)
  const [loadingMore, setLoadingMore] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fallback seguro para nome do chat
  const safeChatName =
    chatName && chatName.trim().length > 0
      ? chatName
      : chatId && chatId.trim().length > 0
        ? chatId
        : "Contato"

  // ----------------------------------------------------
  // --- REALTIME SUBSCRIPTIONS (Atividades e Atribuição)
  // ----------------------------------------------------

  useRealtimeSubscription({
    table: "chat_activity",
    filter: `chat_id=eq.${chatId}`,
    onInsert: (activity: any) => {
      setActivities((prev) => {
        const exists = prev.some((a) => a.user_id === activity.user_id)
        if (exists) {
          return prev.map((a) => (a.user_id === activity.user_id ? activity : a))
        }
        return [...prev, activity]
      })
    },
    onUpdate: (activity: any) => {
      setActivities((prev) => prev.map((a) => (a.user_id === activity.user_id ? activity : a)))
    },
    onDelete: (activity: any) => {
      setActivities((prev) => prev.filter((a) => a.user_id !== activity.user_id))
    },
  })

  useRealtimeSubscription({
    table: "chat_assignments",
    filter: `chat_id=eq.${chatId}`,
    onInsert: async (assignment: any) => {
      if (assignment.status === "active") {
        setAssignment(assignment)

        if (assignment.assigned_to_name && assignment.assigned_to_id) {
          const cachedData = userDataCache.current[assignment.assigned_to_id]

          if (cachedData) {
            setAssignedUserName(cachedData.nome)
            setAssignedUserCargo(cachedData.cargo)
            setRoleColor(cachedData.color)
          } else {
            const userData = await loadAssignmentUserData(assignment.assigned_to_id)
            userDataCache.current[assignment.assigned_to_id] = userData
            setAssignedUserName(userData.nome)
            setAssignedUserCargo(userData.cargo)
            setRoleColor(userData.color)
          }
        }
      }
    },
    onUpdate: async (assignment: any) => {
      if (assignment.status === "active") {
        setAssignment(assignment)

        const cachedData = userDataCache.current[assignment.assigned_to_id]

        if (cachedData) {
          setAssignedUserName(cachedData.nome)
          setAssignedUserCargo(cachedData.cargo)
          setRoleColor(cachedData.color)
        } else if (assignment.assigned_to_id) {
          const userData = await loadAssignmentUserData(assignment.assigned_to_id)

          userDataCache.current[assignment.assigned_to_id] = userData
          setAssignedUserName(userData.nome)
          setAssignedUserCargo(userData.cargo)
          setRoleColor(userData.color)
        }
      }
    },
    onDelete: (assignment: any) => {
      setAssignment(null)
      setAssignedUserName(null)
      setAssignedUserCargo(null)
      setRoleColor(null)
    },
  })

  // ----------------------------------------------------
  // --- LIFECYCLE & INITIAL LOAD
  // ----------------------------------------------------

  useEffect(() => {
    loadAssignment()
    loadActivities()
    checkAssignmentHistory()
    registerActivity("viewing")
  }, [chatId])

  useEffect(() => {
    const cachedData = getCachedMessages(chatId)

    if (cachedData) {
      setMessages(cachedData.messages)
      setHasMore(cachedData.hasMore)
      setOffset(cachedData.totalMessages)
      setLoading(false)
      isInitialLoadRef.current = true
      return
    }

    setMessages([])
    setOffset(0)
    setHasMore(true)
    setLoading(true)
    isInitialLoadRef.current = true
    isLoadingRef.current = false

    loadMessages(0, true)
  }, [chatId, getCachedMessages])

  useEffect(() => {
    if (isInitialLoadRef.current && messages.length > 0 && !loading) {
      setTimeout(() => {
        scrollToBottom("auto")
        isInitialLoadRef.current = false
      }, 100)
    }
  }, [messages, loading])

  useEffect(() => {
    if (!loading && !isLoadingRef.current && previousScrollHeightRef.current > 0 && scrollContainerRef.current) {
      const newScrollHeight = scrollContainerRef.current.scrollHeight
      const heightDifference = newScrollHeight - previousScrollHeightRef.current

      scrollContainerRef.current.scrollTop = previousScrollTopRef.current + heightDifference

      previousScrollHeightRef.current = 0
      previousScrollTopRef.current = 0
    }
  }, [messages, loading])

  // ----------------------------------------------------
  // --- DATA LOADING & CACHING
  // ----------------------------------------------------

  async function loadAssignmentUserData(userId: string) {
    try {
      const supabase = createClient()
      const { data: perfilData, error: perfilError } = await supabase
        .from("perfis")
        .select("nome, cargo")
        .eq("id", userId)
        .single()

      if (perfilError) {
        return { nome: null, cargo: null, color: null }
      }

      if (perfilData?.cargo) {
        const { data: cargoData } = await supabase
          .from("cargos")
          .select("cor")
          .eq("nome", perfilData.cargo)
          .maybeSingle()

        const color = cargoData?.cor || getRoleColor(perfilData.cargo)

        return {
          nome: perfilData.nome || null,
          cargo: perfilData.cargo || null,
          color: color,
        }
      }

      return { nome: perfilData?.nome || null, cargo: perfilData?.cargo || null, color: null }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error)
      return { nome: null, cargo: null, color: null }
    }
  }

  async function loadAssignment() {
    try {
      const response = await fetch(`/api/whatsapp/assignments?chatId=${chatId}`)
      if (!response.ok) {
        console.error("[API] Erro ao buscar atribuição:", response.status)
        setAssignment(null)
        setAssignedUserName(null)
        setAssignedUserCargo(null)
        setRoleColor(null)
        return
      }

      const text = await response.text()
      if (!text) {
        setAssignment(null)
        setAssignedUserName(null)
        setAssignedUserCargo(null)
        setRoleColor(null)
        return
      }

      try {
        const data = JSON.parse(text)

        if (data.success && data.assignment && data.assignment.assigned_to_id) {
          setAssignment(data.assignment)

          const cachedData = userDataCache.current[data.assignment.assigned_to_id]
          if (cachedData) {
            setAssignedUserName(cachedData.nome)
            setAssignedUserCargo(cachedData.cargo)
            setRoleColor(cachedData.color)
          } else {
            const userData = await loadAssignmentUserData(data.assignment.assigned_to_id)
            userDataCache.current[data.assignment.assigned_to_id] = userData
            setAssignedUserName(userData.nome)
            setAssignedUserCargo(userData.cargo)
            setRoleColor(userData.color)
          }
        } else {
          setAssignment(null)
          setAssignedUserName(null)
          setAssignedUserCargo(null)
          setRoleColor(null)
        }
      } catch {
        return
      }
    } catch (error) {
      console.error("[v0] Erro ao carregar atribuição:", error)
      setAssignment(null)
      setAssignedUserName(null)
      setAssignedUserCargo(null)
      setRoleColor(null)
    }
  }

  async function loadActivities() {
    try {
      const response = await fetch(`/api/whatsapp/activity?chatId=${chatId}`)
      if (!response.ok) {
        if (response.status !== 429 && response.status !== 500) {
          console.error("[API] Erro ao buscar atividades:", response.status)
        }
        return
      }

      const text = await response.text()
      if (!text) return

      try {
        const data = JSON.parse(text)
        if (data.success) {
          setActivities(data.activities || [])
        }
      } catch {
        return
      }
    } catch (error) {
      if (error instanceof TypeError && !error.message.includes("Failed to fetch")) {
        console.error("[v0] Erro ao buscar atividades:", error)
      }
    }
  }

  async function loadMessages(currentOffset: number, isInitial = false) {
    if (isLoadingRef.current) {
      return
    }

    isLoadingRef.current = true

    if (!isInitial && scrollContainerRef.current) {
      previousScrollHeightRef.current = scrollContainerRef.current.scrollHeight
      previousScrollTopRef.current = scrollContainerRef.current.scrollTop
    }

    try {
      if (isInitial) {
        setLoading(true)
      } else {
        setLoadingMore(true)
      }

      const url = `/api/whatsapp/messages/${chatId}?limit=${MESSAGES_PER_PAGE}&offset=${currentOffset}`

      const response = await fetch(url)
      const data = await response.json()

      if (data.success) {
        const normalizedMessages = (data.messages || []).map((msg: any) => ({
          id: msg.id,
          body: msg.text || msg.body || "",
          timestamp: msg.timestamp,
          from: msg.senderName || msg.from || "Desconhecido",
          to: msg.to || chatId,
          fromMe: msg.fromMe || false,
          type: msg.type || "text",
          hasMedia: msg.hasMedia || false,
          ack: msg.ack || 0,
          mediaUrl: msg.mediaUrl || null,
          mimeType: msg.mimeType || null,
          caption: msg.caption || null,
        }))

        if (isInitial) {
          setMessages(normalizedMessages)
          setCachedMessages(chatId, normalizedMessages, data.hasMore || false, normalizedMessages.length)
        } else {
          setMessages((prev) => [...normalizedMessages, ...prev])
          appendMessages(chatId, normalizedMessages, data.hasMore || false)
        }

        setHasMore(data.hasMore || false)
        setOffset(currentOffset + normalizedMessages.length)

        console.log(
          "[v0] Mensagens carregadas:",
          normalizedMessages.length,
          "| Total:",
          currentOffset + normalizedMessages.length,
          "| Tem mais:",
          data.hasMore || false,
        )
      } else {
        toast.error(data.message || "Erro ao carregar mensagens")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
      console.error("[v0] Erro ao carregar mensagens:", errorMessage)
      toast.error("Não foi possível conectar ao servidor. Verifique a configuração da API.")
    } finally {
      setLoading(false)
      setLoadingMore(false)
      isLoadingRef.current = false
    }
  }

  async function checkAssignmentHistory() {
    try {
      const response = await fetch(`/api/whatsapp/assignment-logs?chatId=${chatId}`)
      if (!response.ok) {
        console.error("[API] Erro ao buscar logs:", response.status)
        return
      }
      const text = await response.text()
      if (!text) return
      const data = JSON.parse(text)

      if (data.success) {
        setHasAssignmentHistory((data.logs || []).length > 0)
      }
    } catch (error) {
      console.error("[v0] Erro ao verificar histórico:", error)
    }
  }

  // ----------------------------------------------------
  // --- UI & USER INTERACTION HANDLERS
  // ----------------------------------------------------

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget
      const scrollTop = target.scrollTop

      if (scrollTop < SCROLL_THRESHOLD && hasMore && !isLoadingRef.current && !isInitialLoadRef.current) {
        loadMessages(offset, false)
      }
    },
    [offset, hasMore],
  )

  async function registerActivity(type: "viewing" | "typing") {
    try {
      await fetch("/api/whatsapp/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId,
          activityType: type,
        }),
      })
    } catch (error) {
      console.error("[v0] Erro ao registrar atividade:", error)
    }
  }

  async function handleAssignToMe() {
    try {
      const response = await fetch("/api/whatsapp/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId,
          chatName: safeChatName,
          assignToId: getCookie("auth_user_id"),
          assignToName: decodeURIComponent(getCookie("auth_user_name") || ""),
          autoAssign: false,
        }),
      })

      if (!response.ok) {
        toast.error("Erro ao atribuir conversa")
        return
      }
      const text = await response.text()
      if (!text) {
        toast.error("Resposta vazia do servidor")
        return
      }

      const data = JSON.parse(text)

      if (data.success) {
        setAssignment(data.assignment)
        if (data.assignment.assigned_to_id) {
          const cachedData = userDataCache.current[data.assignment.assigned_to_id]
          if (cachedData) {
            setAssignedUserName(cachedData.nome)
            setAssignedUserCargo(cachedData.cargo)
            setRoleColor(cachedData.color)
          } else {
            const userData = await loadAssignmentUserData(data.assignment.assigned_to_id)
            userDataCache.current[data.assignment.assigned_to_id] = userData
            setAssignedUserName(userData.nome)
            setAssignedUserCargo(userData.cargo)
            setRoleColor(userData.color)
          }
        }
        toast.success("Conversa atribuída para você")
        checkAssignmentHistory()
      } else {
        toast.error(data.message || "Erro ao atribuir conversa")
      }
    } catch (error) {
      console.error("[v0] Erro ao atribuir conversa:", error)
      toast.error("Erro ao atribuir conversa")
    }
  }

  async function handleReleaseChat() {
    try {
      const response = await fetch(`/api/whatsapp/assignments?chatId=${chatId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        toast.error("Erro ao liberar conversa")
        return
      }
      const text = await response.text()
      if (!text) {
        toast.error("Resposta vazia do servidor")
        return
      }
      const data = JSON.parse(text)

      if (data.success) {
        setAssignment(null)
        setAssignedUserName(null)
        setAssignedUserCargo(null)
        setRoleColor(null)
        toast.success("Conversa liberada")
        setShowAssignToUserDialog(false)
        checkAssignmentHistory()
      } else {
        toast.error(data.message || "Erro ao liberar conversa")
      }
    } catch (error) {
      console.error("[v0] Erro ao liberar conversa:", error)
      toast.error("Erro ao liberar conversa")
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 16 * 1024 * 1024) {
        toast.error("Arquivo muito grande. Máximo 16MB.")
        return
      }
      setSelectedFile(file)
    }
  }

  function removeSelectedFile() {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  async function handleSendMessage() {
    if ((!newMessage.trim() && !selectedFile) || sending) return

    if (assignment && assignment.assigned_to_id !== getCookie("auth_user_id")) {
      toast.error(`Esta conversa está sendo atendida por ${assignment.assigned_to_name}`)
      return
    }

    // Auto-atribuição se não houver atribuição ativa
    if (!assignment && getCookie("auth_user_id") && getCookie("auth_user_name")) {
      await fetch("/api/whatsapp/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId,
          chatName: safeChatName,
          assignToId: getCookie("auth_user_id"),
          assignToName: decodeURIComponent(getCookie("auth_user_name") || ""),
          autoAssign: true,
        }),
      })
      loadAssignment()
    }

    setSending(true)

    try {
      if (selectedFile) {
        // Envio de Mídia
        const formData = new FormData()
        formData.append("chatId", chatId)
        formData.append("file", selectedFile)

        if (newMessage.trim()) {
          formData.append("caption", newMessage.trim())
        }

        const response = await fetch("/api/whatsapp/send-media", {
          method: "POST",
          body: formData,
        })

        const data = await response.json()

        if (data.success) {
          await fetch("/api/whatsapp/track-message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              messageId: data.messageId || `temp-${Date.now()}`,
              chatId,
              messageBody: newMessage.trim() || null,
              messageType: "media",
            }),
          })

          const newMsgBody = newMessage.trim()
          setNewMessage("")
          setSelectedFile(null)
          if (fileInputRef.current) {
            fileInputRef.current.value = ""
          }
          toast.success("Mídia enviada")

          const newMsg: Message = {
            id: `temp-${Date.now()}`,
            body: newMsgBody || "",
            timestamp: Date.now(),
            from: "Você",
            to: chatId,
            fromMe: true,
            type: "media",
            hasMedia: true,
            ack: 1,
            mediaUrl: null,
            mimeType: selectedFile.type,
            caption: newMsgBody || null,
          }
          setMessages((prev) => [...prev, newMsg])
          addNewMessage(chatId, newMsg)

          setTimeout(() => scrollToBottom("smooth"), 100)
        } else {
          toast.error(data.message || "Erro ao enviar mídia")
        }
      } else {
        // Envio de Texto
        const response = await fetch("/api/whatsapp/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatId: chatId,
            message: newMessage.trim(),
          }),
        })

        const data = await response.json()

        if (data.success) {
          await fetch("/api/whatsapp/track-message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              messageId: data.messageId || `temp-${Date.now()}`,
              chatId,
              messageBody: newMessage.trim(),
              messageType: "text",
            }),
          })

          const messageSent = newMessage.trim()

          setNewMessage("")
          toast.success("Mensagem enviada")

          const newMsg: Message = {
            id: `temp-${Date.now()}`,
            body: messageSent,
            timestamp: Date.now(),
            from: "Você",
            to: chatId,
            fromMe: true,
            type: "text",
            hasMedia: false,
            ack: 1,
            mediaUrl: null,
            mimeType: null,
            caption: null,
          }
          setMessages((prev) => [...prev, newMsg])
          addNewMessage(chatId, newMsg)

          setTimeout(() => scrollToBottom("smooth"), 100)
        } else {
          toast.error(data.message || "Erro ao enviar mensagem")
        }
      }
    } catch (error) {
      console.error("[v0] ❌ Erro ao enviar mensagem:", error)
      toast.error("Não foi possível enviar a mensagem. Verifique a conexão com o servidor.")
    } finally {
      setSending(false)
    }
  }

  function scrollToBottom(behavior: ScrollBehavior = "smooth") {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: behavior,
      })
    }
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  function handleMessageChange(value: string) {
    setNewMessage(value)

    if (value.trim()) {
      registerActivity("typing")
    }
  }

  function handleQuickReply(message: string) {
    setNewMessage(message)
    setQuickRepliesOpen(false)
  }

  const assignmentForDialog = assignment
    ? {
        chatId: chatId,
        chatName: safeChatName,
        assignToId: assignment.assigned_to_id,
        assignToName: assignment.assigned_to_name,
        autoAssign: false,
        ...assignment,
      }
    : null

  // ----------------------------------------------------
  // --- RENDER
  // ----------------------------------------------------

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const viewingUsers = activities.filter((a) => a.activity_type === "viewing")
  const typingUsers = activities.filter((a) => a.activity_type === "typing")

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="border-b p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar className="w-10 h-10 flex-shrink-0">
              {chatPicture && <AvatarImage src={chatPicture} alt={safeChatName} />}
              <AvatarFallback className="bg-primary text-primary-foreground">
                {safeChatName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold truncate">{safeChatName}</h3>
                {assignedUserName && roleColor && (
                  <Badge
                    variant="secondary"
                    className="text-xs flex items-center gap-1 border-2"
                    style={{
                      backgroundColor: roleColor,
                      color: "#ffffff",
                      borderColor: roleColor,
                    }}
                  >
                    <User className="w-3 h-3" />
                    {assignedUserName}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <TooltipProvider delayDuration={200}>
              {hasAssignmentHistory && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setShowHistoryDialog(true)}>
                      <History className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Histórico</p>
                  </TooltipContent>
                </Tooltip>
              )}

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={() => setShowAssignToUserDialog(true)}>
                    <User className="w-4 h-4 mr-2" />
                    Atribuir
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Atribuir conversa</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={() => onToggleLeadPanel(!showLeadPanel)}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Novo Lead
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Criar lead desta conversa</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={onRefresh}>
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Atualizar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex flex-col w-full">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-4 space-y-4"
            style={{
              overscrollBehavior: "contain",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {loadingMore && (
              <div className="flex items-center justify-center gap-2 py-4">
                <Loader2 className="w-4 h-4 animate-spin" />
                <p className="text-sm text-muted-foreground">Carregando mensagens antigas...</p>
              </div>
            )}

            {!hasMore && messages.length > 0 && (
              <div className="text-center py-4">
                <p className="text-xs text-muted-foreground">Início da conversa</p>
              </div>
            )}
            <div className="space-y-3">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">Nenhuma mensagem ainda</p>
                </div>
              ) : (
                messages.map((message) => <MessageBubble key={message.id} message={message} />)
              )}
              <div ref={scrollRef} />
            </div>
          </div>

          <div className="border-t p-4 flex-shrink-0 bg-white">
            {selectedFile && (
              <div className="mb-2 flex items-center gap-2 p-2 bg-muted rounded-lg">
                <Paperclip className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm flex-1 truncate">{selectedFile.name}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={removeSelectedFile}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
                onChange={handleFileSelect}
              />
              <Button
                variant="outline"
                size="icon"
                className="h-[60px] w-[60px] flex-shrink-0 bg-transparent"
                onClick={() => fileInputRef.current?.click()}
                disabled={sending}
              >
                <Paperclip className="w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-[60px] w-[60px] flex-shrink-0 bg-transparent"
                onClick={() => setQuickRepliesOpen(true)}
              >
                <Zap className="w-5 h-5" />
              </Button>
              <Textarea
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value)
                  registerActivity("typing")
                }}
                onKeyDown={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="resize-none min-h-[60px] max-h-[200px]"
                rows={2}
              />
              <Button
                onClick={handleSendMessage}
                disabled={(!newMessage.trim() && !selectedFile) || sending}
                size="icon"
                className="h-[60px] w-[60px] flex-shrink-0"
              >
                {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Sheet open={quickRepliesOpen} onOpenChange={setQuickRepliesOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Respostas Rápidas</SheetTitle>
            <SheetDescription>Selecione uma resposta rápida para enviar</SheetDescription>
          </SheetHeader>
          <QuickRepliesPanel onSelectReply={handleQuickReply} />
        </SheetContent>
      </Sheet>

      <AssignmentHistoryDialog
        open={showHistoryDialog}
        onOpenChange={setShowHistoryDialog}
        chatId={chatId}
        chatName={safeChatName}
      />

      <AssignToUserDialog
        open={showAssignToUserDialog}
        onOpenChange={setShowAssignToUserDialog}
        chatId={chatId}
        chatName={safeChatName}
        currentUserId={userId}
        currentAssignment={assignmentForDialog}
        onAssignSuccess={() => {
          loadAssignment()
        }}
      />
    </div>
  )
}
