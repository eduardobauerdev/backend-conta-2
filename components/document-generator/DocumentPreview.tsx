"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Eye, Download, FileText, AlertCircle, CheckCircle2, Loader2, Printer } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface DocumentPreviewProps {
  templateId: string
  data: any
  onGenerate?: (result: any) => void
  className?: string
}

interface ValidationResult {
  valid: boolean
  missing: string[]
}

export function DocumentPreview({ templateId, data, onGenerate, className }: DocumentPreviewProps) {
  const [previewHtml, setPreviewHtml] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [validation, setValidation] = useState<ValidationResult | null>(null)
  const [error, setError] = useState<string>("")
  const [showPreview, setShowPreview] = useState(false)

  const validateData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/generate-document?action=validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId, data })
      })

      const result = await response.json()
      
      if (result.success) {
        setValidation({ valid: result.valid, missing: result.missing })
        if (!result.valid) {
          setError(`Campos obrigatórios ausentes: ${result.missing.join(', ')}`)
        } else {
          setError("")
        }
      } else {
        setError(result.error || 'Erro ao validar dados')
      }
    } catch (err) {
      setError('Erro de conexão ao validar dados')
    } finally {
      setLoading(false)
    }
  }

  const generatePreview = async () => {
    try {
      setLoading(true)
      setError("")
      
      const response = await fetch('/api/generate-document?action=preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId, data })
      })

      const result = await response.json()
      
      if (result.success) {
        setPreviewHtml(result.html)
        setShowPreview(true)
      } else {
        setError(result.error || 'Erro ao gerar preview')
      }
    } catch (err) {
      setError('Erro de conexão ao gerar preview')
    } finally {
      setLoading(false)
    }
  }

  const generateDocument = async (format: 'pdf' | 'html' = 'pdf') => {
    try {
      setGenerating(true)
      setError("")
      
      const response = await fetch('/api/generate-document?action=generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          templateId, 
          data, 
          format,
          filename: `documento_${new Date().toISOString().split('T')[0]}`
        })
      })

      const result = await response.json()
      
      if (result.success) {
        if (format === 'pdf') {
          // Abrir janela de impressão para PDF
          const printWindow = window.open('', '_blank', 'width=1024,height=768')
          
          if (!printWindow) {
            setError('Pop-up bloqueado. Permita pop-ups para gerar PDFs.')
            return
          }

          const fullHtml = `
            <!DOCTYPE html>
            <html lang="pt-BR">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${result.filename.replace('.pdf', '')}</title>
                <style>
                  @page {
                    size: A4;
                    margin: 1.5cm;
                  }
                  
                  * {
                    box-sizing: border-box;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                  }
                  
                  body {
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 12pt;
                    line-height: 1.5;
                    color: #000;
                    margin: 0;
                    padding: 0;
                    background: white;
                  }
                  
                  @media screen {
                    body {
                      background: #f5f5f5;
                      padding: 20px;
                    }
                    .page-container {
                      background: white;
                      max-width: 21cm;
                      margin: 0 auto;
                      padding: 2cm;
                      box-shadow: 0 0 10px rgba(0,0,0,0.1);
                      min-height: 29.7cm;
                    }
                    .print-instructions {
                      position: fixed;
                      top: 10px;
                      right: 10px;
                      background: #007bff;
                      color: white;
                      padding: 15px 20px;
                      border-radius: 8px;
                      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                      z-index: 9999;
                      font-size: 14px;
                      max-width: 300px;
                    }
                    .print-instructions strong {
                      display: block;
                      margin-bottom: 5px;
                      font-size: 16px;
                    }
                    .print-instructions button {
                      background: white;
                      color: #007bff;
                      border: none;
                      padding: 8px 16px;
                      border-radius: 4px;
                      cursor: pointer;
                      margin-top: 10px;
                      font-weight: bold;
                      width: 100%;
                    }
                    .print-instructions button:hover {
                      background: #f0f0f0;
                    }
                  }
                  
                  @media print {
                    body {
                      padding: 0;
                      background: white;
                    }
                    .page-container {
                      max-width: none;
                      margin: 0;
                      padding: 0;
                      box-shadow: none;
                    }
                    .print-instructions {
                      display: none !important;
                    }
                  }
                  
                  h1, h2, h3, h4, h5, h6 {
                    margin-top: 1em;
                    margin-bottom: 0.5em;
                    page-break-after: avoid;
                  }
                  
                  p {
                    margin: 0.5em 0;
                    orphans: 3;
                    widows: 3;
                  }
                  
                  table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 1em 0;
                    page-break-inside: avoid;
                  }
                  
                  th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                  }
                  
                  th {
                    background-color: #f2f2f2;
                    font-weight: bold;
                  }
                  
                  img {
                    max-width: 100%;
                    height: auto;
                    page-break-inside: avoid;
                  }
                  
                  .page-break {
                    page-break-before: always;
                  }
                </style>
              </head>
              <body>
                <div class="print-instructions">
                  <strong>📄 Pronto para salvar!</strong>
                  <p>Clique no botão abaixo ou use Ctrl+P / Cmd+P</p>
                  <button onclick="window.print()">🖨️ Imprimir / Salvar PDF</button>
                  <p style="margin-top: 10px; font-size: 12px; opacity: 0.9;">
                    💡 Dica: No diálogo de impressão, escolha "Salvar como PDF" como destino.
                  </p>
                </div>
                <div class="page-container">
                  ${result.html}
                </div>
              </body>
            </html>
          `

          printWindow.document.write(fullHtml)
          printWindow.document.close()
          
          // Aguardar carregamento antes de imprimir automaticamente
          printWindow.onload = () => {
            printWindow.focus()
            // Não chamar print() automaticamente, deixar usuário decidir
            // printWindow.print()
          }
        } else {
          // Download HTML normal
          const blob = new Blob([result.html], { type: 'text/html' })
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = result.filename
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
        }

        onGenerate?.(result)
      } else {
        setError(result.error || 'Erro ao gerar documento')
      }
    } catch (err) {
      setError('Erro de conexão ao gerar documento')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <Card className={`p-6 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Gerar Documento</h3>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {validation && (
          <Alert variant={validation.valid ? "default" : "destructive"}>
            {validation.valid ? (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertDescription>
              {validation.valid 
                ? "Todos os campos obrigatórios preenchidos" 
                : `Campos ausentes: ${validation.missing.join(', ')}`
              }
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-3 flex-wrap">
          <Button
            variant="outline"
            onClick={validateData}
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle2 className="h-4 w-4" />
            )}
            Validar Dados
          </Button>

          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                onClick={generatePreview}
                disabled={loading}
                className="flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                Pré-visualizar
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>Pré-visualização do Documento</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[60vh] w-full border rounded-md p-4">
                <div 
                  dangerouslySetInnerHTML={{ __html: previewHtml }}
                  className="prose max-w-none"
                />
              </ScrollArea>
              <div className="flex gap-2 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => generateDocument('html')}
                  disabled={generating}
                >
                  {generating ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  Baixar HTML
                </Button>
                <Button 
                  onClick={() => generateDocument('pdf')}
                  disabled={generating}
                  className="flex items-center gap-2"
                >
                  {generating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Gerando...
                    </>
                  ) : (
                    <>
                      <Printer className="h-4 w-4 mr-2" />
                      Imprimir PDF
                    </>
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            onClick={() => generateDocument('pdf')}
            disabled={generating || (validation && !validation.valid)}
            className="flex items-center gap-2"
          >
            {generating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Printer className="h-4 w-4" />
                Gerar PDF (Imprimir)
              </>
            )}
          </Button>

          <Button
            variant="secondary"
            onClick={() => generateDocument('html')}
            disabled={generating}
            className="flex items-center gap-2"
          >
            {generating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FileText className="h-4 w-4" />
            )}
            Baixar HTML
          </Button>
        </div>

        <div className="text-sm text-gray-600">
          <p><strong>Dica:</strong> Use "Pré-visualizar" para ver o documento antes de gerar o PDF final.</p>
          <p><strong>PDF:</strong> Abrirá janela de impressão (salve como PDF no navegador).</p>
          <p><strong>HTML:</strong> Download do arquivo para visualização offline.</p>
        </div>
      </div>
    </Card>
  )
}