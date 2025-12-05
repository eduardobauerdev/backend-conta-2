"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

interface ProfilePictureModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  imageUrl: string
  name: string
}

export function ProfilePictureModal({ open, onOpenChange, imageUrl, name }: ProfilePictureModalProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${name || 'profile'}_picture.jpg`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Erro ao baixar imagem:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-black/95">
        <VisuallyHidden>
          <DialogTitle>Foto de perfil de {name}</DialogTitle>
        </VisuallyHidden>
        
        {/* Header com nome e botões */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent z-10">
          <span className="text-white font-medium truncate max-w-[200px]">{name}</span>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 h-8 w-8"
              onClick={handleDownload}
              title="Baixar foto"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 h-8 w-8"
              onClick={() => onOpenChange(false)}
              title="Fechar"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Container da imagem */}
        <div className="flex items-center justify-center min-h-[300px] max-h-[80vh] p-4">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={`Foto de ${name}`}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                const fallback = e.currentTarget.parentElement?.querySelector('.fallback')
                if (fallback) fallback.classList.remove('hidden')
              }}
            />
          ) : null}
          
          {/* Fallback */}
          <div className={`fallback ${imageUrl ? 'hidden' : ''} flex flex-col items-center justify-center`}>
            <div className="w-48 h-48 bg-gray-700 rounded-full flex items-center justify-center">
              <User className="w-24 h-24 text-gray-400" />
            </div>
            <p className="text-gray-400 mt-4 text-sm">Sem foto de perfil</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
