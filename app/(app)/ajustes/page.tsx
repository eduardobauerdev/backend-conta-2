"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ColorPalette } from "@/components/ui/color-palette"
import {
  UserCogIcon,
  User,
  Mail,
  Briefcase,
  Pen,
  LogOut,
  Loader2,
  CheckCircle2,
  MessageSquare,
  LinkIcon,
  Zap,
  Plus,
  Trash2,
  Edit,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Tag,
  ShoppingBag,
  Copy,
  ExternalLink,
  Image as ImageIcon,
  X,
  Star,
  ToggleLeft,
  ToggleRight,
  AlertTriangle,
  Info,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useUser } from "@/contexts/user-context"
import { PhotoUploadDialog } from "@/components/PhotoUploadDialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "sonner"
import { deleteCookie } from "@/lib/auth"
import { QRScanner } from "@/components/whatsapp/qr-scanner"
import { ConnectionStatus } from "@/components/whatsapp/connection-status"
import { SyncAnimation } from "@/components/whatsapp/sync-animation"
import { Radio, ArrowRight } from "lucide-react"
import Link from "next/link"
// import { useWhatsApp } from "@/contexts/whatsapp-context" // Removido (Contexto antigo)
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface UserProfile {
  id: string
  nome: string
  email: string
  cargo: string
  foto_perfil: string | null
  ultimo_login: string | null
}

interface QuickReply {
  id: string
  title: string
  message: string
  category_id: string
  category: {
    id: string
    name: string
  }
  created_by_name: string
}

interface Category {
  id: string
  name: string
  created_by_name: string
}

interface Etiqueta {
  id: string
  nome: string
  cor: string
  descricao: string | null
  created_by_name: string | null
}

interface Catalogo {
  id: string
  nome: string
  slug: string
  descricao: string | null
  logo_url: string | null
  cor_primaria: string
  ativo: boolean
  created_by_name: string | null
  created_at: string
}

interface ProdutoTipo {
  id: string
  catalogo_id: string
  nome: string
  descricao: string | null
  ordem: number
}

interface ProdutoImagem {
  id: string
  url: string
  ordem: number
  principal: boolean
}

interface Produto {
  id: string
  catalogo_id: string
  tipo_id: string | null
  nome: string
  descricao: string | null
  preco: number | null
  preco_promocional: number | null
  ativo: boolean
  destaque: boolean
  ordem: number
  tipo: ProdutoTipo | null
  imagens: ProdutoImagem[]
}

type SettingsTab = "usuario" | "whatsapp" | "links" | "respostas-rapidas" | "etiquetas" | "catalogo"

// URL do Backend (para logout) - O ideal é buscar do banco, mas usaremos ENV/Hardcoded por consistência com ChatList
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://backend-sobt.onrender.com";

