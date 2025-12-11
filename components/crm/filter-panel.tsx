"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Plus, X, User, Thermometer, Phone, Tag, DollarSign, XCircle } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { getContrastTextColor } from "@/lib/utils"
import { TemperaturaIcon } from "@/components/ui/temperatura-icon"

export interface FilterRule {
  id: string
  type: "vendedor" | "temperatura" | "acao" | "etiqueta" | "conversao" | ""
  value: string
}

interface Etiqueta {
  id: string
  nome: string
  cor: string
}

interface FilterPanelProps {
  vendedores: string[]
  acoes: string[]
  etiquetas?: Etiqueta[]
  onFiltersChange: (filters: FilterRule[]) => void
}

export function FilterPanel({ vendedores, acoes, etiquetas = [], onFiltersChange }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<FilterRule[]>([
    { id: crypto.randomUUID(), type: "", value: "" }
  ])

  const handleAddFilter = () => {
    const newFilter: FilterRule = {
      id: crypto.randomUUID(),
      type: "",
      value: ""
    }
    const updatedFilters = [...filters, newFilter]
    setFilters(updatedFilters)
  }

  const handleRemoveFilter = (id: string) => {
    const updatedFilters = filters.filter(f => f.id !== id)
    setFilters(updatedFilters.length > 0 ? updatedFilters : [{ id: crypto.randomUUID(), type: "", value: "" }])
    applyFilters(updatedFilters)
  }

  const handleFilterTypeChange = (id: string, type: FilterRule["type"]) => {
    const updatedFilters = filters.map(f => 
      f.id === id ? { ...f, type, value: "" } : f
    )
    setFilters(updatedFilters)
  }

  const handleFilterValueChange = (id: string, value: string) => {
    const updatedFilters = filters.map(f => 
      f.id === id ? { ...f, value } : f
    )
    setFilters(updatedFilters)
    applyFilters(updatedFilters)
  }

  const applyFilters = (currentFilters: FilterRule[]) => {
    const validFilters = currentFilters.filter(f => f.type && f.value)
    onFiltersChange(validFilters)
  }

  const handleClearAll = () => {
    const resetFilters = [{ id: crypto.randomUUID(), type: "", value: "" }]
    setFilters(resetFilters as FilterRule[])
    onFiltersChange([])
  }

  const activeFilterCount = filters.filter(f => f.type && f.value).length

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filtros
          {activeFilterCount > 0 && (
            <span className="ml-1 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px]" align="start">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">Filtros de Leads</h4>
            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="h-8 text-xs"
              >
                Limpar todos
              </Button>
            )}
          </div>

          <div className="space-y-3">
            {filters.map((filter, index) => (
              <div key={filter.id} className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  Filtrar por
                </span>
                
                <Select
                  value={filter.type}
                  onValueChange={(value) => handleFilterTypeChange(filter.id, value as FilterRule["type"])}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vendedor">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Vendedor
                      </div>
                    </SelectItem>
                    <SelectItem value="temperatura">
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4" />
                        Temperatura
                      </div>
                    </SelectItem>
                    <SelectItem value="acao">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Ação
                      </div>
                    </SelectItem>
                    {etiquetas.length > 0 && (
                      <SelectItem value="etiqueta">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          Etiqueta
                        </div>
                      </SelectItem>
                    )}
                    <SelectItem value="conversao">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Conversão
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>

                {filter.type === "vendedor" && (
                  <Select
                    value={filter.value}
                    onValueChange={(value) => handleFilterValueChange(filter.id, value)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Selecione vendedor..." />
                    </SelectTrigger>
                    <SelectContent>
                      {vendedores.map((vendedor) => (
                        <SelectItem key={vendedor} value={vendedor}>
                          {vendedor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {filter.type === "temperatura" && (
                  <Select
                    value={filter.value}
                    onValueChange={(value) => handleFilterValueChange(filter.id, value)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Selecione temperatura..." />
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

                {filter.type === "acao" && (
                  <Select
                    value={filter.value}
                    onValueChange={(value) => handleFilterValueChange(filter.id, value)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Selecione ação..." />
                    </SelectTrigger>
                    <SelectContent>
                      {acoes.map((acao) => (
                        <SelectItem key={acao} value={acao}>
                          {acao}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {filter.type === "etiqueta" && (
                  <Select
                    value={filter.value}
                    onValueChange={(value) => handleFilterValueChange(filter.id, value)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Selecione etiqueta..." />
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

                {filter.type === "conversao" && (
                  <Select
                    value={filter.value}
                    onValueChange={(value) => handleFilterValueChange(filter.id, value)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="convertido">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-500" />
                          <span className="text-green-600">Convertido</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="nao_convertido">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-orange-500" />
                          <span className="text-orange-600">Desconvertido</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}

                {filters.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFilter(filter.id)}
                    className="h-9 w-9"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleAddFilter}
            className="w-full gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar filtro
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
