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

// URL do Backend para imagens (Proxy)
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://backend-sobt.onrender.com";

const INITIAL_BATCH_SIZE = 20
const SUBSEQUENT_BATCH_SIZE = 10
const SCROLL_THRESHOLD = 100

type ChatListHandle = ElementRef<"div">; 

const ChatList = forwardRef<ChatListHandle, ChatListProps>(
  ({ onSelectChat, selectedChatId, refreshTrigger, initialData }, ref) => { 
    const { data: cachedChats = initialData?.chats || [] } = useSWR(CHAT_LIST_CACHE_KEY)
    const { data: assignmentsMap = initialData?.assignmentsMap || {} } = useSWR<AtribuicoesMap>(ATTR_CACHE_KEY)
    
    const { setCachedChats, appendChats } = useWhatsAppCache()
    const router = useRouter()
    const { mutate: globalMutate } = useSWRConfig()
    const supabase = createClient() 

    const [chats, setChats] = useState<Chat[]>(cachedChats)
    const [searchQuery, setSearchQuery] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("") 
    
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

    // --- SETUP INICIAL ---
    useEffect(() => {
        const uid = getCookie("auth_user_id");
        if (uid) setCurrentUserId(uid);
        setIsAuthLoaded(true);
        console.log("🛠️ ChatList montado.");

        // Dispara atualização de avatares em background (não trava a UI)
        // Isso garante que o backend busque fotos novas para chats que estão sem foto no banco
        const refreshAvatars = async () => {
            try {
                // Usamos o caminho da API configurado no next.config.mjs ou URL direta
                const url = "/api/whatsapp/chats/refresh-avatars"; 
                await fetch(url, { method: 'POST' });
            } catch (e) { /* silêncio */ }
        };
        // Espera 2s para não concorrer com o carregamento inicial da lista
        const timer = setTimeout(refreshAvatars, 2000);
        return () => clearTimeout(timer);
    }, []);

    // --- DEBOUNCE BUSCA ---
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery)
        }, 500)
        return () => clearTimeout(timer)
    }, [searchQuery])

    // --- RECARREGAR QUANDO MUDA FILTRO/BUSCA ---
    useEffect(() => {
        if (!isAuthLoaded) return;
        setChats([])
        setOffset(0)
        setHasMore(true)
        loadChats(0, true) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch, filterMode, isAuthLoaded]) 


    // --- REALTIME (Ouve mensagens novas e atualiza a lista) ---
    useEffect(() => {
        const channel = supabase
            .channel('public:chats')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'chats' }, (payload) => {
                if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
                    const newChat = payload.new as any;
                    
                    if (newChat.id.includes("@g.us")) return;

                    setChats((prevChats) => {
                        // Remove a versão antiga se existir
                        const filtered = prevChats.filter(c => c.id !== newChat.id);
                        
                        const formattedChat: Chat = {
                            id: newChat.id,
                            name: newChat.name || newChat.id.split('@')[0],
                            lastMessage: newChat.last_message,
                            lastMessageTime: newChat.last_message_time,
                            unreadCount: newChat.unread_count || 0,
                            // Não usamos mais a URL do banco para exibição direta, mas mantemos no objeto
                            pictureUrl: newChat.image_url, 
                        };

                        // Coloca no topo
                        return [formattedChat, ...filtered];
                    });
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase]);

    // --- CARREGAMENTO DE ATRIBUIÇÕES (Mantido) ---
    useEffect(() => {
      const loadInitialAssignments = async () => {
        try {
          const { data: activeAssignments } = await supabase
            .from("chat_assignments")
            .select("*")
            .eq("status", "active")

          if (!activeAssignments || activeAssignments.length === 0) return

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
            cargosData?.forEach((c) => coresMap[c.nome] = c.cor)
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
          console.error("Erro assignments:", err)
        }
      }
      loadInitialAssignments()
    }, [supabase])


    // ✅ FUNÇÃO PRINCIPAL: CARREGAR CHATS DO BANCO
    async function loadChats(currentOffset: number, isInitial = false) {
      if (isLoadingRef.current) return
      isLoadingRef.current = true
      
      if (!isInitial) setLoadingMore(true)

      try {
        const limit = isInitial ? INITIAL_BATCH_SIZE : SUBSEQUENT_BATCH_SIZE
        const rangeEnd = currentOffset + limit - 1

        let query = supabase
            .from('chats')
            .select('*', { count: 'exact' })
            .eq('is_archived', false)
            .not('id', 'ilike', '%@g.us') 
            .order('last_message_time', { ascending: false })
            .range(currentOffset, rangeEnd)

        if (debouncedSearch) {
            query = query.or(`name.ilike.%${debouncedSearch}%,id.ilike.%${debouncedSearch}%`)
        }

        const { data, error, count } = await query

        if (error) throw error

        const newChats: Chat[] = (data || []).map(c => ({
            id: c.id,
            name: c.name,
            lastMessage: c.last_message,
            lastMessageTime: c.last_message_time,
            unreadCount: c.unread_count,
            pictureUrl: c.image_url,
        }))

        const hasMoreData = count ? (currentOffset + newChats.length) < count : false

        if (isInitial) {
            setChats(newChats)
            setCachedChats(newChats, hasMoreData, newChats.length)
            mutate(CHAT_LIST_CACHE_KEY, newChats, { revalidate: false })
            setOffset(newChats.length)
        } else {
            const updatedChats = [...chats, ...newChats]
            setChats(updatedChats)
            appendChats(newChats, hasMoreData)
            mutate(CHAT_LIST_CACHE_KEY, updatedChats, { revalidate: false })
            setOffset(prev => prev + newChats.length)
        }

        setHasMore(hasMoreData)

      } catch (err: any) {
        console.error("❌ ERRO chats:", err);
        setError(`Erro ao carregar.`);
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

        if (distanceFromBottom < SCROLL_THRESHOLD && hasMore && !isLoadingRef.current && !loading) {
          loadChats(offset, false)
        }
      },
      [offset, hasMore, loading]
    )

    // Formatação visual de data
    function formatTime(timestamp: number | null) {
      if (!timestamp || timestamp <= 0) return ""
      
      const date = new Date(timestamp)
      if (date.getFullYear() < 2000) return "" // Filtra datas inválidas/antigas

      const now = new Date()
      const diff = now.getTime() - date.getTime()
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))

      if (days === 0) return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      if (days === 1) return "Ontem"
      if (days < 7) return date.toLocaleDateString("pt-BR", { weekday: "short" })
      return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })
    }

    const displayChats = useMemo(() => {
        if (filterMode === 'all') return chats;

        if (filterMode === 'mine' && currentUserId && assignmentsMap) {
            return chats.filter(chat => {
                const assignment = assignmentsMap[chat.id];
                return assignment && assignment.assigned_to_id === currentUserId;
            })
        }
        return [];
    }, [chats, filterMode, currentUserId, assignmentsMap]);

    if (loading && offset === 0) {
      return (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-6 h-6 animate-spin mr-2 text-primary" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      )
    }

    if (error) {
        return (
          <div className="flex flex-col h-full p-4 gap-4 items-center justify-center">
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
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar Novamente
            </Button>
          </div>
        )
      }

    return (
      <div className="flex flex-col h-full bg-background border-r"> 
        {/* HEADER */}
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
              className={cn("flex-1 h-7 text-xs font-medium transition-all", filterMode === 'all' && "bg-secondary shadow-sm")}
            >
              Todas
            </Button>
            <Button 
              variant={filterMode === 'mine' ? "secondary" : "ghost"} 
              size="sm" 
              onClick={() => setFilterMode('mine')}
              className={cn("flex-1 h-7 text-xs font-medium transition-all", filterMode === 'mine' && "bg-secondary shadow-sm")}
            >
              Minhas
            </Button>
          </div>
        </div>

        <div
          ref={scrollContainerRef} 
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto" 
          style={{ overscrollBehavior: "contain", WebkitOverflowScrolling: "touch", scrollBehavior: "smooth" }}
        >
          {displayChats.length === 0 ? (
            <div className="p-6 text-center space-y-3 flex flex-col items-center">
              <p className="text-muted-foreground text-sm">
                {filterMode === 'mine' ? "Você não tem conversas atribuídas" : "Nenhuma conversa encontrada"}
              </p>
            </div>
          ) : (
            <>
              <div className="py-1">
                {displayChats.map((chat) => {
                  const assignment = assignmentsMap?.[chat.id]
                  
                  // 🔥 PROXY DE IMAGEM: Aponta para o seu backend no Render
                  // Isso garante que a imagem carregue mesmo se o link do WA expirar ou tiver CORS
                  const profilePicture = `${BACKEND_URL}/chats/avatar/${chat.id}`

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
                      <Avatar className="w-10 h-10 flex-shrink-0">
                        <AvatarImage 
                            src={profilePicture} 
                            alt={chat.name} 
                            className="object-cover" 
                        />
                        {/* ✅ CORRIGIDO: Fallback com fundo cinza e ícone de User */}
                        <AvatarFallback className="bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p className="font-medium truncate text-sm">{chat.name}</p>
                          <span className="text-[11px] text-muted-foreground flex-shrink-0">
                            {formatTime(chat.lastMessageTime)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-1.5">
                          {assignment ? (
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5 flex items-center gap-1 border" style={{ backgroundColor: assignment.assigned_to_color || "#6366f1", color: "#ffffff", borderColor: assignment.assigned_to_color || "#6366f1" }}>
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
            </>
          )}
        </div>
      </div>
    )
  }
)

ChatList.displayName = 'ChatList'; 

export { ChatList };