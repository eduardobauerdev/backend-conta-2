import { NextResponse } from "next/server"

export async function GET() {
  // Dados de teste para contrato pessoa física
  const testData = {
    nome: "João Silva",
    cpf: "12345678901",
    telefone: "11987654321", 
    endereco_contrato: "Rua das Flores, 123 - Centro",
    tipo_projeto: "Guarda-corpo em Inox para Escada",
    valor_produtos_instalacao: "5000.00",
    valor_entrada: "1500.00",
    valor_desconto: "200.00",
    quantidade_parcelas: "4",
    forma_pagamento: "Cartão de Crédito",
    forma_pagamento_parcelas: "Cartão de Crédito",
    observacao_pagamento: "Parcelas mensais sem juros",
    data_emissao_contrato: new Date().toISOString(),
    cidade: "São Paulo"
  }

  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/generate-document?action=generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        templateId: 'contrato-fisica',
        data: testData,
        format: 'html'
      })
    })

    const result = await response.json()
    
    if (result.success) {
      return new NextResponse(result.html, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Content-Disposition': 'inline; filename="test-contract.html"'
        }
      })
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }
    
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}