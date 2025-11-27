import { NextResponse } from "next/server"
import { storeCallback } from "@/lib/callback-store"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(request: Request) {
  console.log("[v0] ⚡⚡⚡ FUNÇÃO POST INICIADA - CALLBACK ORDEM ⚡⚡⚡")
  
  try {
    console.log("[v0] =================================")
    console.log("[v0] CALLBACK ORDEM DE SERVIÇO RECEBIDO")
    console.log("[v0] =================================")
    console.log("[v0] Headers recebidos:", Object.fromEntries(request.headers.entries()))
    console.log("[v0] URL da requisição:", request.url)
    console.log("[v0] Método:", request.method)
    
    let body
    try {
      const rawBody = await request.text()
      console.log("[v0] Body RAW (texto):", rawBody)
      
      body = JSON.parse(rawBody)
      console.log("[v0] Body parseado (JSON):", JSON.stringify(body, null, 2))
    } catch (error) {
      console.error("[v0] ❌ Erro ao parsear JSON:", error)
      return NextResponse.json({ 
        success: false,
        error: "Erro ao parsear dados recebidos" 
      }, { status: 400, headers: corsHeaders })
    }
    
    const { callbackId, driveLink, link, url } = body
    
    console.log("[v0] Dados extraídos:")
    console.log("[v0]   - callbackId:", callbackId)
    console.log("[v0]   - driveLink:", driveLink)
    console.log("[v0]   - link:", link)
    console.log("[v0]   - url:", url)
    
    if (!callbackId) {
      console.error("[v0] ❌ callbackId não fornecido!")
      return NextResponse.json({ 
        success: false,
        error: "callbackId é obrigatório" 
      }, { status: 400, headers: corsHeaders })
    }
    
    const finalLink = driveLink || link || url
    
    if (!finalLink) {
      console.error("[v0] ❌ Nenhum link fornecido!")
      return NextResponse.json({ 
        success: false,
        error: "Link do Drive não fornecido" 
      }, { status: 400, headers: corsHeaders })
    }

    console.log("[v0] ✅ Link final selecionado:", finalLink)
    
    storeCallback(callbackId, finalLink, 'ordem-servico')
    
    console.log("[v0] ✅ Link armazenado com sucesso!")
    console.log("[v0] =================================")
    
    return NextResponse.json({ 
      success: true,
      message: "Link recebido e armazenado com sucesso" 
    }, { headers: corsHeaders })
  } catch (error) {
    console.error("[v0] ❌ Erro ao processar callback:", error)
    return NextResponse.json({ 
      success: false,
      error: "Erro ao processar callback" 
    }, { status: 500, headers: corsHeaders })
  }
}
