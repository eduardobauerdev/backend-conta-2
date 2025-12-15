"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Eye, Download, FileText, AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface DocxPreviewProps {
  templateId: 'contrato-fisica' | 'contrato-juridica'
  data: Record<string, any>
  onGenerate?: (filename: string) => void
  className?: string
}

// Campos obrigatórios por tipo de template
const REQUIRED_FIELDS = {
  'contrato-fisica': [
    'tipo_projeto',
    'nome_contratante',
    'telefone_contratante',
    'endereco_contratante',
    'cpf_contratante',
    'valor_final',
    'data_emissao_contrato'
  ],
  'contrato-juridica': [
    'tipo_projeto',
    'nome_contratante',
    'telefone_contratante',
    'endereco_contratante',
    'cnpj_contratante',
    'nome_representante',
    'cpf_representante',
    'valor_final',
    'data_emissao_contrato'
  ]
}

// Labels amigáveis para os campos
const FIELD_LABELS: Record<string, string> = {
  tipo_projeto: 'Tipo de Projeto',
  nome_contratante: 'Nome do Contratante',
  telefone_contratante: 'Telefone',
  endereco_contratante: 'Endereço',
  cpf_contratante: 'CPF',
  cnpj_contratante: 'CNPJ',
  nome_representante: 'Nome do Representante',
  cpf_representante: 'CPF do Representante',
  valor_final: 'Valor Final',
  data_emissao_contrato: 'Data de Emissão',
  valor_entrada: 'Valor de Entrada',
  valor_desconto: 'Valor do Desconto',
  quantidade_parcelas: 'Quantidade de Parcelas',
  valor_parcelas: 'Valor das Parcelas',
  forma_pagamento_nao_parcelado: 'Forma de Pagamento',
  forma_pagamento_parcelas: 'Forma de Pagamento (Parcelas)',
  observacao_pagamento: 'Observações de Pagamento',
  valor_total_extenso: 'Valor por Extenso',
  cargo_representante: 'Cargo do Representante',
  telefone_representante: 'Telefone do Representante'
}

