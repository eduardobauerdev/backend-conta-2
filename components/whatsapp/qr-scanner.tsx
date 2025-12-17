"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, QrCode, Power, Radio, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

interface QRScannerProps {
  onConnected: () => void
}

export function QRScanner({ onConnected }: QRScannerProps) {
  const [qrImage, setQrImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [sessionActive, setSessionActive] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  
  const supabase = createClient()

  // 1. Verifica status inicial via API e mantém polling
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch("/api/whatsapp/status")
        const data = await response.json()

        if (data.success && data.connected) {
          onConnected()
        }
      } catch (error) {
        console.error("Erro ao verificar status:", error)
      }
    }
    
    checkStatus()
    
    // Polling a cada 5 segundos para verificar se conectou
    const intervalId = setInterval(checkStatus, 5000)

    // Também mantém realtime do Supabase para updates do QR code
    const channel = supabase
      .channel('qr_scanner_updates')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'instance_settings', filter: 'id=eq.1' },
        (payload) => {
          const newData = payload.new;
          
          if (newData.status === 'qr' && newData.qr_code) {
            setQrImage(newData.qr_code);
            setLoading(false);
            setSessionActive(true);
            setIsSyncing(false);
          } else if (newData.status === 'disconnected') {
            setQrImage(null);
            setSessionActive(false);
            setLoading(false);
            setIsSyncing(false);
          }
        }
      )
      .subscribe();

    return () => {
      clearInterval(intervalId)
      supabase.removeChannel(channel);
    };
  }, [onConnected, supabase]);

  // ✅ Função auxiliar: Busca a URL da API na tabela whatsapp_config
  async function getBackendUrl(): Promise<string> {
    const { data, error } = await supabase
      .from('whatsapp_config')
      .select('server_url')
      .limit(1)
      .single();
    
    if (error || !data?.server_url) {
      throw new Error("Configure a 'URL da API do WhatsApp' nas configurações primeiro.");
    }
    
    // Remove barra no final se houver
    return data.server_url.replace(/\/$/, "");
  }

  // 2. Iniciar Sessão - Chama diretamente o backend usando a URL do banco
  async function startSession() {
    try {
      setLoading(true);
      setQrImage(null);
      
      // Busca a URL do backend no banco de dados
      const backendUrl = await getBackendUrl();
      
      console.log(`[QRScanner] Backend URL (do banco): ${backendUrl}`);
      
      // 1. Primeiro inicializa a conexão (POST /api/initialize)
      const initUrl = `${backendUrl}/api/initialize`;
      console.log(`[QRScanner] Inicializando: ${initUrl}`);
      
      const initResponse = await fetch(initUrl, { 
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      
      if (!initResponse.ok) {
        const errorData = await initResponse.json().catch(() => ({}));
        throw new Error(errorData.message || `Erro ao inicializar: ${initResponse.status}`);
      }
      
      const initData = await initResponse.json();
      console.log('[QRScanner] Resposta initialize:', initData);
      
      // Se já está conectado, não precisa de QR
      if (initData.connected) {
        toast.success("WhatsApp já está conectado!");
        onConnected();
        setLoading(false);
        return;
      }
      
      // 2. Aguarda um pouco e busca o QR Code (GET /api/qr)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const qrUrl = `${backendUrl}/api/qr`;
      console.log(`[QRScanner] Buscando QR: ${qrUrl}`);
      
      const qrResponse = await fetch(qrUrl, { 
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      
      if (!qrResponse.ok) {
        const errorData = await qrResponse.json().catch(() => ({}));
        throw new Error(errorData.message || `Erro ao obter QR: ${qrResponse.status}`);
      }
      
      const qrData = await qrResponse.json();
      console.log('[QRScanner] Resposta QR:', qrData);
      
      // Extrai o QR Code da resposta
      const qrCode = qrData.qr || qrData.qrCode || qrData.qr_code;
      
      if (qrCode) {
        setQrImage(qrCode);
        setSessionActive(true);
        setLoading(false);
        toast.success("QR Code gerado!", {
          description: "Escaneie com seu WhatsApp"
        });
      } else if (qrData.connected) {
        toast.success("WhatsApp já está conectado!");
        onConnected();
        setLoading(false);
      } else {
        toast.info("Aguardando QR Code...", {
          description: "O QR Code será exibido em breve."
        });
      }
      
    } catch (error: any) {
      console.error("[QRScanner] Erro:", error);
      
      let errorMessage = error.message || "Erro desconhecido";
      
      if (error.message?.includes("URL da API")) {
        errorMessage = "Configure a URL da API do WhatsApp em Ajustes";
      } else if (error.message?.includes("fetch") || error.message?.includes("Failed")) {
        errorMessage = "Não foi possível conectar ao backend. Verifique se está rodando.";
      }
      
      toast.error("Erro ao gerar QR Code", {
        description: errorMessage,
        duration: 5000
      });
      setLoading(false);
    }
  }

  // 3. Cancelar Sessão - Chama diretamente o backend
  async function stopSession() {
    try {
      const backendUrl = await getBackendUrl();
      const logoutUrl = `${backendUrl}/api/logout`;
      
      console.log(`[QRScanner] Logout: ${logoutUrl}`);
      
      await fetch(logoutUrl, { 
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      
      setSessionActive(false);
      setQrImage(null);
      toast.info("Sessão cancelada.");
    } catch (e: any) {
      console.error("[QRScanner] Erro ao cancelar:", e);
      toast.error("Erro ao cancelar.", {
        description: e.message || "Tente novamente"
      });
    }
  }

  // --- RENDERIZAÇÃO ---

  // Estado de sincronização
  if (isSyncing) {
    return (
      <Card className="p-12 flex flex-col items-center justify-center gap-6 min-h-[300px] bg-green-50/50 border-green-200">
        <div className="p-6 bg-green-100 rounded-full shadow-sm border border-green-200">
          <Radio className="w-12 h-12 text-green-600 animate-pulse" />
        </div>
        
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-green-800">Sincronizando mensagens</h3>
          <p className="text-sm text-green-600 max-w-sm mx-auto">
            Seu WhatsApp foi conectado com sucesso! Estamos sincronizando suas conversas...
          </p>
        </div>

        <Link href="/whatsapp">
          <Button 
            size="lg" 
            className="bg-green-600 hover:bg-green-700 text-white gap-2"
          >
            Ir para aba WhatsApp
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </Card>
    )
  }

  if (loading && !qrImage) {
    return (
      <Card className="p-8 flex flex-col items-center justify-center gap-4 min-h-[300px]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <div className="text-center space-y-1">
          <p className="font-medium">Iniciando servidor WhatsApp...</p>
          <p className="text-xs text-muted-foreground">Buscando configuração e conectando...</p>
        </div>
      </Card>
    )
  }

  if (sessionActive && qrImage) {
    return (
      <Card className="p-8 flex flex-col items-center gap-6">
        <div className="text-center space-y-2">
          <h3 className="font-semibold text-lg">Escaneie o QR Code</h3>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Abra o WhatsApp no celular {'>'} Menu {'>'} Aparelhos conectados {'>'} Conectar
          </p>
        </div>

        <div className="relative bg-white p-2 rounded-lg border shadow-sm">
          <img
            src={qrImage}
            alt="QR Code"
            className="w-[260px] h-[260px] object-contain"
          />
          <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-background/80 backdrop-blur px-2 py-1 rounded-full border shadow-sm">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
             <span className="text-[10px] font-medium text-muted-foreground">Ao vivo</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-xs">
            <p className="text-xs text-center text-muted-foreground">
                Este código expira se não for lido em 5 minutos.
            </p>
            <Button 
                variant="outline" 
                className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive"
                onClick={stopSession}
            >
                Cancelar Sessão
            </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-8 flex flex-col items-center justify-center gap-6 min-h-[300px]">
      <div className="p-4 bg-muted/50 rounded-full">
        <QrCode className="w-12 h-12 text-muted-foreground" />
      </div>
      
      <div className="text-center space-y-2 max-w-sm">
        <h3 className="font-semibold text-lg">WhatsApp Desconectado</h3>
        <p className="text-sm text-muted-foreground">
          Para economizar recursos, a conexão é iniciada manualmente. 
          Clique abaixo para gerar um novo QR Code.
        </p>
      </div>

      <Button onClick={startSession} size="lg" className="w-full max-w-xs">
        <Power className="w-4 h-4 mr-2" />
        Gerar QR Code
      </Button>
    </Card>
  )
}