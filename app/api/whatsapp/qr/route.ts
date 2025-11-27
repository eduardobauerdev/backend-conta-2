import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

function joinUrl(base: string, path: string): string {
  const cleanBase = base.replace(/\/+$/, '')
  const cleanPath = path.replace(/^\/+/, '')
  return `${cleanBase}/${cleanPath}`
}

function getQrFromResponse(data: any): string | null {
  const raw =
    data?.qrCode ||
    data?.qr_code ||
    data?.qrCodeImageUrl ||
    null

  const base64 = raw || data?.qrCodeBase64 || null
  if (!base64) return null

  if (typeof base64 === 'string' && base64.startsWith('data:image')) {
    return base64
  }

  return `data:image/png;base64,${base64}`
}

export async function GET() {
  console.log('[v0] 🔄 Iniciando requisição para obter QR Code')
  
  try {
    const supabase = await createServerClient()
    console.log('[v0] ✅ Cliente Supabase criado com sucesso')
    
    const { data: config, error: configError } = await supabase
      .from('whatsapp_config')
      .select('*')
      .single()

    console.log('[v0] 📊 Configuração do banco:', { 
      hasConfig: !!config, 
      hasError: !!configError,
      serverUrl: config?.server_url 
    })

    if (configError || !config || !config.server_url) {
      console.log('[v0] ❌ Configuração não encontrada ou URL do servidor ausente')
      return NextResponse.json({
        success: false,
        message: 'Configure a URL da API do servidor WhatsApp primeiro'
      }, { status: 400 })
    }

    const targetUrl = joinUrl(config.server_url, 'qr')
    console.log('[v0] 🌐 Fazendo requisição para:', targetUrl)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout for QR

    try {
      const response = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      console.log('[v0] 📡 Resposta do servidor Railway:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        contentType: response.headers.get('content-type')
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.log('[v0] ❌ Erro na resposta do servidor:', errorText)
        
        return NextResponse.json({
          success: false,
          message: 'O servidor WhatsApp está indisponível. Verifique se o serviço está ativo no Railway.',
          error: `Status ${response.status}: ${errorText}`
        }, { status: 200 })
      }

      const contentType = response.headers.get('content-type') || ''
      let qrImage: string | null = null

      if (contentType.includes('application/json')) {
        // Backend returned JSON
        const data = await response.json()
        console.log('[v0] 📦 Resposta JSON do /qr:', data)
        qrImage = getQrFromResponse(data)
      } else {
        // Backend returned plain text (likely a data:image URL directly)
        const text = await response.text()
        console.log('[v0] 📦 Resposta texto do /qr:', { 
          textLength: text.length,
          isDataUrl: text.startsWith('data:image')
        })
        
        if (text.startsWith('data:image')) {
          qrImage = text
        } else {
          qrImage = getQrFromResponse({ qrCode: text })
        }
      }
      
      if (!qrImage) {
        console.error('[v0] ❌ Não foi possível extrair QR Code da resposta')
        return NextResponse.json({
          success: false,
          message: 'O servidor não retornou um QR Code válido. Tente novamente.'
        }, { status: 200 })
      }

      console.log('[v0] ✅ QR Code extraído com sucesso:', { 
        qrLength: qrImage.length,
        isDataUrl: qrImage.startsWith('data:image')
      })

      return NextResponse.json({
        success: true,
        qr: qrImage,
        message: 'QR Code gerado com sucesso'
      })
    } catch (fetchError) {
      clearTimeout(timeoutId)
      
      if (fetchError instanceof Error) {
        if (fetchError.name === 'AbortError') {
          console.error('[v0] ⏱️ Timeout ao obter QR Code:', fetchError)
          return NextResponse.json({
            success: false,
            message: 'O servidor WhatsApp não respondeu em tempo hábil. Tente novamente.',
            error: 'Timeout após 15 segundos'
          }, { status: 200 })
        }
        
        console.error('[v0] 🔌 Erro de conexão ao obter QR:', fetchError.message)
        return NextResponse.json({
          success: false,
          message: 'Não foi possível conectar ao servidor WhatsApp. Verifique a URL configurada.',
          error: fetchError.message
        }, { status: 200 })
      }
      
      throw fetchError
    }
  } catch (error) {
    console.error('[v0] 💥 Erro ao obter QR Code:', error)
    return NextResponse.json({
      success: false,
      message: 'Erro interno ao gerar QR Code. Tente novamente.',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}