export function DocxPreview({ templateId, data, onGenerate, className }: DocxPreviewProps) {
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string>("")
  const [showPreview, setShowPreview] = useState(false)

  // Validar dados localmente
  const validateData = (): { valid: boolean; missing: string[] } => {
    const required = REQUIRED_FIELDS[templateId] || []
    const missing = required.filter(field => !data[field] || data[field] === '')
    return { valid: missing.length === 0, missing }
  }

  const validation = validateData()

  // Formatar data para exibição
  const formatDate = (dateString: string): string => {
    if (!dateString) return ''
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString
    return date.toLocaleDateString('pt-BR')
  }

  // Gerar DOCX usando a API
  const generateDocx = async () => {
    try {
      setGenerating(true)
      setError("")

      const endpoint = templateId === 'contrato-fisica' 
        ? '/api/contrato-fisica'
        : '/api/contrato-juridica'

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const contentType = response.headers.get('content-type') || ''

      if (contentType.includes('application/vnd.openxmlformats-officedocument')) {
        // Sucesso - baixar arquivo DOCX
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url

        const disposition = response.headers.get('content-disposition')
        let filename = `contrato-${data.nome_contratante?.replace(/\s+/g, '-') || 'documento'}.docx`
        if (disposition) {
          const match = disposition.match(/filename="?([^"]+)"?/)
          if (match) filename = match[1]
        }

        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)

        onGenerate?.(filename)
      } else {
        // Erro - resposta JSON
        const result = await response.json()
        throw new Error(result.error || 'Erro ao gerar documento')
      }

    } catch (err: any) {
      console.error('[DocxPreview] Erro:', err)
      setError(err.message || 'Erro ao gerar documento')
    } finally {
      setGenerating(false)
    }
  }

  // Renderizar preview dos dados
  const renderPreviewContent = () => {
    const allFields = templateId === 'contrato-juridica'
      ? [
          'tipo_projeto', 'nome_contratante', 'cnpj_contratante', 'endereco_contratante',
          'telefone_contratante', 'nome_representante', 'cargo_representante',
          'cpf_representante', 'telefone_representante', 'valor_produtos_instalacao',
          'valor_entrada', 'valor_desconto', 'valor_final', 'valor_total_extenso',
          'quantidade_parcelas', 'valor_parcelas', 'forma_pagamento_nao_parcelado',
          'forma_pagamento_parcelas', 'observacao_pagamento', 'data_emissao_contrato'
        ]
      : [
          'tipo_projeto', 'nome_contratante', 'cpf_contratante', 'endereco_contratante',
          'telefone_contratante', 'valor_produtos_instalacao', 'valor_entrada',
          'valor_desconto', 'valor_final', 'valor_total_extenso', 'quantidade_parcelas',
          'valor_parcelas', 'forma_pagamento_nao_parcelado', 'forma_pagamento_parcelas',
          'observacao_pagamento', 'data_emissao_contrato'
        ]

    return (
      <div className="space-y-4 p-4">
        <div className="text-center border-b pb-4">
          <h2 className="text-xl font-bold text-blue-600">
            CONTRATO DE PRESTAÇÃO DE SERVIÇOS
          </h2>
          <p className="text-sm text-gray-500">
            {templateId === 'contrato-juridica' ? 'Pessoa Jurídica' : 'Pessoa Física'}
          </p>
        </div>

        <div className="grid gap-3">
          {allFields.map(field => {
            const value = data[field]
            const label = FIELD_LABELS[field] || field
            const isRequired = REQUIRED_FIELDS[templateId]?.includes(field)
            const isEmpty = !value || value === ''

            return (
              <div key={field} className="flex justify-between items-start border-b pb-2">
                <span className="font-medium text-gray-700">
                  {label}
                  {isRequired && <span className="text-red-500 ml-1">*</span>}
                </span>
                <span className={`text-right max-w-[60%] ${isEmpty ? 'text-gray-400 italic' : 'text-gray-900'}`}>
                  {field === 'data_emissao_contrato' 
                    ? formatDate(value) || '(não preenchido)'
                    : value || '(não preenchido)'
                  }
                </span>
              </div>
            )
          })}
        </div>

        <div className="mt-6 pt-4 border-t text-center text-sm text-gray-500">
          <p>Este é um preview dos dados que serão inseridos no contrato.</p>
          <p>O documento final manterá a formatação do template DOCX.</p>
        </div>
      </div>
    )
  }

  return (
    <Card className={`p-6 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Gerar Contrato</h3>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Alert variant={validation.valid ? "default" : "destructive"}>
          {validation.valid ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertDescription>
            {validation.valid 
              ? "Todos os campos obrigatórios preenchidos" 
              : `Campos ausentes: ${validation.missing.map(f => FIELD_LABELS[f] || f).join(', ')}`
            }
          </AlertDescription>
        </Alert>

        <div className="flex gap-3 flex-wrap">
          {/* Botão de Preview */}
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                Pré-visualizar Dados
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>Preview do Contrato</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[60vh] w-full border rounded-md">
                {renderPreviewContent()}
              </ScrollArea>
              <div className="flex gap-2 justify-end">
                <Button
                  onClick={generateDocx}
                  disabled={generating || !validation.valid}
                  className="flex items-center gap-2"
                >
                  {generating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Gerando...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Baixar DOCX
                    </>
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Botão de Gerar DOCX */}
          <Button
            onClick={generateDocx}
            disabled={generating || !validation.valid}
            className="flex items-center gap-2"
          >
            {generating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Gerar DOCX
              </>
            )}
          </Button>
        </div>

        <div className="text-sm text-gray-600">
          <p><strong>Como funciona:</strong></p>
          <ol className="list-decimal list-inside mt-1 space-y-1">
            <li>Clique em "Gerar DOCX" para baixar o contrato preenchido</li>
            <li>Abra o arquivo no Word ou Google Docs</li>
            <li>Revise o documento e salve como PDF se necessário</li>
          </ol>
        </div>
      </div>
    </Card>
  )
}
