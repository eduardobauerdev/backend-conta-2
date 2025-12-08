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

  // 1. Escuta Realtime do Status (Mantido em instance_settings onde o backend escreve)
  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        const { data } = await supabase
          .from('instance_settings')
          .select('qr_code, status')
          .eq('id', 1)
          .single();

        if (data) {
          if (data.status === 'qr' && data.qr_code) {
            setQrImage(data.qr_code);
            setSessionActive(true);
            setIsSyncing(false);
          } else if (data.status === 'syncing') {
            setIsSyncing(true);
            setSessionActive(false);
            setQrImage(null);
          } else if (data.status === 'connected') {
            onConnected();
          }
        }
      } catch (error) {
        console.error("Erro ao buscar estado inicial:", error);
      }
    };
    
    fetchInitialState();

    const channel = supabase
      .channel('qr_scanner_updates')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'instance_settings', filter: 'id=eq.1' },
        (payload) => {
          const newData = payload.new;
          
          if (newData.status === 'connected') {
            toast.success("Conectado com sucesso!");
            onConnected();
          } else if (newData.status === 'syncing') {
            setIsSyncing(true);
            setSessionActive(false);
            setQrImage(null);
            setLoading(false);
          } else if (newData.status === 'qr' && newData.qr_code) {
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
      supabase.removeChannel(channel);
    };
  }, [onConnected, supabase]);

  // ✅ FUNÇÃO AUXILIAR: Busca a URL na tabela whatsapp_config
  async function getBackendUrl() {
    // Pega a primeira linha da configuração
    const { data, error } = await supabase
        .from('whatsapp_config')
        .select('server_url')
        .limit(1)
        .single();
    
    if (error || !data?.server_url) {
        throw new Error("URL da API não encontrada em 'whatsapp_config'.");
    }
    
    // Remove barra no final se houver para evitar url mal formada
    return data.server_url.replace(/\/$/, "");
  }

  // 2. Iniciar Sessão (Usa a URL do banco)
  async function startSession() {
    try {
      setLoading(true);
      setQrImage(null);
      
      const baseUrl = await getBackendUrl();
      const url = `${baseUrl}/session/connect`;
      
      console.log(`[QRScanner] Chamando API em: ${url}`);

      const response = await fetch(url, { 
        method: "POST" 
      });
      
      if (!response.ok) {
          const errorText = await response.text(); 
          throw new Error(errorText || "Falha ao iniciar");
      }
      
      toast.info("Iniciando servidor...", {
        description: "Aguarde o QR Code aparecer."
      });
      
    } catch (error: any) {
      console.error("[QRScanner] Erro:", error);
      toast.error(error.message || "Erro de conexão.");
      setLoading(false);
    }
  }

  // 3. Cancelar Sessão
  async function stopSession() {
    try {
        const baseUrl = await getBackendUrl();
        await fetch(`${baseUrl}/session/disconnect`, { method: "POST" });
        
        setSessionActive(false);
        setQrImage(null);
        toast.info("Sessão cancelada.");
    } catch (e) {
        toast.error("Erro ao cancelar.");
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
                variant="destructive" 
                variant="outline" 
                className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
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