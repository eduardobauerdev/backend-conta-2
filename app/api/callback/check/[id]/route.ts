import { NextResponse } from "next/server"
import { getCallback } from "@/lib/callback-store"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    console.log("[v0] 🔍 Verificando callback para ID:", id)
    
    const driveLink = getCallback(id)
    
    if (driveLink) {
      console.log("[v0] ✅ Link encontrado para ID:", id)
      console.log("[v0] 📎 Link:", driveLink)
      return NextResponse.json({ 
        success: true,
        driveLink,
        ready: true
      })
    }
    
    console.log("[v0] ⏳ Link ainda não disponível para ID:", id)
    return NextResponse.json({ 
      success: true,
      ready: false
    })
  } catch (error) {
    console.error("[v0] ❌ Erro ao verificar callback:", error)
    return NextResponse.json({ 
      success: false,
      error: "Erro ao verificar callback" 
    }, { status: 500 })
  }
}
