"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, RefreshCw, ChevronLeft, ChevronRight, Search, X } from 'lucide-react'
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1wqibNXuX9xiZKjwKqCe4eylfgWqMoRGtM6UjJGwql7c/export?format=csv&gid=0"

const SHEET_EDIT_URL = "https://docs.google.com/spreadsheets/d/1wqibNXuX9xiZKjwKqCe4eylfgWqMoRGtM6UjJGwql7c/edit?"

interface Ordem {
  numeroOS: string
  cliente: string
  tipoVisita: string
  vendedor: string
  endereco: string
  data: string
  local: string
}

export default function OrdensPage() {
  const [ordens, setOrdens] = useState<Ordem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [showSearchDialog, setShowSearchDialog] = useState(false)
  const [showResultsDialog, setShowResultsDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchType, setSearchType] = useState<"ordem" | "cliente" | "data">("ordem")
  const [filteredOrdens, setFilteredOrdens] = useState<Ordem[]>([])
  const [searchResults, setSearchResults] = useState<Ordem[]>([])

  const parseCSV = (text: string): Ordem[] => {
    const lines = text.trim().split('\n')
    if (lines.length < 2) return []

    // Get headers from first line
    const headers = lines[0].split(',').map(h => h.trim())
    
    // Parse data rows
    const data: Ordem[] = []
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim())
      const row: any = {}
      
      headers.forEach((header, index) => {
        const normalizedHeader = header.toLowerCase()
        if (normalizedHeader.includes('ordem') || normalizedHeader.includes('numero') || normalizedHeader.includes('os')) {
          row.numeroOS = values[index] || ''
        } else if (normalizedHeader.includes('cliente')) {
          row.cliente = values[index] || ''
        } else if (normalizedHeader.includes('tipo') && normalizedHeader.includes('visita')) {
          row.tipoVisita = values[index] || ''
        } else if (normalizedHeader.includes('vendedor')) {
          row.vendedor = values[index] || ''
        } else if (normalizedHeader.includes('endereco') || normalizedHeader.includes('endereço')) {
          row.endereco = values[index] || ''
        } else if (normalizedHeader.includes('data')) {
          row.data = values[index] || ''
        } else if (normalizedHeader.includes('local')) {
          row.local = values[index] || ''
        }
      })
      
      if (row.numeroOS || row.cliente || row.data) {
        data.push(row as Ordem)
      }
    }
    
    return data
  }

  const loadOrdens = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(SHEET_URL)
      
      if (!response.ok) {
        throw new Error('Erro ao buscar dados da planilha')
      }
      
      const text = await response.text()
      const parsedData = parseCSV(text)
      const sortedData = parsedData.sort((a, b) => {
        const numA = parseInt(a.numeroOS) || 0
        const numB = parseInt(b.numeroOS) || 0
        return numB - numA
      })
      setOrdens(sortedData)
      setFilteredOrdens(sortedData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao carregar dados')
      console.error('Erro ao carregar ordens:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrdens()
  }, [])

  const handleSearch = async () => {
    await loadOrdens()

    if (!searchTerm.trim()) {
      setFilteredOrdens(ordens)
      setShowSearchDialog(false)
      return
    }

    const searchLower = searchTerm.toLowerCase().trim()
    const filtered = ordens.filter((ordem) => {
      switch (searchType) {
        case "ordem":
          return ordem.numeroOS.toLowerCase().includes(searchLower)
        case "cliente":
          return ordem.cliente.toLowerCase().includes(searchLower)
        case "data":
          return ordem.data.toLowerCase().includes(searchLower)
        default:
          return true
      }
    })

    setSearchResults(filtered)
    setShowSearchDialog(false)
    setShowResultsDialog(true)
  }

  const clearSearch = () => {
    setSearchTerm("")
    setFilteredOrdens(ordens)
    setCurrentPage(1)
  }

  const totalPages = Math.ceil(filteredOrdens.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentOrdens = filteredOrdens.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [filteredOrdens])

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Lista de Ordens</h1>
            <p className="text-muted-foreground mt-2">Visualize e gerencie todas as ordens de serviço</p>
            {error && (
              <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex gap-2 h-11 px-4 items-center"
              onClick={() => setShowSearchDialog(true)}
            >
              <Search className="w-5 h-5 flex-shrink-0" />
              <span className="leading-none">Busca</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex gap-2 h-11 px-4 items-center"
              onClick={() => window.open(SHEET_EDIT_URL, '_blank')}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Sheets_logo_%282014-2020%29.svg"
                alt="Google Sheets"
                className="w-5 h-5 object-contain flex-shrink-0"
              />
              <span className="leading-none">Editar tabela</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex gap-2 h-11 px-4 items-center"
              onClick={loadOrdens}
              disabled={loading}
            >
              <RefreshCw className={`w-5 h-5 flex-shrink-0 ${loading ? 'animate-spin' : ''}`} />
              <span className="leading-none">{loading ? 'Recarregando...' : 'Recarregar dados'}</span>
            </Button>
            <Link href="/gerar-documento">
              <Button className="flex gap-2 h-11 px-4 items-center">
                <Plus className="w-5 h-5 flex-shrink-0" />
                <span className="leading-none">Nova Ordem</span>
              </Button>
            </Link>
          </div>
        </div>

        <Card className="p-6 border-2 border-neutral-300">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-neutral-300">
                  <th className="text-left py-3 px-4 font-semibold">Ordem</th>
                  <th className="text-left py-3 px-4 font-semibold">Cliente</th>
                  <th className="text-left py-3 px-4 font-semibold">Tipo de Visita</th>
                  <th className="text-left py-3 px-4 font-semibold">Vendedor</th>
                  <th className="text-left py-3 px-4 font-semibold">Endereço</th>
                  <th className="text-left py-3 px-4 font-semibold">Data</th>
                  <th className="text-left py-3 px-4 font-semibold">Local</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-muted-foreground">
                      <p className="text-lg font-medium">Carregando ordens...</p>
                    </td>
                  </tr>
                ) : filteredOrdens.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-muted-foreground">
                      <div className="space-y-2">
                        <p className="text-lg font-medium">
                          {searchTerm ? 'Nenhuma ordem encontrada com os critérios de busca' : 'Nenhuma ordem encontrada'}
                        </p>
                        <p className="text-sm">
                          {searchTerm ? (
                            <Button variant="link" onClick={clearSearch} className="p-0 h-auto">
                              Limpar busca
                            </Button>
                          ) : (
                            'Clique em "Nova Ordem" para criar sua primeira ordem de serviço'
                          )}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentOrdens.map((ordem, index) => (
                    <tr key={index} className="border-b border-neutral-200 hover:bg-muted/50">
                      <td className="py-3 px-4">{ordem.numeroOS}</td>
                      <td className="py-3 px-4">{ordem.cliente}</td>
                      <td className="py-3 px-4">{ordem.tipoVisita}</td>
                      <td className="py-3 px-4">{ordem.vendedor}</td>
                      <td className="py-3 px-4">{ordem.endereco}</td>
                      <td className="py-3 px-4">{ordem.data}</td>
                      <td className="py-3 px-4">
                        {ordem.local && ordem.local.trim() !== '' ? (
                          <a
                            href={ordem.local}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex hover:opacity-70 transition-opacity"
                          >
                            <img
                              src="/images/google-drive-icon.png"
                              alt="Google Drive"
                              className="w-6 h-6 object-contain"
                            />
                          </a>
                        ) : (
                          <span className="text-neutral-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && filteredOrdens.length > 0 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-200">
              <p className="text-sm text-muted-foreground">
                Mostrando {startIndex + 1} a {Math.min(endIndex, filteredOrdens.length)} de {filteredOrdens.length} ordens
                {searchTerm && <span> (filtradas)</span>}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="h-10 px-4 items-center"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="leading-none">Anterior</span>
                </Button>
                <div className="flex items-center gap-2 px-4">
                  <span className="text-sm font-medium">
                    Página {currentPage} de {totalPages}
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="h-10 px-4 items-center"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  <span className="leading-none">Próxima</span>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      {showSearchDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSearchDialog(false)}
          />
          <Card className="relative w-full max-w-md p-6 m-4 border-2 border-neutral-300 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Buscar Ordem</h2>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowSearchDialog(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Digite sua busca..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch()
                    }
                  }}
                  className="flex-1"
                />
                <Select value={searchType} onValueChange={(value: any) => setSearchType(value)}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ordem">Ordem</SelectItem>
                    <SelectItem value="cliente">Cliente</SelectItem>
                    <SelectItem value="data">Data</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end">
                <Button 
                  className="flex gap-2 items-center"
                  onClick={handleSearch}
                >
                  <Search className="w-4 h-4" />
                  <span>Buscar</span>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {showResultsDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowResultsDialog(false)}
          />
          <Card className="relative w-full max-w-5xl max-h-[80vh] p-6 m-4 border-2 border-neutral-300 shadow-lg overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Resultados da busca</h2>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowResultsDialog(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {searchResults.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-lg font-medium">Nenhuma ordem encontrada</p>
                <p className="text-sm mt-2">Tente buscar com outros critérios</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-neutral-300">
                      <th className="text-left py-2 px-3 font-semibold text-sm">Ordem</th>
                      <th className="text-left py-2 px-3 font-semibold text-sm">Cliente</th>
                      <th className="text-left py-2 px-3 font-semibold text-sm">Tipo de Visita</th>
                      <th className="text-left py-2 px-3 font-semibold text-sm">Vendedor</th>
                      <th className="text-left py-2 px-3 font-semibold text-sm">Endereço</th>
                      <th className="text-left py-2 px-3 font-semibold text-sm">Data</th>
                      <th className="text-left py-2 px-3 font-semibold text-sm">Local</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((ordem, index) => (
                      <tr key={index} className="border-b border-neutral-200 hover:bg-muted/50">
                        <td className="py-2 px-3 text-sm">{ordem.numeroOS}</td>
                        <td className="py-2 px-3 text-sm">{ordem.cliente}</td>
                        <td className="py-2 px-3 text-sm">{ordem.tipoVisita}</td>
                        <td className="py-2 px-3 text-sm">{ordem.vendedor}</td>
                        <td className="py-2 px-3 text-sm">{ordem.endereco}</td>
                        <td className="py-2 px-3 text-sm">{ordem.data}</td>
                        <td className="py-2 px-3 text-sm">
                          {ordem.local && ordem.local.trim() !== '' ? (
                            <a
                              href={ordem.local}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex hover:opacity-70 transition-opacity"
                            >
                              <img
                                src="/images/google-drive-icon.png"
                                alt="Google Drive"
                                className="w-5 h-5 object-contain"
                              />
                            </a>
                          ) : (
                            <span className="text-neutral-400">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-sm text-muted-foreground mt-4">
                  Total de {searchResults.length} {searchResults.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
                </p>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  )
}
