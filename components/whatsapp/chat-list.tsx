"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback, useMemo, forwardRef, type ElementRef } from "react" 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, AlertCircle, RefreshCw, Loader2, User } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Chat } from "@/lib/whatsapp-types"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useWhatsAppCache } from "@/contexts/whatsapp-cache-context"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import useSWR, { mutate, useSWRConfig } from "swr"
import { ATTR_CACHE_KEY, CHAT_LIST_CACHE_KEY } from "@/lib/swr-config"
import type { AtribuicoesMap } from "@/lib/swr-config"
import { getCookie } from "@/lib/auth" 

interface ChatListProps {
  onSelectChat: (chat: Chat) => void
  selectedChatId: string | null
  refreshTrigger?: number
  initialData?: any
}

const CHATS_PER_PAGE = 20
const SCROLL_THRESHOLD = 100

type ChatListHandle = ElementRef<"div">; 

const ChatList = forwardRef<ChatListHandle, ChatListProps>(
  ({ onSelectChat, selectedChatId, refreshTrigger, initialData }, ref) => { 
    const { data: cachedChats = initialData?.chats || [] } = useSWR(CHAT_LIST_CACHE_KEY)
    const { data: assignmentsMap = initialData?.assignmentsMap || {} } = useSWR<AtribuicoesMap>(ATTR_CACHE_KEY)
    
    const { getCachedChats, setCachedChats, appendChats } = useWhatsAppCache()
    const router = useRouter()
    const { mutate: globalMutate } = useSWRConfig()

    const [chats, setChats] = useState<Chat[]>(cachedChats)
    const [searchQuery, setSearchQuery] = useState("")
    
    const [filterMode, setFilterMode] = useState<"all" | "mine">("all")
    const [currentUserId, setCurrentUserId] = useState<string | null>(null)
    const [isAuthLoaded, setIsAuthLoaded] = useState(false)
    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [loadingMore, setLoadingMore] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [offset, setOffset] = useState(0)

    const scrollContainerRef = (ref as React.RefObject<HTMLDivElement>) || useRef<HTMLDivElement>(null); 
    const isLoadingRef = useRef(false)

    useEffect(() => {
      const userIdFromCookie = getCookie("auth_user_id")

      if (userIdFromCookie) {
        setCurrentUserId(userIdFromCookie) 
      }
      
      setIsAuthLoaded(true) 
    }, [])

    useEffect(() => {
      if (cachedChats && cachedChats.length > 0) {
        setChats(cachedChats)
        setLoading(false)
      }
    }, [cachedChats])

    useEffect(() => {
      const loadInitialAssignments = async () => {
        const supabase = createClient()

        try {
          const { data: activeAssignments, error } = await supabase
            .from("chat_assignments")
            .select("*")
            .eq("status", "active")

          if (error || !activeAssignments || activeAssignments.length === 0) return

          const userIds = Array.from(new Set(activeAssignments.map((a) => a.assigned_to_id)))
          
          const { data: profiles } = await supabase
            .from("perfis")
            .select("id, nome, cargo")
            .in("id", userIds)

          const cargosUnicos = Array.from(new Set(profiles?.map((p) => p.cargo).filter(Boolean))) as string[]
          const coresMap: Record<string, string> = {}

          if (cargosUnicos.length > 0) {
            const { data: cargosData } = await supabase
              .from("cargos")
              .select("nome, cor")
              .in("nome", cargosUnicos)
              
            cargosData?.forEach((c) => {
              coresMap[c.nome] = c.cor
            })
          }

          const newAssignmentsMap: AtribuicoesMap = {}
          
          activeAssignments.forEach((assignment) => {
            const profile = profiles?.find((p) => p.id === assignment.assigned_to_id)
            if (profile) {
              newAssignmentsMap[assignment.chat_id] = {
                assigned_to_id: assignment.assigned_to_id,
                assigned_to_name: profile.nome,
                assigned_to_cargo: profile.cargo,
                assigned_to_color: profile.cargo ? coresMap[profile.cargo] : undefined,
              }
            }
          })

          mutate(ATTR_CACHE_KEY, newAssignmentsMap, false)
        } catch (err) {
          console.error("Erro ao carregar badges:", err)
        }
      }

      loadInitialAssignments()
    }, [])

    useEffect(() => {
      const supabase = createClient()

      const channel = supabase
        .channel("chat_assignments_realtime")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "chat_assignments",
            filter: "status=eq.active",
          },
          async (payload) => {
            const currentMap = assignmentsMap || {}

            if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
              const assignment = payload.new as any

              const { data: userData } = await supabase
                .from("perfis")
                .select("nome, cargo")
                .eq("id", assignment.assigned_to_id)
                .single()

              let cargoColor: string | undefined
              if (userData?.cargo) {
                const { data: cargoData } = await supabase
                  .from("cargos")
                  .select("cor")
                  .eq("nome", userData.cargo)
                  .maybeSingle()
                cargoColor = cargoData?.cor
              }

              mutate(
                ATTR_CACHE_KEY,
                {
                  ...currentMap,
                  [assignment.chat_id]: {
                    assigned_to_id: assignment.assigned_to_id,
                    assigned_to_name: userData?.nome || "",
                    assigned_to_cargo: userData?.cargo,
                    assigned_to_color: cargoColor,
                  },
                },
                false,
              )
            } else if (payload.eventType === "DELETE") {
              const assignment = payload.old as any
              const newMap = { ...currentMap }
              delete newMap[assignment.chat_id]

              mutate(ATTR_CACHE_KEY, newMap, false)
            }
          },
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }, [assignmentsMap])

    useEffect(() => {
      if (initialData?.assignmentsMap) {
        globalMutate(ATTR_CACHE_KEY, initialData.assignmentsMap, { revalidate: false })
      }
    }, [initialData, globalMutate])

    useEffect(() => {
      if (initialData && refreshTrigger === 0) {
        setChats(initialData.chats || [])
        setHasMore(initialData.hasMore || false)
        setOffset(initialData.chats?.length || 0)
        setLoading(false)
        return
      }

      const cachedData = getCachedChats()

      if (cachedData && refreshTrigger === 0) {
        setChats(cachedData.chats)
        setHasMore(cachedData.hasMore)
        setOffset(cachedData.totalChats)
        setLoading(false)
        return
      }

      setChats([])
      setOffset(0)
      setHasMore(true)
      loadChats(0, true)
    }, [refreshTrigger, initialData])

    const filteredChats = useMemo(() => {
      let result = [...chats];

      if (searchQuery.trim() !== "") {
        result = result.filter((chat) => 
          chat.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (filterMode === "mine") {
        if (!isAuthLoaded) {
          return [];
        } else if (currentUserId && assignmentsMap) {
          result = result.filter((chat) => {
            const assignment = assignmentsMap[chat.id];
            return assignment && assignment.assigned_to_id === currentUserId;
          });
        } else if (isAuthLoaded && !currentUserId) {
          return [];
        }
      }
      
      result.sort((a, b) => (b.lastMessageTime || 0) - (a.lastMessageTime || 0))

      return result;
    }, [chats, searchQuery, filterMode, assignmentsMap, currentUserId, isAuthLoaded]);

    async function loadChats(currentOffset: number, isInitial = false) {
      if (isLoadingRef.current) return
      isLoadingRef.current = true
      
      if (!isInitial) setLoadingMore(true)

      try {
        const url = `/api/whatsapp/chats?limit=${CHATS_PER_PAGE}&offset=${currentOffset}`
        const response = await fetch(url)
        const data = await response.json()

        if (data.success) {
          const newChats: Chat[] = data.chats || []

          if (isInitial) {
            setChats(newChats)
            setCachedChats(newChats, data.hasMore || false, newChats.length)
            mutate(CHAT_LIST_CACHE_KEY, newChats, { revalidate: false })
          } else {
            const updatedChats = [...chats, ...newChats]
            setChats(updatedChats)
            appendChats(newChats, data.hasMore || false)
            mutate(CHAT_LIST_CACHE_KEY, updatedChats, { revalidate: false })
          }

          setHasMore(data.hasMore || false)
          setOffset(currentOffset + newChats.length)
        } else {
          const errorMessage = data.message || "Erro ao carregar conversas"
          setError(errorMessage)
          
          if(isInitial) {
            toast.error("WhatsApp não conectado", {
              description: errorMessage,
              action: {
                label: "Ir para ajustes",
                onClick: () => router.push("/ajustes?tab=whatsapp"),
              },
            })
          }
        }
      } catch (err) {
        setError("Não foi possível conectar ao servidor.")
        if (isInitial) {
          toast.error("Erro de conexão", { description: "Verifique o backend." })
        }
      } finally {
        setLoading(false)
        setLoadingMore(false)
        isLoadingRef.current = false
      }
    }

    const handleScroll = useCallback(
      (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget
        const scrollTop = target.scrollTop
        const scrollHeight = target.scrollHeight
        const clientHeight = target.clientHeight
        const distanceFromBottom = scrollHeight - scrollTop - clientHeight

        if (distanceFromBottom < SCROLL_THRESHOLD && hasMore && !isLoadingRef.current) {
          loadChats(offset, false)
        }
      },
      [offset, hasMore],
    )

    function formatTime(timestamp: number | null) {
      if (!timestamp) return ""
      const date = new Date(timestamp)
      const now = new Date()
      const diff = now.getTime() - date.getTime()
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))

      if (days === 0) return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      if (days === 1) return "Ontem"
      if (days < 7) return date.toLocaleDateString("pt-BR", { weekday: "short" })
      return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })
    }

    if (loading || (filterMode === 'mine' && !isAuthLoaded)) {
      return (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-6 h-6 animate-spin mr-2 text-primary" />
          <p className="text-muted-foreground">Carregando conversas...</p>
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex flex-col h-full p-4 gap-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button
            onClick={() => {
              setChats([])
              setOffset(0)
              setHasMore(true)
              loadChats(0, true)
            }}
            variant="outline"
            className="w-full bg-transparent"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Tentar Novamente
          </Button>
        </div>
      )
    }

    return (
      <div className="flex flex-col h-full bg-background border-r"> 
        {/* ✅ HEADER COMPACTO */}
        <div className="flex flex-col border-b bg-background z-10 sticky top-0">
          <div className="p-3 pb-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-9"
              />
            </div>
          </div>
          
          <div className="px-3 pb-2 flex gap-2">
            <Button 
              variant={filterMode === 'all' ? "secondary" : "ghost"} 
              size="sm" 
              onClick={() => setFilterMode('all')}
              className={cn(
                "flex-1 h-7 text-xs font-medium transition-all",
                filterMode === 'all' && "bg-secondary hover:bg-secondary/80 shadow-sm"
              )}
            >
              Todas
            </Button>
            <Button 
              variant={filterMode === 'mine' ? "secondary" : "ghost"} 
              size="sm" 
              onClick={() => setFilterMode('mine')}
              className={cn(
                "flex-1 h-7 text-xs font-medium transition-all",
                filterMode === 'mine' && "bg-secondary hover:bg-secondary/80 shadow-sm"
              )}
            >
              Minhas
            </Button>
          </div>
        </div>

        <div
          ref={scrollContainerRef} 
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto" 
          style={{
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch",
            scrollBehavior: "smooth",
          }}
        >
          {filteredChats.length === 0 ? (
            <div className="p-6 text-center space-y-3 flex flex-col items-center">
              <p className="text-muted-foreground text-sm">
                {searchQuery 
                  ? "Nenhuma conversa encontrada" 
                  : filterMode === 'mine' 
                  ? "Sem conversas atribuídas" 
                  : "Nenhuma conversa disponível"}
              </p>
              
              {hasMore ? (
                <Button
                  onClick={() => loadChats(offset, false)}
                  variant="outline"
                  size="sm"
                  disabled={loadingMore}
                >
                  {loadingMore ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                  Buscar mais
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setFilterMode('all')
                    setSearchQuery('')
                  }}
                  variant="ghost"
                  size="sm"
                >
                  Limpar filtros
                </Button>
              )}
            </div>
          ) : (
            <>
              {/* ✅ LISTA COMPACTA DE CHATS */}
              <div className="py-1">
                {filteredChats.map((chat) => {
                  const assignment = assignmentsMap?.[chat.id]
                  const profilePicture = chat.pictureUrl || chat.profilePic || null

                  return (
                    <button
                      key={chat.id}
                      onClick={() => onSelectChat(chat)} 
                      className={cn(
                        "w-full flex items-center gap-2.5 px-3 py-2 transition-colors text-left hover:bg-accent/50",
                        selectedChatId === chat.id && "bg-accent",
                        chat.unreadCount > 0 && "border-l-2 border-primary bg-primary/5"
                      )}
                    >
                      {/* ✅ AVATAR MENOR (40x40) */}
                      <Avatar className="w-10 h-10 flex-shrink-0">
                        {profilePicture && <AvatarImage src={profilePicture} alt={chat.name} />}
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                          {chat.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        {/* ✅ NOME + HORA (uma linha) */}
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p className="font-medium truncate text-sm">{chat.name}</p>
                          <span className="text-[11px] text-muted-foreground flex-shrink-0">
                            {formatTime(chat.lastMessageTime)}
                          </span>
                        </div>

                        {/* ✅ MENSAGEM/BADGE + CONTADOR */}
                        <div className="flex items-center justify-between gap-1.5">
                          {assignment ? (
                            <Badge
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0 h-5 flex items-center gap-1 border"
                              style={{
                                backgroundColor: assignment.assigned_to_color || "#6366f1",
                                color: "#ffffff",
                                borderColor: assignment.assigned_to_color || "#6366f1",
                              }}
                            >
                              <User className="w-2.5 h-2.5" />
                              <span className="max-w-[100px] truncate">{assignment.assigned_to_name}</span>
                            </Badge>
                          ) : (
                            <p className="text-xs text-muted-foreground truncate flex-1 min-w-0">
                              {chat.lastMessage || "Sem mensagens"}
                            </p>
                          )}

                          {chat.unreadCount > 0 && (
                            <span className="flex-shrink-0 bg-primary text-primary-foreground text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                              {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              {loadingMore && (
                <div className="flex items-center justify-center gap-2 py-3">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <p className="text-xs text-muted-foreground">Carregando...</p>
                </div>
              )}

              {!hasMore && filteredChats.length > 0 && (
                <div className="text-center py-3">
                  <p className="text-[11px] text-muted-foreground">Fim da lista</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )
  }
)

ChatList.displayName = 'ChatList'; 

export { ChatList };