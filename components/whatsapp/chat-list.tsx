"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback, useMemo, forwardRef, type ElementRef } from "react" 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, AlertCircle, RefreshCw, Loader2, User, Tag, Pencil, UserPlus, X, Tags, Copy, Phone, Plus, BarChart3, Check, FileText, DollarSign, XCircle, MessageSquare, Inbox, Archive } from "lucide-react"
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
import { ChatHistoryDialog } from "./chat-history-dialog"
import { ChatNotesDialog } from "./chat-notes-dialog"
import { History } from "lucide-react"
import type { Etiqueta } from "@/lib/whatsapp-types"
import { ConvertLeadDialog } from "@/components/crm/convert-lead-dialog"
import { UnconvertLeadDialog } from "@/components/crm/unconvert-lead-dialog"
import type { Lead } from "@/types/crm" 

// Ícone SVG do CRM (mesmo usado na Sidebar)
const CRMIcon = ({ className = "w-4 h-4 mr-2" }: { className?: string }) => (
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
    className={className}
  >
    <path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z" />
    <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
  </svg>
);

// Ícones de temperatura
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

interface ChatListProps {
  onSelectChat: (chat: Chat) => void
  selectedChatId: string | null
  refreshTrigger?: number
  initialData?: any
  onRefresh?: () => void
  shrink?: boolean // Novo prop para encolher
  onOpenNewLead?: (chat: Chat) => void // Callback para abrir quick-lead-form
}

// URL do Backend para imagens (Proxy)
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://backend-sobt.onrender.com";

const INITIAL_BATCH_SIZE = 50
const SUBSEQUENT_BATCH_SIZE = 50
const SCROLL_THRESHOLD = 100

type ChatListHandle = ElementRef<"div">; 

