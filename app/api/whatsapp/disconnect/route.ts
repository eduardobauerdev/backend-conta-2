import { NextResponse } from "next/server"

export async function POST() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL

    if (!apiUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "API não configurada. Configure a URL do servidor em Ajustes.",
        },
        { status: 400 },
      )
    }

    const response = await fetch(`${apiUrl}/disconnect`, {
      method: "POST",
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Erro ao desconectar")
    }

    return NextResponse.json({
      success: true,
      message: "WhatsApp desconectado com sucesso",
    })
  } catch (error) {
    console.error("Erro ao desconectar WhatsApp:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Erro ao desconectar WhatsApp",
      },
      { status: 500 },
    )
  }
}
