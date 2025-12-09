"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback, useMemo, forwardRef, type ElementRef } from "react" 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, AlertCircle, RefreshCw, Loader2, User, Tag, Pencil, UserPlus, X, Tags, Copy, Phone } from "lucide-react"
import { cn, getContrastTextColor, formatPhoneNumber } from "@/lib/utils"
import type { Chat, EtiquetaSimple } from "@/lib/whatsapp-types"
import { ChatEtiquetasDialog } from "./chat-etiquetas-dialog"
import { NoteBadge } from "./note-badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useWhatsAppCache } from "@/contexts/whatsapp-cache-context"
import { useUser } from "@/contexts/user-context"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client" 
import useSWR, { mutate, useSWRConfig } from "swr"
import { ATTR_CACHE_KEY, CHAT_LIST_CACHE_KEY } from "@/lib/swr-config"
import type { AtribuicoesMap } from "@/lib/swr-config"
import { getCookie } from "@/lib/auth" 
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger, ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent, ContextMenuPortal } from "@/components/ui/context-menu"
import { ChatFilterPanel, type ChatFilterRule } from "./chat-filter-panel"
import { EditChatNameDialog } from "./edit-chat-name-dialog"
import { TagSelector } from "./tag-selector"
import { AssignToUserDialog } from "./assign-to-user-dialog"
import { useRealtimeSubscription } from "@/hooks/use-realtime-subscription"
import { ProfilePictureModal } from "./profile-picture-modal"
import type { Etiqueta } from "@/lib/whatsapp-types" 

interface ChatListProps {
  onSelectChat: (chat: Chat) => void
  selectedChatId: string | null
  refreshTrigger?: number
  initialData?: any
  onRefresh?: () => void
}

// URL do Backend para imagens (Proxy)
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://backend-sobt.onrender.com";

const INITIAL_BATCH_SIZE = 20
const SUBSEQUENT_BATCH_SIZE = 10
const SCROLL_THRESHOLD = 100

type ChatListHandle = ElementRef<"div">; 

