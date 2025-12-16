"use client"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useRef, useEffect } from "react"
import { Upload, ImageIcon, X, CheckCircle2, AlertTriangle, ExternalLink, Loader2, Eraser, Copy, Code, Eye, FileSearch } from 'lucide-react'
import { getDriveLinks } from "@/lib/drive-links-store"

const numberToWordsFull = (num: number): string => {
  if (num === 0) return "zero reais"

  const unidades = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"]
  const especiais = [
    "dez",
    "onze",
    "doze",
    "treze",
    "quatorze",
    "quinze",
    "dezesseis",
    "dezessete",
    "dezoito",
    "dezenove",
  ]
  const dezenas = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"]
  const centenas = [
    "",
    "cem",
    "duzentos",
    "trezentos",
    "quatrocentos",
    "quinhentos",
    "seiscentos",
    "setecentos",
    "oitocentos",
    "novecentos"
  ]

  const convertirGrupo = (n: number): string => {
    if (n === 0) return ""
    if (n === 100) return "cem"

    let resultado = ""
    const c = Math.floor(n / 100)
    const d = Math.floor((n % 100) / 10)
    const u = n % 10

    if (c > 0) resultado += centenas[c]
    if (d === 1) {
      if (resultado) resultado += " e "
      resultado += especiais[u]
      return resultado
    }
    if (d > 1) {
      if (resultado) resultado += " e "
      resultado += dezenas[d]
    }
    if (u > 0) {
      if (resultado && d !== 1) resultado += " e "
      else if (resultado) resultado += " "
      resultado += unidades[u]
    }

    return resultado
  }

  const inteiro = Math.floor(num)
  const centavos = Math.round((num - inteiro) * 100)

  let texto = ""

  // Milhões
  const milhoes = Math.floor(inteiro / 1000000)
  if (milhoes > 0) {
    if (milhoes === 1) {
      texto = "um milhão"
    } else {
      texto = convertirGrupo(milhoes) + " milhões"
    }
  }

  // Milhares
  const milhares = Math.floor((inteiro % 1000000) / 1000)
  if (milhares > 0) {
    if (texto) texto += " e "
    if (milhares === 1) {
      texto += "mil"
    } else {
      texto += convertirGrupo(milhares) + " mil"
    }
  }

  // Centenas
  const resto = inteiro % 1000
  if (resto > 0) {
    if (texto && resto < 100) texto += " e "
    else if (texto) texto += " "
    texto += convertirGrupo(resto)
  }

  // Adiciona "reais"
  if (inteiro === 1) {
    texto += " real"
  } else {
    texto += " reais"
  }

  // Centavos
  if (centavos > 0) {
    texto += " e " + convertirGrupo(centavos)
    texto += centavos === 1 ? " centavo" : " centavos"
  }

  return texto
}

const formatCurrency = (value: string): string => {
  const numbers = value.replace(/\D/g, "")
  if (!numbers) return ""
  const amount = Number.parseFloat(numbers) / 100
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount)
}

const parseCurrency = (value: string): number => {
  if (!value) return 0
  const numbers = value.replace(/\D/g, "")
  return Number.parseFloat(numbers) / 100
}

const formatPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, "")
  if (numbers.length <= 10) {
    return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "")
  }
  return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "")
}

const formatCNPJ = (value: string): string => {
  const numbers = value.replace(/\D/g, "")
  return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, "$1.$2.$3/$4-$5").replace(/-$/, "")
}

const formatCPF = (value: string): string => {
  const numbers = value.replace(/\D/g, "")
  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4").replace(/-$/, "")
}

interface ContratoJuridicaFormProps {
  gerarContrato: boolean
  setGerarContrato: (value: boolean) => void
  tipoContrato: "fisica" | "juridica" | null
  setTipoContrato: (value: "fisica" | "juridica" | null) => void
  contratoData: {
    tipo_projeto: string
    nome: string
    telefone: string
    endereco_contrato: string
    cnpj: string
    nome_representante: string
    cpf_representante: string
    telefone_representante: string
    cargo_representante: string
    forma_pagamento: string
    valor_produtos_instalacao: string
    valor_entrada: string
    valor_desconto: string
    quantidade_parcelas: string
    forma_pagamento_parcelas: string
    observacao_pagamento: string
    data_emissao_contrato: string
  }
  setContratoData: (data: any) => void
  errors: Record<string, string>
  setErrors: (errors: any) => void
}

