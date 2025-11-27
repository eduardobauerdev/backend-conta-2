"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Plus, X } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export interface FilterRule {
  id: string
  type: "vendedor" | "temperatura" | "acao" | ""
  value: string
}

interface FilterPanelProps {
  vendedores: string[]
  acoes: string[]
  onFiltersChange: (filters: FilterRule[]) => void
}

export function FilterPanel({ vendedores, acoes, onFiltersChange }: FilterPanelProps) {
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
                    <SelectItem value="vendedor">Vendedor</SelectItem>
                    <SelectItem value="temperatura">Temperatura</SelectItem>
                    <SelectItem value="acao">Ação</SelectItem>
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
                      <SelectItem value="Quente">Quente</SelectItem>
                      <SelectItem value="Morno">Morno</SelectItem>
                      <SelectItem value="Frio">Frio</SelectItem>
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