export default function AjustesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, refreshUser } = useUser()
  const supabase = createClient()

  // ✅ ESTADO DE CONEXÃO LOCAL (Lendo do Banco)
  const [isWhatsAppConnected, setIsWhatsAppConnected] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  
  // ✅ LISTENERS DE REALTIME
  useEffect(() => {
      // 1. Busca status inicial
      const fetchStatus = async () => {
          const { data } = await supabase
              .from("instance_settings")
              .select("status")
              .eq("id", 1)
              .single()
          
          const status = data?.status
          setIsSyncing(status === "syncing")
          // "syncing" também é considerado conectado
          setIsWhatsAppConnected(status === "connected" || status === "syncing")
      }
      fetchStatus()

      // 2. Escuta mudanças em tempo real
      const channel = supabase
          .channel("settings_page_status")
          .on(
              "postgres_changes",
              { event: "UPDATE", schema: "public", table: "instance_settings", filter: "id=eq.1" },
              (payload) => {
                  const status = payload.new.status
                  setIsSyncing(status === "syncing")
                  // "syncing" também é considerado conectado
                  setIsWhatsAppConnected(status === "connected" || status === "syncing")
                  // Se conectar, fecha o QR automaticamente
                  if (status === "connected" || status === "syncing") setShowQR(false)
              }
          )
          .subscribe()

      return () => {
          supabase.removeChannel(channel)
      }
  }, [supabase])

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [nome, setNome] = useState("")
  const [showAllTags, setShowAllTags] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false)

  const [whatsappServerUrl, setWhatsappServerUrl] = useState("")
  const [loadingWhatsApp, setLoadingWhatsApp] = useState(true)
  const [urlSaved, setUrlSaved] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [disconnectingWhatsApp, setDisconnectingWhatsApp] = useState(false)

  const [activeTab, setActiveTab] = useState<SettingsTab>("usuario")

  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loadingReplies, setLoadingReplies] = useState(false)
  const [replyDialogOpen, setReplyDialogOpen] = useState(false)
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
  const [editingReply, setEditingReply] = useState<QuickReply | null>(null)
  const [replyForm, setReplyForm] = useState({
    title: "",
    message: "",
    category_id: "",
  })
  const [newCategoryName, setNewCategoryName] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([])
  const [loadingEtiquetas, setLoadingEtiquetas] = useState(false)
  const [etiquetaDialogOpen, setEtiquetaDialogOpen] = useState(false)
  const [editingEtiqueta, setEditingEtiqueta] = useState<Etiqueta | null>(null)
  const [etiquetaForm, setEtiquetaForm] = useState({
    nome: "",
    cor: "#3B82F6",
    descricao: "",
  })
  
  // Estados do diálogo de exclusão de etiqueta
  const [deleteEtiquetaDialogOpen, setDeleteEtiquetaDialogOpen] = useState(false)
  const [etiquetaToDelete, setEtiquetaToDelete] = useState<Etiqueta | null>(null)
  const [deleteConfirmationText, setDeleteConfirmationText] = useState("")
  const [isDeletingEtiqueta, setIsDeletingEtiqueta] = useState(false)

  // Estados do Catálogo
  const [catalogos, setCatalogos] = useState<Catalogo[]>([])
  const [loadingCatalogos, setLoadingCatalogos] = useState(false)
  const [catalogoDialogOpen, setCatalogoDialogOpen] = useState(false)
  const [editingCatalogo, setEditingCatalogo] = useState<Catalogo | null>(null)
  const [catalogoForm, setCatalogoForm] = useState({
    nome: "",
    descricao: "",
    logo_url: "",
    cor_primaria: "#000000",
  })

  // Estados de Produtos
  const [selectedCatalogo, setSelectedCatalogo] = useState<Catalogo | null>(null)
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [produtoTipos, setProdutoTipos] = useState<ProdutoTipo[]>([])
  const [loadingProdutos, setLoadingProdutos] = useState(false)
  const [produtoDialogOpen, setProdutoDialogOpen] = useState(false)
  const [editingProduto, setEditingProduto] = useState<Produto | null>(null)
  const [produtoForm, setProdutoForm] = useState({
    nome: "",
    descricao: "",
    tipo_id: "",
    preco: "",
    preco_promocional: "",
    destaque: false,
    imagens: [] as string[],
  })

  // Estados de Tipos de Produto
  const [tipoDialogOpen, setTipoDialogOpen] = useState(false)
  const [newTipoNome, setNewTipoNome] = useState("")

  useEffect(() => {
    const tabParam = searchParams.get("tab")
    if (tabParam && ["usuario", "whatsapp", "links", "respostas-rapidas", "etiquetas", "catalogo"].includes(tabParam)) {
      setActiveTab(tabParam as SettingsTab)
    }
  }, [searchParams])

  useEffect(() => {
    loadUserProfile()
    loadWhatsAppConfig() // Carrega URL da API do banco
    if (activeTab === "respostas-rapidas") {
      loadQuickReplies()
      loadCategories()
    }
    if (activeTab === "etiquetas") {
      loadEtiquetas()
    }
    if (activeTab === "catalogo") {
      loadCatalogos()
    }
  }, [user, activeTab])

  const loadUserProfile = async () => {
    if (!user) return

    setLoading(true)
    try {
      const { data, error } = await supabase.from("perfis").select("*").eq("id", user.id).single()

      if (error) {
        console.error("Erro ao carregar perfil:", error)
        return
      }

      setUserProfile(data)
      setNome(data.nome || "")
      setShowAllTags(data.show_all_tags || false)
    } catch (error) {
      console.error("Erro ao carregar perfil:", error)
    } finally {
      setLoading(false)
    }
  }

  // Carrega a URL da API salva no banco (whatsapp_config)
  async function loadWhatsAppConfig() {
    try {
      setLoadingWhatsApp(true)
      
      const { data, error } = await supabase
          .from("whatsapp_config")
          .select("server_url")
          .limit(1)
          .single()

      if (data?.server_url) {
        setWhatsappServerUrl(data.server_url)
        setUrlSaved(true)
      }
    } catch (error) {
      console.error("Erro config:", error)
    } finally {
      setLoadingWhatsApp(false)
    }
  }

  async function loadQuickReplies() {
    try {
      setLoadingReplies(true)
      const response = await fetch("/api/whatsapp/quick-replies")
      const data = await response.json()

      if (data.success) {
        setQuickReplies(data.replies || [])
      } else {
        toast.error("Erro ao carregar respostas rápidas")
      }
    } catch (error) {
      console.error("Erro ao carregar respostas rápidas:", error)
      toast.error("Erro ao carregar respostas rápidas")
    } finally {
      setLoadingReplies(false)
    }
  }

  async function loadCategories() {
    try {
      const response = await fetch("/api/whatsapp/quick-reply-categories")
      const data = await response.json()

      if (data.success) {
        setCategories(data.categories || [])
      }
    } catch (error) {
      console.error("Erro ao carregar categorias:", error)
    }
  }

  // Salva a URL no Banco (whatsapp_config)
  async function handleWhatsappUrlChange(value: string) {
    setWhatsappServerUrl(value)
    setUrlSaved(false)

    if (!value.trim()) return

    const cleanedUrl = value.trim().replace(/\/+$/, "")

    try {
        // Upsert na tabela de config (assume ID 1 ou cria novo)
        // Nota: Se sua tabela não tem ID fixo, talvez precise ajustar a lógica de insert
        // Aqui assumimos que a rota da API faz o upsert ou insert corretamente
        const response = await fetch("/api/whatsapp/config", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ server_url: cleanedUrl }),
        })

        if (response.ok) {
            setUrlSaved(true)
            toast.success("URL salva")
        }
    } catch (error) {
      toast.error("Erro ao salvar URL")
    }
  }

  // Desconectar: Chama o Backend via Proxy ou URL direta
  async function handleDisconnectWhatsApp() {
    setDisconnectingWhatsApp(true)
    try {
      // Usa a URL configurada ou fallback
      const baseUrl = whatsappServerUrl || BACKEND_URL;
      
      const response = await fetch(`${baseUrl}/session/disconnect`, {
        method: "POST",
      })

      if (response.ok) {
        toast.success("Solicitação enviada")
        // O Realtime vai atualizar o estado para desconectado automaticamente
      } else {
        toast.error("Erro ao desconectar")
      }
    } catch (error) {
      console.error("Erro ao desconectar:", error)
      toast.error("Erro de conexão")
    } finally {
      setDisconnectingWhatsApp(false)
    }
  }

  function handleWhatsAppConnected() {
    // Callback do QRScanner
    // O Realtime já cuida disso, mas mantemos para feedback imediato
    setShowQR(false)
    toast.success("Conectado!")
  }

  const handleSaveProfile = async () => {
    if (!userProfile) return

    setIsSaving(true)
    try {
      console.log("[Ajustes] Salvando perfil:", { nome, userId: userProfile.id })
      
      const { data, error } = await supabase
        .from("perfis")
        .update({
          nome: nome,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userProfile.id)
        .select()

      if (error) {
        console.error("[Ajustes] Erro ao salvar perfil:", error)
        toast.error(`Erro ao salvar perfil: ${error.message}`)
        return
      }

      console.log("[Ajustes] Perfil salvo com sucesso:", data)
      toast.success("Perfil atualizado com sucesso!")
      await refreshUser()
      loadUserProfile()
    } catch (error) {
      console.error("Erro ao salvar perfil:", error)
      toast.error("Erro ao salvar perfil")
    } finally {
      setIsSaving(false)
    }
  }

  const handlePhotoUpload = async (base64Image: string) => {
    if (!userProfile) return

    try {
      const { error } = await supabase
        .from("perfis")
        .update({
          foto_perfil: base64Image,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userProfile.id)

      if (error) {
        console.error("Erro ao salvar foto:", error)
        toast.error("Erro ao salvar foto de perfil")
        return
      }

      toast.success("Foto de perfil atualizada.")
      await refreshUser()
      loadUserProfile()
    } catch (error) {
      console.error("Erro ao salvar foto:", error)
      toast.error("Erro ao salvar foto de perfil")
    }
  }

  const handleLogout = () => {
    deleteCookie("auth_user_id")
    router.push("/login")
  }

  const folders = [
    {
      id: "contratoFisica",
      label: "Contratos Pessoa Física",
      description: "Pasta para contratos de pessoa física",
      link: "https://drive.google.com/drive/u/0/folders/1TyCZ0ZgO3tM4i-jzEKo5bX112KdVAQ7b",
    },
    {
      id: "contratoJuridica",
      label: "Contratos Pessoa Jurídica",
      description: "Pasta para contratos de pessoa jurídica",
      link: "https://drive.google.com/drive/u/0/folders/1f_3jWgVene_ZLPT80qJFNbS61SvYAnKr",
    },
    {
      id: "ordemServico",
      label: "Ordens de Serviço",
      description: "Pasta para ordens de serviço",
      link: "https://drive.google.com/drive/u/0/folders/1ZteBVMAVJhUbdj5bRg2UI78SeeGjzRFK",
    },
    {
      id: "editarTabelaOrdens",
      label: "Editar tabela de Ordens",
      description: "Edite a planilha de ordens de serviço",
      link: "https://docs.google.com/spreadsheets/d/1wqibNXuX9xiZKjwKqCe4eylfgWqMoRGtM6UjJGwql7c/edit?",
    },
    {
      id: "editarTabelaContratos",
      label: "Editar tabela de Contratos",
      description: "Edite a planilha de contratos",
      link: "https://docs.google.com/spreadsheets/d/1EHtZXkMSjt_CCd1US6wVEJh4hyibPr4A7Or23qAAS2w/edit?gid=0#gid=0",
    },
  ]

  const openReplyDialog = (reply?: QuickReply) => {
    if (reply) {
      setEditingReply(reply)
      setReplyForm({
        title: reply.title,
        message: reply.message,
        category_id: reply.category_id,
      })
    } else {
      setEditingReply(null)
      setReplyForm({
        title: "",
        message: "",
        category_id: categories[0]?.id || "",
      })
    }
    setReplyDialogOpen(true)
  }

  async function handleSaveReply() {
    if (!replyForm.title.trim() || !replyForm.message.trim() || !replyForm.category_id) {
      toast.error("Preencha todos os campos")
      return
    }

    try {
      const method = editingReply ? "PUT" : "POST"
      const body = editingReply ? { id: editingReply.id, ...replyForm } : replyForm

      const response = await fetch("/api/whatsapp/quick-replies", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (data.success) {
        toast.success(editingReply ? "Resposta rápida atualizada" : "Resposta rápida criada")
        setReplyDialogOpen(false)
        loadQuickReplies()
      } else {
        toast.error(data.message || "Erro ao salvar resposta rápida")
      }
    } catch (error) {
      console.error("Erro ao salvar resposta rápida:", error)
      toast.error("Erro ao salvar resposta rápida")
    }
  }

  async function handleSaveCategory() {
    if (!newCategoryName.trim()) {
      toast.error("Digite um nome para a categoria")
      return
    }

    try {
      const response = await fetch("/api/whatsapp/quick-reply-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Categoria criada com sucesso")
        setCategoryDialogOpen(false)
        setNewCategoryName("")
        loadCategories()
      } else {
        toast.error(data.message || "Erro ao criar categoria")
      }
    } catch (error) {
      console.error("Erro ao criar categoria:", error)
      toast.error("Erro ao criar categoria")
    }
  }

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId)
      } else {
        newSet.add(categoryId)
      }
      return newSet
    })
  }

  async function handleDeleteReply(id: string) {
    if (!confirm("Tem certeza que deseja deletar esta resposta rápida?")) {
      return
    }

    try {
      const response = await fetch(`/api/whatsapp/quick-replies?id=${id}`, { method: "DELETE" })

      const data = await response.json()

      if (data.success) {
        toast.success("Resposta rápida deletada")
        loadQuickReplies()
      } else {
        toast.error(data.message || "Erro ao deletar resposta rápida")
      }
    } catch (error) {
      console.error("Erro ao deletar resposta rápida:", error)
      toast.error("Erro ao deletar resposta rápida")
    }
  }

  async function loadEtiquetas() {
    try {
      setLoadingEtiquetas(true)
      const response = await fetch("/api/whatsapp/etiquetas")
      const data = await response.json()

      if (data.success) {
        setEtiquetas(data.etiquetas || [])
      } else {
        toast.error("Erro ao carregar etiquetas")
      }
    } catch (error) {
      console.error("Erro ao carregar etiquetas:", error)
      toast.error("Erro ao carregar etiquetas")
    } finally {
      setLoadingEtiquetas(false)
    }
  }

  const openEtiquetaDialog = (etiqueta?: Etiqueta) => {
    if (etiqueta) {
      setEditingEtiqueta(etiqueta)
      setEtiquetaForm({
        nome: etiqueta.nome,
        cor: etiqueta.cor,
        descricao: etiqueta.descricao || "",
      })
    } else {
      setEditingEtiqueta(null)
      setEtiquetaForm({
        nome: "",
        cor: "#3B82F6",
        descricao: "",
      })
    }
    setEtiquetaDialogOpen(true)
  }

  async function handleSaveEtiqueta() {
    if (!etiquetaForm.nome.trim() || !etiquetaForm.cor.trim()) {
      toast.error("Nome e cor são obrigatórios")
      return
    }

    try {
      const method = editingEtiqueta ? "PUT" : "POST"
      const body = editingEtiqueta ? { id: editingEtiqueta.id, ...etiquetaForm } : etiquetaForm

      const response = await fetch("/api/whatsapp/etiquetas", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (data.success) {
        toast.success(editingEtiqueta ? "Etiqueta atualizada" : "Etiqueta criada")
        setEtiquetaDialogOpen(false)
        loadEtiquetas()
      } else {
        toast.error(data.message || "Erro ao salvar etiqueta")
      }
    } catch (error) {
      console.error("Erro ao salvar etiqueta:", error)
      toast.error("Erro ao salvar etiqueta")
    }
  }

  async function handleDeleteEtiqueta(etiqueta: Etiqueta) {
    // Verifica se o usuário tem permissão (apenas Administrador e Desenvolvedor)
    const userCargo = user?.cargo?.toLowerCase() || ""
    const hasPermission = userCargo === "administrador" || userCargo === "desenvolvedor"
    
    if (!hasPermission) {
      toast.error("Você não tem permissão para excluir etiquetas")
      return
    }

    // Abre o diálogo de confirmação
    setEtiquetaToDelete(etiqueta)
    setDeleteConfirmationText("")
    setDeleteEtiquetaDialogOpen(true)
  }

  async function confirmDeleteEtiqueta() {
    if (!etiquetaToDelete) return

    setIsDeletingEtiqueta(true)

    try {
      const response = await fetch(`/api/whatsapp/etiquetas?id=${etiquetaToDelete.id}`, { method: "DELETE" })

      const data = await response.json()

      if (data.success) {
        toast.success("Etiqueta deletada com sucesso")
        loadEtiquetas()
        setDeleteEtiquetaDialogOpen(false)
        setEtiquetaToDelete(null)
        setDeleteConfirmationText("")
      } else {
        toast.error(data.message || "Erro ao deletar etiqueta")
      }
    } catch (error) {
      console.error("Erro ao deletar etiqueta:", error)
      toast.error("Erro ao deletar etiqueta")
    } finally {
      setIsDeletingEtiqueta(false)
    }
  }

  // ========== FUNÇÕES DO CATÁLOGO ==========

  async function loadCatalogos() {
    try {
      setLoadingCatalogos(true)
      const response = await fetch("/api/catalogo")
      const data = await response.json()
      // Verifica se é um array antes de setar (API pode retornar { error: ... } em caso de erro ou null)
      if (Array.isArray(data)) {
        setCatalogos(data)
      } else if (data === null) {
        // API retornou null (sem catálogos), trata como array vazio
        setCatalogos([])
      } else if (data?.error) {
        // API retornou erro estruturado - não mostra toast, apenas usa array vazio
        // A tabela pode não existir ainda no banco de dados
        setCatalogos([])
      } else {
        // Outro formato inesperado
        setCatalogos([])
      }
    } catch (error) {
      console.error("Erro ao carregar catálogos:", error)
      toast.error("Erro ao carregar catálogos")
    } finally {
      setLoadingCatalogos(false)
    }
  }

  const openCatalogoDialog = (catalogo?: Catalogo) => {
    if (catalogo) {
      setEditingCatalogo(catalogo)
      setCatalogoForm({
        nome: catalogo.nome,
        descricao: catalogo.descricao || "",
        logo_url: catalogo.logo_url || "",
        cor_primaria: catalogo.cor_primaria || "#000000",
      })
    } else {
      setEditingCatalogo(null)
      setCatalogoForm({
        nome: "",
        descricao: "",
        logo_url: "",
        cor_primaria: "#000000",
      })
    }
    setCatalogoDialogOpen(true)
  }

  async function handleSaveCatalogo() {
    if (!catalogoForm.nome.trim()) {
      toast.error("Nome é obrigatório")
      return
    }

    try {
      const method = editingCatalogo ? "PATCH" : "POST"
      const body = editingCatalogo 
        ? { id: editingCatalogo.id, ...catalogoForm }
        : { ...catalogoForm, created_by_id: user?.id, created_by_name: user?.nome }

      const response = await fetch("/api/catalogo", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        toast.success(editingCatalogo ? "Catálogo atualizado" : "Catálogo criado")
        setCatalogoDialogOpen(false)
        loadCatalogos()
      } else {
        const data = await response.json()
        toast.error(data.error || "Erro ao salvar catálogo")
      }
    } catch (error) {
      console.error("Erro ao salvar catálogo:", error)
      toast.error("Erro ao salvar catálogo")
    }
  }

  async function handleDeleteCatalogo(id: string) {
    if (!confirm("Tem certeza que deseja deletar este catálogo? Todos os produtos serão excluídos.")) {
      return
    }

    try {
      const response = await fetch("/api/catalogo", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        toast.success("Catálogo deletado")
        if (selectedCatalogo?.id === id) {
          setSelectedCatalogo(null)
          setProdutos([])
          setProdutoTipos([])
        }
        loadCatalogos()
      } else {
        const data = await response.json()
        toast.error(data.error || "Erro ao deletar catálogo")
      }
    } catch (error) {
      console.error("Erro ao deletar catálogo:", error)
      toast.error("Erro ao deletar catálogo")
    }
  }

  async function handleToggleCatalogoAtivo(catalogo: Catalogo) {
    try {
      const response = await fetch("/api/catalogo", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: catalogo.id, ativo: !catalogo.ativo }),
      })

      if (response.ok) {
        toast.success(catalogo.ativo ? "Catálogo desativado" : "Catálogo ativado")
        loadCatalogos()
      }
    } catch (error) {
      console.error("Erro ao alterar status:", error)
      toast.error("Erro ao alterar status")
    }
  }

  function copyCatalogoLink(slug: string) {
    const baseUrl = window.location.origin
    const link = `${baseUrl}/catalogo/${slug}`
    navigator.clipboard.writeText(link)
    toast.success("Link copiado!")
  }

  async function selectCatalogo(catalogo: Catalogo) {
    setSelectedCatalogo(catalogo)
    setLoadingProdutos(true)

    try {
      // Carregar tipos e produtos em paralelo
      const [tiposRes, produtosRes] = await Promise.all([
        fetch(`/api/catalogo/tipos?catalogo_id=${catalogo.id}`),
        fetch(`/api/catalogo/produtos?catalogo_id=${catalogo.id}`),
      ])

      const tiposData = await tiposRes.json()
      const produtosData = await produtosRes.json()

      setProdutoTipos(tiposData || [])
      setProdutos(produtosData || [])
    } catch (error) {
      console.error("Erro ao carregar dados do catálogo:", error)
      toast.error("Erro ao carregar dados")
    } finally {
      setLoadingProdutos(false)
    }
  }

  // ========== FUNÇÕES DE TIPOS DE PRODUTO ==========

  async function handleSaveTipo() {
    if (!newTipoNome.trim() || !selectedCatalogo) {
      toast.error("Nome é obrigatório")
      return
    }

    try {
      const response = await fetch("/api/catalogo/tipos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          catalogo_id: selectedCatalogo.id,
          nome: newTipoNome,
        }),
      })

      if (response.ok) {
        toast.success("Tipo criado")
        setTipoDialogOpen(false)
        setNewTipoNome("")
        // Recarregar tipos
        const tiposRes = await fetch(`/api/catalogo/tipos?catalogo_id=${selectedCatalogo.id}`)
        const tiposData = await tiposRes.json()
        setProdutoTipos(tiposData || [])
      } else {
        const data = await response.json()
        toast.error(data.error || "Erro ao criar tipo")
      }
    } catch (error) {
      console.error("Erro ao criar tipo:", error)
      toast.error("Erro ao criar tipo")
    }
  }

  async function handleDeleteTipo(id: string) {
    if (!confirm("Tem certeza que deseja deletar este tipo?")) return

    try {
      const response = await fetch("/api/catalogo/tipos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        toast.success("Tipo deletado")
        setProdutoTipos(prev => prev.filter(t => t.id !== id))
      }
    } catch (error) {
      console.error("Erro ao deletar tipo:", error)
      toast.error("Erro ao deletar tipo")
    }
  }

  // ========== FUNÇÕES DE PRODUTOS ==========

  const openProdutoDialog = (produto?: Produto) => {
    if (produto) {
      setEditingProduto(produto)
      setProdutoForm({
        nome: produto.nome,
        descricao: produto.descricao || "",
        tipo_id: produto.tipo_id || "",
        preco: produto.preco?.toString() || "",
        preco_promocional: produto.preco_promocional?.toString() || "",
        destaque: produto.destaque,
        imagens: produto.imagens?.map(img => img.url) || [],
      })
    } else {
      setEditingProduto(null)
      setProdutoForm({
        nome: "",
        descricao: "",
        tipo_id: "",
        preco: "",
        preco_promocional: "",
        destaque: false,
        imagens: [],
      })
    }
    setProdutoDialogOpen(true)
  }

  async function handleSaveProduto() {
    if (!produtoForm.nome.trim() || !selectedCatalogo) {
      toast.error("Nome é obrigatório")
      return
    }

    try {
      const method = editingProduto ? "PATCH" : "POST"
      const body = {
        ...(editingProduto ? { id: editingProduto.id } : { catalogo_id: selectedCatalogo.id }),
        nome: produtoForm.nome,
        descricao: produtoForm.descricao || null,
        tipo_id: produtoForm.tipo_id || null,
        preco: produtoForm.preco ? parseFloat(produtoForm.preco) : null,
        preco_promocional: produtoForm.preco_promocional ? parseFloat(produtoForm.preco_promocional) : null,
        destaque: produtoForm.destaque,
        imagens: produtoForm.imagens,
        created_by_id: user?.id,
        created_by_name: user?.nome,
      }

      const response = await fetch("/api/catalogo/produtos", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        toast.success(editingProduto ? "Produto atualizado" : "Produto criado")
        setProdutoDialogOpen(false)
        // Recarregar produtos
        const produtosRes = await fetch(`/api/catalogo/produtos?catalogo_id=${selectedCatalogo.id}`)
        const produtosData = await produtosRes.json()
        setProdutos(produtosData || [])
      } else {
        const data = await response.json()
        toast.error(data.error || "Erro ao salvar produto")
      }
    } catch (error) {
      console.error("Erro ao salvar produto:", error)
      toast.error("Erro ao salvar produto")
    }
  }

  async function handleDeleteProduto(id: string) {
    if (!confirm("Tem certeza que deseja deletar este produto?")) return

    try {
      const response = await fetch("/api/catalogo/produtos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        toast.success("Produto deletado")
        setProdutos(prev => prev.filter(p => p.id !== id))
      }
    } catch (error) {
      console.error("Erro ao deletar produto:", error)
      toast.error("Erro ao deletar produto")
    }
  }

  async function handleToggleProdutoAtivo(produto: Produto) {
    try {
      const response = await fetch("/api/catalogo/produtos", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: produto.id, ativo: !produto.ativo }),
      })

      if (response.ok) {
        toast.success(produto.ativo ? "Produto desativado" : "Produto ativado")
        setProdutos(prev => prev.map(p => 
          p.id === produto.id ? { ...p, ativo: !p.ativo } : p
        ))
      }
    } catch (error) {
      console.error("Erro ao alterar status:", error)
      toast.error("Erro ao alterar status")
    }
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64 = event.target?.result as string
        setProdutoForm(prev => ({
          ...prev,
          imagens: [...prev.imagens, base64],
        }))
      }
      reader.readAsDataURL(file)
    })

    // Limpar input para permitir selecionar a mesma imagem novamente
    e.target.value = ""
  }

  function removeImage(index: number) {
    setProdutoForm(prev => ({
      ...prev,
      imagens: prev.imagens.filter((_, i) => i !== index),
    }))
  }

  function formatPreco(valor: string) {
    return valor ? new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(parseFloat(valor)) : '-'
  }

  return (
    <div className="flex h-screen bg-neutral-100">
      <div className="w-64 bg-white border-r border-neutral-300 flex-shrink-0">
        <div className="p-6 border-b border-neutral-300">
          <h2 className="text-xl font-bold text-neutral-900">Ajustes</h2>
          <p className="text-sm text-neutral-600 mt-1">Configurações do sistema</p>
        </div>
        <nav className="p-4 space-y-1">
          <button
            onClick={() => setActiveTab("usuario")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "usuario"
                ? "bg-neutral-900 text-white font-medium"
                : "text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            <UserCogIcon className="w-5 h-5 flex-shrink-0" />
            <span>Usuário</span>
          </button>

          <button
            onClick={() => setActiveTab("whatsapp")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "whatsapp"
                ? "bg-neutral-900 text-white font-medium"
                : "text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            {/* Ícone Dinâmico (Verde/Cinza) baseado no Realtime */}
            {isWhatsAppConnected ? (
              <MessageSquare className="w-5 h-5 flex-shrink-0 text-green-500" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0"
              >
                <path d="M19 19H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.7.7 0 0 1 2 21.286V5a2 2 0 0 1 1.184-1.826" />
                <path d="m2 2 20 20" />
                <path d="M8.656 3H20a2 2 0 0 1 2 2v11.344" />
              </svg>
            )}
            <span>WhatsApp</span>
          </button>

          <button
            onClick={() => setActiveTab("respostas-rapidas")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "respostas-rapidas"
                ? "bg-neutral-900 text-white font-medium"
                : "text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            <Zap className="w-5 h-5 flex-shrink-0" />
            <span>Respostas Rápidas</span>
          </button>

          <button
            onClick={() => setActiveTab("etiquetas")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "etiquetas"
                ? "bg-neutral-900 text-white font-medium"
                : "text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            <Tag className="w-5 h-5 flex-shrink-0" />
            <span>Etiquetas</span>
          </button>

          <button
            onClick={() => setActiveTab("catalogo")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "catalogo"
                ? "bg-neutral-900 text-white font-medium"
                : "text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            <ShoppingBag className="w-5 h-5 flex-shrink-0" />
            <span>Catálogo</span>
          </button>

          <button
            onClick={() => setActiveTab("links")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "links" ? "bg-neutral-900 text-white font-medium" : "text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            <LinkIcon className="w-5 h-5 flex-shrink-0" />
            <span>Links Úteis</span>
          </button>
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-5xl mx-auto space-y-6">
          {activeTab === "usuario" && (
            <Card className="p-6 border-2 border-neutral-300 bg-white">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">Perfil do Usuário</h2>

              {loading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="w-6 h-6 animate-spin text-neutral-600" />
                </div>
              ) : userProfile ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-20 h-20">
                      {userProfile.foto_perfil ? (
                        <AvatarImage src={userProfile.foto_perfil || "/placeholder.svg"} alt={userProfile.nome} />
                      ) : (
                        <AvatarFallback className="text-2xl bg-neutral-200 text-neutral-700">
                          {userProfile.nome.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <Button onClick={() => setIsPhotoDialogOpen(true)} variant="outline" size="sm">
                      <Pen className="w-4 h-4 mr-2" />
                      Editar Foto
                    </Button>
                  </div>

                  <div>
                    <Label htmlFor="nome" className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4" />
                      Nome Completo
                    </Label>
                    <Input
                      id="nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Digite seu nome"
                    />
                  </div>

                  <div>
                    <Label className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <Input value={userProfile.email} disabled className="bg-neutral-50 text-neutral-600" />
                  </div>

                  <div>
                    <Label className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-4 h-4" />
                      Cargo
                    </Label>
                    <Input value={userProfile.cargo} disabled className="bg-neutral-50 text-neutral-600" />
                  </div>

                  {/* Checkbox de Exibição de Etiquetas */}
                  <div className="pt-4 border-t border-neutral-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id="show-all-tags"
                          checked={showAllTags}
                          onCheckedChange={async (checked) => {
                            const newValue = checked === true
                            console.log("[Checkbox] Mudando show_all_tags para:", newValue)

                            // Atualiza o estado local imediatamente para feedback visual
                            setShowAllTags(newValue)

                            // Salva diretamente no banco sem confirmação
                            if (userProfile) {
                              try {
                                const { error } = await supabase
                                  .from("perfis")
                                  .update({
                                    show_all_tags: newValue,
                                    updated_at: new Date().toISOString(),
                                  })
                                  .eq("id", userProfile.id)

                                if (error) {
                                  console.error("[Checkbox] Erro ao salvar show_all_tags:", error)
                                  toast.error("Erro ao salvar configuração")
                                  // Reverte o estado local em caso de erro
                                  setShowAllTags(!newValue)
                                } else {
                                  console.log("[Checkbox] show_all_tags salvo com sucesso:", newValue)
                                  // Feedback visual sutil
                                  toast.success(newValue ? "Etiquetas sempre visíveis ativado" : "Etiquetas sempre visíveis desativado", {
                                    duration: 2000,
                                  })
                                  // Atualiza o contexto do usuário
                                  await refreshUser()
                                }
                              } catch (error) {
                                console.error("[Checkbox] Erro ao salvar show_all_tags:", error)
                                toast.error("Erro ao salvar configuração")
                                // Reverte o estado local em caso de erro
                                setShowAllTags(!newValue)
                              }
                            }
                          }}
                        />
                        <div className="flex items-center gap-2">
                          <Label htmlFor="show-all-tags" className="cursor-pointer">
                            Sempre exibir todas etiquetas
                          </Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button type="button" className="text-neutral-400 hover:text-neutral-600">
                                  <Info className="w-4 h-4" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="right" className="max-w-xs">
                                <p className="text-xs">
                                  Quando ligada, exibe visualmente as etiquetas nos chats, conversas e contêineres de leads. 
                                  Quando desligada exibe apenas um ícone cinza de etiqueta, seguido do número de etiquetas. 
                                  Esta opção é puramente visual e é salva automaticamente.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleSaveProfile} disabled={isSaving} className="w-full">
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Salvar Nome
                      </>
                    )}
                  </Button>

                  <Button onClick={handleLogout} variant="destructive" className="w-full">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair da Conta
                  </Button>
                </div>
              ) : (
                <div className="text-center p-8 text-neutral-600">Erro ao carregar perfil.</div>
              )}
            </Card>
          )}

          {activeTab === "whatsapp" && (
            <div className="relative">
              {/* Badge de sincronização no canto superior direito */}
              {isSyncing && (
                <div className="absolute -top-2 right-0 z-10">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 border border-green-300 rounded-full shadow-sm">
                    <Radio className="w-3.5 h-3.5 text-green-600 animate-pulse" />
                    <span className="text-xs font-medium text-green-700">Sincronizando</span>
                  </div>
                </div>
              )}

              {/* Container grande de sincronização */}
              {isSyncing && (
                <Card className="p-8 mb-6 flex flex-col items-center text-center gap-6 bg-green-50/50 border-green-200 border-2">
                  <SyncAnimation />
                  
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-green-800">Sincronizando mensagens</h2>
                    <p className="text-sm text-green-600 max-w-sm mx-auto">
                      Seu WhatsApp foi conectado com sucesso! Estamos carregando suas conversas...
                    </p>
                  </div>

                  <Link href="/whatsapp">
                    <Button variant="outline" className="gap-2 border-green-300 text-green-700 hover:bg-green-100">
                      Ir para aba WhatsApp
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </Card>
              )}

              <Card className="p-6 border-2 border-neutral-300 bg-white">
                <h2 className="text-xl font-bold text-neutral-900 mb-4">Integração WhatsApp</h2>

              {loadingWhatsApp ? (
                <p className="text-neutral-600">Carregando configuração...</p>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="whatsapp-url" className="text-sm font-medium text-neutral-800">
                      URL da API WhatsApp
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="whatsapp-url"
                        value={whatsappServerUrl}
                        onChange={(e) => handleWhatsappUrlChange(e.target.value)}
                        placeholder=""
                        className="border-2 border-neutral-300 flex-1"
                      />
                      {urlSaved && <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 self-center" />}
                    </div>
                    <p className="text-xs text-neutral-500">
                      Insira a URL do servidor da API WhatsApp. A URL é salva automaticamente.
                    </p>
                  </div>

                  {!whatsappServerUrl && (
                    <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-4">
                      <p className="text-sm text-amber-800">
                        Você precisa configurar a URL da API antes de conectar o WhatsApp.
                      </p>
                    </div>
                  )}

                  {whatsappServerUrl && !isWhatsAppConnected && !showQR && (
                    <div className="bg-neutral-50 border-2 border-neutral-300 rounded-lg p-6 text-center space-y-4">
                      <MessageSquare className="w-12 h-12 text-neutral-500 mx-auto" />
                      <div>
                        <p className="text-lg font-semibold text-neutral-900">WhatsApp não conectado</p>
                        <p className="text-sm text-neutral-600">Escaneie o QR Code para conectar</p>
                      </div>
                      <Button onClick={() => setShowQR(true)} className="w-full max-w-xs mx-auto">
                        <MessageSquare className="w-5 h-5 mr-2" />
                        Conectar WhatsApp
                      </Button>
                    </div>
                  )}

                  {showQR && <QRScanner onConnected={handleWhatsAppConnected} />}

                  {isWhatsAppConnected && !showQR && (
                    <div className="space-y-4">
                      <ConnectionStatus />
                      <Button
                        onClick={handleDisconnectWhatsApp}
                        variant="destructive"
                        className="w-full"
                        disabled={disconnectingWhatsApp}
                      >
                        {disconnectingWhatsApp ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Desconectando...
                          </>
                        ) : (
                          <>
                            <LogOut className="w-4 h-4 mr-2" />
                            Desconectar WhatsApp
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </Card>
            </div>
          )}

          {activeTab === "respostas-rapidas" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-neutral-900">Respostas Rápidas</h2>
                  <p className="text-sm text-neutral-600 mt-1">
                    Gerencie mensagens pré-definidas para responder rapidamente no WhatsApp
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setCategoryDialogOpen(true)}
                    variant="outline"
                    className="border-2 border-neutral-300"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Categoria
                  </Button>
                  <Button onClick={() => openReplyDialog()} className="bg-neutral-900 hover:bg-neutral-800">
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Resposta
                  </Button>
                </div>
              </div>

              {loadingReplies ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-neutral-600" />
                </div>
              ) : quickReplies.length === 0 ? (
                <Card className="p-12 text-center border-2 border-dashed border-neutral-300">
                  <Zap className="w-12 h-12 mx-auto text-neutral-400 mb-4" />
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Nenhuma resposta rápida cadastrada</h3>
                  <p className="text-sm text-neutral-600 mb-4">
                    Crie respostas pré-definidas para agilizar o atendimento no WhatsApp
                  </p>
                  <Button onClick={() => openReplyDialog()} className="bg-neutral-900 hover:bg-neutral-800">
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Primeira Resposta
                  </Button>
                </Card>
              ) : (
                <div className="space-y-4">
                  {categories.map((category) => {
                    const categoryReplies = quickReplies.filter((r) => r.category?.id === category.id)
                    const isExpanded = expandedCategories.has(category.id)

                    if (categoryReplies.length === 0) return null

                    return (
                      <Card key={category.id} className="border-2 border-neutral-300 bg-white overflow-hidden">
                        <button
                          onClick={() => toggleCategory(category.id)}
                          className="w-full p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-neutral-600" />
                            <div className="text-left">
                              <h3 className="font-semibold text-neutral-900">{category.name}</h3>
                              <p className="text-xs text-neutral-500">
                                {categoryReplies.length} resposta{categoryReplies.length !== 1 ? "s" : ""}
                              </p>
                            </div>
                          </div>
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-neutral-600" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-neutral-600" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="border-t border-neutral-200 p-4 space-y-3 bg-neutral-50">
                            {categoryReplies.map((reply) => (
                              <Card key={reply.id} className="p-4 border border-neutral-300 bg-white">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-neutral-900">{reply.title}</h4>
                                    <p className="text-xs text-neutral-500 mt-1">Criado por: {reply.created_by_name}</p>
                                  </div>
                                  <div className="flex gap-1">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => openReplyDialog(reply)}
                                    >
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                      onClick={() => handleDeleteReply(reply.id)}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                                <p className="text-sm text-neutral-700">{reply.message}</p>
                              </Card>
                            ))}
                          </div>
                        )}
                      </Card>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === "etiquetas" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-neutral-900">Etiquetas</h2>
                  <p className="text-sm text-neutral-600 mt-1">
                    Configure etiquetas para categorizar seus chats do WhatsApp
                  </p>
                </div>
                <Button onClick={() => openEtiquetaDialog()} className="bg-neutral-900 hover:bg-neutral-800">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Etiqueta
                </Button>
              </div>

              {loadingEtiquetas ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-neutral-600" />
                </div>
              ) : etiquetas.length === 0 ? (
                <Card className="p-12 text-center border-2 border-dashed border-neutral-300">
                  <Tag className="w-12 h-12 mx-auto text-neutral-400 mb-4" />
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Nenhuma etiqueta cadastrada</h3>
                  <p className="text-sm text-neutral-600 mb-4">
                    Crie etiquetas para organizar e categorizar seus chats
                  </p>
                  <Button onClick={() => openEtiquetaDialog()} className="bg-neutral-900 hover:bg-neutral-800">
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Primeira Etiqueta
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {etiquetas.map((etiqueta) => (
                    <Card key={etiqueta.id} className="p-4 border-2 border-neutral-300 bg-white">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2 flex-1">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: etiqueta.cor }}
                          >
                            <Tag className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-neutral-900 truncate">{etiqueta.nome}</h3>
                            <p className="text-xs text-neutral-500">
                              {etiqueta.created_by_name || "Sistema"}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => openEtiquetaDialog(etiqueta)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteEtiqueta(etiqueta)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      {etiqueta.descricao && (
                        <p className="text-sm text-neutral-600 line-clamp-2">{etiqueta.descricao}</p>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "catalogo" && (
            <div>
              {!selectedCatalogo ? (
                <>
                  {/* Lista de Catálogos */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-neutral-900">Catálogos</h2>
                      <p className="text-sm text-neutral-600 mt-1">
                        Gerencie seus catálogos de produtos com links públicos para compartilhar
                      </p>
                    </div>
                    <Button onClick={() => openCatalogoDialog()} className="bg-neutral-900 hover:bg-neutral-800">
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Catálogo
                    </Button>
                  </div>

                  {loadingCatalogos ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-6 h-6 animate-spin text-neutral-600" />
                    </div>
                  ) : catalogos.length === 0 ? (
                    <Card className="p-12 text-center border-2 border-dashed border-neutral-300">
                      <ShoppingBag className="w-12 h-12 mx-auto text-neutral-400 mb-4" />
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">Nenhum catálogo cadastrado</h3>
                      <p className="text-sm text-neutral-600 mb-4">
                        Crie catálogos para exibir seus produtos em páginas públicas
                      </p>
                      <Button onClick={() => openCatalogoDialog()} className="bg-neutral-900 hover:bg-neutral-800">
                        <Plus className="w-4 h-4 mr-2" />
                        Criar Primeiro Catálogo
                      </Button>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {catalogos.map((catalogo) => (
                        <Card 
                          key={catalogo.id} 
                          className={`p-4 border-2 bg-white cursor-pointer transition-all hover:shadow-lg ${
                            catalogo.ativo ? 'border-neutral-300 hover:border-neutral-900' : 'border-neutral-200 opacity-60'
                          }`}
                          onClick={() => selectCatalogo(catalogo)}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3 flex-1">
                              {catalogo.logo_url ? (
                                <img 
                                  src={catalogo.logo_url} 
                                  alt={catalogo.nome}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                              ) : (
                                <div 
                                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                                  style={{ backgroundColor: catalogo.cor_primaria }}
                                >
                                  <ShoppingBag className="w-6 h-6 text-white" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-neutral-900 truncate">{catalogo.nome}</h3>
                                <p className="text-xs text-neutral-500">/{catalogo.slug}</p>
                              </div>
                            </div>
                            <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => copyCatalogoLink(catalogo.slug)}
                                title="Copiar link"
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => window.open(`/catalogo/${catalogo.slug}`, '_blank')}
                                title="Abrir catálogo"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          {catalogo.descricao && (
                            <p className="text-sm text-neutral-600 line-clamp-2 mb-3">{catalogo.descricao}</p>
                          )}
                          <div className="flex items-center justify-between pt-2 border-t border-neutral-200" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleToggleCatalogoAtivo(catalogo)}
                              className={`flex items-center gap-1 text-xs ${
                                catalogo.ativo ? 'text-green-600' : 'text-neutral-500'
                              }`}
                            >
                              {catalogo.ativo ? (
                                <ToggleRight className="w-5 h-5" />
                              ) : (
                                <ToggleLeft className="w-5 h-5" />
                              )}
                              {catalogo.ativo ? 'Ativo' : 'Inativo'}
                            </button>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => openCatalogoDialog(catalogo)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleDeleteCatalogo(catalogo.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* Detalhes do Catálogo Selecionado */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedCatalogo(null)
                          setProdutos([])
                          setProdutoTipos([])
                        }}
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Voltar
                      </Button>
                      <div className="flex items-center gap-3">
                        {selectedCatalogo.logo_url ? (
                          <img 
                            src={selectedCatalogo.logo_url} 
                            alt={selectedCatalogo.nome}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        ) : (
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: selectedCatalogo.cor_primaria }}
                          >
                            <ShoppingBag className="w-5 h-5 text-white" />
                          </div>
                        )}
                        <div>
                          <h2 className="text-xl font-bold text-neutral-900">{selectedCatalogo.nome}</h2>
                          <p className="text-xs text-neutral-500">/{selectedCatalogo.slug}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyCatalogoLink(selectedCatalogo.slug)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar Link
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`/catalogo/${selectedCatalogo.slug}`, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Ver Catálogo
                      </Button>
                    </div>
                  </div>

                  {/* Tipos de Produto */}
                  <Card className="p-4 border-2 border-neutral-300 bg-white mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-neutral-900">Tipos de Produto</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTipoDialogOpen(true)}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Novo Tipo
                      </Button>
                    </div>
                    {produtoTipos.length === 0 ? (
                      <p className="text-sm text-neutral-500">Nenhum tipo cadastrado</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {produtoTipos.map((tipo) => (
                          <div
                            key={tipo.id}
                            className="flex items-center gap-1 px-3 py-1.5 bg-neutral-100 rounded-lg text-sm"
                          >
                            <span>{tipo.nome}</span>
                            <button
                              onClick={() => handleDeleteTipo(tipo.id)}
                              className="ml-1 text-neutral-400 hover:text-red-500"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>

                  {/* Produtos */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-neutral-900">
                      Produtos ({produtos.length})
                    </h3>
                    <Button onClick={() => openProdutoDialog()} className="bg-neutral-900 hover:bg-neutral-800">
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Produto
                    </Button>
                  </div>

                  {loadingProdutos ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-6 h-6 animate-spin text-neutral-600" />
                    </div>
                  ) : produtos.length === 0 ? (
                    <Card className="p-12 text-center border-2 border-dashed border-neutral-300">
                      <ShoppingBag className="w-12 h-12 mx-auto text-neutral-400 mb-4" />
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">Nenhum produto cadastrado</h3>
                      <p className="text-sm text-neutral-600 mb-4">
                        Adicione produtos ao seu catálogo
                      </p>
                      <Button onClick={() => openProdutoDialog()} className="bg-neutral-900 hover:bg-neutral-800">
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Produto
                      </Button>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {produtos.map((produto) => {
                        const imagemPrincipal = produto.imagens?.find(img => img.principal) || produto.imagens?.[0]
                        return (
                          <Card 
                            key={produto.id} 
                            className={`overflow-hidden border-2 bg-white ${
                              produto.ativo ? 'border-neutral-300' : 'border-neutral-200 opacity-60'
                            }`}
                          >
                            {/* Imagem */}
                            <div className="relative aspect-square bg-neutral-100">
                              {imagemPrincipal ? (
                                <img
                                  src={imagemPrincipal.url}
                                  alt={produto.nome}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <ImageIcon className="w-12 h-12 text-neutral-300" />
                                </div>
                              )}
                              {produto.destaque && (
                                <div className="absolute top-2 left-2 px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded flex items-center gap-1">
                                  <Star className="w-3 h-3" />
                                  Destaque
                                </div>
                              )}
                            </div>

                            {/* Info */}
                            <div className="p-4">
                              {produto.tipo && (
                                <span className="text-xs font-medium text-neutral-500 uppercase">
                                  {produto.tipo.nome}
                                </span>
                              )}
                              <h4 className="font-semibold text-neutral-900 line-clamp-1">{produto.nome}</h4>
                              {produto.preco !== null && (
                                <div className="flex items-center gap-2 mt-1">
                                  {produto.preco_promocional !== null ? (
                                    <>
                                      <span className="font-bold text-green-600">
                                        {formatPreco(produto.preco_promocional.toString())}
                                      </span>
                                      <span className="text-sm text-neutral-400 line-through">
                                        {formatPreco(produto.preco.toString())}
                                      </span>
                                    </>
                                  ) : (
                                    <span className="font-bold text-neutral-900">
                                      {formatPreco(produto.preco.toString())}
                                    </span>
                                  )}
                                </div>
                              )}

                              {/* Ações */}
                              <div className="flex items-center justify-between pt-3 mt-3 border-t border-neutral-200">
                                <button
                                  onClick={() => handleToggleProdutoAtivo(produto)}
                                  className={`flex items-center gap-1 text-xs ${
                                    produto.ativo ? 'text-green-600' : 'text-neutral-500'
                                  }`}
                                >
                                  {produto.ativo ? (
                                    <ToggleRight className="w-5 h-5" />
                                  ) : (
                                    <ToggleLeft className="w-5 h-5" />
                                  )}
                                  {produto.ativo ? 'Ativo' : 'Inativo'}
                                </button>
                                <div className="flex gap-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => openProdutoDialog(produto)}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => handleDeleteProduto(produto.id)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        )
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {activeTab === "links" && (
            <div>
              <h2 className="text-xl font-bold text-neutral-900 mb-4">Links Úteis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {folders.map((folder) => (
                  <a key={folder.id} href={folder.link} target="_blank" rel="noopener noreferrer" className="block">
                    <Card className="p-4 cursor-pointer transition-all hover:shadow-lg border-2 border-neutral-300 bg-white hover:border-neutral-900">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 flex-shrink-0">
                          {folder.id === "editarTabelaOrdens" || folder.id === "editarTabelaContratos" ? (
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Sheets_logo_%282014-2020%29.svg"
                              alt="Google Sheets"
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <img
                              src="/google_drive.svg"
                              alt="Google Drive"
                              className="w-full h-full object-contain"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-neutral-900 text-sm mb-1">{folder.label}</h3>
                          <p className="text-xs text-neutral-600">{folder.description}</p>
                        </div>
                      </div>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Categoria</DialogTitle>
            <DialogDescription>Crie uma nova categoria para organizar suas respostas rápidas</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category-name">Nome da Categoria</Label>
              <Input
                id="category-name"
                placeholder="Ex: Vendas, Atendimento..."
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCategoryDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveCategory} className="bg-neutral-900 hover:bg-neutral-800">
              Criar Categoria
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingReply ? "Editar Resposta Rápida" : "Nova Resposta Rápida"}</DialogTitle>
            <DialogDescription>Crie mensagens pré-definidas para usar no atendimento via WhatsApp</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reply-title">Título</Label>
              <Input
                id="reply-title"
                placeholder="Ex: Boas-vindas"
                value={replyForm.title}
                onChange={(e) => setReplyForm({ ...replyForm, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reply-category">Categoria</Label>
              <Select
                value={replyForm.category_id}
                onValueChange={(value) => {
                  if (value === "new") {
                    setCategoryDialogOpen(true)
                  } else {
                    setReplyForm({ ...replyForm, category_id: value })
                  }
                }}
              >
                <SelectTrigger id="reply-category">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="new" className="text-primary font-medium">
                    + Criar nova categoria
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reply-message">Mensagem</Label>
              <Textarea
                id="reply-message"
                placeholder="Digite a mensagem que será enviada..."
                value={replyForm.message}
                onChange={(e) => setReplyForm({ ...replyForm, message: e.target.value })}
                rows={5}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setReplyDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveReply} className="bg-neutral-900 hover:bg-neutral-800">
              {editingReply ? "Salvar Alterações" : "Criar Resposta"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={etiquetaDialogOpen} onOpenChange={setEtiquetaDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingEtiqueta ? "Editar Etiqueta" : "Nova Etiqueta"}</DialogTitle>
            <DialogDescription>Configure uma etiqueta para categorizar seus chats</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="etiqueta-nome">Nome da Etiqueta</Label>
              <Input
                id="etiqueta-nome"
                placeholder="Ex: Urgente, Vendas, Suporte..."
                value={etiquetaForm.nome}
                onChange={(e) => setEtiquetaForm({ ...etiquetaForm, nome: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Cor</Label>
              <ColorPalette
                value={etiquetaForm.cor}
                onChange={(cor) => setEtiquetaForm({ ...etiquetaForm, cor })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="etiqueta-descricao">Descrição (Opcional)</Label>
              <Textarea
                id="etiqueta-descricao"
                placeholder="Descreva o propósito desta etiqueta..."
                value={etiquetaForm.descricao}
                onChange={(e) => setEtiquetaForm({ ...etiquetaForm, descricao: e.target.value })}
                rows={3}
              />
            </div>

            <div className="flex items-center gap-2 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: etiquetaForm.cor }}
              >
                <Tag className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Preview</p>
                <p className="text-xs text-neutral-600">{etiquetaForm.nome || "Nome da etiqueta"}</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEtiquetaDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEtiqueta} className="bg-neutral-900 hover:bg-neutral-800">
              {editingEtiqueta ? "Salvar Alterações" : "Criar Etiqueta"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Confirmação de Exclusão de Etiqueta */}
      <Dialog open={deleteEtiquetaDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setDeleteEtiquetaDialogOpen(false)
          setEtiquetaToDelete(null)
          setDeleteConfirmationText("")
        }
      }}>
        <DialogContent className="border-red-200 bg-red-50">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Excluir Etiqueta
            </DialogTitle>
            <DialogDescription className="text-red-600">
              Esta ação não pode ser desfeita
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Aviso */}
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-medium text-amber-800">Atenção!</p>
                <p className="text-sm text-amber-700">
                  Ao excluir esta etiqueta, ela será <strong>permanentemente removida</strong> de todos os chats e leads que a contêm. 
                  Esta ação não pode ser desfeita.
                </p>
              </div>
            </div>

            {/* Preview da etiqueta */}
            {etiquetaToDelete && (
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-red-200">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: etiquetaToDelete.cor }}
                >
                  <Tag className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-neutral-900">{etiquetaToDelete.nome}</p>
                  {etiquetaToDelete.descricao && (
                    <p className="text-xs text-neutral-500">{etiquetaToDelete.descricao}</p>
                  )}
                </div>
              </div>
            )}

            {/* Campo de confirmação */}
            <div className="space-y-2">
              <Label className="text-red-700">
                Para confirmar, digite: <strong className="font-mono">excluir etiqueta {etiquetaToDelete?.nome}</strong>
              </Label>
              <Input
                placeholder={`excluir etiqueta ${etiquetaToDelete?.nome || ""}`}
                value={deleteConfirmationText}
                onChange={(e) => setDeleteConfirmationText(e.target.value)}
                className="border-red-200 focus:border-red-400 focus:ring-red-400"
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setDeleteEtiquetaDialogOpen(false)
                setEtiquetaToDelete(null)
                setDeleteConfirmationText("")
              }}
              className="border-neutral-300"
            >
              Cancelar
            </Button>
            <Button
              onClick={confirmDeleteEtiqueta}
              disabled={deleteConfirmationText !== `excluir etiqueta ${etiquetaToDelete?.nome}` || isDeletingEtiqueta}
              className="bg-red-600 hover:bg-red-700 text-white disabled:bg-red-300"
            >
              {isDeletingEtiqueta ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Excluindo...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir Permanentemente
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Catálogo */}
      <Dialog open={catalogoDialogOpen} onOpenChange={setCatalogoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCatalogo ? "Editar Catálogo" : "Novo Catálogo"}</DialogTitle>
            <DialogDescription>Configure seu catálogo de produtos</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="catalogo-nome">Nome do Catálogo</Label>
              <Input
                id="catalogo-nome"
                placeholder="Ex: Produtos 2024, Coleção Verão..."
                value={catalogoForm.nome}
                onChange={(e) => setCatalogoForm({ ...catalogoForm, nome: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="catalogo-descricao">Descrição (Opcional)</Label>
              <Textarea
                id="catalogo-descricao"
                placeholder="Descreva seu catálogo..."
                value={catalogoForm.descricao}
                onChange={(e) => setCatalogoForm({ ...catalogoForm, descricao: e.target.value })}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Cor Primária</Label>
              <ColorPalette
                value={catalogoForm.cor_primaria}
                onChange={(cor) => setCatalogoForm({ ...catalogoForm, cor_primaria: cor })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="catalogo-logo">Logo (URL ou Base64)</Label>
              <Input
                id="catalogo-logo"
                placeholder="https://... ou deixe vazio"
                value={catalogoForm.logo_url}
                onChange={(e) => setCatalogoForm({ ...catalogoForm, logo_url: e.target.value })}
              />
            </div>

            {/* Preview */}
            <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
              {catalogoForm.logo_url ? (
                <img 
                  src={catalogoForm.logo_url} 
                  alt="Preview"
                  className="w-12 h-12 rounded-lg object-cover"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
              ) : (
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: catalogoForm.cor_primaria }}
                >
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
              )}
              <div className="flex-1">
                <p className="font-medium text-sm">{catalogoForm.nome || "Nome do catálogo"}</p>
                <p className="text-xs text-neutral-500">Preview do cabeçalho</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCatalogoDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveCatalogo} className="bg-neutral-900 hover:bg-neutral-800">
              {editingCatalogo ? "Salvar Alterações" : "Criar Catálogo"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Tipo de Produto */}
      <Dialog open={tipoDialogOpen} onOpenChange={setTipoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Tipo de Produto</DialogTitle>
            <DialogDescription>Crie uma categoria para organizar seus produtos</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="tipo-nome">Nome do Tipo</Label>
              <Input
                id="tipo-nome"
                placeholder="Ex: Eletrônicos, Roupas, Acessórios..."
                value={newTipoNome}
                onChange={(e) => setNewTipoNome(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setTipoDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveTipo} className="bg-neutral-900 hover:bg-neutral-800">
              Criar Tipo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Produto */}
      <Dialog open={produtoDialogOpen} onOpenChange={setProdutoDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduto ? "Editar Produto" : "Novo Produto"}</DialogTitle>
            <DialogDescription>Adicione ou edite um produto do catálogo</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="produto-nome">Nome do Produto *</Label>
                <Input
                  id="produto-nome"
                  placeholder="Ex: Camiseta Básica"
                  value={produtoForm.nome}
                  onChange={(e) => setProdutoForm({ ...produtoForm, nome: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="produto-tipo">Tipo</Label>
                <Select
                  value={produtoForm.tipo_id}
                  onValueChange={(value) => {
                    if (value === "new") {
                      setTipoDialogOpen(true)
                    } else {
                      setProdutoForm({ ...produtoForm, tipo_id: value })
                    }
                  }}
                >
                  <SelectTrigger id="produto-tipo">
                    <SelectValue placeholder="Selecione um tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {produtoTipos.map((tipo) => (
                      <SelectItem key={tipo.id} value={tipo.id}>
                        {tipo.nome}
                      </SelectItem>
                    ))}
                    <SelectItem value="new" className="text-primary font-medium">
                      + Criar novo tipo
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="produto-descricao">Descrição</Label>
              <Textarea
                id="produto-descricao"
                placeholder="Descreva o produto..."
                value={produtoForm.descricao}
                onChange={(e) => setProdutoForm({ ...produtoForm, descricao: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="produto-preco">Preço (R$)</Label>
                <Input
                  id="produto-preco"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={produtoForm.preco}
                  onChange={(e) => setProdutoForm({ ...produtoForm, preco: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="produto-preco-promocional">Preço Promocional (R$)</Label>
                <Input
                  id="produto-preco-promocional"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={produtoForm.preco_promocional}
                  onChange={(e) => setProdutoForm({ ...produtoForm, preco_promocional: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="produto-destaque"
                checked={produtoForm.destaque}
                onChange={(e) => setProdutoForm({ ...produtoForm, destaque: e.target.checked })}
                className="w-4 h-4 rounded border-neutral-300"
              />
              <Label htmlFor="produto-destaque" className="text-sm cursor-pointer">
                Marcar como produto em destaque
              </Label>
            </div>

            {/* Upload de Imagens */}
            <div className="space-y-2">
              <Label>Imagens do Produto</Label>
              <div className="grid grid-cols-4 gap-2">
                {produtoForm.imagens.map((img, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-neutral-100">
                    <img src={img} alt={`Imagem ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    {index === 0 && (
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded">
                        Principal
                      </span>
                    )}
                  </div>
                ))}
                <label className="aspect-square rounded-lg border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-50 transition-colors">
                  <ImageIcon className="w-6 h-6 text-neutral-400" />
                  <span className="text-xs text-neutral-500 mt-1">Adicionar</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-xs text-neutral-500">
                A primeira imagem será a principal. Arraste para reordenar.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setProdutoDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveProduto} className="bg-neutral-900 hover:bg-neutral-800">
              {editingProduto ? "Salvar Alterações" : "Criar Produto"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <PhotoUploadDialog
        isOpen={isPhotoDialogOpen}
        onClose={() => setIsPhotoDialogOpen(false)}
        onUpload={handlePhotoUpload}
        currentPhoto={userProfile?.foto_perfil || undefined}
      />
    </div>
  )
}