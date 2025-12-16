"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { OrdemForm } from "@/components/forms/ordem-form"
import { ContratoForm } from "@/components/forms/contrato-form"
import { ContratoJuridicaForm } from "@/components/forms/contrato-juridica-form"
import type { OrdemDeServico } from "@/lib/types"

export default function GerarDocumentoPage() {
  const [gerarContrato, setGerarContrato] = useState(false)
  const [gerarOrdem, setGerarOrdem] = useState(false)
  const [gerarAmbos, setGerarAmbos] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [previewData, setPreviewData] = useState<OrdemDeServico | null>(null)

  const [tipoContrato, setTipoContrato] = useState<"fisica" | "juridica" | null>(null)
  
  const initialContratoFisicaData = {
    tipo_projeto: "",
    nome: "",
    telefone: "",
    endereco_contrato: "",
    cpf: "",
    forma_pagamento: "",
    valor_produtos_instalacao: "",
    valor_entrada: "",
    valor_desconto: "",
    quantidade_parcelas: "",
    forma_pagamento_parcelas: "",
    observacao_pagamento: "",
    data_emissao_contrato: "",
  }
  
  const initialContratoJuridicaData = {
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
    data_emissao_contrato: "",
  }
  
  const [contratoData, setContratoData] = useState(initialContratoFisicaData)
  const [contratoJuridicaData, setContratoJuridicaData] = useState(initialContratoJuridicaData)
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [errorsJuridica, setErrorsJuridica] = useState<Record<string, string>>({})

  const handleCheckboxChange = (type: "contrato" | "ordem" | "ambos") => {
    if (type === "contrato") {
      setGerarContrato(!gerarContrato)
      setGerarOrdem(false)
      setGerarAmbos(false)
      if (gerarContrato) {
        setTipoContrato(null)
      }
    } else if (type === "ordem") {
      setGerarContrato(false)
      setGerarOrdem(!gerarOrdem)
      setGerarAmbos(false)
    } else {
      setGerarContrato(false)
      setGerarOrdem(false)
      setGerarAmbos(!gerarAmbos)
    }
  }

  const handleTipoContratoChange = (tipo: "fisica" | "juridica" | null) => {
    if (tipo === "fisica") {
      setContratoJuridicaData(initialContratoJuridicaData)
      setErrorsJuridica({})
    } else if (tipo === "juridica") {
      setContratoData(initialContratoFisicaData)
      setErrors({})
    }
    setTipoContrato(tipo)
  }

  const handleSave = (data: OrdemDeServico) => {
    console.log("[v0] Ordem de Serviço:", JSON.stringify(data, null, 2))
    setPreviewData(data)
    setShowPreview(true)
  }

  const handleDocumentGenerated = (result: any) => {
    console.log("[DocumentGen] Documento gerado:", result)
    // Aqui você pode adicionar lógica adicional como salvar no histórico, etc.
  }

  // useEffect(() => {
  //   if (!isAuthenticated()) {
  //     router.push('/login')
  //   }
  // }, [router])

  // if (!isAuthenticated()) {
  //   return null
  // }

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gerar Documento</h1>
          <p className="text-neutral-600 mt-2">Selecione o tipo de documento que deseja gerar</p>
        </div>

        <div className="max-w-3xl mx-auto">
        <Card className="p-6 border-2 border-neutral-300">
          <h2 className="text-lg font-semibold mb-4">Tipo de Documento</h2>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="contrato"
                checked={gerarContrato}
                onCheckedChange={() => handleCheckboxChange("contrato")}
                className="border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
              />
              <Label htmlFor="contrato" className="cursor-pointer text-sm text-neutral-800">
                Gerar Contrato
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="ordem"
                checked={gerarOrdem}
                onCheckedChange={() => handleCheckboxChange("ordem")}
                className="border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
              />
              <Label htmlFor="ordem" className="cursor-pointer text-sm text-neutral-800">
                Gerar Ordem
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="ambos"
                checked={gerarAmbos}
                onCheckedChange={() => handleCheckboxChange("ambos")}
                className="border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
              />
              <Label htmlFor="ambos" className="cursor-pointer text-sm text-neutral-800">
                Gerar Ambos
              </Label>
            </div>
          </div>

          {gerarContrato && (
            <div className="mt-6 pt-6 border-t border-neutral-300">
              <h3 className="text-sm font-medium mb-3 text-neutral-700">Tipo de Pessoa</h3>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pessoa-fisica"
                    checked={tipoContrato === "fisica"}
                    onCheckedChange={(checked) => {
                      handleTipoContratoChange(checked ? "fisica" : null)
                    }}
                    className="border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                  />
                  <Label htmlFor="pessoa-fisica" className="cursor-pointer text-sm text-neutral-800">
                    Pessoa Física
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pessoa-juridica"
                    checked={tipoContrato === "juridica"}
                    onCheckedChange={(checked) => {
                      handleTipoContratoChange(checked ? "juridica" : null)
                    }}
                    className="border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                  />
                  <Label htmlFor="pessoa-juridica" className="cursor-pointer text-sm text-neutral-800">
                    Pessoa Jurídica
                  </Label>
                </div>
              </div>
            </div>
          )}
        </Card>
        </div>

        {gerarContrato && tipoContrato && (
          <>
            {tipoContrato === "fisica" && (
              <ContratoForm
                gerarContrato={true}
                setGerarContrato={setGerarContrato}
                tipoContrato={tipoContrato}
                setTipoContrato={setTipoContrato}
                contratoData={contratoData}
                setContratoData={setContratoData}
                errors={errors}
                setErrors={setErrors}
              />
            )}
            
            {tipoContrato === "juridica" && (
              <ContratoJuridicaForm
                gerarContrato={true}
                setGerarContrato={setGerarContrato}
                tipoContrato={tipoContrato}
                setTipoContrato={setTipoContrato}
                contratoData={contratoJuridicaData}
                setContratoData={setContratoJuridicaData}
                errors={errorsJuridica}
                setErrors={setErrorsJuridica}
              />
            )}
          </>
        )}

        {gerarOrdem && <OrdemForm onSave={handleSave} />}

        {gerarAmbos && (
          <Card className="p-6 border-2 border-neutral-300">
            <h2 className="text-lg font-semibold mb-2">Gerar Ambos</h2>
            <p className="text-muted-foreground">Funcionalidade em desenvolvimento...</p>
          </Card>
        )}

        {showPreview && previewData && (
          <Card className="p-6 bg-white border-2 border-blue-500">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Preview do Payload JSON</h2>
                <p className="text-sm text-neutral-600">Dados da ordem de serviço gerada</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowPreview(false)}>
                Fechar
              </Button>
            </div>
            <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-auto max-h-96 text-sm">
              {JSON.stringify(previewData, null, 2)}
            </pre>
          </Card>
        )}
      </div>
    </div>
  )
}
