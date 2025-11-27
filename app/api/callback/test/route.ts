import { NextResponse } from "next/server"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': '*',
}

export async function OPTIONS() {
  console.log("[v0] ✅ Requisição OPTIONS recebida na rota de teste")
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function GET() {
  console.log("[v0] ✅ Requisição GET recebida na rota de teste")
  return NextResponse.json({ 
    message: "Rota de teste funcionando!",
    timestamp: new Date().toISOString()
  }, { headers: corsHeaders })
}

export async function POST(request: Request) {
  console.log("[v0] ========================================")
  console.log("[v0] ✅ REQUISIÇÃO POST RECEBIDA NA ROTA DE TESTE")
  console.log("[v0] ========================================")
  
  try {
    const rawBody = await request.text()
    console.log("[v0] Body RAW:", rawBody)
    
    let parsedBody
    try {
      parsedBody = JSON.parse(rawBody)
      console.log("[v0] Body parseado:", JSON.stringify(parsedBody, null, 2))
    } catch (e) {
      console.log("[v0] Não foi possível parsear como JSON")
    }
    
    console.log("[v0] Headers:", Object.fromEntries(request.headers.entries()))
    console.log("[v0] URL:", request.url)
    console.log("[v0] ========================================")
    
    return NextResponse.json({ 
      success: true,
      message: "Dados recebidos com sucesso!",
      receivedData: parsedBody || rawBody,
      timestamp: new Date().toISOString()
    }, { headers: corsHeaders })
  } catch (error) {
    console.error("[v0] ❌ Erro:", error)
    return NextResponse.json({ 
      success: false,
      error: String(error)
    }, { status: 500, headers: corsHeaders })
  }
}
