"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Filter, X, Plus, Tag, User, UserX, Users, CheckCircle, Thermometer, XCircle, DollarSign } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useUser } from "@/contexts/user-context"
import type { Etiqueta } from "@/lib/whatsapp-types"
import { TemperaturaIcon } from "@/components/ui/temperatura-icon"

export type FilterType = "etiqueta" | "atribuicao" | "temperatura" | "lead" | "conversao"

export interface ChatFilterRule {
  id: string
  type: FilterType
  value: string // etiqueta_id ou user_id ou "any"
  label: string // nome da etiqueta ou usuário para exibição
}

interface ChatFilterPanelProps {
  filters: ChatFilterRule[]
  onFiltersChange: (filters: ChatFilterRule[]) => void
}

interface UserProfile {
  id: string
  nome: string | null
  cargo: string | null
  cor: string
}

// Ícones de temperatura (SVG thermometer)
const ThermometerIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <Thermometer className={className} />
)

export function ChatFilterPanel({ filters, onFiltersChange }: ChatFilterPanelProps) {
  const [open, setOpen] = useState(false)
  const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([])
  const [users, setUsers] = useState<UserProfile[]>([])
  const { user: currentUser } = useUser()
  const supabase = createClient()

  useEffect(() => {
    loadOptions()
  }, [])

  async function loadOptions() {
    // Carregar etiquetas
    const { data: etiquetasData } = await supabase
      .from("whatsapp_etiquetas")
      .select("*")
      .order("nome")

    if (etiquetasData) setEtiquetas(etiquetasData)

    // Carregar usuários com cores de cargo
    const { data: usersData } = await supabase
      .from("perfis")
      .select("id, nome, cargo")
      .order("nome")

    if (usersData) {
      // Buscar cores dos cargos
      const cargos = Array.from(new Set(usersData.map(u => u.cargo).filter(Boolean) as string[]))
      const { data: cargosData } = await supabase
        .from("cargos")
        .select("nome, cor")
        .in("nome", cargos)

      const coresMap: Record<string, string> = {}
      cargosData?.forEach(c => coresMap[c.nome] = c.cor)

      const usersWithColor = usersData.map(u => ({
        id: u.id,
        nome: u.nome,
        cargo: u.cargo,
        cor: u.cargo ? (coresMap[u.cargo] || "#6b7280") : "#6b7280"
      }))
      setUsers(usersWithColor)
    }
  }

  function addFilter() {
    const newFilter: ChatFilterRule = {
      id: crypto.randomUUID(),
      type: "etiqueta",
      value: "",
      label: ""
    }
    onFiltersChange([...filters, newFilter])
  }

  function removeFilter(id: string) {
    onFiltersChange(filters.filter(f => f.id !== id))
  }

  function updateFilterType(id: string, type: FilterType) {
    onFiltersChange(filters.map(f => {
      if (f.id === id) {
        return { ...f, type, value: "", label: "" }
      }
      return f
    }))
  }

  function updateFilterValue(id: string, value: string) {
    onFiltersChange(filters.map(f => {
      if (f.id === id) {
        let label = ""
        if (f.type === "etiqueta") {
          if (value === "sem_etiqueta") {
            label = "Sem etiqueta"
          } else {
            const etiqueta = etiquetas.find(e => e.id === value)
            label = etiqueta?.nome || ""
          }
        } else if (f.type === "atribuicao") {
          if (value === "sem_atribuicao") {
            label = "Sem atribuição"
          } else {
            const user = users.find(u => u.id === value)
            label = user?.nome || ""
          }
        } else if (f.type === "lead") {
          label = value === "possui" ? "Possui lead" : "Não possui lead"
        } else if (f.type === "temperatura") {
          if (value === "Quente") label = "Quente"
          else if (value === "Morno") label = "Morno"
          else if (value === "Frio") label = "Frio"
        } else if (f.type === "conversao") {
          label = value === "convertido" ? "Convertido" : "Não convertido"
        }
        return { ...f, value, label }
      }
      return f
    }))
  }

  function clearAllFilters() {
    onFiltersChange([])
  }

  const activeFiltersCount = filters.filter(f => f.value).length

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 relative"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filtros
          {activeFiltersCount > 0 && (
            <Badge
              variant="secondary"
              className="ml-2 h-5 min-w-[20px] px-1.5 bg-primary text-primary-foreground"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-4" align="start">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Filtros</h4>
            {filters.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs text-muted-foreground"
                onClick={clearAllFilters}
              >
                Limpar todos
              </Button>
            )}
          </div>

          <div className="space-y-2">
            {filters.map((filter) => (
              <div key={filter.id} className="flex items-center gap-2">
                {/* Tipo do filtro */}
                <Select
                  value={filter.type}
                  onValueChange={(val) => updateFilterType(filter.id, val as FilterType)}
                >
                  <SelectTrigger className="w-[140px] h-8">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="etiqueta">
                      <div className="flex items-center gap-2">
                        <Tag className="w-3 h-3" />
                        Etiqueta
                      </div>
                    </SelectItem>
                    <SelectItem value="atribuicao">
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3" />
                        Atribuição
                      </div>
                    </SelectItem>
                    <SelectItem value="temperatura">
                      <div className="flex items-center gap-2">
                        <ThermometerIcon className="w-3 h-3" />
                        Temperatura
                      </div>
                    </SelectItem>
                    <SelectItem value="lead">
                      <div className="flex items-center gap-2">
                        Lead
                      </div>
                    </SelectItem>
                    <SelectItem value="conversao">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3" />
                        Conversão
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>

                {/* Valor do filtro */}
                {filter.type === "etiqueta" && (
                  <Select
                    value={filter.value}
                    onValueChange={(val) => updateFilterValue(filter.id, val)}
                  >
                    <SelectTrigger className="flex-1 h-8">
                      <SelectValue placeholder="Selecione uma etiqueta" />
                    </SelectTrigger>
                    <SelectContent>
                      {etiquetas.map((etiqueta) => (
                        <SelectItem key={etiqueta.id} value={etiqueta.id}>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-sm"
                              style={{ backgroundColor: etiqueta.cor }}
                            />
                            {etiqueta.nome}
                          </div>
                        </SelectItem>
                      ))}
                      <SelectItem value="sem_etiqueta">
                        <div className="flex items-center gap-2">
                          <Tag className="w-3 h-3 text-muted-foreground" />
                          <span className="text-muted-foreground">Sem etiqueta</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}

                {filter.type === "atribuicao" && (
                  <Select
                    value={filter.value}
                    onValueChange={(val) => updateFilterValue(filter.id, val)}
                  >
                    <SelectTrigger className="flex-1 h-8">
                      <SelectValue placeholder="Selecione um usuário" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...users]
                        .sort((a, b) => {
                          // Você primeiro
                          if (currentUser?.id === a.id && currentUser?.id !== b.id) return -1
                          if (currentUser?.id !== a.id && currentUser?.id === b.id) return 1
                          return 0
                        })
                        .map((user) => {
                          const isCurrentUser = currentUser?.id === user.id
                          return (
                            <SelectItem key={user.id} value={user.id}>
                              <div className="flex items-center gap-2 w-full">
                                <div
                                  className="w-3 h-3 rounded-sm"
                                  style={{ backgroundColor: user.cor }}
                                />
                                <span className="flex-1">{user.nome || "Sem nome"}</span>
                                {isCurrentUser && (
                                  <span className="text-xs text-blue-600 font-medium">Você</span>
                                )}
                              </div>
                            </SelectItem>
                          )
                        })}
                      <SelectItem value="sem_atribuicao">
                        <div className="flex items-center gap-2">
                          <UserX className="w-3 h-3 text-muted-foreground" />
                          <span className="text-muted-foreground">Sem atribuição</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}

                {filter.type === "temperatura" && (
                  <Select
                    value={filter.value}
                    onValueChange={(val) => updateFilterValue(filter.id, val)}
                  >
                    <SelectTrigger className="flex-1 h-8">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Quente">
                        <div className="flex items-center gap-2">
                          <TemperaturaIcon temperatura="Quente" size={12} className="text-red-500" />
                          <span className="text-red-600">Quente</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Morno">
                        <div className="flex items-center gap-2">
                          <TemperaturaIcon temperatura="Morno" size={12} className="text-orange-500" />
                          <span className="text-orange-600">Morno</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Frio">
                        <div className="flex items-center gap-2">
                          <TemperaturaIcon temperatura="Frio" size={12} className="text-blue-500" />
                          <span className="text-blue-600">Frio</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}

                {filter.type === "lead" && (
                  <Select
                    value={filter.value}
                    onValueChange={(val) => updateFilterValue(filter.id, val)}
                  >
                    <SelectTrigger className="flex-1 h-8">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="possui">Possui lead</SelectItem>
                      <SelectItem value="nao_possui">Não possui lead</SelectItem>
                    </SelectContent>
                  </Select>
                )}

                {filter.type === "conversao" && (
                  <Select
                    value={filter.value}
                    onValueChange={(val) => updateFilterValue(filter.id, val)}
                  >
                    <SelectTrigger className="flex-1 h-8">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="convertido">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-3 h-3 text-green-500" />
                          <span className="text-green-600">Convertido</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="nao_convertido">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-3 h-3 text-orange-500" />
                          <span className="text-orange-600">Desconvertido</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}



                {/* Botão remover */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => removeFilter(filter.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full h-8"
            onClick={addFilter}
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar filtro
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
