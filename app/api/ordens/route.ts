import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false, // Don't persist sessions on server
    autoRefreshToken: false, // Don't auto-refresh tokens on server
  },
})

export async function GET() {
  try {
    const sheetUrl =
      "https://docs.google.com/spreadsheets/d/1wqibNXuX9xiZKjwKqCe4eylfgWqMoRGtM6UjJGwql7c/gviz/tq?tqx=out:csv&gid=0"

    const response = await fetch(sheetUrl, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "text/csv,text/plain,*/*",
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: `Erro ao buscar dados: ${response.statusText}` }, { status: response.status })
    }

    const csvText = await response.text()

    return new NextResponse(csvText, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    })
  } catch (error) {
    console.error("[v0] Erro ao buscar dados do Google Sheets:", error)
    return NextResponse.json({ error: "Erro de rede ao buscar dados" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from("ordens")
      .insert([
        {
          numero_os: body.numeroOS,
          cliente: body.cliente,
          tipo_visita: body.tipoVisita,
          vendedor: body.vendedor,
          endereco: body.endereco,
          data: body.data,
          local: body.local || "",
        },
      ])
      .select()

    if (error) {
      console.error("[v0] Erro ao criar ordem:", error)
      return NextResponse.json({ error: `Erro ao criar ordem: ${error.message}` }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error("[v0] Erro ao processar requisição:", error)
    return NextResponse.json({ error: "Erro ao processar requisição" }, { status: 500 })
  }
}
