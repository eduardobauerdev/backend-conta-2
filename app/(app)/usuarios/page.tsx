"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/user-context"
import { createClient } from "@/lib/supabase/client"
import { Spinner } from "@/components/ui/spinner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Edit, Monitor, Smartphone, Tablet, UserPlus, Send, Briefcase } from "lucide-react"
import { formatDate, parseISO } from "@/lib/date-utils"
import { toast } from "sonner"
import { EditUserDialog } from "@/components/usuarios/edit-user-dialog"
import { CreateInviteDialog } from "@/components/usuarios/create-invite-dialog"
import { CreateUserDialog } from "@/components/usuarios/create-user-dialog"
import { CreateRoleDialog } from "@/components/usuarios/create-role-dialog"
import { useRealtimeTable } from "@/contexts/realtime-context"
import RoleBadge from "./role-badge" // Adjust the path as necessary

interface UserProfile {
  id: string
  nome: string
  email: string
  cargo: string
  senha: string
  ultimo_login: string | null
  dispositivo_login: string | null
  created_at: string
  foto_perfil: string | null
}

export default function UsuariosPage() {
  const { user, loading: userLoading } = useUser()
  const router = useRouter()
  const supabase = createClient()

  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [createUserDialogOpen, setCreateUserDialogOpen] = useState(false)
  const [createRoleDialogOpen, setCreateRoleDialogOpen] = useState(false)

  useEffect(() => {
    if (!userLoading && user) {
      if (user.cargo !== "Administrador" && user.cargo !== "Desenvolvedor") {
        router.push("/visao-geral")
      } else {
        fetchUsers()
      }
    }
  }, [user, userLoading, router])

  const fetchUsers = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("perfis").select("*").order("nome")

    if (error) {
      console.error("Error fetching users:", error)
      toast.error("Erro ao carregar usuários")
    } else {
      setUsers(data || [])
    }
    setLoading(false)
  }

  const handleEditUser = (user: UserProfile) => {
    setEditingUser(user)
    setEditDialogOpen(true)
  }

  const filteredUsers = users.filter((u) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      u.nome.toLowerCase().includes(searchLower) ||
      u.email.toLowerCase().includes(searchLower) ||
      u.cargo.toLowerCase().includes(searchLower)
    )
  })

  const getDeviceIcon = (device: string | null) => {
    if (!device) return <Monitor className="w-4 h-4" />

    const deviceLower = device.toLowerCase()
    if (deviceLower.includes("mobile") || deviceLower.includes("android") || deviceLower.includes("iphone")) {
      return <Smartphone className="w-4 h-4" />
    } else if (deviceLower.includes("tablet") || deviceLower.includes("ipad")) {
      return <Tablet className="w-4 h-4" />
    }
    return <Monitor className="w-4 h-4" />
  }

  useRealtimeTable(
    "perfis",
    (newUser: any) => {
      setUsers((prev) => {
        if (prev.some((u) => u.id === newUser.id)) return prev
        return [...prev, newUser].sort((a, b) => a.nome.localeCompare(b.nome))
      })
      toast.info(`Novo usuário adicionado: ${newUser.nome}`)
    },
    (updatedUser: any) => {
      setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)))
    },
    (deletedUser: any) => {
      setUsers((prev) => prev.filter((u) => u.id !== deletedUser.id))
      toast.info(`Usuário removido`)
    },
  )

  useRealtimeTable("user_permissions", () => {
    toast.info(`Permissões atualizadas`)
    fetchUsers()
  })

  if (userLoading || loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <Spinner className="w-8 h-8" />
      </div>
    )
  }

  if (!user || (user.cargo !== "Administrador" && user.cargo !== "Desenvolvedor")) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <Spinner className="w-8 h-8" />
      </div>
    )
  }

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">Usuários</h1>
        <p className="text-neutral-600 mt-1">Gerenciar usuários do sistema</p>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Buscar por nome, email ou cargo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="text-sm text-neutral-600">
              {filteredUsers.length} {filteredUsers.length === 1 ? "usuário" : "usuários"}
            </div>
          </div>
          {user.cargo === "Desenvolvedor" && (
            <div className="flex items-center gap-2">
              <Button onClick={() => setCreateRoleDialogOpen(true)} className="gap-2" variant="outline">
                <Briefcase className="w-4 h-4" />
                Novo Cargo
              </Button>
              <Button onClick={() => setInviteDialogOpen(true)} className="gap-2" variant="outline">
                <Send className="w-4 h-4" />
                Criar Link de Convite
              </Button>
              <Button onClick={() => setCreateUserDialogOpen(true)} className="gap-2">
                <UserPlus className="w-4 h-4" />
                Novo Usuário
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Último Login</TableHead>
                <TableHead>Dispositivo</TableHead>
                <TableHead>Cadastrado em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((u) => (
                <TableRow key={u.id} className="hover:bg-neutral-50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {u.nome}
                      {user?.id === u.id && (
                        <Badge
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
                          style={{
                            backgroundColor: "#3b82f6" + "33",
                            borderColor: "#3b82f6",
                            color: "#3b82f6",
                          }}
                        >
                          Você
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <RoleBadge cargo={u.cargo} />
                  </TableCell>
                  <TableCell className="text-sm text-neutral-600">
                    {u.ultimo_login ? formatDate(parseISO(u.ultimo_login), "dd/MM/yyyy HH:mm") : "Nunca"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      {getDeviceIcon(u.dispositivo_login)}
                      <span className="max-w-[150px] truncate">{u.dispositivo_login || "Desconhecido"}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-neutral-600">
                    {formatDate(parseISO(u.created_at), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleEditUser(u)} className="gap-2">
                      <Edit className="w-4 h-4" />
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-neutral-500">
                    Nenhum usuário encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <EditUserDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        user={editingUser}
        onSuccess={fetchUsers}
      />

      <CreateInviteDialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen} />

      <CreateUserDialog open={createUserDialogOpen} onOpenChange={setCreateUserDialogOpen} onSuccess={fetchUsers} />

      <CreateRoleDialog open={createRoleDialogOpen} onOpenChange={setCreateRoleDialogOpen} onSuccess={fetchUsers} />
    </div>
  )
}
