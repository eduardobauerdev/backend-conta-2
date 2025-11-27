"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus, X, Loader2, CheckCircle2, ExternalLink, Eraser, Copy, Code } from 'lucide-react'
import type { OrdemDeServico } from "@/lib/types"
import { getDriveLinks } from "@/lib/drive-links-store"

const numberToWords = (num: number): string => {
  const words: Record<number, string> = {
    1: "uma",
    2: "duas",
    3: "três",
    4: "quatro",
    5: "cinco",
    6: "seis",
    7: "sete",
    8: "oito",
    9: "nove",
    10: "dez",
    11: "onze",
    12: "doze",
    13: "treze",
    14: "quatorze",
    15: "quinze",
    16: "dezesseis",
    17: "dezessete",
    18: "dezoito",
    19: "dezenove",
    20: "vinte",
  }
  return words[num] || num.toString()
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

const formatPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, "")
  if (numbers.length <= 10) {
    return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "")
  }
  return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "")
}

const formatCPF = (value: string): string => {
  const numbers = value.replace(/\D/g, "")
  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4").replace(/-$/, "")
}

interface OrdemFormProps {
  onSave: (data: OrdemDeServico) => void
}

const createEmptyAmbiente = () => ({
  ambiente: "",
  tipo_piso: "",
  medidas: "",
  inox: {
    acabamento: [],
    passamao: [],
    tubos: [],
    flags: {
      com_uniao_sim: false,
      com_uniao_nao: false,
      uniao_com_curva_sim: false,
      uniao_com_curva_nao: false,
      inicio_com_curva_sim: false,
      inicio_com_curva_nao: false,
      final_com_curva_sim: false,
      final_com_curva_nao: false,
      pinado_sim: false,
      pinado_nao: false,
    },
  },
  hastes: {
    tipo: [],
    fixacao: {
      lateral: false,
      superior: false,
      flange: false,
      tarugo_padrao: false,
    },
  },
  intermediarios: {
    tipo: [],
    com_uniao: false,
    transpassado: false,
  },
  vidro: {
    acabamento_superior: [],
    tubos: [],
    fixacao: [],
    acabamento: [],
    tipo: [],
    espessura: [],
  },
  anexos: [],
})