const ChatList = forwardRef<ChatListHandle, ChatListProps>(
  ({ onSelectChat, selectedChatId, refreshTrigger, initialData, onRefresh, shrink = false, onOpenNewLead }, ref) => { 
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
    
    const [filterMode, setFilterMode] = useState<"all" | "mine" | "archived">("all")
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
    const [showHistoryDialog, setShowHistoryDialog] = useState(false)
    const [showNotesDialog, setShowNotesDialog] = useState(false)
    const [showConvertLeadDialog, setShowConvertLeadDialog] = useState(false)
    const [showUnconvertLeadDialog, setShowUnconvertLeadDialog] = useState(false)
    const [leadForConversion, setLeadForConversion] = useState<Lead | null>(null)
    
    // Estado para chats com notas (mapa de chatId -> conteúdo da nota)
    const [chatNotes, setChatNotes] = useState<Record<string, string>>({})
    
    // Estado para lista de etiquetas disponíveis (para o submenu)
    const [availableEtiquetas, setAvailableEtiquetas] = useState<Etiqueta[]>([])
    const [assigningEtiqueta, setAssigningEtiqueta] = useState(false)

    // Estado para lista de usuários disponíveis para atribuição (para o submenu)
    const [availableUsers, setAvailableUsers] = useState<Array<{ id: string; nome: string; cargo: string; cor: string }>>([])
    const [assigningUser, setAssigningUser] = useState(false)

    // Estado para controlar se cada chat tem foto de perfil
    const [hasProfilePictureMap, setHasProfilePictureMap] = useState<{ [chatId: string]: boolean }>({})

    // Estado para mapear quais chats têm leads (por telefone e chat_uuid)
    const [chatLeadsMap, setChatLeadsMap] = useState<{ [key: string]: { 
      id: string; 
      nome: string; 
      temperatura: string; 
      proximo_contato: string | null; 
      status: string | null;
      cidade: string | null;
      interesse: string | null;
      endereco: string | null;
      telefone: string | null;
      cargo: string | null;
      chat_uuid: string | null;
      adicionado_por_id: string | null;
      adicionado_por_nome: string | null;
      // Dados de conversão
      valor_conversao: number | null;
      // Dados de desconversão
      motivo_desconversao: string | null;
    } }>({})

    // Estado para troca de temperatura via context menu
    const [changingTemperatura, setChangingTemperatura] = useState(false)

    const scrollContainerRef = (ref as React.RefObject<HTMLDivElement>) || useRef<HTMLDivElement>(null); 
    const isLoadingRef = useRef(false)

    // --- CARREGAR LEADS DOS CHATS ---
    const loadChatLeads = useCallback(async (chatsList: Chat[]) => {
        if (chatsList.length === 0) return;
        
        try {
            // Coleta todos os telefones dos chats (limpa caracteres não numéricos)
            const telefones = chatsList.map(c => {
                const phone = c.phone || c.id.split('@')[0];
                return phone.replace(/\D/g, ''); // Remove tudo que não é número
            }).filter(t => t.length > 0);
            
            const uuids = chatsList.map(c => c.uuid).filter(Boolean) as string[];
            
            // Constrói a query de forma segura - busca todos os campos do lead
            let query = supabase
                .from('leads')
                .select('id, nome, telefone, chat_uuid, temperatura, proximo_contato, status, cidade, interesse, endereco, cargo, adicionado_por_id, adicionado_por_nome');
            
            // Monta o filtro OR dinamicamente
            const orConditions: string[] = [];
            if (telefones.length > 0) {
                orConditions.push(`telefone.in.(${telefones.join(',')})`);
            }
            if (uuids.length > 0) {
                orConditions.push(`chat_uuid.in.(${uuids.join(',')})`);
            }
            
            if (orConditions.length === 0) return;
            
            const { data: leads, error } = await query.or(orConditions.join(','));
            
            if (error) {
                console.error("Erro na query de leads:", error);
                return;
            }
            
            if (leads && leads.length > 0) {
                // Busca conversões e desconversões para os leads
                const leadIds = leads.map(l => l.id);
                
                const [{ data: conversoes }, { data: desconversoes }] = await Promise.all([
                    supabase.from('conversoes').select('lead_id, valor').in('lead_id', leadIds).order('created_at', { ascending: false }),
                    supabase.from('desconversoes').select('lead_id, motivo').in('lead_id', leadIds).order('created_at', { ascending: false })
                ]);
                
                // Monta mapas de conversões e desconversões (mais recente de cada lead)
                const conversoesMap: Record<string, number> = {};
                const desconversoesMap: Record<string, string> = {};
                
                conversoes?.forEach(c => {
                    if (!conversoesMap[c.lead_id]) {
                        conversoesMap[c.lead_id] = c.valor;
                    }
                });
                
                desconversoes?.forEach(d => {
                    if (!desconversoesMap[d.lead_id]) {
                        desconversoesMap[d.lead_id] = d.motivo;
                    }
                });
                
                const leadsMap: typeof chatLeadsMap = {};
                leads.forEach(lead => {
                    const leadData = { 
                        id: lead.id, 
                        nome: lead.nome, 
                        temperatura: lead.temperatura || 'Morno', 
                        proximo_contato: lead.proximo_contato, 
                        status: lead.status,
                        cidade: lead.cidade,
                        interesse: lead.interesse,
                        endereco: lead.endereco,
                        telefone: lead.telefone,
                        cargo: lead.cargo,
                        chat_uuid: lead.chat_uuid,
                        adicionado_por_id: lead.adicionado_por_id,
                        adicionado_por_nome: lead.adicionado_por_nome,
                        valor_conversao: conversoesMap[lead.id] || null,
                        motivo_desconversao: desconversoesMap[lead.id] || null
                    };
                    
                    // Mapeia por telefone (limpo)
                    if (lead.telefone) {
                        const cleanPhone = lead.telefone.replace(/\D/g, '');
                        leadsMap[cleanPhone] = leadData;
                        leadsMap[lead.telefone] = leadData;
                    }
                    // Mapeia por chat_uuid
                    if (lead.chat_uuid) {
                        leadsMap[lead.chat_uuid] = leadData;
                    }
                });
                setChatLeadsMap(prev => ({ ...prev, ...leadsMap }));
            }
        } catch (e) {
            console.error("Erro ao carregar leads:", e);
        }
    }, [supabase]);

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

    // --- TROCAR TEMPERATURA DO LEAD ---
    const handleChangeTemperatura = useCallback(async (leadId: string, chatId: string, chatName: string, temperaturaAnterior: string, novaTemperatura: string) => {
        try {
            setChangingTemperatura(true)
            const currentUserName = getCookie("auth_user_name") || "Sistema"
            const currentUserId = getCookie("auth_user_id")
            
            const { error } = await supabase
                .from('leads')
                .update({ temperatura: novaTemperatura })
                .eq('id', leadId)
            
            if (error) {
                toast.error("Erro ao alterar temperatura")
                return
            }
            
            // Salva no histórico (chat_history)
            await supabase.from("chat_history").insert({
                chat_id: chatId,
                chat_name: chatName,
                event_type: "temperatura_changed",
                event_data: {
                    lead_id: leadId,
                    temperatura_anterior: temperaturaAnterior,
                    temperatura_nova: novaTemperatura
                },
                performed_by_id: currentUserId,
                performed_by_name: currentUserName
            })
            
            toast.success(`Temperatura alterada para ${novaTemperatura}`)
            
            // Atualiza o mapa local
            setChatLeadsMap(prev => {
                const newMap = { ...prev }
                Object.keys(newMap).forEach(key => {
                    if (newMap[key]?.id === leadId) {
                        newMap[key] = { ...newMap[key], temperatura: novaTemperatura }
                    }
                })
                return newMap
            })
            
            onRefresh?.()
        } catch (error) {
            console.error("Erro ao alterar temperatura:", error)
            toast.error("Erro ao alterar temperatura")
        } finally {
            setChangingTemperatura(false)
        }
    }, [supabase, onRefresh])

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
            loadChatLeads(chats);
        }
    }, [chats, loadChatNotes, loadChatLeads]);

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
                            lastMessageTime: normalizeTimestamp(newChat.last_message_time),
                            unreadCount: newChat.unread_count || 0,
                            pictureUrl: newChat.image_url,
                            archived: !!newChat.archived,
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

    // --- REALTIME: Ouve mensagens novas via evento customizado do WebSocket ---
    useEffect(() => {
        const handleNewMessage = (event: CustomEvent) => {
            const { chatId, message } = event.detail;
            
            if (!chatId || chatId.includes("@g.us")) return;
            
            const messageBody = message.body || message.content || message.conversation || "";
            const messageTime = normalizeTimestamp(message.timestamp || Date.now());
            const isFromMe = message.fromMe ?? false;
            
            setChats((prevChats) => {
                const chatIndex = prevChats.findIndex(c => c.id === chatId);
                
                if (chatIndex === -1) {
                    // Chat não está na lista, não faz nada (será carregado no próximo refresh)
                    return prevChats;
                }
                
                // Atualiza o chat existente com a nova mensagem
                const existingChat = prevChats[chatIndex];
                const updatedChat: Chat = {
                    ...existingChat,
                    lastMessage: messageBody,
                    lastMessageTime: messageTime,
                    // Se a mensagem não é do usuário e o chat não está selecionado, incrementa unread
                    unreadCount: !isFromMe && existingChat.id !== selectedChatId 
                        ? (existingChat.unreadCount || 0) + 1 
                        : existingChat.unreadCount
                };
                
                // Remove o chat da posição atual e coloca no topo
                const filtered = prevChats.filter(c => c.id !== chatId);
                return [updatedChat, ...filtered];
            });
            
            // Atualiza o cache SWR também
            mutate(CHAT_LIST_CACHE_KEY, (currentChats: Chat[] | undefined) => {
                if (!currentChats) return currentChats;
                
                const chatIndex = currentChats.findIndex(c => c.id === chatId);
                if (chatIndex === -1) return currentChats;
                
                const existingChat = currentChats[chatIndex];
                const updatedChat: Chat = {
                    ...existingChat,
                    lastMessage: messageBody,
                    lastMessageTime: messageTime,
                    unreadCount: !isFromMe && existingChat.id !== selectedChatId 
                        ? (existingChat.unreadCount || 0) + 1 
                        : existingChat.unreadCount
                };
                
                const filtered = currentChats.filter(c => c.id !== chatId);
                return [updatedChat, ...filtered];
            }, { revalidate: false });
        };
        
        window.addEventListener('whatsapp:new_message' as any, handleNewMessage);
        return () => {
            window.removeEventListener('whatsapp:new_message' as any, handleNewMessage);
        };
    }, [selectedChatId]);

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

    // --- REALTIME PARA MUDANÇAS DE STATUS DE LEADS (Conversão/Desconversão) ---
    useEffect(() => {
      const channel = supabase
        .channel('public:leads')
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'leads' }, (payload) => {
          const updatedLead = payload.new as any
          
          // Atualiza o mapa de leads localmente
          setChatLeadsMap(prev => {
            const newMap = { ...prev }
            
            // Atualiza pelas chaves conhecidas (telefone e uuid)
            Object.keys(newMap).forEach(key => {
              if (newMap[key]?.id === updatedLead.id) {
                newMap[key] = {
                  ...newMap[key],
                  id: updatedLead.id,
                  nome: updatedLead.nome,
                  temperatura: updatedLead.temperatura || 'Morno',
                  proximo_contato: updatedLead.proximo_contato,
                  status: updatedLead.status,
                  cidade: updatedLead.cidade,
                  interesse: updatedLead.interesse,
                  endereco: updatedLead.endereco,
                  telefone: updatedLead.telefone,
                  cargo: updatedLead.cargo,
                  chat_uuid: updatedLead.chat_uuid,
                  adicionado_por_id: updatedLead.adicionado_por_id,
                  adicionado_por_nome: updatedLead.adicionado_por_nome
                }
              }
            })
            
            return newMap
          })
        })
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }, [supabase])


    // ✅ FUNÇÃO PRINCIPAL: CARREGAR CHATS DO BACKEND (Baileys)
    async function loadChats(currentOffset: number, isInitial = false) {
      if (isLoadingRef.current) return
      isLoadingRef.current = true
      
      if (!isInitial) setLoadingMore(true)

      try {
        const limit = isInitial ? INITIAL_BATCH_SIZE : SUBSEQUENT_BATCH_SIZE

        // Monta query string para o backend
        const params = new URLSearchParams()
        params.set('limit', String(limit))
        params.set('offset', String(currentOffset))
        if (debouncedSearch) {
          params.set('search', debouncedSearch)
        }

        // Busca chats do backend via API route
        const response = await fetch(`/api/whatsapp/chats?${params.toString()}`)
        const result = await response.json()

        if (!result.success) {
          console.error("❌ ERRO Backend:", result.message)
          throw new Error(result.message || "Erro ao carregar chats")
        }

        const chatsData = result.chats || []
        const totalCount = result.total || chatsData.length

        // Busca etiquetas do banco para enriquecer os chats
        const allEtiquetaIds: string[] = [];
        const chatEtiquetaIdsMap: Record<string, string[]> = {};
        
        chatsData.forEach((c: any) => {
          // Normaliza o ID
          const chatId = typeof c.id === 'string' ? c.id : (c.id?._serialized || c.id?.user || String(c.id))
          const ids: string[] = c.etiqueta_ids || [];
          chatEtiquetaIdsMap[chatId] = ids;
          ids.forEach((id: string) => {
            if (!allEtiquetaIds.includes(id)) {
              allEtiquetaIds.push(id);
            }
          });
        });

        // Busca dados de etiquetas do Supabase (metadados locais)
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

        // Formata os chats recebidos do backend
        const newChats: Chat[] = chatsData.map((c: any) => {
            // Normaliza o ID (pode vir como string ou objeto)
            const chatId = typeof c.id === 'string' ? c.id : (c.id?._serialized || c.id?.user || String(c.id))
            const chatIdMap = chatEtiquetaIdsMap[chatId] || chatEtiquetaIdsMap[c.id] || []
            
            const etiquetas: EtiquetaSimple[] = chatIdMap
              .map(id => etiquetasDataMap[id])
              .filter(Boolean);
            
            return {
              id: chatId,
              uuid: c.uuid,
              name: c.name || c.pushName || '',
              phone: c.phone || (typeof chatId === 'string' && chatId.includes('@') ? chatId.split('@')[0] : chatId),
              lastMessage: typeof c.lastMessage === 'string' 
                ? c.lastMessage 
                : (c.lastMessage?.body || c.last_message?.body || c.last_message || ''),
              lastMessageTime: normalizeTimestamp(c.timestamp || c.lastMessageTime || c.lastMessage?.timestamp || c.last_message_time),
              unreadCount: c.unreadCount || c.unread_count || 0,
              pictureUrl: c.profilePicUrl || c.pictureUrl || c.image_url,
              archived: !!c.archived,
              etiquetas: etiquetas,
            };
        }).sort((a, b) => {
          // Ordena por lastMessageTime em ordem decrescente (mais recente primeiro)
          // Chats sem mensagem (timestamp 0) vão para o final
          if (a.lastMessageTime === 0 && b.lastMessageTime === 0) return 0
          if (a.lastMessageTime === 0) return 1
          if (b.lastMessageTime === 0) return -1
          return b.lastMessageTime - a.lastMessageTime
        });

        const hasMoreData = (currentOffset + newChats.length) < totalCount

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

    // Helper para normalizar timestamps (pode vir como número, objeto ou string)
    function normalizeTimestamp(timestamp: any): number {
      if (!timestamp) return 0
      
      // Se for objeto com propriedades low/high (formato Long do backend)
      if (typeof timestamp === 'object' && timestamp.low !== undefined) {
        return timestamp.low * 1000 // Converte segundos para milissegundos
      }
      
      // Se for string, converte para número
      if (typeof timestamp === 'string') {
        const parsed = parseInt(timestamp, 10)
        return isNaN(parsed) ? 0 : parsed
      }
      
      // Se for número, retorna direto
      if (typeof timestamp === 'number') {
        // Se for em segundos (menor que ano 3000), converte para milissegundos
        return timestamp < 10000000000 ? timestamp * 1000 : timestamp
      }
      
      return 0
    }

    // Formatação visual de data
    function formatTime(timestamp: number | null) {
      if (!timestamp || timestamp <= 0) return ""
      
      // Garante que está em milissegundos
      const ts = timestamp < 10000000000 ? timestamp * 1000 : timestamp
      
      const date = new Date(ts)
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

        // 🔧 DEDUPLICAÇÃO: Remove chats duplicados por ID (mantém o primeiro)
        const seenIds = new Set<string>();
        filteredChats = filteredChats.filter(chat => {
            if (seenIds.has(chat.id)) {
                console.warn(`[DEDUPE] Chat duplicado removido: ${chat.id}`);
                return false;
            }
            seenIds.add(chat.id);
            return true;
        });

        // 🔍 DEBUG: Mostra quantos chats arquivados existem
        const archivedCount = filteredChats.filter(c => c.archived).length;
        console.log(`📊 Total de chats: ${filteredChats.length}, Arquivados: ${archivedCount}, Modo: ${filterMode}`);

        // Filtro básico (Todas / Minhas / Arquivadas)
        if (filterMode === 'all') {
            // Não exibe conversas arquivadas em "Todas"
            filteredChats = filteredChats.filter(chat => !chat.archived);
        } else if (filterMode === 'mine' && currentUserId && assignmentsMap) {
            // Não exibe conversas arquivadas em "Minhas"
            filteredChats = filteredChats.filter(chat => {
                const assignment = assignmentsMap[chat.id];
                return assignment && assignment.assigned_to_id === currentUserId && !chat.archived;
            });
        } else if (filterMode === 'archived') {
            // Exibe apenas conversas arquivadas
            filteredChats = filteredChats.filter(chat => chat.archived);
        }

        // Filtros avançados
        if (advancedFilters.length > 0) {
            filteredChats = filteredChats.filter(chat => {
                return advancedFilters.every(filter => {
                    if (!filter.value) return true; // Ignora filtros sem valor
                    
                    // Helper para obter o lead do chat
                    const getChatLead = () => {
                        const phone = chat.phone || chat.id.split('@')[0];
                        return chatLeadsMap[phone] || chatLeadsMap[chat.uuid || ''] || null;
                    };
                    
                    switch (filter.type) {
                        case "etiqueta":
                            if (filter.value === "sem_etiqueta") {
                                return !chat.etiquetas || chat.etiquetas.length === 0;
                            }
                            // Verifica se o chat tem a etiqueta (em qualquer posição)
                            return chat.etiquetas?.some(e => e.id === filter.value) || false;
                        
                        case "atribuicao":
                            if (filter.value === "sem_atribuicao") {
                                return !assignmentsMap?.[chat.id];
                            }
                            const assignment = assignmentsMap?.[chat.id];
                            return assignment?.assigned_to_id === filter.value;
                        
                        case "lead":
                            const lead = getChatLead();
                            if (filter.value === "possui") {
                                return !!lead;
                            } else {
                                return !lead;
                            }
                        
                        case "temperatura":
                            const leadTemp = getChatLead();
                            if (!leadTemp) return false;
                            return leadTemp.temperatura === filter.value;
                        
                        case "conversao":
                            const leadConv = getChatLead();
                            if (filter.value === "convertido") {
                                return leadConv?.status === "convertido";
                            } else {
                                return !leadConv || leadConv.status !== "convertido";
                            }
                        
                        default:
                            return true;
                    }
                });
            });
        }

        return filteredChats;
    }, [chats, filterMode, currentUserId, assignmentsMap, advancedFilters, chatLeadsMap]);

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
      <div className={cn("flex flex-col h-full bg-background border-r transition-all duration-300 custom-scrollbar", // Aumentei a largura mínima do shrink para 280px/300px
shrink ? "w-[300px] min-w-[280px] max-w-[320px]" : "w-[380px] min-w-[320px] max-w-[400px]")}> 
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
              className={cn("flex-1 h-8 text-sm font-medium transition-all", filterMode === 'all' && "bg-secondary shadow-sm")}
            >
              <MessageSquare className="w-4 h-4 mr-1.5" />
              Todas
            </Button>
            <Button 
              variant={filterMode === 'mine' ? "secondary" : "ghost"} 
              size="sm" 
              onClick={() => setFilterMode('mine')}
              className={cn("flex-1 h-8 text-sm font-medium transition-all", filterMode === 'mine' && "bg-secondary shadow-sm")}
            >
              <Inbox className="w-4 h-4 mr-1.5" />
              Minhas
            </Button>
            <Button 
              variant={filterMode === 'archived' ? "secondary" : "ghost"} 
              size="sm" 
              onClick={() => setFilterMode('archived')}
              className={cn("flex-1 h-8 text-sm font-medium transition-all", filterMode === 'archived' && "bg-secondary shadow-sm")}
            >
              <Archive className="w-4 h-4 mr-1.5" />
              Arquivadas
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
          className="flex-1 overflow-y-auto custom-scrollbar"
          style={{ overscrollBehavior: "contain", WebkitOverflowScrolling: "touch", scrollBehavior: "smooth" }}
        >
          {displayChats.length === 0 ? (
            <div className="p-6 text-center space-y-3 flex flex-col items-center">
              <p className="text-muted-foreground text-sm">
                {filterMode === 'mine' 
                  ? "Você não tem conversas atribuídas" 
                  : filterMode === 'archived'
                    ? "Nenhuma conversa arquivada"
                    : "Nenhuma conversa encontrada"}
              </p>
            </div>
          ) : (
            <>
              <div className="py-1">
                {displayChats.map((chat) => {
                  const assignment = assignmentsMap?.[chat.id]
                  // Usa a foto do WhatsApp CDN se disponível, senão fallback para proxy do backend
                  const profilePicture = chat.pictureUrl || `${BACKEND_URL}/chats/avatar/${chat.id}`

                  // Determina se tem etiquetas
                  const hasEtiquetas = chat.etiquetas && chat.etiquetas.length > 0
                  
                  // Verifica se tem nota
                  const hasNote = !!chatNotes[chat.id]
                  const noteContent = chatNotes[chat.id] || null

                  // Verifica se tem lead (usa telefone limpo para match)
                  const chatPhone = (chat.phone || chat.id.split('@')[0]).replace(/\D/g, '')
                  const chatLead = chatLeadsMap[chatPhone] || chatLeadsMap[chat.uuid || ''] || null
                  const isConverted = chatLead?.status === "convertido"

                  return (
                    <ContextMenu key={chat.id}>
                      <ContextMenuTrigger asChild>
                        <button
                          onClick={() => onSelectChat(chat)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-3 transition-all duration-75 text-left",
                            selectedChatId === chat.id
                              ? isConverted
                                ? "bg-green-200 dark:bg-green-800/60 border-l-4 border-green-700"
                                : chatLead?.status === "ativo" && chatLead?.motivo_desconversao
                                  ? "bg-orange-200 dark:bg-orange-800/60 border-l-4 border-orange-600"
                                  : "bg-blue-200 dark:bg-blue-800/60 border-l-4 border-primary"
                              : isConverted
                                ? "bg-green-50 dark:bg-green-900/40 border-l-4 border-green-600 hover:bg-green-200 dark:hover:bg-green-800/60"
                                : chatLead?.status === "ativo" && chatLead?.motivo_desconversao
                                  ? "bg-orange-50 dark:bg-orange-900/30 border-l-4 border-orange-400 hover:bg-orange-200 dark:hover:bg-orange-800/60"
                                  : "hover:bg-blue-200 dark:hover:bg-blue-800/60"
                          )}
                        >
                          <Avatar 
                            className={cn(
                              "w-12 h-12 flex-shrink-0 transition-opacity",
                              hasProfilePictureMap[chat.id] && "cursor-pointer hover:opacity-80"
                            )}
                            onClick={(e) => {
                              if (!hasProfilePictureMap[chat.id]) return;
                              e.stopPropagation();
                              setProfilePictureChat({
                                url: profilePicture,
                                name: chat.name || chat.phone || chat.id.split('@')[0]
                              });
                              setShowProfilePictureModal(true);
                            }}
                          >
                            <AvatarImage 
                              src={profilePicture} 
                              alt={chat.name} 
                              className="object-cover" 
                              onLoad={() => setHasProfilePictureMap(prev => ({ ...prev, [chat.id]: true }))}
                              onError={() => setHasProfilePictureMap(prev => ({ ...prev, [chat.id]: false }))}
                            />
                            {/* ✅ CORRIGIDO: Fallback com fundo cinza e ícone de User */}
                            <AvatarFallback className="bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                              <User className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            {/* Linha 1: Nome + Hora + Badges */}
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <p className="font-semibold truncate flex-1 min-w-0">{chat.name || chat.phone || chat.id.split('@')[0]}</p>
                              {/* Badges alinhados à direita - Ordem: notas, etiquetas, temperatura, atribuição */}
                              <div className="flex items-center gap-1.5 flex-shrink-0">
                                {/* 1. Badge de nota - clique abre modal de notas */}
                                {hasNote && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Badge 
                                          variant="secondary" 
                                          className="text-xs px-1.5 h-6 flex items-center gap-1 flex-shrink-0 cursor-pointer rounded-md border bg-yellow-100 border-yellow-300 text-yellow-700"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            setContextMenuChat(chat)
                                            setShowNotesDialog(true)
                                          }}
                                        >
                                          <FileText className="w-3.5 h-3.5" />
                                        </Badge>
                                      </TooltipTrigger>
                                      <TooltipContent side="top">
                                        <p>Nota: {noteContent?.substring(0, 50)}{noteContent && noteContent.length > 50 ? '...' : ''}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                                {/* 2. Badge de etiquetas - clique abre context menu */}
                                {hasEtiquetas && (
                                  <ContextMenu>
                                    <ContextMenuTrigger asChild>
                                      <div onClick={(e) => e.stopPropagation()} className="flex-shrink-0">
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Badge 
                                                variant="secondary" 
                                                className="text-xs px-1.5 h-6 flex items-center gap-1 flex-shrink-0 cursor-pointer rounded-md border bg-gray-100 border-gray-300 text-gray-700"
                                              >
                                                <Tag className="w-3.5 h-3.5" />
                                                {chat.etiquetas!.length > 1 && <span className="text-xs">{chat.etiquetas!.length}</span>}
                                              </Badge>
                                            </TooltipTrigger>
                                            <TooltipContent side="top" className="max-w-[200px] p-1.5">
                                              <div className="flex flex-wrap gap-1 items-center">
                                                {chat.etiquetas!.map(etiqueta => (
                                                  <Badge
                                                    key={etiqueta.id}
                                                    variant="secondary"
                                                    className="text-xs px-2 py-0.5 flex items-center gap-1 rounded-md border"
                                                    style={{ 
                                                      backgroundColor: etiqueta.cor, 
                                                      borderColor: etiqueta.cor, 
                                                      color: getContrastTextColor(etiqueta.cor) 
                                                    }}
                                                  >
                                                    <Tag className="w-3.5 h-3.5" />
                                                    {etiqueta.nome}
                                                  </Badge>
                                                ))}
                                              </div>
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      </div>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent className="min-w-48">
                                      {availableEtiquetas.map((etiqueta) => {
                                        const isSelected = chat.etiquetas?.some(e => e.id === etiqueta.id) || false
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
                                                <Check className="w-4 h-4 text-green-600" />
                                              )}
                                            </div>
                                          </ContextMenuItem>
                                        )
                                      })}
                                    </ContextMenuContent>
                                  </ContextMenu>
                                )}
                                {/* 3. Badge de temperatura com context menu */}
                                {chatLead && (
                                  <ContextMenu>
                                    <ContextMenuTrigger asChild>
                                      <div onClick={(e) => e.stopPropagation()} className="flex-shrink-0">
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Badge 
                                                variant="secondary" 
                                                className={cn(
                                                  "text-xs px-1.5 h-6 flex items-center gap-1 flex-shrink-0 cursor-pointer rounded-md border",
                                                  chatLead.temperatura === "Quente" && "bg-red-100 border-red-300 text-red-700",
                                                  chatLead.temperatura === "Morno" && "bg-orange-100 border-orange-300 text-orange-700",
                                                  chatLead.temperatura === "Frio" && "bg-blue-100 border-blue-300 text-blue-700"
                                                )}
                                              >
                                                <TemperaturaIcon temperatura={chatLead.temperatura} size={14} />
                                              </Badge>
                                            </TooltipTrigger>
                                            <TooltipContent side="top">
                                              <p>{chatLead.temperatura}</p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      </div>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent className="min-w-32">
                                      {["Quente", "Morno", "Frio"].map((temp) => (
                                        <ContextMenuItem
                                          key={temp}
                                          onClick={() => handleChangeTemperatura(chatLead.id, chat.id, chat.name || chat.phone || chat.id, chatLead.temperatura, temp)}
                                          disabled={changingTemperatura}
                                          className="cursor-pointer"
                                        >
                                          <div className="flex items-center gap-2 w-full">
                                            <TemperaturaIcon temperatura={temp} size={14} />
                                            <span className="flex-1 text-sm">{temp}</span>
                                            {chatLead.temperatura === temp && (
                                              <Check className="w-4 h-4 text-green-600" />
                                            )}
                                          </div>
                                        </ContextMenuItem>
                                      ))}
                                    </ContextMenuContent>
                                  </ContextMenu>
                                )}
                                {/* 3.5. Badge de Convertido - clique abre context menu para desconverter */}
                                {isConverted && (
                                  <ContextMenu>
                                    <ContextMenuTrigger asChild>
                                      <div onClick={(e) => e.stopPropagation()} className="flex-shrink-0">
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Badge 
                                                variant="secondary" 
                                                className="text-xs px-1.5 h-6 flex items-center gap-1 flex-shrink-0 cursor-pointer rounded-md border bg-green-100 border-green-300 text-green-700"
                                              >
                                                <DollarSign className="w-3.5 h-3.5" />
                                              </Badge>
                                            </TooltipTrigger>
                                            <TooltipContent side="top">
                                              <p>Convertido{chatLead?.valor_conversao ? `: R$ ${chatLead.valor_conversao.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : ''}</p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      </div>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent className="w-48">
                                      <ContextMenuItem
                                        onClick={() => {
                                          setLeadForConversion({
                                            id: chatLead!.id,
                                            nome: chatLead!.nome,
                                            cidade: chatLead!.cidade,
                                            interesse: chatLead!.interesse,
                                            endereco: chatLead!.endereco,
                                            telefone: chatLead!.telefone,
                                            cargo: chatLead!.cargo,
                                            temperatura: chatLead!.temperatura as "Quente" | "Morno" | "Frio",
                                            status: "convertido",
                                            chat_uuid: chatLead!.chat_uuid,
                                            adicionado_por_id: chatLead!.adicionado_por_id || '',
                                            adicionado_por_nome: chatLead!.adicionado_por_nome || '',
                                            proximo_contato: chatLead!.proximo_contato
                                          } as Lead)
                                          setShowUnconvertLeadDialog(true)
                                        }}
                                        className="cursor-pointer bg-orange-50 hover:bg-orange-100 text-orange-600 focus:bg-orange-100 focus:text-orange-600"
                                      >
                                        <XCircle className="w-4 h-4 mr-2 text-orange-600" />
                                        Desconverter Lead
                                      </ContextMenuItem>
                                    </ContextMenuContent>
                                  </ContextMenu>
                                )}
                                {/* 3.6. Badge de Desconvertido - clique abre context menu para converter */}
                                {chatLead && chatLead.status === "ativo" && chatLead.motivo_desconversao && (
                                  <ContextMenu>
                                    <ContextMenuTrigger asChild>
                                      <div onClick={(e) => e.stopPropagation()} className="flex-shrink-0">
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Badge 
                                                variant="secondary" 
                                                className="text-xs px-1.5 h-6 flex items-center gap-1 flex-shrink-0 cursor-pointer rounded-md border bg-orange-100 border-orange-300 text-orange-700"
                                              >
                                                <XCircle className="w-3.5 h-3.5" />
                                              </Badge>
                                            </TooltipTrigger>
                                            <TooltipContent side="top" className="max-w-[250px]">
                                              <p>Desconvertido: {chatLead.motivo_desconversao.substring(0, 100)}{chatLead.motivo_desconversao.length > 100 ? '...' : ''}</p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      </div>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent className="w-48">
                                      <ContextMenuItem
                                        onClick={() => {
                                          setLeadForConversion({
                                            id: chatLead.id,
                                            nome: chatLead.nome,
                                            cidade: chatLead.cidade,
                                            interesse: chatLead.interesse,
                                            endereco: chatLead.endereco,
                                            telefone: chatLead.telefone,
                                            cargo: chatLead.cargo,
                                            temperatura: chatLead.temperatura as "Quente" | "Morno" | "Frio",
                                            status: chatLead.status as "ativo" | "convertido" | null,
                                            chat_uuid: chatLead.chat_uuid,
                                            adicionado_por_id: chatLead.adicionado_por_id || '',
                                            adicionado_por_nome: chatLead.adicionado_por_nome || '',
                                            proximo_contato: chatLead.proximo_contato
                                          } as Lead)
                                          setShowConvertLeadDialog(true)
                                        }}
                                        className="cursor-pointer bg-green-50 hover:bg-green-100 text-green-600 focus:bg-green-100 focus:text-green-600"
                                      >
                                        <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                                        Converter Lead
                                      </ContextMenuItem>
                                    </ContextMenuContent>
                                  </ContextMenu>
                                )}
                                {/* 4. Badge de atribuição (estilo moderno com cor do cargo) */}
                                {assignment && (
                                  <ContextMenu>
                                    <ContextMenuTrigger asChild>
                                      <div onClick={(e) => { e.stopPropagation(); onSelectChat(chat); }} className="flex-shrink-0 relative z-20">
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Badge 
                                                variant="secondary" 
                                                className="text-xs px-1.5 h-6 flex items-center gap-1 flex-shrink-0 cursor-pointer rounded-md border"
                                                style={{ 
                                                  backgroundColor: `color-mix(in srgb, ${assignment.assigned_to_color || '#6b7280'} 20%, white)`,
                                                  borderColor: assignment.assigned_to_color || '#6b7280',
                                                  color: assignment.assigned_to_color || '#6b7280'
                                                }}
                                              >
                                                <User className="w-3.5 h-3.5" />
                                                <span className="text-xs max-w-[50px] truncate">{assignment.assigned_to_name?.split(' ')[0]}</span>
                                              </Badge>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p>{assignment.assigned_to_name?.split(' ')[0]} - {assignment.assigned_to_cargo || ''}</p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      </div>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent className="w-56">
                                      {/* Submenu para mover atribuição */}
                                      <ContextMenuSub>
                                        <ContextMenuSubTrigger className="cursor-pointer">
                                          <UserPlus className="w-4 h-4 mr-2" />
                                          Mover atribuição
                                        </ContextMenuSubTrigger>
                                        <ContextMenuPortal>
                                          <ContextMenuSubContent className="min-w-48">
                                            {availableUsers.filter(u => u.id !== assignment.assigned_to_id).map((assignUser) => (
                                              <ContextMenuItem
                                                key={assignUser.id}
                                                onClick={() => handleAssignUser(chat.id, chat.name || chat.phone || chat.id, assignUser.id, assignUser.nome)}
                                                disabled={assigningUser}
                                                className="cursor-pointer"
                                              >
                                                <div className="flex items-center gap-2 w-full">
                                                  <div
                                                    className="w-3 h-3 rounded"
                                                    style={{ backgroundColor: assignUser.cor }}
                                                  />
                                                  <span className="flex-1 text-sm">{assignUser.nome}</span>
                                                </div>
                                              </ContextMenuItem>
                                            ))}
                                          </ContextMenuSubContent>
                                        </ContextMenuPortal>
                                      </ContextMenuSub>
                                      <ContextMenuSeparator />
                                      <ContextMenuItem
                                        onClick={async (e) => {
                                          e.stopPropagation()
                                          try {
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
                                        className="cursor-pointer text-destructive focus:text-destructive"
                                      >
                                        <X className="w-4 h-4 mr-2" />
                                        Remover atribuição
                                      </ContextMenuItem>
                                    </ContextMenuContent>
                                  </ContextMenu>
                                )}
                                <span className="text-xs text-muted-foreground ml-2">
                                  {formatTime(chat.lastMessageTime)}
                                </span>
                              </div>
                            </div>

                            {/* Linha 2: Mensagem mais recente + badge de mensagens novas */}
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-sm text-muted-foreground truncate flex-1">
                                {chat.lastMessage || "Sem mensagens"}
                              </p>
                              {chat.unreadCount > 0 && (
                                <span className="flex-shrink-0 bg-primary text-primary-foreground text-xs font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1.5">
                                  {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
                                </span>
                              )}
                            </div>
                          </div>
                        </button>
                      </ContextMenuTrigger>
                      <ContextMenuContent className="w-48">
                        {/* Atribuir com submenu de usuários */}
                        <ContextMenuSub>
                          <ContextMenuSubTrigger className="cursor-pointer">
                            <UserPlus className="w-4 h-4 mr-2" />
                            Atribuir
                          </ContextMenuSubTrigger>
                          <ContextMenuPortal>
                            <ContextMenuSubContent className="min-w-48 w-fit">
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
                                        onClick={() => handleAssignUser(chat.id, chat.name || chat.phone || chat.id, assignUser.id, assignUser.nome)}
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
                          <ContextMenuSubTrigger className="cursor-pointer">
                            <Tag className="w-4 h-4 mr-2" />
                            Etiqueta
                          </ContextMenuSubTrigger>
                          <ContextMenuPortal>
                            <ContextMenuSubContent className="min-w-48 w-fit">
                              {availableEtiquetas.length === 0 ? (
                                <div className="p-2 text-sm text-muted-foreground text-center">
                                  Nenhuma etiqueta disponível
                                </div>
                              ) : (
                                availableEtiquetas.map((etiqueta) => {
                                  const isSelected = chat.etiqueta_ids?.includes(etiqueta.id) || chat.etiquetas?.some(e => e.id === etiqueta.id) || false
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
                                          <Check className="w-4 h-4 text-green-600" />
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
                          className="cursor-pointer"
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Editar nome
                        </ContextMenuItem>

                        {/* Ver histórico */}
                        <ContextMenuItem 
                          onClick={() => {
                            setContextMenuChat(chat)
                            setShowHistoryDialog(true)
                          }}
                          className="cursor-pointer"
                        >
                          <History className="w-4 h-4 mr-2" />
                          Ver histórico
                        </ContextMenuItem>

                        <ContextMenuSeparator />

                        {/* Novo Lead / Ver Lead - ANTES da conversão */}
                        {chatLead ? (
                          <ContextMenuItem 
                            onClick={() => {
                              const leadDate = chatLead.proximo_contato || new Date().toISOString().split('T')[0]
                              router.push(`/crm?leadId=${chatLead.id}&date=${leadDate}`)
                            }}
                            className="cursor-pointer"
                          >
                            <CRMIcon className="w-4 h-4 mr-2" />
                            Ver Lead
                          </ContextMenuItem>
                        ) : (
                          <ContextMenuItem 
                            onClick={() => {
                              onSelectChat(chat)
                              // Abre o painel de novo lead depois de selecionar o chat
                              if (onOpenNewLead) {
                                setTimeout(() => {
                                  onOpenNewLead(chat)
                                }, 150)
                              }
                            }}
                            className="cursor-pointer"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Novo Lead
                          </ContextMenuItem>
                        )}

                        <ContextMenuSeparator />

                        {/* Converter/Desconverter Lead - SEMPRE POR ÚLTIMO */}
                        {chatLead ? (
                          <>
                            {chatLead.status === "convertido" ? (
                              <ContextMenuItem 
                                onClick={() => {
                                  setLeadForConversion({
                                    id: chatLead.id,
                                    nome: chatLead.nome,
                                    cidade: chatLead.cidade,
                                    interesse: chatLead.interesse,
                                    endereco: chatLead.endereco,
                                    telefone: chatLead.telefone,
                                    cargo: chatLead.cargo,
                                    temperatura: chatLead.temperatura as "Quente" | "Morno" | "Frio",
                                    status: "convertido",
                                    chat_uuid: chatLead.chat_uuid,
                                    adicionado_por_id: chatLead.adicionado_por_id || '',
                                    adicionado_por_nome: chatLead.adicionado_por_nome || '',
                                    proximo_contato: chatLead.proximo_contato
                                  } as Lead)
                                  setShowUnconvertLeadDialog(true)
                                }}
                                className="cursor-pointer bg-orange-50 hover:bg-orange-100 text-orange-600 focus:bg-orange-100 focus:text-orange-600"
                              >
                                <XCircle className="w-4 h-4 mr-2 text-orange-600" />
                                Desconverter
                              </ContextMenuItem>
                            ) : (
                              <ContextMenuItem 
                                onClick={() => {
                                  setLeadForConversion({
                                    id: chatLead.id,
                                    nome: chatLead.nome,
                                    cidade: chatLead.cidade,
                                    interesse: chatLead.interesse,
                                    endereco: chatLead.endereco,
                                    telefone: chatLead.telefone,
                                    cargo: chatLead.cargo,
                                    temperatura: chatLead.temperatura as "Quente" | "Morno" | "Frio",
                                    status: chatLead.status as "ativo" | "convertido" | null,
                                    chat_uuid: chatLead.chat_uuid,
                                    adicionado_por_id: chatLead.adicionado_por_id || '',
                                    adicionado_por_nome: chatLead.adicionado_por_nome || '',
                                    proximo_contato: chatLead.proximo_contato
                                  } as Lead)
                                  setShowConvertLeadDialog(true)
                                }}
                                className="cursor-pointer bg-green-50 hover:bg-green-100 text-green-600 focus:bg-green-100 focus:text-green-600"
                              >
                                <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                                Converter
                              </ContextMenuItem>
                            )}
                          </>
                        ) : null}
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

        {/* Modal de histórico */}
        {contextMenuChat && (
          <ChatHistoryDialog
            open={showHistoryDialog}
            onOpenChange={(open) => {
              setShowHistoryDialog(open)
              if (!open) setContextMenuChat(null)
            }}
            chatId={contextMenuChat.id}
            chatName={contextMenuChat.name || contextMenuChat.phone || contextMenuChat.id}
          />
        )}

        {/* Modal de notas */}
        {contextMenuChat && (
          <ChatNotesDialog
            open={showNotesDialog}
            onOpenChange={(open) => {
              setShowNotesDialog(open)
              if (!open) setContextMenuChat(null)
            }}
            chatId={contextMenuChat.id}
            chatName={contextMenuChat.name || contextMenuChat.phone || contextMenuChat.id}
            onNotesChange={() => {
              // Recarrega notas após alteração
              loadChatNotes([contextMenuChat.id])
            }}
          />
        )}

        {/* Diálogos de conversão de leads */}
        <ConvertLeadDialog
          open={showConvertLeadDialog}
          onOpenChange={setShowConvertLeadDialog}
          lead={leadForConversion}
          onSuccess={() => {
            setShowConvertLeadDialog(false)
            setLeadForConversion(null)
            onRefresh?.()
          }}
        />

        <UnconvertLeadDialog
          open={showUnconvertLeadDialog}
          onOpenChange={setShowUnconvertLeadDialog}
          lead={leadForConversion}
          onSuccess={() => {
            setShowUnconvertLeadDialog(false)
            setLeadForConversion(null)
            onRefresh?.()
          }}
        />
      </div>
    )
  }
)

ChatList.displayName = 'ChatList'; 

export { ChatList };
