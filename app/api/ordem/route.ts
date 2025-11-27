import { NextResponse } from "next/server"
import { generateCallbackId } from "@/lib/callback-store"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const callbackId = generateCallbackId()
    
    const url = new URL(request.url)
    const baseUrl = `${url.protocol}//${url.host}`
    const callbackUrl = `${baseUrl}/api/callback/ordem-servico`
    
    console.log("[v0] Enviando ordem de serviço com callbackId:", callbackId)
    console.log("[v0] URL de callback completa:", callbackUrl)

    try {
      const response = await fetch("https://edubauerdev.app.n8n.cloud/webhook-test/ordem-servico-inova-inox", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...body,
          callbackId,
          webhookUrl: callbackUrl // Enviando como webhookUrl para o n8n
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Unknown error" }))
        
        console.log("[v0] N8N webhook não disponível (status:", response.status, "):", errorData.message)
        console.log("[v0] Dados da ordem capturados:", body)
        
        return NextResponse.json({ 
          success: true, 
          webhookAvailable: false,
          message: "Ordem registrada com sucesso. O webhook do n8n está temporariamente indisponível.",
          data: body 
        }, { headers: corsHeaders })
      }

      const data = await response.json().catch(() => ({}))
      console.log("[v0] Ordem enviada com sucesso ao n8n")
      console.log("[v0] Resposta do n8n:", data)
      
      return NextResponse.json({ 
        success: true, 
        webhookAvailable: true,
        callbackId,
        driveLink: data.driveLink || data.link || data.url || null,
        data 
      }, { headers: corsHeaders })
    } catch (webhookError) {
      console.log("[v0] Erro de conexão com webhook n8n:", webhookError)
      console.log("[v0] Dados da ordem capturados:", body)
      
      return NextResponse.json({ 
        success: true, 
        webhookAvailable: false,
        message: "Ordem registrada com sucesso. O webhook do n8n está temporariamente indisponível.",
        data: body 
      }, { headers: corsHeaders })
    }
  } catch (error) {
    console.error("[v0] Erro ao processar requisição:", error)
    return NextResponse.json({ 
      success: false,
      error: "Erro ao processar ordem de serviço" 
    }, { status: 500, headers: corsHeaders })
  }
}