export function OrdemForm({ onSave }: OrdemFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isDataHojeVisita, setIsDataHojeVisita] = useState(true)
  
  const [showLoadingModal, setShowLoadingModal] = useState(false)
  const [isLoadingComplete, setIsLoadingComplete] = useState(false)
  const [showClearFieldsToast, setShowClearFieldsToast] = useState(false)
  const [showCopyToast, setShowCopyToast] = useState(false)
  const [countdown, setCountdown] = useState(10)
  
  const [isOrdemSalva, setIsOrdemSalva] = useState(false)
  
  const [formData, setFormData] = useState<OrdemDeServico>({
    cliente: "",
    ordem_producao: "",
    tipo_os: [],
    endereco: "",
    cidade: "",
    celular: "",
    data_hora_visita: "",
    vendedor: "",
    informacoes_complementares: "",
    ambientes: [createEmptyAmbiente()],
    anexos_gerais: [],
  })

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    setFormData((prev) => ({ ...prev, data_hora_visita: today }))
  }, [])

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

  const [contratoData, setContratoData] = useState<any>({}) // Placeholder for contratoData
  const [gerarContrato, setGerarContrato] = useState<boolean>(false) // Placeholder for gerarContrato
  const [tipoContrato, setTipoContrato] = useState<string>("") // Placeholder for tipoContrato

  const [fileNames, setFileNames] = useState<string[]>([])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleContratoInputChange = (field: string, value: string) => {
    let formattedValue = value

    // Apply formatting based on field type
    if (field === "telefone") {
      formattedValue = formatPhone(value)
    } else if (field === "cpf") {
      formattedValue = formatCPF(value)
    } else if (field === "valor_produtos_instalacao" || field === "valor_entrada" || field === "valor_desconto") {
      formattedValue = formatCurrency(value)
    }

    setContratoData((prev) => ({ ...prev, [field]: formattedValue }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleAmbienteChange = (ambienteIndex: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      ambientes: prev.ambientes.map((amb, idx) => (idx === ambienteIndex ? { ...amb, [field]: value } : amb)),
    }))
  }

  const handleCheckboxArray = (
    ambienteIndex: number,
    section: string,
    field: string,
    value: string,
    checked: boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      ambientes: prev.ambientes.map((ambiente, idx) => {
        if (idx !== ambienteIndex) return ambiente
        const currentSection = ambiente[section as keyof typeof ambiente] as any
        const currentArray = currentSection[field] as string[]

        return {
          ...ambiente,
          [section]: {
            ...currentSection,
            [field]: checked ? [...currentArray, value] : currentArray.filter((v) => v !== value),
          },
        }
      }),
    }))
  }

  const handleTopLevelCheckbox = (field: string, value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter((v) => v !== value),
    }))
    if (field === "tipo_os" && errors.tipo_os) {
      setErrors((prev) => ({ ...prev, tipo_os: "" }))
    }
  }

  const handleBooleanFlag = (ambienteIndex: number, section: string, field: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      ambientes: prev.ambientes.map((ambiente, idx) => {
        if (idx !== ambienteIndex) return ambiente

        if (section === "inox") {
          return {
            ...ambiente,
            inox: {
              ...ambiente.inox,
              flags: {
                ...ambiente.inox.flags,
                [field]: checked,
              },
            },
          }
        } else {
          const currentSection = ambiente[section as keyof typeof ambiente] as any
          return {
            ...ambiente,
            [section]: {
              ...currentSection,
              [field]: checked,
            },
          }
        }
      }),
    }))
  }

  const handleHasteFixacaoChange = (ambienteIndex: number, field: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      ambientes: prev.ambientes.map((ambiente, idx) =>
        idx === ambienteIndex
          ? {
              ...ambiente,
              hastes: {
                ...ambiente.hastes,
                fixacao: {
                  ...ambiente.hastes.fixacao,
                  [field]: checked,
                },
              },
            }
          : ambiente,
      ),
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const names = Array.from(files).map((f) => f.name)
      setFileNames(names)
      setFormData((prev) => ({
        ...prev,
        anexos_gerais: names,
      }))
    }
  }

  const handleAddAmbiente = () => {
    if (formData.ambientes.length < 3) {
      setFormData((prev) => ({
        ...prev,
        ambientes: [...prev.ambientes, createEmptyAmbiente()],
      }))
    }
  }

  const handleRemoveAmbiente = (index: number) => {
    if (formData.ambientes.length > 1) {
      setFormData((prev) => ({
        ...prev,
        ambientes: prev.ambientes.filter((_, idx) => idx !== index),
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.cliente.trim()) {
      newErrors.cliente = "Informe o cliente."
    }

    if (formData.tipo_os.length === 0) {
      newErrors.tipo_os = "Selecione ao menos uma opção."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
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

  const buildCompletePayload = () => {
    const toNullIfEmpty = (val: string | undefined): string | " " => (val && val.trim() !== "" ? val : " ")
    const toBooleanOrNull = (val: boolean | undefined): "X" | " " => (val === true ? "X" : " ")

    // Helper function to build flattened ambiente payload
    const buildAmbientePayload = (ambiente: (typeof formData.ambientes)[0], prefix: string) => ({
      [`${prefix}_ambiente`]: toNullIfEmpty(ambiente.ambiente),
      [`${prefix}_tipo_piso`]: toNullIfEmpty(ambiente.tipo_piso),
      [`${prefix}_medidas`]: toNullIfEmpty(ambiente.medidas),

      [`${prefix}_inox_acabamento_polido`]: toBooleanOrNull(ambiente.inox.acabamento.includes("polido")),
      [`${prefix}_inox_acabamento_escovado`]: toBooleanOrNull(ambiente.inox.acabamento.includes("escovado")),
      [`${prefix}_inox_acabamento_pintado`]: toBooleanOrNull(ambiente.inox.acabamento.includes("pintado")),

      [`${prefix}_inox_passamao_simples`]: toBooleanOrNull(ambiente.inox.passamao.includes("simples")),
      [`${prefix}_inox_passamao_duplo`]: toBooleanOrNull(ambiente.inox.passamao.includes("duplo")),

      [`${prefix}_inox_tubos_1_1_2`]: toBooleanOrNull(ambiente.inox.tubos.includes("1_1_2")),
      [`${prefix}_inox_tubos_1`]: toBooleanOrNull(ambiente.inox.tubos.includes("1")),
      [`${prefix}_inox_tubos_30x30`]: toBooleanOrNull(ambiente.inox.tubos.includes("30x30")),
      [`${prefix}_inox_tubos_40x10`]: toBooleanOrNull(ambiente.inox.tubos.includes("40x10")),

      [`${prefix}_inox_com_uniao_sim`]: toBooleanOrNull(ambiente.inox.flags.com_uniao_sim),
      [`${prefix}_inox_com_uniao_nao`]: toBooleanOrNull(ambiente.inox.flags.com_uniao_nao),
      [`${prefix}_inox_uniao_com_curva_sim`]: toBooleanOrNull(ambiente.inox.flags.uniao_com_curva_sim),
      [`${prefix}_inox_uniao_com_curva_nao`]: toBooleanOrNull(ambiente.inox.flags.uniao_com_curva_nao),
      [`${prefix}_inox_inicio_com_curva_sim`]: toBooleanOrNull(ambiente.inox.flags.inicio_com_curva_sim),
      [`${prefix}_inox_inicio_com_curva_nao`]: toBooleanOrNull(ambiente.inox.flags.inicio_com_curva_nao),
      [`${prefix}_inox_final_com_curva_sim`]: toBooleanOrNull(ambiente.inox.flags.final_com_curva_sim),
      [`${prefix}_inox_final_com_curva_nao`]: toBooleanOrNull(ambiente.inox.flags.final_com_curva_nao),
      [`${prefix}_inox_pinado_sim`]: toBooleanOrNull(ambiente.inox.flags.pinado_sim),
      [`${prefix}_inox_pinado_nao`]: toBooleanOrNull(ambiente.inox.flags.pinado_nao),

      [`${prefix}_hastes_tipo_1_1_2`]: toBooleanOrNull(ambiente.hastes.tipo.includes("1_1_2")),
      [`${prefix}_hastes_tipo_1`]: toBooleanOrNull(ambiente.hastes.tipo.includes("1")),
      [`${prefix}_hastes_tipo_30x30`]: toBooleanOrNull(ambiente.hastes.tipo.includes("30x30")),
      [`${prefix}_hastes_tipo_40x10`]: toBooleanOrNull(ambiente.hastes.tipo.includes("40x10")),

      [`${prefix}_hastes_fixacao_lateral`]: toBooleanOrNull(ambiente.hastes.fixacao.lateral),
      [`${prefix}_hastes_fixacao_superior`]: toBooleanOrNull(ambiente.hastes.fixacao.superior),
      [`${prefix}_hastes_fixacao_flange`]: toBooleanOrNull(ambiente.hastes.fixacao.flange),
      [`${prefix}_hastes_fixacao_tarugo_padrao`]: toBooleanOrNull(ambiente.hastes.fixacao.tarugo_padrao),

      [`${prefix}_intermediarios_tipo_1_2`]: toBooleanOrNull(ambiente.intermediarios.tipo.includes("1_2")),
      [`${prefix}_intermediarios_tipo_5_8`]: toBooleanOrNull(ambiente.intermediarios.tipo.includes("5_8")),
      [`${prefix}_intermediarios_tipo_cabo_de_aco`]: toBooleanOrNull(
        ambiente.intermediarios.tipo.includes("cabo_de_aco"),
      ),

      [`${prefix}_intermediarios_com_uniao`]: toBooleanOrNull(ambiente.intermediarios.com_uniao),
      [`${prefix}_intermediarios_transpassado`]: toBooleanOrNull(ambiente.intermediarios.transpassado),

      [`${prefix}_vidro_acab_sup_passamao`]: toBooleanOrNull(ambiente.vidro.acabamento_superior.includes("passamao")),
      [`${prefix}_vidro_acab_sup_perfil`]: toBooleanOrNull(ambiente.vidro.acabamento_superior.includes("perfil")),

      [`${prefix}_vidro_tubos_1_1_2`]: toBooleanOrNull(ambiente.vidro.tubos.includes("1_1_2")),
      [`${prefix}_vidro_tubos_1`]: toBooleanOrNull(ambiente.vidro.tubos.includes("1")),
      [`${prefix}_vidro_tubos_30x30`]: toBooleanOrNull(ambiente.vidro.tubos.includes("30x30")),
      [`${prefix}_vidro_tubos_40x10`]: toBooleanOrNull(ambiente.vidro.tubos.includes("40x10")),

      [`${prefix}_vidro_fixacao_pinca`]: toBooleanOrNull(ambiente.vidro.fixacao.includes("pinca")),
      [`${prefix}_vidro_fixacao_orelha`]: toBooleanOrNull(ambiente.vidro.fixacao.includes("orelha")),
      [`${prefix}_vidro_fixacao_baguete`]: toBooleanOrNull(ambiente.vidro.fixacao.includes("baguete")),
      [`${prefix}_vidro_fixacao_botons`]: toBooleanOrNull(ambiente.vidro.fixacao.includes("botons")),

      [`${prefix}_vidro_acabamento_polido`]: toBooleanOrNull(ambiente.vidro.acabamento.includes("polido")),
      [`${prefix}_vidro_acabamento_escovado`]: toBooleanOrNull(ambiente.vidro.acabamento.includes("escovado")),
      [`${prefix}_vidro_acabamento_pintado`]: toBooleanOrNull(ambiente.vidro.acabamento.includes("pintado")),

      [`${prefix}_vidro_tipo_temperado`]: toBooleanOrNull(ambiente.vidro.tipo.includes("temperado")),
      [`${prefix}_vidro_tipo_laminado`]: toBooleanOrNull(ambiente.vidro.tipo.includes("laminado")),

      [`${prefix}_vidro_esp_8mm`]: toBooleanOrNull(ambiente.vidro.espessura.includes("8mm")),
      [`${prefix}_vidro_esp_10mm`]: toBooleanOrNull(ambiente.vidro.espessura.includes("10mm")),
      [`${prefix}_vidro_esp_5_5mm`]: toBooleanOrNull(ambiente.vidro.espessura.includes("5+5mm")),

      [`${prefix}_anexos`]: ambiente.anexos || [],
    })

    // Build empty ambiente with all keys as " " (empty space)
    const buildEmptyAmbientePayload = (prefix: string) => ({
      [`${prefix}_ambiente`]: " ",
      [`${prefix}_tipo_piso`]: " ",
      [`${prefix}_medidas`]: " ",
      [`${prefix}_inox_acabamento_polido`]: " ",
      [`${prefix}_inox_acabamento_escovado`]: " ",
      [`${prefix}_inox_acabamento_pintado`]: " ",
      [`${prefix}_inox_passamao_simples`]: " ",
      [`${prefix}_inox_passamao_duplo`]: " ",
      [`${prefix}_inox_tubos_1_1_2`]: " ",
      [`${prefix}_inox_tubos_1`]: " ",
      [`${prefix}_inox_tubos_30x30`]: " ",
      [`${prefix}_inox_tubos_40x10`]: " ",
      [`${prefix}_inox_com_uniao_sim`]: " ",
      [`${prefix}_inox_com_uniao_nao`]: " ",
      [`${prefix}_inox_uniao_com_curva_sim`]: " ",
      [`${prefix}_inox_uniao_com_curva_nao`]: " ",
      [`${prefix}_inox_inicio_com_curva_sim`]: " ",
      [`${prefix}_inox_inicio_com_curva_nao`]: " ",
      [`${prefix}_inox_final_com_curva_sim`]: " ",
      [`${prefix}_inox_final_com_curva_nao`]: " ",
      [`${prefix}_inox_pinado_sim`]: " ",
      [`${prefix}_inox_pinado_nao`]: " ",
      [`${prefix}_hastes_tipo_1_1_2`]: " ",
      [`${prefix}_hastes_tipo_1`]: " ",
      [`${prefix}_hastes_tipo_30x30`]: " ",
      [`${prefix}_hastes_tipo_40x10`]: " ",
      [`${prefix}_hastes_fixacao_lateral`]: " ",
      [`${prefix}_hastes_fixacao_superior`]: " ",
      [`${prefix}_hastes_fixacao_flange`]: " ",
      [`${prefix}_hastes_fixacao_tarugo_padrao`]: " ",
      [`${prefix}_intermediarios_tipo_1_2`]: " ",
      [`${prefix}_intermediarios_tipo_5_8`]: " ",
      [`${prefix}_intermediarios_tipo_cabo_de_aco`]: " ",
      [`${prefix}_intermediarios_com_uniao`]: " ",
      [`${prefix}_intermediarios_transpassado`]: " ",
      [`${prefix}_vidro_acab_sup_passamao`]: " ",
      [`${prefix}_vidro_acab_sup_perfil`]: " ",
      [`${prefix}_vidro_tubos_1_1_2`]: " ",
      [`${prefix}_vidro_tubos_1`]: " ",
      [`${prefix}_vidro_tubos_30x30`]: " ",
      [`${prefix}_vidro_tubos_40x10`]: " ",
      [`${prefix}_vidro_fixacao_pinca`]: " ",
      [`${prefix}_vidro_fixacao_orelha`]: " ",
      [`${prefix}_vidro_fixacao_baguete`]: " ",
      [`${prefix}_vidro_fixacao_botons`]: " ",
      [`${prefix}_vidro_acabamento_polido`]: " ",
      [`${prefix}_vidro_acabamento_escovado`]: " ",
      [`${prefix}_vidro_acabamento_pintado`]: " ",
      [`${prefix}_vidro_tipo_temperado`]: " ",
      [`${prefix}_vidro_tipo_laminado`]: " ",
      [`${prefix}_vidro_esp_8mm`]: " ",
      [`${prefix}_vidro_esp_10mm`]: " ",
      [`${prefix}_vidro_esp_5_5mm`]: " ",
      [`${prefix}_anexos`]: [],
    })

    const buildContratoPayload = () => {
      if (!gerarContrato || tipoContrato !== "fisica") return {}

      let quantidadeParcelasFormatted = ""
      if (contratoData.quantidade_parcelas) {
        const numParcelas = Number.parseInt(contratoData.quantidade_parcelas, 10)
        if (!isNaN(numParcelas)) {
          quantidadeParcelasFormatted = `${numParcelas} (${numberToWords(numParcelas)})`
        }
      }

      return {
        contrato_tipo_projeto: contratoData.tipo_projeto || "",
        contrato_nome: contratoData.nome || "",
        contrato_telefone: contratoData.telefone || "",
        contrato_endereco: contratoData.endereco_contrato || "",
        contrato_cpf: contratoData.cpf || "",
        contrato_forma_pagamento: contratoData.forma_pagamento || "",
        contrato_valor_produtos_instalacao: contratoData.valor_produtos_instalacao || "",
        contrato_valor_entrada: contratoData.valor_entrada || "",
        contrato_valor_desconto: contratoData.valor_desconto || "",
        contrato_quantidade_parcelas: quantidadeParcelasFormatted || "",
        contrato_forma_pagamento_parcelas: contratoData.forma_pagamento_parcelas || "",
        contrato_observacao_pagamento: contratoData.observacao_pagamento || "",
      }
    }

    const payload: any = {
      cabecalho: {
        cliente: formData.cliente,
        ordem_producao: toNullIfEmpty(formData.ordem_producao),
        tipo_os_visita: toBooleanOrNull(formData.tipo_os.includes("visita")),
        tipo_os_molde: toBooleanOrNull(formData.tipo_os.includes("molde")),
        tipo_os_instalacao: toBooleanOrNull(formData.tipo_os.includes("instalacao")),
        endereco: toNullIfEmpty(formData.endereco),
        cidade: toNullIfEmpty(formData.cidade),
        celular: toNullIfEmpty(formData.celular),
        data_hora_visita: toNullIfEmpty(formData.data_hora_visita),
        vendedor: toNullIfEmpty(formData.vendedor),
        informacoes_complementares: toNullIfEmpty(formData.informacoes_complementares),
      },
      ...(formData.ambientes[0] ? buildAmbientePayload(formData.ambientes[0], "a1") : buildEmptyAmbientePayload("a1")),
      ...(formData.ambientes[1] ? buildAmbientePayload(formData.ambientes[1], "a2") : buildEmptyAmbientePayload("a2")),
      ...(formData.ambientes[2] ? buildAmbientePayload(formData.ambientes[2], "a3") : buildEmptyAmbientePayload("a3")),
    }

    return payload
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      const completePayload = buildCompletePayload()
      
      setShowLoadingModal(true)
      setIsLoadingComplete(false)
      setCountdown(10)

      try {
        console.log("[v0] Enviando ordem de serviço para n8n...")
        console.log("[v0] Payload:", JSON.stringify(completePayload, null, 2))

        const url = "https://edubauerdev.app.n8n.cloud/webhook-test/os-criar"
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(completePayload),
        })

        if (!res.ok) {
          const errorText = await res.text().catch(() => "-")
          console.error("[v0] Failed to send to n8n:", res.status, errorText)
          alert("Erro ao enviar ordem de serviço. Verifique o console para mais detalhes.")
          setShowLoadingModal(false)
          return
        }

        const result = await res.json()
        console.log("[v0] Successfully sent to n8n:", result)
        
        setIsOrdemSalva(true)
        
        onSave(formData)
      } catch (err) {
        console.error("[v0] Network error sending to n8n:", err)
        alert("Erro de rede ao enviar ordem de serviço. Verifique sua conexão.")
      } finally {
        const countdownInterval = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(countdownInterval)
              setIsLoadingComplete(true)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      }
    }
  }

  const DRIVE_LINK = 'https://drive.google.com/drive/u/0/folders/1ZteBVMAVJhUbdj5bRg2UI78SeeGjzRFK'

  const handleCloseModal = () => {
    setShowLoadingModal(false)
    setShowClearFieldsToast(true)
    
    setIsOrdemSalva(false)
    
    setFormData({
      cliente: "",
      ordem_producao: "",
      tipo_os: [],
      endereco: "",
      cidade: "",
      celular: "",
      data_hora_visita: new Date().toISOString().split('T')[0],
      vendedor: "",
      informacoes_complementares: "",
      ambientes: [createEmptyAmbiente()],
      anexos_gerais: [],
    })
    setFileNames([])
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
                src="/images/google-drive-icon.png"
                alt="Google Drive" 
                className={`w-full h-full object-contain drop-shadow-lg transition-all duration-500`}
                style={{ filter: !isLoadingComplete ? 'grayscale(100%)' : 'none' }}
              />
            </div>
            
            <div className="flex flex-col items-center gap-4 flex-1 justify-center" style={{ minHeight: '140px' }}>
              {!isLoadingComplete ? (
                <>
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                  <p className="text-lg font-semibold text-neutral-900">Gerando ordem de serviço...</p>
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
          showClearFieldsToast
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
        style={{ maxHeight: '120px' }}
      >
        <div className="bg-neutral-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
          <Eraser className="w-5 h-5 text-blue-400" />
          <span className="text-sm font-medium">Após gerar seu documento, todos os campos foram limpos.</span>
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-white border-2 border-neutral-300 shadow-sm rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold">Cabeçalho</h2>
          <p className="text-sm text-neutral-600">Informações básicas do cliente e da ordem de serviço</p>
          <Separator />

          <div className="space-y-2">
            <Label htmlFor="cliente" className="text-sm font-medium text-neutral-800">
              Cliente <span className="text-red-600">*</span>
            </Label>
            <Input
              id="cliente"
              value={formData.cliente}
              onChange={(e) => handleInputChange("cliente", e.target.value)}
              className={`w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${
                errors.cliente ? "border-red-500" : "border-neutral-400"
              } focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`}
              placeholder="Nome do cliente"
            />
            {errors.cliente && <p className="text-xs text-red-600">{errors.cliente}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ordem_producao" className="text-sm font-medium text-neutral-800">
              Ordem de Produção
            </Label>
            <Input
              id="ordem_producao"
              value={formData.ordem_producao}
              onChange={(e) => handleInputChange("ordem_producao", e.target.value)}
              className="w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900"
              placeholder="Número da ordem"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-neutral-800">
              Tipo de OS <span className="text-red-600">*</span>
            </Label>
            <div className="space-y-2">
              {["visita", "molde", "instalacao"].map((tipo) => (
                <div key={tipo} className="flex items-center gap-3">
                  <Checkbox
                    id={`tipo_${tipo}`}
                    checked={formData.tipo_os.includes(tipo)}
                    onCheckedChange={(checked) => handleTopLevelCheckbox("tipo_os", tipo, checked as boolean)}
                    className="border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                  />
                  <Label htmlFor={`tipo_${tipo}`} className="cursor-pointer capitalize text-sm text-neutral-800">
                    {tipo}
                  </Label>
                </div>
              ))}
            </div>
            {errors.tipo_os && <p className="text-xs text-red-600">{errors.tipo_os}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="endereco" className="text-sm font-medium text-neutral-800">
              Endereço
            </Label>
            <Input
              id="endereco"
              value={formData.endereco}
              onChange={(e) => handleInputChange("endereco", e.target.value)}
              className="w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900"
              placeholder="Rua, número, complemento"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cidade" className="text-sm font-medium text-neutral-800">
              Cidade
            </Label>
            <Input
              id="cidade"
              value={formData.cidade}
              onChange={(e) => handleInputChange("cidade", e.target.value)}
              className="w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900"
              placeholder="Cidade/UF"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="celular" className="text-sm font-medium text-neutral-800">
              Celular
            </Label>
            <Input
              id="celular"
              value={formData.celular}
              onChange={(e) => handleInputChange("celular", e.target.value)}
              className="w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900"
              placeholder="(00) 00000-0000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="data_hora_visita" className="text-sm font-medium text-neutral-800">
              Data e Hora da Visita
            </Label>
            <div className="flex items-center gap-3 max-w-xs">
              <Input
                id="data_hora_visita"
                type="date"
                value={formData.data_hora_visita}
                onChange={(e) => {
                  handleInputChange("data_hora_visita", e.target.value)
                  const today = new Date().toISOString().split('T')[0]
                  setIsDataHojeVisita(e.target.value === today)
                }}
                className="flex-1 bg-white text-neutral-900 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900"
              />
              <div className="flex items-center gap-2">
                <Checkbox
                  id="hoje_visita_checkbox"
                  checked={isDataHojeVisita}
                  onCheckedChange={(checked) => {
                    setIsDataHojeVisita(checked as boolean)
                    if (checked) {
                      const today = new Date().toISOString().split('T')[0]
                      handleInputChange("data_hora_visita", today)
                    }
                  }}
                  className="border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                />
                <Label 
                  htmlFor="hoje_visita_checkbox" 
                  className="cursor-pointer text-sm text-neutral-800 whitespace-nowrap"
                >
                  Hoje
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vendedor" className="text-sm font-medium text-neutral-800">
              Vendedor
            </Label>
            <Input
              id="vendedor"
              value={formData.vendedor}
              onChange={(e) => handleInputChange("vendedor", e.target.value)}
              className="w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900"
              placeholder="Nome do vendedor"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="informacoes_complementares" className="text-sm font-medium text-neutral-800">
              Informações Complementares
            </Label>
            <Textarea
              id="informacoes_complementares"
              rows={3}
              value={formData.informacoes_complementares}
              onChange={(e) => handleInputChange("informacoes_complementares", e.target.value)}
              className="w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900 resize-none"
              placeholder="Observações adicionais..."
            />
          </div>
        </Card>

        {formData.ambientes.map((ambiente, ambienteIndex) => (
          <div key={ambienteIndex} className="space-y-6">
            <Card className="bg-white border-2 border-neutral-300 shadow-sm rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Ambiente {ambienteIndex + 1}</h2>
                  <p className="text-sm text-neutral-600">Detalhes do ambiente onde será realizado o serviço</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveAmbiente(ambienteIndex)}
                  disabled={formData.ambientes.length === 1}
                  className="border-2 border-red-500 text-red-600 hover:bg-red-50 disabled:opacity-30"
                >
                  <X className="w-4 h-4 mr-1" />
                  Remover ambiente
                </Button>
              </div>
              <Separator />

              <div className="space-y-2">
                <Label htmlFor={`ambiente_${ambienteIndex}`} className="text-sm font-medium text-neutral-800">
                  Ambiente
                </Label>
                <Input
                  id={`ambiente_${ambienteIndex}`}
                  value={ambiente.ambiente}
                  onChange={(e) => handleAmbienteChange(ambienteIndex, "ambiente", e.target.value)}
                  className="w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900"
                  placeholder="Ex: Sacada, Escada, Varanda"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`tipo_piso_${ambienteIndex}`} className="text-sm font-medium text-neutral-800">
                  Tipo de Piso
                </Label>
                <Input
                  id={`tipo_piso_${ambienteIndex}`}
                  value={ambiente.tipo_piso}
                  onChange={(e) => handleAmbienteChange(ambienteIndex, "tipo_piso", e.target.value)}
                  className="w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900"
                  placeholder="Ex: Porcelanato, Madeira, Cerâmica"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`medidas_${ambienteIndex}`} className="text-sm font-medium text-neutral-800">
                  Medidas
                </Label>
                <Textarea
                  id={`medidas_${ambienteIndex}`}
                  rows={3}
                  value={ambiente.medidas}
                  onChange={(e) => handleAmbienteChange(ambienteIndex, "medidas", e.target.value)}
                  className="w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900 resize-none"
                  placeholder="Descreva as medidas do ambiente..."
                />
              </div>
            </Card>

            <Card className="bg-white border-2 border-neutral-300 shadow-sm rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold">Inox</h2>
              <p className="text-sm text-neutral-600">Especificações de acabamento e tubulação em inox</p>
              <Separator />

              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-800">Acabamento</Label>
                <div className="space-y-2">
                  {["polido", "escovado", "pintado"].map((tipo) => (
                    <div key={tipo} className="flex items-center gap-3">
                      <Checkbox
                        id={`inox_acabamento_${tipo}_${ambienteIndex}`}
                        checked={ambiente.inox.acabamento.includes(tipo)}
                        onCheckedChange={(checked) =>
                          handleCheckboxArray(ambienteIndex, "inox", "acabamento", tipo, checked as boolean)
                        }
                        className="border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                      />
                      <Label
                        htmlFor={`inox_acabamento_${tipo}_${ambienteIndex}`}
                        className="cursor-pointer capitalize text-sm text-neutral-800"
                      >
                        {tipo}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-800">Passamão</Label>
                <div className="space-y-2">
                  {["simples", "duplo"].map((tipo) => (
                    <div key={tipo} className="flex items-center gap-3">
                      <Checkbox
                        id={`inox_passamao_${tipo}_${ambienteIndex}`}
                        checked={ambiente.inox.passamao.includes(tipo)}
                        onCheckedChange={(checked) =>
                          handleCheckboxArray(ambienteIndex, "inox", "passamao", tipo, checked as boolean)
                        }
                        className="border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                      />
                      <Label
                        htmlFor={`inox_passamao_${tipo}_${ambienteIndex}`}
                        className="cursor-pointer capitalize text-sm text-neutral-800"
                      >
                        {tipo}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-800">Tubos</Label>
                <div className="space-y-2">
                  {[
                    { value: "1_1_2", label: '1 1/2"' },
                    { value: "1", label: '1"' },
                    { value: "30x30", label: "30x30" },
                    { value: "40x10", label: "40x10" },
                  ].map((tubo) => (
                    <div key={tubo.value} className="flex items-center gap-3">
                      <Checkbox
                        id={`inox_tubos_${tubo.value}_${ambienteIndex}`}
                        checked={ambiente.inox.tubos.includes(tubo.value)}
                        onCheckedChange={(checked) =>
                          handleCheckboxArray(ambienteIndex, "inox", "tubos", tubo.value, checked as boolean)
                        }
                        className="border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                      />
                      <Label
                        htmlFor={`inox_tubos_${tubo.value}_${ambienteIndex}`}
                        className="cursor-pointer text-sm text-neutral-800"
                      >
                        {tubo.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-800">Opções</Label>
                <div className="space-y-2">
                  {[
                    { value: "com_uniao", label: "Com União" },
                    { value: "uniao_com_curva", label: "União com Curva" },
                    { value: "inicio_com_curva", label: "Início com Curva" },
                    { value: "final_com_curva", label: "Final com Curva" },
                    { value: "pinado", label: "Pinado" },
                  ].map((flag) => {
                    const simKey = `${flag.value}_sim` as keyof typeof ambiente.inox.flags
                    const naoKey = `${flag.value}_nao` as keyof typeof ambiente.inox.flags
                    return (
                      <div
                        key={flag.value}
                        className="grid items-center gap-4"
                        style={{ gridTemplateColumns: "1fr auto auto" }}
                      >
                        <span className="text-sm text-neutral-800">{flag.label}</span>
                        <div className="flex items-center gap-2 justify-self-start" style={{ width: "64px" }}>
                          <Checkbox
                            id={`inox_flag_${flag.value}_sim_${ambienteIndex}`}
                            checked={ambiente.inox.flags[simKey] || false}
                            onCheckedChange={(checked) =>
                              handleBooleanFlag(ambienteIndex, "inox", simKey, checked as boolean)
                            }
                            className="border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                          />
                          <Label
                            htmlFor={`inox_flag_${flag.value}_sim_${ambienteIndex}`}
                            className="cursor-pointer text-sm text-neutral-800"
                          >
                            Sim
                          </Label>
                        </div>
                        <div className="flex items-center gap-2 justify-self-start" style={{ width: "64px" }}>
                          <Checkbox
                            id={`inox_flag_${flag.value}_nao_${ambienteIndex}`}
                            checked={ambiente.inox.flags[naoKey] || false}
                            onCheckedChange={(checked) =>
                              handleBooleanFlag(ambienteIndex, "inox", naoKey, checked as boolean)
                            }
                            className="border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                          />
                          <Label
                            htmlFor={`inox_flag_${flag.value}_nao_${ambienteIndex}`}
                            className="cursor-pointer text-sm text-neutral-800"
                          >
                            Não
                          </Label>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Card>

            <Card className="bg-white border-2 border-neutral-300 shadow-sm rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold">Hastes</h2>
              <p className="text-sm text-neutral-600">Configuração das hastes de fixação</p>
              <Separator />

              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-800">Tipo</Label>
                <div className="space-y-2">
                  {[
                    { value: "1_1_2", label: '1 1/2"' },
                    { value: "1", label: '1"' },
                    { value: "30x30", label: "30x30" },
                    { value: "40x10", label: "40x10" },
                  ].map((tipo) => (
                    <div key={tipo.value} className="flex items-center gap-3">
                      <Checkbox
                        id={`hastes_tipo_${tipo.value}_${ambienteIndex}`}
                        checked={ambiente.hastes.tipo.includes(tipo.value)}
                        onCheckedChange={(checked) =>
                          handleCheckboxArray(ambienteIndex, "hastes", "tipo", tipo.value, checked as boolean)
                        }
                        className="border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                      />
                      <Label
                        htmlFor={`hastes_tipo_${tipo.value}_${ambienteIndex}`}
                        className="cursor-pointer text-sm text-neutral-800"
                      >
                        {tipo.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-800">Fixação</Label>
                <div className="space-y-2">
                  {[
                    { value: "lateral", label: "Lateral" },
                    { value: "superior", label: "Superior" },
                    { value: "flange", label: "Flange" },
                    { value: "tarugo_padrao", label: "Tarugo Padrão" },
                  ].map((fixacao) => {
                    const fixacaoKey = fixacao.value as keyof typeof ambiente.hastes.fixacao
                    return (
                      <div key={fixacao.value} className="flex items-center gap-3">
                        <Checkbox
                          id={`hastes_fixacao_${fixacao.value}_${ambienteIndex}`}
                          checked={ambiente.hastes.fixacao[fixacaoKey] || false}
                          onCheckedChange={(checked) =>
                            handleHasteFixacaoChange(ambienteIndex, fixacao.value, checked as boolean)
                          }
                          className="border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                        />
                        <Label
                          htmlFor={`hastes_fixacao_${fixacao.value}_${ambienteIndex}`}
                          className="cursor-pointer text-sm text-neutral-800"
                        >
                          {fixacao.label}
                        </Label>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Card>

            <Card className="bg-white border-2 border-neutral-300 shadow-sm rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold">Intermediários</h2>
              <p className="text-sm text-neutral-600">Especificações dos elementos intermediários</p>
              <Separator />

              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-800">Tipo</Label>
                <div className="space-y-2">
                  {[
                    { value: "1_2", label: '1/2"' },
                    { value: "5_8", label: '5/8"' },
                    { value: "cabo_de_aco", label: "Cabo de Aço" },
                  ].map((tipo) => (
                    <div key={tipo.value} className="flex items-center gap-3">
                      <Checkbox
                        id={`intermediarios_tipo_${tipo.value}_${ambienteIndex}`}
                        checked={ambiente.intermediarios.tipo.includes(tipo.value)}
                        onCheckedChange={(checked) =>
                          handleCheckboxArray(ambienteIndex, "intermediarios", "tipo", tipo.value, checked as boolean)
                        }
                        className="border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                      />
                      <Label
                        htmlFor={`intermediarios_tipo_${tipo.value}_${ambienteIndex}`}
                        className="cursor-pointer text-sm text-neutral-800"
                      >
                        {tipo.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-800">Opções</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={`intermediarios_com_uniao_${ambienteIndex}`}
                      checked={ambiente.intermediarios.com_uniao}
                      onCheckedChange={(checked) =>
                        handleBooleanFlag(ambienteIndex, "intermediarios", "com_uniao", checked as boolean)
                      }
                      className="border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                    />
                    <Label
                      htmlFor={`intermediarios_com_uniao_${ambienteIndex}`}
                      className="cursor-pointer text-sm text-neutral-800"
                    >
                      Com União
                    </Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={`intermediarios_transpassado_${ambienteIndex}`}
                      checked={ambiente.intermediarios.transpassado}
                      onCheckedChange={(checked) =>
                        handleBooleanFlag(ambienteIndex, "intermediarios", "transpassado", checked as boolean)
                      }
                      className="border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                    />
                    <Label
                      htmlFor={`intermediarios_transpassado_${ambienteIndex}`}
                      className="cursor-pointer text-sm text-neutral-800"
                    >
                      Transpassado
                    </Label>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white border-2 border-neutral-300 shadow-sm rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold">Vidro</h2>
              <p className="text-sm text-neutral-600">Especificações dos elementos de vidro</p>
              <Separator />

              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-800">Acabamento Superior</Label>
                <div className="space-y-2">
                  {["passamao", "perfil"].map((tipo) => (
                    <div key={tipo} className="flex items-center gap-3">
                      <Checkbox
                        id={`vidro_acabamento_superior_${tipo}_${ambienteIndex}`}
                        checked={ambiente.vidro.acabamento_superior.includes(tipo)}
                        onCheckedChange={(checked) =>
                          handleCheckboxArray(ambienteIndex, "vidro", "acabamento_superior", tipo, checked as boolean)
                        }
                        className="border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                      />
                      <Label
                        htmlFor={`vidro_acabamento_superior_${tipo}_${ambienteIndex}`}
                        className="cursor-pointer capitalize text-sm text-neutral-800"
                      >
                        {tipo}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-800">Tubos</Label>
                <div className="space-y-2">
                  {[
                    { value: "1_1_2", label: '1 1/2"' },
                    { value: "1", label: '1"' },
                    { value: "30x30", label: "30x30" },
                    { value: "40x10", label: "40x10" },
                  ].map((tubo) => (
                    <div key={tubo.value} className="flex items-center gap-3">
                      <Checkbox
                        id={`vidro_tubos_${tubo.value}_${ambienteIndex}`}
                        checked={ambiente.vidro.tubos.includes(tubo.value)}
                        onCheckedChange={(checked) =>
                          handleCheckboxArray(ambienteIndex, "vidro", "tubos", tubo.value, checked as boolean)
                        }
                        className="border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                      />
                      <Label
                        htmlFor={`vidro_tubos_${tubo.value}_${ambienteIndex}`}
                        className="cursor-pointer text-sm text-neutral-800"
                      >
                        {tubo.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-800">Fixação</Label>
                <div className="space-y-2">
                  {["pinca", "orelha", "baguete", "botons"].map((fixacao) => (
                    <div key={fixacao} className="flex items-center gap-3">
                      <Checkbox
                        id={`vidro_fixacao_${fixacao}_${ambienteIndex}`}
                        checked={ambiente.vidro.fixacao.includes(fixacao)}
                        onCheckedChange={(checked) =>
                          handleCheckboxArray(ambienteIndex, "vidro", "fixacao", fixacao, checked as boolean)
                        }
                        className="border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                      />
                      <Label
                        htmlFor={`vidro_fixacao_${fixacao}_${ambienteIndex}`}
                        className="cursor-pointer capitalize text-sm text-neutral-800"
                      >
                        {fixacao}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-800">Acabamento</Label>
                <div className="space-y-2">
                  {["polido", "escovado", "pintado"].map((acabamento) => (
                    <div key={acabamento} className="flex items-center gap-3">
                      <Checkbox
                        id={`vidro_acabamento_${acabamento}_${ambienteIndex}`}
                        checked={ambiente.vidro.acabamento.includes(acabamento)}
                        onCheckedChange={(checked) =>
                          handleCheckboxArray(ambienteIndex, "vidro", "acabamento", acabamento, checked as boolean)
                        }
                        className="border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                      />
                      <Label
                        htmlFor={`vidro_acabamento_${acabamento}_${ambienteIndex}`}
                        className="cursor-pointer text-sm text-neutral-800"
                      >
                        {acabamento}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-800">Tipo</Label>
                <div className="space-y-2">
                  {["temperado", "laminado"].map((tipo) => (
                    <div key={tipo} className="flex items-center gap-3">
                      <Checkbox
                        id={`vidro_tipo_${tipo}_${ambienteIndex}`}
                        checked={ambiente.vidro.tipo.includes(tipo)}
                        onCheckedChange={(checked) =>
                          handleCheckboxArray(ambienteIndex, "vidro", "tipo", tipo, checked as boolean)
                        }
                        className="border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                      />
                      <Label
                        htmlFor={`vidro_tipo_${tipo}_${ambienteIndex}`}
                        className="cursor-pointer capitalize text-sm text-neutral-800"
                      >
                        {tipo}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-800">Espessura</Label>
                <div className="space-y-2">
                  {["8mm", "10mm", "5+5mm"].map((espessura) => (
                    <div key={espessura} className="flex items-center gap-3">
                      <Checkbox
                        id={`vidro_espessura_${espessura}_${ambienteIndex}`}
                        checked={ambiente.vidro.espessura.includes(espessura)}
                        onCheckedChange={(checked) =>
                          handleCheckboxArray(ambienteIndex, "vidro", "espessura", espessura, checked as boolean)
                        }
                        className="border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                      />
                      <Label
                        htmlFor={`vidro_espessura_${espessura}_${ambienteIndex}`}
                        className="cursor-pointer text-sm text-neutral-800"
                      >
                        {espessura}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        ))}

        {formData.ambientes.length < 3 && (
          <Card className="bg-neutral-50 border-2 border-dashed border-neutral-300 shadow-sm rounded-xl p-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleAddAmbiente}
              className="w-full border-2 border-neutral-400 hover:bg-neutral-100 bg-transparent"
            >
              <Plus className="w-5 h-5 mr-2" />
              Adicionar Ambiente
            </Button>
          </Card>
        )}

        <div className="flex justify-end pt-2">
          <Button type="submit" size="lg" className="bg-neutral-900 hover:bg-neutral-800">
            Salvar Ordem de Serviço
          </Button>
        </div>
        
        {isOrdemSalva && buildCompletePayload && (
          <Card className="bg-neutral-50 border-2 border-neutral-300 p-4 mt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-neutral-700" />
                <h4 className="text-sm font-semibold text-neutral-900">Informações técnicas</h4>
              </div>
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div className="max-h-96 overflow-y-auto">
              <div className="text-xs bg-white p-3 rounded border border-neutral-200 space-y-1">
                {Object.entries(buildCompletePayload()).map(([key, value]) => (
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
      </form>
    </>
  )
}
