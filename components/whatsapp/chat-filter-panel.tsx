"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Filter, X, Plus, Tag, User } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { Etiqueta } from "@/lib/whatsapp-types"

export type FilterType = "etiqueta" | "atribuicao" | "sem_atribuicao" | "sem_etiqueta"

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
}

export function ChatFilterPanel({ filters, onFiltersChange }: ChatFilterPanelProps) {
  const [open, setOpen] = useState(false)
  const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([])
  const [users, setUsers] = useState<UserProfile[]>([])
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

    // Carregar usuários
    const { data: usersData } = await supabase
      .from("perfis")
      .select("id, nome")
      .order("nome")

    if (usersData) setUsers(usersData)
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
        // Se o tipo mudou para "sem_atribuicao", define valores padrão
        if (type === "sem_atribuicao") {
          return { ...f, type, value: "any", label: "Sem atribuição" }
        }
        // Se o tipo mudou para "sem_etiqueta", define valores padrão
        if (type === "sem_etiqueta") {
          return { ...f, type, value: "any", label: "Sem etiqueta" }
        }
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
          const user = users.find(u => u.id === value)
          label = user?.nome || ""
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
                    <SelectItem value="sem_atribuicao">
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3 text-muted-foreground" />
                        Sem atribuição
                      </div>
                    </SelectItem>
                    <SelectItem value="sem_etiqueta">
                      <div className="flex items-center gap-2">
                        <Tag className="w-3 h-3 text-muted-foreground" />
                        Sem etiqueta
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
                              className="w-3 h-3 rounded-full"
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
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.nome || "Sem nome"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {(filter.type === "sem_etiqueta" || filter.type === "sem_atribuicao") && (
                  <div className="flex-1 h-8 flex items-center px-3 text-sm text-muted-foreground border rounded-md bg-muted/50">
                    {filter.type === "sem_etiqueta" ? "Chats sem etiqueta" : "Chats sem atribuição"}
                  </div>
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