const ChatList = forwardRef<ChatListHandle, ChatListProps>(
  ({ onSelectChat, selectedChatId, refreshTrigger, initialData, onRefresh }, ref) => { 
    const { data: cachedChats = initialData?.chats || [] } = useSWR(CHAT_LIST_CACHE_KEY)
    const { data: assignmentsMap = initialData?.assignmentsMap || {} } = useSWR<AtribuicoesMap>(ATTR_CACHE_KEY)
    
    const { setCachedChats, appendChats } = useWhatsAppCache()
    const { user } = useUser()
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

    // Estados para filtros avançados
    const [advancedFilters, setAdvancedFilters] = useState<ChatFilterRule[]>([])

    // Estados para dialogs do context menu
    const [contextMenuChat, setContextMenuChat] = useState<Chat | null>(null)
    const [showEditNameDialog, setShowEditNameDialog] = useState(false)
    const [showAssignDialog, setShowAssignDialog] = useState(false)
    const [showTagSelector, setShowTagSelector] = useState(false)
    const [showEtiquetasDialog, setShowEtiquetasDialog] = useState(false)
    const [contextMenuEtiqueta, setContextMenuEtiqueta] = useState<EtiquetaSimple | null>(null)
    const [showProfilePictureModal, setShowProfilePictureModal] = useState(false)
    const [profilePictureChat, setProfilePictureChat] = useState<{url: string, name: string} | null>(null)
    
    // Estado para chats com notas (mapa de chatId -> conteúdo da nota)
    const [chatNotes, setChatNotes] = useState<Record<string, string>>({})
    
    // Estado para lista de etiquetas disponíveis (para o submenu)
    const [availableEtiquetas, setAvailableEtiquetas] = useState<Etiqueta[]>([])
    const [assigningEtiqueta, setAssigningEtiqueta] = useState(false)

    // Estado para lista de usuários disponíveis para atribuição (para o submenu)
    const [availableUsers, setAvailableUsers] = useState<Array<{ id: string; nome: string; cargo: string; cor: string }>>([])
    const [assigningUser, setAssigningUser] = useState(false)

    const scrollContainerRef = (ref as React.RefObject<HTMLDivElement>) || useRef<HTMLDivElement>(null); 
    const isLoadingRef = useRef(false)

    // --- CARREGAR NOTAS DOS CHATS ---
    const loadChatNotes = useCallback(async (chatIds: string[]) => {
        if (chatIds.length === 0) return;
        
        try {
            const { data: notes } = await supabase
                .from('chat_notes')
                .select('chat_id, content')
                .in('chat_id', chatIds);
            
            if (notes && notes.length > 0) {
                const notesMap: Record<string, string> = {};
                notes.forEach(note => {
                    notesMap[note.chat_id] = note.content || '';
                });
                setChatNotes(prev => ({ ...prev, ...notesMap }));
            }
        } catch (e) {
            console.error("Erro ao carregar notas:", e);
        }
    }, [supabase]);

    // --- CARREGAR ETIQUETAS DISPONÍVEIS ---
    const loadAvailableEtiquetas = useCallback(async () => {
        try {
            const response = await fetch("/api/whatsapp/etiquetas")
            const data = await response.json()
            if (data.success) {
                setAvailableEtiquetas(data.etiquetas || [])
            }
        } catch (error) {
            console.error("Erro ao carregar etiquetas:", error)
        }
    }, [])

    // --- CARREGAR USUÁRIOS DISPONÍVEIS PARA ATRIBUIÇÃO ---
    const loadAvailableUsers = useCallback(async () => {
        try {
            // Busca perfis
            const { data: perfis } = await supabase.from("perfis").select("id, nome, cargo").order("nome")
            if (!perfis) return

            // Busca cores dos cargos
            const cargos = Array.from(new Set(perfis.map(p => p.cargo).filter(Boolean) as string[]))
            const { data: cargosData } = await supabase.from("cargos").select("nome, cor").in("nome", cargos)

            const coresMap: Record<string, string> = {}
            cargosData?.forEach(c => coresMap[c.nome] = c.cor)

            // Monta array com cor
            const usersWithColor = perfis.map(p => ({
                id: p.id,
                nome: p.nome || "",
                cargo: p.cargo || "",
                cor: p.cargo ? (coresMap[p.cargo] || "#6b7280") : "#6b7280"
            }))

            setAvailableUsers(usersWithColor)
        } catch (error) {
            console.error("Erro ao carregar usuários:", error)
        }
    }, [supabase])

    // --- ATRIBUIR CHAT A USUÁRIO ---
    const handleAssignUser = useCallback(async (chatId: string, chatName: string, userId: string, userName: string) => {
        try {
            setAssigningUser(true)
            const currentUserId = getCookie("auth_user_id")
            const currentUserName = getCookie("auth_user_name")

            const response = await fetch("/api/whatsapp/assignment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chatId,
                    chatName,
                    assignToId: userId,
                    assignToName: userName,
                    assignedById: currentUserId,
                    assignedByName: currentUserName || "Sistema"
                }),
            })

            const data = await response.json()
            if (data.success) {
                toast.success(`Atribuído a ${userName}`)
                onRefresh?.()
            } else if (data.alreadyAssigned) {
                toast.warning(data.message)
            } else {
                toast.error(data.message || "Erro ao atribuir")
            }
        } catch (error) {
            console.error("Erro ao atribuir:", error)
            toast.error("Erro ao atribuir")
        } finally {
            setAssigningUser(false)
        }
    }, [onRefresh])

    // --- ATRIBUIR/REMOVER ETIQUETA ---
    const handleAssignEtiqueta = useCallback(async (chatId: string, etiquetaId: string, isCurrentlySelected: boolean) => {
        try {
            setAssigningEtiqueta(true)
            
            if (isCurrentlySelected) {
                const response = await fetch("/api/whatsapp/assign-tag", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ chatId, etiquetaId }),
                })
                const data = await response.json()
                if (data.success) {
                    toast.success("Etiqueta removida")
                    onRefresh?.()
                } else {
                    toast.error(data.message || "Erro ao remover etiqueta")
                }
            } else {
                const response = await fetch("/api/whatsapp/assign-tag", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ chatId, etiquetaId }),
                })
                const data = await response.json()
                if (data.success) {
                    toast.success("Etiqueta atribuída")
                    onRefresh?.()
                } else {
                    toast.error(data.message || "Erro ao atribuir etiqueta")
                }
            }
        } catch (error) {
            console.error("Erro ao processar etiqueta:", error)
            toast.error("Erro ao processar etiqueta")
        } finally {
            setAssigningEtiqueta(false)
        }
    }, [onRefresh])

    // --- SETUP INICIAL ---
    useEffect(() => {
        const uid = getCookie("auth_user_id");
        if (uid) setCurrentUserId(uid);
        setIsAuthLoaded(true);
        console.log("🛠️ ChatList montado.");
        
        // Carrega etiquetas disponíveis
        loadAvailableEtiquetas();
        
        // Carrega usuários disponíveis para atribuição
        loadAvailableUsers();

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
    }, [loadAvailableEtiquetas]);

    // --- CARREGAR NOTAS QUANDO CHATS MUDAM ---
    useEffect(() => {
        if (chats.length > 0) {
            const chatIds = chats.map(c => c.id);
            loadChatNotes(chatIds);
        }
    }, [chats, loadChatNotes]);

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
            .on('postgres_changes', { event: '*', schema: 'public', table: 'chats' }, async (payload) => {
                if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
                    const newChat = payload.new as any;
                    
                    if (newChat.id.includes("@g.us")) return;

                    // Pega os IDs das etiquetas do array
                    const etiquetaIds: string[] = newChat.etiqueta_ids || [];

                    // Busca dados das etiquetas da tabela whatsapp_etiquetas
                    let etiquetas: EtiquetaSimple[] = [];
                    if (etiquetaIds.length > 0) {
                      const { data: etiquetasData } = await supabase
                        .from('whatsapp_etiquetas')
                        .select('id, nome, cor')
                        .in('id', etiquetaIds);
                      
                      if (etiquetasData) {
                        // Mantém a ordem original das etiquetas
                        etiquetas = etiquetaIds
                          .map(id => etiquetasData.find(e => e.id === id))
                          .filter(Boolean) as EtiquetaSimple[];
                      }
                    }

                    setChats((prevChats) => {
                        const filtered = prevChats.filter(c => c.id !== newChat.id);
                        
                        const formattedChat: Chat = {
                            id: newChat.id,
                            name: newChat.name || '',
                            phone: newChat.phone || newChat.id.split('@')[0],
                            lastMessage: newChat.last_message,
                            lastMessageTime: newChat.last_message_time,
                            unreadCount: newChat.unread_count || 0,
                            pictureUrl: newChat.image_url,
                            etiqueta_ids: etiquetaIds,
                            etiquetas: etiquetas,
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

    // --- FUNÇÃO HELPER: Construir mapa de atribuições ---
    const buildAssignmentsMap = async (assignments: any[]) => {
      try {
        if (!assignments || assignments.length === 0) {
          console.log("[Atribuições] Sem atribuições, retornando mapa vazio")
          return {}
        }

        console.log("[Atribuições] Construindo mapa para", assignments.length, "atribuições")

        const userIds = Array.from(new Set(assignments.map((a) => a.assigned_to_id)))
        
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
        assignments.forEach((assignment) => {
          const profile = profiles?.find((p) => p.id === assignment.assigned_to_id)
          if (profile) {
            newAssignmentsMap[assignment.chat_id] = {
              assigned_to_id: assignment.assigned_to_id,
              assigned_to_name: profile.nome,
              assigned_to_cargo: profile.cargo,
              assigned_to_color: profile.cargo ? coresMap[profile.cargo] : undefined,
            }
            console.log(`[Atribuições] ${assignment.chat_id} => ${profile.nome}`)
          }
        })
        
        console.log("[Atribuições] Mapa construído com", Object.keys(newAssignmentsMap).length, "chats")
        return { ...newAssignmentsMap } // Força um novo objeto
      } catch (err) {
        console.error("Erro ao construir mapa de atribuições:", err)
        return {}
      }
    }

    // --- CARREGAMENTO DE ATRIBUIÇÕES (Mantido) ---
    useEffect(() => {
      const loadInitialAssignments = async () => {
        try {
          const { data: activeAssignments } = await supabase
            .from("chat_assignments")
            .select("*")
            .eq("status", "active")

          if (activeAssignments && activeAssignments.length > 0) {
            const newAssignmentsMap = await buildAssignmentsMap(activeAssignments)
            mutate(ATTR_CACHE_KEY, newAssignmentsMap, false)
          }
        } catch (err) {
          console.error("Erro assignments:", err)
        }
      }
      loadInitialAssignments()
    }, [supabase])

    // --- REALTIME PARA ATRIBUIÇÕES ---
    useEffect(() => {
      const channel = supabase
        .channel('public:chat_assignments')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'chat_assignments' }, async (payload) => {
          console.log("[Realtime] Mudança em chat_assignments:", payload.eventType, payload.new)
          // Quando há mudança nas atribuições, recarrega o mapa inteiro
          const { data: activeAssignments } = await supabase
            .from("chat_assignments")
            .select("*")
            .eq("status", "active")

          if (activeAssignments) {
            const newAssignmentsMap = await buildAssignmentsMap(activeAssignments)
            console.log("[Realtime] Atualizando atribuições map com:", Object.keys(newAssignmentsMap))
            mutate(ATTR_CACHE_KEY, newAssignmentsMap, false)
          }
        })
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
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
            .from('chat_last_message_view')
            .select('*', { count: 'exact' })
            .eq('is_archived', false)
            .not('id', 'ilike', '%@g.us') 
            .order('last_message_timestamp', { ascending: false })
            .range(currentOffset, rangeEnd)

        if (debouncedSearch) {
            query = query.or(`name.ilike.%${debouncedSearch}%,id.ilike.%${debouncedSearch}%`)
        }

        const { data, error, count } = await query

        if (error) {
          console.error("❌ ERRO Supabase:", error)
          throw error
        }

        // Coleta todos os IDs de etiquetas de todos os chats (agora usa array etiqueta_ids)
        const allEtiquetaIds: string[] = [];
        const chatEtiquetaIdsMap: Record<string, string[]> = {};
        
        (data || []).forEach(c => {
          const ids: string[] = c.etiqueta_ids || [];
          chatEtiquetaIdsMap[c.id] = ids;
          ids.forEach(id => {
            if (!allEtiquetaIds.includes(id)) {
              allEtiquetaIds.push(id);
            }
          });
        });

        // Busca dados de todas as etiquetas da tabela whatsapp_etiquetas
        let etiquetasDataMap: Record<string, EtiquetaSimple> = {};
        if (allEtiquetaIds.length > 0) {
          const { data: etiquetasData } = await supabase
            .from('whatsapp_etiquetas')
            .select('id, nome, cor, descricao')
            .in('id', allEtiquetaIds);
          
          if (etiquetasData) {
            etiquetasData.forEach(e => {
              etiquetasDataMap[e.id] = { id: e.id, nome: e.nome, cor: e.cor, descricao: e.descricao };
            });
          }
        }

        const newChats: Chat[] = (data || []).map(c => {
            // Monta array de etiquetas na ordem correta
            const etiquetas: EtiquetaSimple[] = (chatEtiquetaIdsMap[c.id] || [])
              .map(id => etiquetasDataMap[id])
              .filter(Boolean);
            
            return {
              id: c.id,
              uuid: c.uuid,  // UUID interno estável
              name: c.name,
              phone: c.phone || c.id.split('@')[0],  // telefone formatado
              lastMessage: c.last_message,
              lastMessageTime: c.last_message_timestamp ? Number(c.last_message_timestamp) : c.last_message_time,
              unreadCount: c.unread_count,
              pictureUrl: c.image_url,
              etiquetas: etiquetas,
            };
        });

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
        console.error("❌ ERRO details:", JSON.stringify(err, null, 2));
        setError(`Erro ao carregar: ${err?.message || 'Desconhecido'}`);
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
        let filteredChats = chats;

        // Filtro básico (Todas / Minhas)
        if (filterMode === 'mine' && currentUserId && assignmentsMap) {
            filteredChats = filteredChats.filter(chat => {
                const assignment = assignmentsMap[chat.id];
                return assignment && assignment.assigned_to_id === currentUserId;
            });
        }

        // Filtros avançados
        if (advancedFilters.length > 0) {
            filteredChats = filteredChats.filter(chat => {
                return advancedFilters.every(filter => {
                    if (!filter.value) return true; // Ignora filtros sem valor
                    
                    switch (filter.type) {
                        case "etiqueta":
                            // Verifica se o chat tem a etiqueta (em qualquer posição)
                            return chat.etiquetas?.some(e => e.id === filter.value) || false;
                        
                        case "atribuicao":
                            const assignment = assignmentsMap?.[chat.id];
                            return assignment?.assigned_to_id === filter.value;
                        
                        case "sem_etiqueta":
                            return !chat.etiquetas || chat.etiquetas.length === 0;
                        
                        case "sem_atribuicao":
                            return !assignmentsMap?.[chat.id];
                        
                        default:
                            return true;
                    }
                });
            });
        }

        return filteredChats;
    }, [chats, filterMode, currentUserId, assignmentsMap, advancedFilters]);

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
            <ChatFilterPanel 
              filters={advancedFilters} 
              onFiltersChange={setAdvancedFilters} 
            />
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

                  // Determina se tem etiquetas
                  const hasEtiquetas = chat.etiquetas && chat.etiquetas.length > 0
                  
                  // Verifica se tem nota
                  const hasNote = !!chatNotes[chat.id]
                  const noteContent = chatNotes[chat.id] || null

                  return (
                    <ContextMenu key={chat.id}>
                      <ContextMenuTrigger asChild>
                        <button
                          onClick={() => onSelectChat(chat)} 
                          className={cn(
                            "w-full flex items-center gap-2.5 px-3 py-2 transition-colors text-left hover:bg-accent/50",
                            selectedChatId === chat.id && "bg-accent/80 dark:bg-accent",
                            chat.unreadCount > 0 && "border-l-2 border-primary bg-primary/5"
                          )}
                        >
                          <Avatar 
                            className="w-10 h-10 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation()
                              setProfilePictureChat({
                                url: profilePicture,
                                name: chat.name || chat.phone || chat.id.split('@')[0]
                              })
                              setShowProfilePictureModal(true)
                            }}
                          >
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
                              <p className="font-medium truncate text-sm">{chat.name || chat.phone || chat.id.split('@')[0]}</p>
                              <span className="text-[11px] text-muted-foreground flex-shrink-0">
                                {formatTime(chat.lastMessageTime)}
                              </span>
                            </div>

                            {/* Mensagem mais recente - sempre exibida */}
                            <div className="flex items-center justify-between gap-1.5">
                              <p className="text-xs text-muted-foreground truncate flex-1 min-w-0">
                                {chat.lastMessage || "Sem mensagens"}
                              </p>
                              {chat.unreadCount > 0 && (
                                <span className="flex-shrink-0 bg-primary text-primary-foreground text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                                  {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
                                </span>
                              )}
                            </div>

                            {/* Badges em linha separada (atribuição, etiquetas, notas) */}
                            {(assignment || hasEtiquetas || hasNote) && (
                              <div className="flex items-center gap-1 mt-1 flex-wrap">
                                {/* Badge de atribuição com context menu */}
                                {assignment && (
                                  <ContextMenu>
                                    <ContextMenuTrigger asChild>
                                      <div onClick={(e) => { e.stopPropagation(); onSelectChat(chat); }}>
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5 flex items-center gap-1 border flex-shrink-0 cursor-pointer rounded-sm" style={{ backgroundColor: assignment.assigned_to_color || "#6366f1", color: "#ffffff", borderColor: assignment.assigned_to_color || "#6366f1" }}>
                                                <User className="w-2.5 h-2.5" />
                                                <span className="max-w-[80px] truncate">{assignment.assigned_to_name?.split(' ')[0]}</span>
                                              </Badge>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p>{assignment.assigned_to_name?.split(' ')[0]} - {assignment.assigned_to_cargo || ''}</p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      </div>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent className="w-48">
                                      <ContextMenuItem
                                        onClick={async (e) => {
                                          e.stopPropagation()
                                          try {
                                            // Buscar a atribuição ativa para obter o ID
                                            const res = await fetch(`/api/whatsapp/assignment?chatId=${chat.id}`)
                                            const data = await res.json()
                                            
                                            if (data.assignment?.id) {
                                              const deleteRes = await fetch("/api/whatsapp/assignment", {
                                                method: "DELETE",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({ assignmentId: data.assignment.id, chatId: chat.id })
                                              })
                                              
                                              if (deleteRes.ok) {
                                                toast.success("Atribuição removida")
                                                onRefresh?.()
                                              }
                                            }
                                          } catch {
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
                                
                                {/* Etiquetas - Exibe baseado na configuração show_all_tags */}
                                {hasEtiquetas && (
                                  <>
                                    {user?.show_all_tags ? (
                                      // Exibe etiquetas coloridas
                                      <>
                                        {chat.etiquetas!.slice(0, 3).map((etiqueta) => (
                                          <ContextMenu key={etiqueta.id}>
                                            <ContextMenuTrigger asChild>
                                              <div onClick={(e) => { e.stopPropagation(); onSelectChat(chat); }}>
                                                <TooltipProvider>
                                                  <Tooltip>
                                                    <TooltipTrigger asChild>
                                                      <Badge
                                                        variant="secondary"
                                                        className="text-[10px] px-1.5 py-0 h-5 flex items-center gap-1 border cursor-pointer rounded-sm"
                                                        style={{ backgroundColor: etiqueta.cor, borderColor: etiqueta.cor, color: getContrastTextColor(etiqueta.cor) }}
                                                      >
                                                        <Tag className="w-2.5 h-2.5" />
                                                        <span className="max-w-[60px] truncate">{etiqueta.nome}</span>
                                                      </Badge>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                      <p>{etiqueta.nome}</p>
                                                    </TooltipContent>
                                                  </Tooltip>
                                                </TooltipProvider>
                                              </div>
                                            </ContextMenuTrigger>
                                            <ContextMenuContent className="w-48">
                                              <ContextMenuItem
                                                onClick={async (e) => {
                                                  e.stopPropagation()
                                                  try {
                                                    const res = await fetch("/api/whatsapp/assign-tag", {
                                                      method: "DELETE",
                                                      headers: { "Content-Type": "application/json" },
                                                      body: JSON.stringify({ chatId: chat.id, etiquetaId: etiqueta.id })
                                                    })
                                                    if (res.ok) {
                                                      toast.success("Etiqueta removida")
                                                      setChats(prev => prev.map(c => 
                                                        c.id === chat.id 
                                                          ? { ...c, etiquetas: c.etiquetas?.filter(e => e.id !== etiqueta.id) || [] }
                                                          : c
                                                      ))
                                                      onRefresh?.()
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
                                              <ContextMenuItem
                                                onClick={(e) => {
                                                  e.stopPropagation()
                                                  setContextMenuChat(chat)
                                                  setShowEtiquetasDialog(true)
                                                }}
                                              >
                                                <Tags className="w-4 h-4 mr-2" />
                                                Ver todas etiquetas
                                              </ContextMenuItem>
                                            </ContextMenuContent>
                                          </ContextMenu>
                                        ))}
                                        {chat.etiquetas!.length > 3 && (
                                          <Badge 
                                            variant="secondary" 
                                            className="text-[10px] px-1 py-0 h-5 cursor-pointer hover:bg-secondary/80"
                                            onClick={(e) => {
                                              e.stopPropagation()
                                              setContextMenuChat(chat)
                                              setShowEtiquetasDialog(true)
                                            }}
                                          >
                                            +{chat.etiquetas!.length - 3}
                                          </Badge>
                                        )}
                                      </>
                                    ) : (
                                      // Exibe badge compacto cinza
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Badge 
                                              variant="secondary" 
                                              className="text-[10px] px-1.5 py-0 h-5 flex items-center gap-1 cursor-pointer text-white bg-gray-800 hover:bg-gray-700 rounded-sm"
                                              onClick={(e) => {
                                                e.stopPropagation()
                                                setContextMenuChat(chat)
                                                setShowEtiquetasDialog(true)
                                              }}
                                            >
                                              <Tag className="w-2.5 h-2.5 text-white" />
                                              <span>{chat.etiquetas!.length}</span>
                                            </Badge>
                                          </TooltipTrigger>
                                          <TooltipContent side="top" className="max-w-[200px] p-1.5">
                                            <div className="flex flex-wrap gap-1 items-center">
                                              {chat.etiquetas!.map(etiqueta => (
                                                <Badge
                                                  key={etiqueta.id}
                                                  variant="secondary"
                                                  className="text-[10px] px-1.5 py-0.5 flex items-center gap-1 border rounded-sm"
                                                  style={{ 
                                                    backgroundColor: etiqueta.cor, 
                                                    borderColor: etiqueta.cor, 
                                                    color: getContrastTextColor(etiqueta.cor) 
                                                  }}
                                                >
                                                  <Tag className="w-2.5 h-2.5" />
                                                  {etiqueta.nome}
                                                </Badge>
                                              ))}
                                            </div>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    )}
                                  </>
                                )}
                                
                                {/* Badge de Nota */}
                                {hasNote && (
                                  <NoteBadge
                                    chatId={chat.id}
                                    chatName={chat.name}
                                    hasNote={hasNote}
                                    noteContent={noteContent}
                                    size="sm"
                                    onClick={(e) => e.stopPropagation()}
                                    onSelectChat={() => onSelectChat(chat)}
                                  />
                                )}
                              </div>
                            )}
                          </div>
                        </button>
                      </ContextMenuTrigger>
                      <ContextMenuContent className="w-48">
                        {/* Atribuir com submenu de usuários */}
                        <ContextMenuSub>
                          <ContextMenuSubTrigger>
                            <UserPlus className="w-4 h-4 mr-2" />
                            Atribuir
                          </ContextMenuSubTrigger>
                          <ContextMenuPortal>
                            <ContextMenuSubContent className="w-48">
                              {availableUsers.length === 0 ? (
                                <div className="p-2 text-sm text-muted-foreground text-center">
                                  Nenhum usuário disponível
                                </div>
                              ) : (
                                // Ordena: Você primeiro, depois Atual, depois resto
                                [...availableUsers]
                                  .sort((a, b) => {
                                    const isCurrentUserA = user?.id === a.id
                                    const isCurrentUserB = user?.id === b.id
                                    const isAssignedA = assignmentsMap[chat.id]?.assigned_to_id === a.id
                                    const isAssignedB = assignmentsMap[chat.id]?.assigned_to_id === b.id
                                    
                                    if (isCurrentUserA && !isCurrentUserB) return -1
                                    if (!isCurrentUserA && isCurrentUserB) return 1
                                    if (isAssignedA && !isAssignedB) return -1
                                    if (!isAssignedA && isAssignedB) return 1
                                    return 0
                                  })
                                  .map((assignUser) => {
                                    const isAssigned = assignmentsMap[chat.id]?.assigned_to_id === assignUser.id
                                    const isCurrentUser = user?.id === assignUser.id
                                    return (
                                      <ContextMenuItem
                                        key={assignUser.id}
                                        onClick={() => handleAssignUser(chat.id, chat.name || chat.pushName || chat.id, assignUser.id, assignUser.nome)}
                                        disabled={assigningUser}
                                        className="cursor-pointer"
                                      >
                                        <div className="flex items-center gap-2 w-full">
                                          <div
                                            className="w-3 h-3 rounded"
                                            style={{ backgroundColor: assignUser.cor }}
                                          />
                                          <span className="flex-1 text-sm">{assignUser.nome}</span>
                                          <div className="flex items-center gap-1">
                                            {isCurrentUser && (
                                              <span className="text-xs text-blue-600 font-medium">Você</span>
                                            )}
                                            {isAssigned && (
                                              <span className="text-xs text-blue-600 font-medium flex items-center gap-1">
                                                <div className="w-2 h-2 rounded-full bg-blue-600" />
                                                Atual
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </ContextMenuItem>
                                    )
                                  })
                              )}
                            </ContextMenuSubContent>
                          </ContextMenuPortal>
                        </ContextMenuSub>
                        
                        {/* Etiqueta com submenu */}
                        <ContextMenuSub>
                          <ContextMenuSubTrigger>
                            <Tag className="w-4 h-4 mr-2" />
                            Etiqueta
                          </ContextMenuSubTrigger>
                          <ContextMenuPortal>
                            <ContextMenuSubContent className="w-48">
                              {availableEtiquetas.length === 0 ? (
                                <div className="p-2 text-sm text-muted-foreground text-center">
                                  Nenhuma etiqueta disponível
                                </div>
                              ) : (
                                availableEtiquetas.map((etiqueta) => {
                                  const isSelected = chat.etiqueta_ids?.includes(etiqueta.id) || false
                                  return (
                                    <ContextMenuItem
                                      key={etiqueta.id}
                                      onClick={() => handleAssignEtiqueta(chat.id, etiqueta.id, isSelected)}
                                      disabled={assigningEtiqueta}
                                      className="cursor-pointer"
                                    >
                                      <div className="flex items-center gap-2 w-full">
                                        <div
                                          className="w-3 h-3 rounded"
                                          style={{ backgroundColor: etiqueta.cor }}
                                        />
                                        <span className="flex-1 text-sm">{etiqueta.nome}</span>
                                        {isSelected && (
                                          <span className="text-xs text-green-600 font-medium">✓</span>
                                        )}
                                      </div>
                                    </ContextMenuItem>
                                  )
                                })
                              )}
                            </ContextMenuSubContent>
                          </ContextMenuPortal>
                        </ContextMenuSub>
                        
                        {/* Editar nome */}
                        <ContextMenuItem 
                          onClick={() => {
                            setContextMenuChat(chat)
                            setShowEditNameDialog(true)
                          }}
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Editar nome
                        </ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
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

        {/* DIALOGS do Context Menu */}
        {contextMenuChat && (
          <>
            <EditChatNameDialog
              open={showEditNameDialog}
              onOpenChange={(open) => {
                setShowEditNameDialog(open)
                if (!open) setContextMenuChat(null)
              }}
              chatId={contextMenuChat.id}
              currentName={contextMenuChat.name || contextMenuChat.id}
              onSuccess={() => {
                onRefresh?.()
                setShowEditNameDialog(false)
                setContextMenuChat(null)
              }}
            />

            <AssignToUserDialog
              open={showAssignDialog}
              onOpenChange={(open) => {
                setShowAssignDialog(open)
                if (!open) setContextMenuChat(null)
              }}
              chatId={contextMenuChat.id}
              chatName={contextMenuChat.name || contextMenuChat.id}
              currentUserId={currentUserId}
              currentAssignment={assignmentsMap?.[contextMenuChat.id] ? {
                id: '',
                chat_id: contextMenuChat.id,
                chat_name: contextMenuChat.name || contextMenuChat.id,
                assigned_to_id: assignmentsMap[contextMenuChat.id].assigned_to_id,
                assigned_to_name: assignmentsMap[contextMenuChat.id].assigned_to_name,
                assigned_by_id: '',
                assigned_by_name: '',
                assigned_at: '',
                status: 'active',
                notes: '',
                created_at: '',
                updated_at: ''
              } : null}
              chatAssignment={null}
              onAssignSuccess={() => {
                onRefresh?.()
                setShowAssignDialog(false)
                setContextMenuChat(null)
              }}
            />
          </>
        )}

        {/* Dialog de todas etiquetas do chat */}
        {contextMenuChat && (
          <ChatEtiquetasDialog
            open={showEtiquetasDialog}
            onOpenChange={(open) => {
              setShowEtiquetasDialog(open)
              if (!open) setContextMenuChat(null)
            }}
            chatId={contextMenuChat.id}
            etiquetas={contextMenuChat.etiquetas || []}
            onEtiquetaRemoved={() => {
              onRefresh?.()
              // Atualiza local
              setChats(prev => prev.map(c => 
                c.id === contextMenuChat.id 
                  ? { ...c, etiquetas: c.etiquetas?.filter(e => 
                      contextMenuChat.etiquetas?.some(ce => ce.id === e.id)
                    ) || [] }
                  : c
              ))
            }}
          />
        )}

        {/* Modal de foto de perfil */}
        {profilePictureChat && (
          <ProfilePictureModal
            open={showProfilePictureModal}
            onOpenChange={(open) => {
              setShowProfilePictureModal(open)
              if (!open) setProfilePictureChat(null)
            }}
            imageUrl={profilePictureChat.url}
            name={profilePictureChat.name}
          />
        )}
      </div>
    )
  }
)

ChatList.displayName = 'ChatList'; 

export { ChatList };