export function ContratoJuridicaForm({
  gerarContrato,
  setGerarContrato,
  tipoContrato,
  setTipoContrato,
  contratoData,
  setContratoData,
  errors,
  setErrors,
}: ContratoJuridicaFormProps) {
  const [fotoOrcamentoBase64, setFotoOrcamentoBase64] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [showWarningToast, setShowWarningToast] = useState(false)
  const [showMissingFieldsToast, setShowMissingFieldsToast] = useState(false)
  const [showClearFieldsToast, setShowClearFieldsToast] = useState(false)
  const [showCopyToast, setShowCopyToast] = useState(false)
  const [hasImage, setHasImage] = useState(false)
  const [showThumbnailHover, setShowThumbnailHover] = useState(false)
  const [isToday, setIsToday] = useState(true)
  const [quickFillOptions, setQuickFillOptions] = useState({
    guardaCorpo: false,
    corrimao: false,
    box: false,
  })
  const [driveLink, setDriveLink] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showLoadingModal, setShowLoadingModal] = useState(false)
  const [callbackId, setCallbackId] = useState<string | null>(null)
  const [isLoadingComplete, setIsLoadingComplete] = useState(false)
  const [submittedPayload, setSubmittedPayload] = useState<any>(null)
  const [countdown, setCountdown] = useState(10)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [previewData, setPreviewData] = useState<any>(null)
  const [templateAnalysis, setTemplateAnalysis] = useState<any>(null)
  const [isLoadingPreview, setIsLoadingPreview] = useState(false)

  useEffect(() => {
    const today = new Date()
    const formattedDate = today.toISOString().split('T')[0]
    setContratoData((prev: any) => ({ 
      ...prev, 
      data_emissao_contrato: formattedDate 
    }))
  }, [setContratoData])

  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      if (hasImage) {
        setShowWarningToast(true)
        return
      }

      const items = e.clipboardData?.items
      if (!items) return

      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile()
          if (file) {
            await processImageFile(file)
          }
        }
      }
    }

    document.addEventListener('paste', handlePaste)
    return () => document.removeEventListener('paste', handlePaste)
  }, [hasImage])

  useEffect(() => {
    if (showSuccessToast) {
      const timer = setTimeout(() => {
        setShowSuccessToast(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showSuccessToast])

  useEffect(() => {
    if (showWarningToast) {
      const timer = setTimeout(() => {
        setShowWarningToast(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showWarningToast])

  useEffect(() => {
    if (showMissingFieldsToast) {
      const timer = setTimeout(() => {
        setShowMissingFieldsToast(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showMissingFieldsToast])

  useEffect(() => {
    if (showClearFieldsToast) {
      const timer = setTimeout(() => {
        setShowClearFieldsToast(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showClearFieldsToast])

  useEffect(() => {
    if (showCopyToast) {
      const timer = setTimeout(() => {
        setShowCopyToast(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showCopyToast])


  const handleContratoInputChange = (field: string, value: string) => {
    let formattedValue = value

    if (field === "telefone" || field === "telefone_representante") {
      formattedValue = formatPhone(value)
    } else if (field === "cnpj") {
      formattedValue = formatCNPJ(value)
    } else if (field === "cpf_representante") {
      formattedValue = formatCPF(value)
    } else if (field === "valor_produtos_instalacao" || field === "valor_entrada" || field === "valor_desconto") {
      formattedValue = formatCurrency(value)
    }

    setContratoData((prev: any) => ({ ...prev, [field]: formattedValue }))
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: "" }))
    }
  }

  const handleDateChange = (value: string) => {
    setContratoData((prev: any) => ({ ...prev, data_emissao_contrato: value }))
    
    const today = new Date().toISOString().split('T')[0]
    setIsToday(value === today)
    
    if (errors.data_emissao_contrato) {
      setErrors((prev: any) => ({ ...prev, data_emissao_contrato: "" }))
    }
  }

  const handleTodayCheckbox = (checked: boolean) => {
    setIsToday(checked)
    if (checked) {
      const today = new Date().toISOString().split('T')[0]
      setContratoData((prev: any) => ({ ...prev, data_emissao_contrato: today }))
    }
  }

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result)
        } else {
          reject(new Error("Failed to convert file to base64"))
        }
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const isImageFile = (file: File): boolean => {
    return file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg"
  }

  const processImageFile = async (file: File) => {
    if (hasImage) {
      setShowWarningToast(true)
      return
    }

    if (isImageFile(file)) {
      try {
        const base64 = await convertToBase64(file)
        setFotoOrcamentoBase64(base64)
        setHasImage(true)
        setShowSuccessToast(true)
      } catch (error) {
        console.error("Error converting file to base64:", error)
      }
    } else {
      alert("Por favor, selecione apenas arquivos de imagem (PNG, JPG ou JPEG)")
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      await processImageFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      await processImageFile(file)
    }
  }

  const handleRemoveImage = () => {
    setFotoOrcamentoBase64(null)
    setHasImage(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Função para gerar preview dos dados
  const handlePreview = async () => {
    setIsLoadingPreview(true)
    
    try {
      // Calcular valores como no submit
      const valorProdutosNum = parseCurrency(contratoData.valor_produtos_instalacao)
      const valorDescontoNum = parseCurrency(contratoData.valor_desconto)
      const valorFinalNumero = valorProdutosNum - valorDescontoNum
      const quantidadeParcelas = Number.parseInt(contratoData.quantidade_parcelas) || 1
      const valorParcelasNumero = valorFinalNumero / quantidadeParcelas

      const valorFinalFormatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(valorFinalNumero)

      const valorParcelasFormatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(valorParcelasNumero)

      const valorTotalExtenso = numberToWordsFull(valorFinalNumero)

      const dados = {
        tipo_projeto: contratoData.tipo_projeto,
        nome_contratante: contratoData.nome,
        telefone_contratante: contratoData.telefone,
        endereco_contratante: contratoData.endereco_contrato,
        cnpj_contratante: contratoData.cnpj,
        nome_representante: contratoData.nome_representante,
        cargo_representante: contratoData.cargo_representante,
        cpf_representante: contratoData.cpf_representante,
        telefone_representante: contratoData.telefone_representante,
        forma_pagamento_nao_parcelado: contratoData.forma_pagamento,
        valor_produtos_instalacao: contratoData.valor_produtos_instalacao,
        valor_entrada: contratoData.valor_entrada || "",
        valor_desconto: contratoData.valor_desconto || "",
        quantidade_parcelas: contratoData.quantidade_parcelas || "1",
        forma_pagamento_parcelas: contratoData.forma_pagamento_parcelas || "",
        observacao_pagamento: contratoData.observacao_pagamento || "",
        data_emissao_contrato: contratoData.data_emissao_contrato,
        valor_final: valorFinalFormatted,
        valor_total_extenso: valorTotalExtenso,
        valor_parcelas: valorParcelasFormatted,
      }

      // Buscar análise do template
      const templateRes = await fetch('/api/contrato-preview?tipo=juridica')
      const templateData = await templateRes.json()
      setTemplateAnalysis(templateData)

      // Buscar preview dos dados
      const previewRes = await fetch('/api/contrato-preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo: 'juridica', dados })
      })
      const preview = await previewRes.json()
      setPreviewData(preview)

      setShowPreviewModal(true)
    } catch (error) {
      console.error('Erro ao gerar preview:', error)
      alert('Erro ao gerar pré-visualização')
    } finally {
      setIsLoadingPreview(false)
    }
  }

  const pollForCallback = async (id: string) => {
    const maxAttempts = 60
    let attempts = 0

    const poll = async (): Promise<string | null> => {
      if (attempts >= maxAttempts) {
        return null
      }

      try {
        const response = await fetch(`/api/callback/check/${id}`)
        const result = await response.json()

        if (result.driveLink) {
          return result.driveLink
        }

        await new Promise(resolve => setTimeout(resolve, 5000))
        attempts++
        return poll()
      } catch (error) {
        console.error("[v0] Error polling for callback:", error)
        await new Promise(resolve => setTimeout(resolve, 5000))
        attempts++
        return poll()
      }
    }

    return poll()
  }

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {}
    if (!contratoData.tipo_projeto) newErrors.tipo_projeto = "Campo obrigatório"
    if (!contratoData.nome) newErrors.nome = "Campo obrigatório"
    if (!contratoData.telefone) newErrors.telefone = "Campo obrigatório"
    if (!contratoData.endereco_contrato) newErrors.endereco_contrato = "Campo obrigatório"
    if (!contratoData.cnpj) newErrors.cnpj = "Campo obrigatório"
    if (!contratoData.nome_representante) newErrors.nome_representante = "Campo obrigatório"
    if (!contratoData.cargo_representante) newErrors.cargo_representante = "Campo obrigatório"
    if (!contratoData.cpf_representante) newErrors.cpf_representante = "Campo obrigatório"
    if (!contratoData.telefone_representante) newErrors.telefone_representante = "Campo obrigatório"
    if (!contratoData.forma_pagamento) newErrors.forma_pagamento = "Campo obrigatório"
    if (!contratoData.valor_produtos_instalacao) newErrors.valor_produtos_instalacao = "Campo obrigatório"
    if (!contratoData.data_emissao_contrato) newErrors.data_emissao_contrato = "Campo obrigatório"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      
      // Show toast
      setShowMissingFieldsToast(true)
      
      // Find first error field and scroll to it
      const firstErrorField = Object.keys(newErrors)[0]
      const fieldElement = document.getElementById(firstErrorField === 'tipo_projeto' ? 'tipo_projeto' : 
                                                   firstErrorField === 'nome' ? 'nome_contrato' :
                                                   firstErrorField === 'cnpj' ? 'cnpj_contrato' :
                                                   firstErrorField === 'endereco_contrato' ? 'endereco_contrato' :
                                                   firstErrorField === 'nome_representante' ? 'nome_representante' :
                                                   firstErrorField === 'cargo_representante' ? 'cargo_representante' :
                                                   firstErrorField === 'cpf_representante' ? 'cpf_representante' :
                                                   firstErrorField === 'telefone_representante' ? 'telefone_representante' :
                                                   firstErrorField === 'forma_pagamento' ? 'forma_pagamento_juridica_Transferência bancária (TED/PIX)' :
                                                   firstErrorField === 'valor_produtos_instalacao' ? 'valor_produtos' :
                                                   'data_emissao_contrato')
      
      if (fieldElement) {
        const elementPosition = fieldElement.getBoundingClientRect().top + window.scrollY
        const offsetPosition = elementPosition - (window.innerHeight / 2) + (fieldElement.offsetHeight / 2)
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
      
      return
    }

    const valorProdutosNum = parseCurrency(contratoData.valor_produtos_instalacao)
    const valorDescontoNum = parseCurrency(contratoData.valor_desconto)
    const valorFinalNumero = valorProdutosNum - valorDescontoNum

    const quantidadeParcelas = Number.parseInt(contratoData.quantidade_parcelas) || 1
    const valorParcelasNumero = valorFinalNumero / quantidadeParcelas

    const valorFinalFormatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valorFinalNumero)

    const valorParcelasFormatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valorParcelasNumero)

    const valorTotalExtenso = numberToWordsFull(valorFinalNumero)
    const valorParcelaExtenso = numberToWordsFull(valorParcelasNumero)

    const payload = {
      tipo_projeto: contratoData.tipo_projeto,
      nome_contratante: contratoData.nome,
      telefone_contratante: contratoData.telefone,
      endereco_contratante: contratoData.endereco_contrato,
      cnpj_contratante: contratoData.cnpj,
      nome_representante: contratoData.nome_representante,
      cpf_representante: contratoData.cpf_representante,
      telefone_representante: contratoData.telefone_representante,
      cargo_representante: contratoData.cargo_representante,
      forma_pagamento_nao_parcelado: contratoData.forma_pagamento,
      valor_produtos_instalacao: contratoData.valor_produtos_instalacao,
      valor_entrada: contratoData.valor_entrada || "",
      valor_desconto: contratoData.valor_desconto || "",
      quantidade_parcelas: contratoData.quantidade_parcelas || "1",
      forma_pagamento_parcelas: contratoData.forma_pagamento_parcelas || "",
      observacao_pagamento: contratoData.observacao_pagamento || "",
      data_emissao_contrato: contratoData.data_emissao_contrato,
      valor_final: valorFinalFormatted,
      valor_total_extenso: valorTotalExtenso,
      valor_parcelas: valorParcelasFormatted,
      valor_parcela_extenso: valorParcelaExtenso,
      foto_orcamento_base64: fotoOrcamentoBase64 || null,
    }

    setIsSubmitting(true)
    setShowLoadingModal(true)
    setIsLoadingComplete(false)
    setSubmittedPayload(payload)
    setCountdown(10)


    try {
      console.log("[v0] Gerando contrato pessoa jurídica DOCX...")
      console.log("[v0] Payload:", JSON.stringify(payload, null, 2))
      
      const response = await fetch("/api/contrato-juridica", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      // Verificar se a resposta é um arquivo DOCX ou JSON de erro
      const contentType = response.headers.get('content-type') || ''
      
      if (contentType.includes('application/vnd.openxmlformats-officedocument')) {
        // É um arquivo DOCX - fazer download
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        
        // Extrair nome do arquivo do header ou usar padrão
        const disposition = response.headers.get('content-disposition')
        let filename = `contrato-${payload.nome_contratante?.replace(/\s+/g, '-') || 'empresa'}.docx`
        if (disposition) {
          const match = disposition.match(/filename="?([^"]+)"?/)
          if (match) filename = match[1]
        }
        
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        
        console.log("[v0] Contrato DOCX baixado com sucesso:", filename)
      } else {
        // É uma resposta JSON (provavelmente erro)
        const result = await response.json()
        console.log("[v0] Resposta da API:", result)

        if (!response.ok || !result.success) {
          throw new Error(result.error || "Erro ao gerar contrato")
        }
      }

      console.log("[v0] Contrato gerado com sucesso!")
    } catch (error) {
      console.error("[v0] Erro ao gerar contrato:", error)
      alert("❌ Erro ao gerar contrato. Por favor, tente novamente.")
    } finally {
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval)
            setIsLoadingComplete(true)
            setIsSubmitting(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
  }

  const handleQuickFillChange = (option: 'guardaCorpo' | 'corrimao' | 'box', checked: boolean) => {
    const newOptions = { ...quickFillOptions, [option]: checked }
    setQuickFillOptions(newOptions)

    const selectedOptions: string[] = []
    if (newOptions.guardaCorpo) selectedOptions.push('Guarda-corpo')
    if (newOptions.corrimao) selectedOptions.push('corrimão')
    if (newOptions.box) selectedOptions.push('box')

    let tipoProjeto = ''
    if (selectedOptions.length === 1) {
      tipoProjeto = selectedOptions[0]
    } else if (selectedOptions.length === 2) {
      tipoProjeto = `${selectedOptions[0]} e ${selectedOptions[1]}`
    } else if (selectedOptions.length === 3) {
      tipoProjeto = `${selectedOptions[0]}, ${selectedOptions[1]} e ${selectedOptions[2]}`
    }

    handleContratoInputChange('tipo_projeto', tipoProjeto)
  }

  const hasAnyFieldContent = () => {
    return (
      contratoData.tipo_projeto ||
      contratoData.nome ||
      contratoData.telefone ||
      contratoData.endereco_contrato ||
      contratoData.cnpj ||
      contratoData.nome_representante ||
      contratoData.cpf_representante ||
      contratoData.telefone_representante ||
      contratoData.cargo_representante ||
      contratoData.forma_pagamento ||
      contratoData.valor_produtos_instalacao ||
      contratoData.valor_entrada ||
      contratoData.valor_desconto ||
      contratoData.quantidade_parcelas ||
      contratoData.forma_pagamento_parcelas ||
      contratoData.observacao_pagamento ||
      hasImage
    )
  }

  const handleClearAllFields = () => {
    setContratoData({
      tipo_projeto: "",
      nome: "",
      telefone: "",
      endereco_contrato: "",
      cnpj: "",
      nome_representante: "",
      cpf_representante: "",
      telefone_representante: "",
      cargo_representante: "",
      forma_pagamento: "",
      valor_produtos_instalacao: "",
      valor_entrada: "",
      valor_desconto: "",
      quantidade_parcelas: "",
      forma_pagamento_parcelas: "",
      observacao_pagamento: "",
      data_emissao_contrato: new Date().toISOString().split('T')[0],
    })
    setFotoOrcamentoBase64(null)
    setHasImage(false)
    setQuickFillOptions({ guardaCorpo: false, corrimao: false, box: false })
    setErrors({})
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setShowClearFieldsToast(true)
  }

  const handleCopyValue = async (value: any) => {
    const textToCopy = typeof value === 'object' && value !== null 
      ? JSON.stringify(value) 
      : String(value)
    
    try {
      await navigator.clipboard.writeText(textToCopy)
      setShowCopyToast(true)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const truncateValue = (value: any): string => {
    const str = typeof value === 'object' && value !== null 
      ? JSON.stringify(value) 
      : String(value)
    
    return str.length > 30 ? `${str.substring(0, 30)}...` : str
  }

  const handleCloseModal = () => {
    setShowLoadingModal(false)
  }

  if (!gerarContrato || tipoContrato !== "juridica") {
    return null
  }

  const DRIVE_LINK = 'https://drive.google.com/drive/u/0/folders/1f_3jWgVene_ZLPT80qJFNbS61SvYAnKr'

  return (
    <>
      {showLoadingModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-6 w-[400px] min-h-[340px]">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-20 h-20 relative flex-shrink-0">
              <img 
                src="/google_drive.svg"
                alt="Google Drive" 
                className={`w-full h-full object-contain drop-shadow-lg transition-all duration-500`}
                style={{ filter: !isLoadingComplete ? 'grayscale(100%)' : 'none' }}
              />
            </div>
            
            <div className="flex flex-col items-center gap-4 flex-1 justify-center" style={{ minHeight: '140px' }}>
              {!isLoadingComplete ? (
                <>
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                  <p className="text-lg font-semibold text-neutral-900">Gerando contrato...</p>
                  <p className="text-sm text-neutral-600 text-center">Gerando seu documento em {countdown} segundos</p>
                </>
              ) : (
                <>
                  <p className="text-lg font-semibold text-green-600">Seu arquivo está pronto</p>
                  <a
                    href={DRIVE_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    Acessar pasta do arquivo
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
          showSuccessToast
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
        style={{ maxHeight: '120px' }}
      >
        <div className="bg-neutral-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <span className="text-sm font-medium">Foto de orçamento anexada</span>
        </div>
      </div>

      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
          showWarningToast
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
        style={{ maxHeight: '120px' }}
      >
        <div className="bg-neutral-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-medium">Só é possível enviar uma foto de orçamento.</span>
        </div>
      </div>

      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
          showMissingFieldsToast
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
        style={{ maxHeight: '120px' }}
      >
        <div className="bg-neutral-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-medium">Preencha todos os campos obrigatórios</span>
        </div>
      </div>

      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
          showClearFieldsToast
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
        style={{ maxHeight: '120px' }}
      >
        <div className="bg-neutral-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
          <Eraser className="w-5 h-5 text-white" />
          <span className="text-sm font-medium">Todos os campos foram limpos</span>
        </div>
      </div>

      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
          showCopyToast
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
        style={{ maxHeight: '120px' }}
      >
        <div className="bg-neutral-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
          <Copy className="w-5 h-5 text-white" />
          <span className="text-sm font-medium">Valor copiado!</span>
        </div>
      </div>

      {hasAnyFieldContent() && !showLoadingModal && isLoadingComplete && (
        <button
          onClick={handleClearAllFields}
          className="fixed right-6 z-40 bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-3 rounded-lg shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2"
          style={{ bottom: '24px' }}
          aria-label="Limpar todos os campos"
          title="Limpar todos os campos"
        >
          <Eraser className="w-5 h-5 text-white" />
          <span className="text-sm font-medium">Limpar campos</span>
        </button>
      )}

      <div className="max-w-3xl mx-auto">
      <Card className="bg-neutral-50 border-2 border-neutral-300 p-6 space-y-4">
        <h3 className="text-base font-semibold text-neutral-900">Dados do Contrato - Pessoa Jurídica</h3>

        {driveLink && (
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-green-900 mb-2">Contrato gerado com sucesso!</h4>
                <p className="text-sm text-green-800 mb-3">O contrato foi enviado e está disponível na pasta:</p>
                <a
                  href={driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  Acessar pasta
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4 pt-2">
          <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">Dados da empresa</h4>
          
          <div className="space-y-2">
            <Label htmlFor="tipo_projeto" className="text-sm font-medium text-neutral-800">
              Tipo de projeto <span className="text-red-600">*</span>
            </Label>
            <Input
              id="tipo_projeto"
              value={contratoData.tipo_projeto}
              onChange={(e) => {
                handleContratoInputChange("tipo_projeto", e.target.value)
                setQuickFillOptions({ guardaCorpo: false, corrimao: false, box: false })
              }}
              className={`w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${
                errors.tipo_projeto ? "border-red-500" : "border-neutral-400"
              } focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`}
              placeholder="Ex.: Guarda-corpo em inox, corrimão, etc."
            />
            {errors.tipo_projeto && <p className="text-xs text-red-600">{errors.tipo_projeto}</p>}
            
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="quick_guardacorpo_juridica"
                  checked={quickFillOptions.guardaCorpo}
                  onCheckedChange={(checked) => handleQuickFillChange('guardaCorpo', checked as boolean)}
                  className="border-2 border-neutral-500"
                />
                <Label 
                  htmlFor="quick_guardacorpo_juridica" 
                  className="text-sm text-neutral-800 cursor-pointer"
                >
                  Guarda-corpo
                </Label>
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox
                  id="quick_corrimao_juridica"
                  checked={quickFillOptions.corrimao}
                  onCheckedChange={(checked) => handleQuickFillChange('corrimao', checked as boolean)}
                  className="border-2 border-neutral-500"
                />
                <Label 
                  htmlFor="quick_corrimao_juridica" 
                  className="text-sm text-neutral-800 cursor-pointer"
                >
                  Corrimão
                </Label>
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox
                  id="quick_box_juridica"
                  checked={quickFillOptions.box}
                  onCheckedChange={(checked) => handleQuickFillChange('box', checked as boolean)}
                  className="border-2 border-neutral-500"
                />
                <Label 
                  htmlFor="quick_box_juridica" 
                  className="text-sm text-neutral-800 cursor-pointer"
                >
                  Box
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nome_contrato" className="text-sm font-medium text-neutral-800">
              Razão Social <span className="text-red-600">*</span>
            </Label>
            <Input
              id="nome_contrato"
              value={contratoData.nome}
              onChange={(e) => handleContratoInputChange("nome", e.target.value)}
              className={`w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${
                errors.nome ? "border-red-500" : "border-neutral-400"
              } focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`}
              placeholder="Razão social da empresa"
            />
            {errors.nome && <p className="text-xs text-red-600">{errors.nome}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefone_contrato_juridica" className="text-sm font-medium text-neutral-800">
              Telefone <span className="text-red-600">*</span>
            </Label>
            <Input
              id="telefone_contrato_juridica"
              value={contratoData.telefone}
              onChange={(e) => handleContratoInputChange("telefone", e.target.value)}
              className={`w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${
                errors.telefone ? "border-red-500" : "border-neutral-400"
              } focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`}
              placeholder="(51) 99999-9999"
              maxLength={15}
            />
            {errors.telefone && <p className="text-xs text-red-600">{errors.telefone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cnpj_contrato" className="text-sm font-medium text-neutral-800">
              CNPJ <span className="text-red-600">*</span>
            </Label>
            <Input
              id="cnpj_contrato"
              value={contratoData.cnpj}
              onChange={(e) => handleContratoInputChange("cnpj", e.target.value)}
              className={`w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${
                errors.cnpj ? "border-red-500" : "border-neutral-400"
              } focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`}
              placeholder="00.000.000/0000-00"
              maxLength={18}
            />
            {errors.cnpj && <p className="text-xs text-red-600">{errors.cnpj}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="endereco_contrato" className="text-sm font-medium text-neutral-800">
              Endereço <span className="text-red-600">*</span>
            </Label>
            <Input
              id="endereco_contrato"
              value={contratoData.endereco_contrato}
              onChange={(e) => handleContratoInputChange("endereco_contrato", e.target.value)}
              className={`w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${
                errors.endereco_contrato ? "border-red-500" : "border-neutral-400"
              } focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`}
              placeholder="Rua, número, bairro, cidade"
            />
            {errors.endereco_contrato && <p className="text-xs text-red-600">{errors.endereco_contrato}</p>}
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t-2 border-neutral-300">
          <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">Dados do representante legal</h4>
          
          <div className="space-y-2">
            <Label htmlFor="nome_representante" className="text-sm font-medium text-neutral-800">
              Nome do representante <span className="text-red-600">*</span>
            </Label>
            <Input
              id="nome_representante"
              value={contratoData.nome_representante}
              onChange={(e) => handleContratoInputChange("nome_representante", e.target.value)}
              className={`w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${
                errors.nome_representante ? "border-red-500" : "border-neutral-400"
              } focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`}
              placeholder="Nome completo do representante"
            />
            {errors.nome_representante && <p className="text-xs text-red-600">{errors.nome_representante}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cargo_representante" className="text-sm font-medium text-neutral-800">
              Cargo <span className="text-red-600">*</span>
            </Label>
            <Input
              id="cargo_representante"
              value={contratoData.cargo_representante}
              onChange={(e) => handleContratoInputChange("cargo_representante", e.target.value)}
              className={`w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${
                errors.cargo_representante ? "border-red-500" : "border-neutral-400"
              } focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`}
              placeholder="Ex: Diretor, Gerente, Sócio"
            />
            {errors.cargo_representante && <p className="text-xs text-red-600">{errors.cargo_representante}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cpf_representante" className="text-sm font-medium text-neutral-800">
              CPF <span className="text-red-600">*</span>
            </Label>
            <Input
              id="cpf_representante"
              value={contratoData.cpf_representante}
              onChange={(e) => handleContratoInputChange("cpf_representante", e.target.value)}
              className={`w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${
                errors.cpf_representante ? "border-red-500" : "border-neutral-400"
              } focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`}
              placeholder="000.000.000-00"
              maxLength={14}
            />
            {errors.cpf_representante && <p className="text-xs text-red-600">{errors.cpf_representante}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefone_representante" className="text-sm font-medium text-neutral-800">
              Telefone <span className="text-red-600">*</span>
            </Label>
            <Input
              id="telefone_representante"
              value={contratoData.telefone_representante}
              onChange={(e) => handleContratoInputChange("telefone_representante", e.target.value)}
              className={`w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${
                errors.telefone_representante ? "border-red-500" : "border-neutral-400"
              } focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`}
              placeholder="(51) 99999-9999"
              maxLength={15}
            />
            {errors.telefone_representante && <p className="text-xs text-red-600">{errors.telefone_representante}</p>}
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t-2 border-neutral-300">
          <div className="space-y-2">
            <Label htmlFor="data_emissao_contrato" className="text-sm font-medium text-neutral-800">
              Data de Emissão do Contrato <span className="text-red-600">*</span>
            </Label>
            <div className="flex items-center gap-3 max-w-xs">
              <Input
                id="data_emissao_contrato"
                type="date"
                value={contratoData.data_emissao_contrato}
                onChange={(e) => handleDateChange(e.target.value)}
                className={`flex-1 bg-white text-neutral-900 border-2 ${
                  errors.data_emissao_contrato ? "border-red-500" : "border-neutral-400"
                } focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`}
              />
              <div className="flex items-center gap-2">
                <Checkbox
                  id="today_checkbox"
                  checked={isToday}
                  onCheckedChange={handleTodayCheckbox}
                  className="border-2 border-neutral-500"
                />
                <Label 
                  htmlFor="today_checkbox" 
                  className="text-sm text-neutral-800 cursor-pointer whitespace-nowrap"
                >
                  Hoje
                </Label>
              </div>
            </div>
            {errors.data_emissao_contrato && <p className="text-xs text-red-600">{errors.data_emissao_contrato}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-neutral-800">
              Forma Pagamento (Não parcelado) <span className="text-red-600">*</span>
            </Label>
            <RadioGroup
              value={contratoData.forma_pagamento}
              onValueChange={(value) => handleContratoInputChange("forma_pagamento", value)}
            >
              <div className="space-y-2">
                {["Transferência bancária (TED/PIX)", "Boleto bancário", "Dinheiro"].map((forma) => (
                  <div key={forma} className="flex items-center gap-3">
                    <RadioGroupItem value={forma} id={`forma_pagamento_juridica_${forma}`} className="border-2 border-neutral-500" />
                    <Label htmlFor={`forma_pagamento_juridica_${forma}`} className="cursor-pointer text-sm text-neutral-800">
                      {forma}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
            {errors.forma_pagamento && <p className="text-xs text-red-600">{errors.forma_pagamento}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="valor_produtos" className="text-sm font-medium text-neutral-800">
              Valor produtos e instalação <span className="text-red-600">*</span>
            </Label>
            <Input
              id="valor_produtos"
              value={contratoData.valor_produtos_instalacao}
              onChange={(e) => handleContratoInputChange("valor_produtos_instalacao", e.target.value)}
              className={`w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${
                errors.valor_produtos_instalacao ? "border-red-500" : "border-neutral-400"
              } focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`}
              placeholder="R$ 0,00"
            />
            {errors.valor_produtos_instalacao && <p className="text-xs text-red-600">{errors.valor_produtos_instalacao}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="valor_entrada" className="text-sm font-medium text-neutral-800">
              Valor Entrada
            </Label>
            <Input
              id="valor_entrada"
              value={contratoData.valor_entrada}
              onChange={(e) => handleContratoInputChange("valor_entrada", e.target.value)}
              className="w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900"
              placeholder="R$ 0,00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="valor_desconto" className="text-sm font-medium text-neutral-800">
              Valor Desconto
            </Label>
            <Input
              id="valor_desconto"
              value={contratoData.valor_desconto}
              onChange={(e) => handleContratoInputChange("valor_desconto", e.target.value)}
              className="w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900"
              placeholder="R$ 0,00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantidade_parcelas" className="text-sm font-medium text-neutral-800">
              Quantidade Parcelas (Caso seja parcelado)
            </Label>
            <Input
              id="quantidade_parcelas"
              type="number"
              min="1"
              value={contratoData.quantidade_parcelas}
              onChange={(e) => handleContratoInputChange("quantidade_parcelas", e.target.value)}
              className="w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900"
              placeholder="Ex.: 10"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-neutral-800">Forma Pagamento das Parcelas</Label>
            <RadioGroup
              value={contratoData.forma_pagamento_parcelas}
              onValueChange={(value) => handleContratoInputChange("forma_pagamento_parcelas", value)}
            >
              <div className="space-y-2">
                {["Cartão de crédito", "Transferência bancária (TED/PIX)", "Boleto bancário"].map((forma) => (
                  <div key={forma} className="flex items-center gap-3">
                    <RadioGroupItem
                      value={forma}
                      id={`forma_pagamento_parcelas_juridica_${forma}`}
                      className="border-2 border-neutral-500"
                    />
                    <Label
                      htmlFor={`forma_pagamento_parcelas_juridica_${forma}`}
                      className="cursor-pointer text-sm text-neutral-800"
                    >
                      {forma}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacao_pagamento" className="text-sm font-medium text-neutral-800">
              Observação Sobre Pagamento
            </Label>
            <Textarea
              id="observacao_pagamento"
              rows={3}
              value={contratoData.observacao_pagamento}
              onChange={(e) => handleContratoInputChange("observacao_pagamento", e.target.value)}
              className="w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900 resize-none"
              placeholder="Alguma observação adicional sobre o pagamento..."
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-neutral-800">Foto do Orçamento</Label>
          <div className={`transition-opacity duration-300 ${hasImage ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragOver
                  ? "border-neutral-900 bg-neutral-100"
                  : "border-neutral-400 bg-white hover:border-neutral-600"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-10 h-10 text-neutral-400" />
                <p className="text-sm text-neutral-600">Arraste e solte a imagem aqui</p>
                <p className="text-xs text-neutral-500">ou pressione <kbd className="px-2 py-1 bg-neutral-200 rounded text-xs font-mono">Ctrl+V</kbd> para colar</p>
                <p className="text-xs text-neutral-400">PNG, JPG ou JPEG</p>
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 border-2 border-neutral-400 hover:border-neutral-900 hover:bg-neutral-100 flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                Selecionar Imagem
              </Button>
            </div>
          </div>

          {hasImage && (
            <div 
              className="relative inline-block transition-opacity duration-300"
              onMouseEnter={() => setShowThumbnailHover(true)}
              onMouseLeave={() => setShowThumbnailHover(false)}
            >
              <div className="flex items-center gap-3 bg-neutral-200 rounded-lg px-3 py-2 cursor-pointer group">
                <ImageIcon className="w-6 h-6 text-neutral-500" />
                <span className="text-sm text-neutral-700 font-medium">Foto do orçamento</span>
                {showThumbnailHover && (
                  <div 
                    onClick={handleRemoveImage}
                    className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center transition-opacity"
                  >
                    <X className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        <div className="pt-4 space-y-3">
          <div className="flex gap-3">
            <Button
              onClick={handlePreview}
              disabled={isLoadingPreview}
              variant="outline"
              className="flex-1 border-neutral-300 hover:bg-neutral-100 text-neutral-700 font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
            >
              {isLoadingPreview ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analisando...
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Pré-visualizar
                </>
              )}
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Gerando contrato..." : "Gerar Contrato"}
            </Button>
          </div>
        </div>
      </Card>

      {/* Modal de Pré-visualização */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl shadow-2xl w-[90%] max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileSearch className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Pré-visualização do Contrato (PJ)</h3>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] space-y-6">
              {/* Status do Template */}
              {templateAnalysis && (
                <div className={`p-4 rounded-lg border-2 ${
                  templateAnalysis.analysis?.missingInTemplate?.length > 0 
                    ? 'bg-yellow-50 border-yellow-300' 
                    : templateAnalysis.analysis?.hasBrokenPlaceholders 
                    ? 'bg-orange-50 border-orange-300'
                    : 'bg-green-50 border-green-300'
                }`}>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <FileSearch className="w-4 h-4" />
                    Análise do Template
                  </h4>
                  <p className="text-sm mb-2">{templateAnalysis.hint}</p>
                  
                  {templateAnalysis.analysis?.placeholdersFound?.length > 0 ? (
                    <div className="text-xs text-neutral-600">
                      <p className="font-medium">Placeholders encontrados no template:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {templateAnalysis.analysis.placeholdersFound.map((p: string) => (
                          <span key={p} className="bg-white px-2 py-0.5 rounded border">
                            {`{${p}}`}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-red-600 font-medium">
                      ⚠️ Nenhum placeholder {`{variavel}`} encontrado no template!
                      O template deve usar a sintaxe {`{nome_contratante}`} para as variáveis.
                    </p>
                  )}
                  
                  {templateAnalysis.analysis?.missingInTemplate?.length > 0 && (
                    <div className="mt-2 text-xs">
                      <p className="font-medium text-yellow-700">Variáveis esperadas não encontradas:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {templateAnalysis.analysis.missingInTemplate.map((p: string) => (
                          <span key={p} className="bg-yellow-100 px-2 py-0.5 rounded text-yellow-800">
                            {`{${p}}`}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Preview dos Dados */}
              {previewData?.preview && (
                <div className="bg-neutral-50 p-4 rounded-lg border">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Dados que serão inseridos no contrato
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {previewData.preview.resumo.camposPreenchidos.map(({ campo, valor }: { campo: string, valor: string }) => (
                      <div key={campo} className="flex items-start gap-2 text-sm bg-white p-2 rounded border">
                        <span className="text-neutral-500 font-mono text-xs">{`{${campo}}`}</span>
                        <span className="text-neutral-400">→</span>
                        <span className="text-neutral-900 font-medium flex-1 truncate" title={valor}>
                          {valor || '(vazio)'}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {previewData.preview.resumo.camposVazios.length > 0 && (
                    <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                      <p className="text-sm text-yellow-700 font-medium">
                        Campos vazios ({previewData.preview.resumo.vazios}):
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {previewData.preview.resumo.camposVazios.map((campo: string) => (
                          <span key={campo} className="text-xs bg-yellow-100 px-2 py-0.5 rounded">
                            {campo}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPreviewModal(false)}
              >
                Fechar
              </Button>
              <Button
                onClick={() => {
                  setShowPreviewModal(false)
                  handleSubmit()
                }}
                disabled={isSubmitting}
                className="bg-neutral-900 hover:bg-neutral-800"
              >
                Gerar Contrato
              </Button>
            </div>
          </div>
        </div>
      )}

      {submittedPayload && (
        <Card className="bg-neutral-50 border-2 border-neutral-300 p-6 mt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-neutral-700" />
              <h4 className="text-sm font-semibold text-neutral-900">Informações técnicas</h4>
            </div>
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
          <div className="max-h-96 overflow-y-auto">
            <div className="text-xs bg-white p-3 rounded border border-neutral-200 space-y-1">
              {Object.entries(submittedPayload).map(([key, value]) => (
                <div key={key} className="flex items-start gap-2">
                  <span className="text-neutral-600 font-medium whitespace-nowrap">{key}:</span>
                  <span 
                    className="text-neutral-900 flex-1 cursor-pointer hover:bg-neutral-100 px-1 rounded transition-colors"
                    title={String(value)}
                    onClick={() => handleCopyValue(value)}
                  >
                    {truncateValue(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      </div>
    </>
  )
}
