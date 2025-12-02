"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useUser } from "@/contexts/user-context"
import { PhotoUploadDialog } from "@/components/PhotoUploadDialog"
import { toast } from "sonner"
import { deleteCookie } from "@/lib/auth"
import { QRScanner } from "@/components/whatsapp/qr-scanner"
import { ConnectionStatus } from "@/components/whatsapp/connection-status"
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

type SettingsTab = "usuario" | "whatsapp" | "links" | "respostas-rapidas"

// URL do Backend (para logout) - O ideal é buscar do banco, mas usaremos ENV/Hardcoded por consistência com ChatList
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://backend-sobt.onrender.com";

export default function AjustesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, refreshUser } = useUser()
  const supabase = createClient()

  // ✅ ESTADO DE CONEXÃO LOCAL (Lendo do Banco)
  const [isWhatsAppConnected, setIsWhatsAppConnected] = useState(false)
  
  // ✅ LISTENERS DE REALTIME
  useEffect(() => {
      // 1. Busca status inicial
      const fetchStatus = async () => {
          const { data } = await supabase
              .from("instance_settings")
              .select("status")
              .eq("id", 1)
              .single()
          
          setIsWhatsAppConnected(data?.status === "connected")
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
                  setIsWhatsAppConnected(status === "connected")
                  // Se conectar, fecha o QR automaticamente
                  if (status === "connected") setShowQR(false)
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

  useEffect(() => {
    const tabParam = searchParams.get("tab")
    if (tabParam && ["usuario", "whatsapp", "links", "respostas-rapidas"].includes(tabParam)) {
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
      const { error } = await supabase
        .from("perfis")
        .update({
          nome: nome,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userProfile.id)

      if (error) {
        console.error("Erro ao salvar perfil:", error)
        toast.error("Erro ao salvar perfil")
        return
      }

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

  // O handleWhatsappSave já foi coberto pela função handleWhatsappUrlChange acima

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

                  <Button onClick={handleSaveProfile} disabled={isSaving} className="w-full">
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Salvar Alterações
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
                              src="/images/google-drive-icon.png"
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

      <PhotoUploadDialog
        isOpen={isPhotoDialogOpen}
        onClose={() => setIsPhotoDialogOpen(false)}
        onUpload={handlePhotoUpload}
        currentPhoto={userProfile?.foto_perfil || undefined}
      />
    </div>
  )
}