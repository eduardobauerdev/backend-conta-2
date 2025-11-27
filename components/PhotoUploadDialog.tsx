"use client"

import { useState, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, X, ImageIcon } from 'lucide-react'
import { toast } from 'sonner'

interface PhotoUploadDialogProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (base64Image: string) => void
  currentPhoto?: string
}

export function PhotoUploadDialog({
  isOpen,
  onClose,
  onUpload,
  currentPhoto,
}: PhotoUploadDialogProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione apenas arquivos de imagem')
      return
    }

    // Limit file size to 5MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error('A imagem deve ter no máximo 5MB')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const files = e.dataTransfer.files
      if (files && files[0]) {
        handleFileChange(files[0])
      }
    },
    [handleFileChange]
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      handleFileChange(files[0])
    }
  }

  const handleUpload = async () => {
    if (!preview) return

    setIsUploading(true)
    try {
      await onUpload(preview)
      setPreview(null)
      onClose()
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemovePreview = () => {
    setPreview(null)
  }

  const handleClose = () => {
    setPreview(null)
    setIsDragging(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md border-2 border-neutral-300 bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-neutral-900">
            Alterar Foto de Perfil
          </DialogTitle>
          <DialogDescription className="text-neutral-600">
            Arraste uma imagem ou clique para selecionar
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Preview or Current Photo */}
          <div className="flex justify-center">
            <Avatar className="w-32 h-32 border-2 border-neutral-300">
              <AvatarImage
                src={preview || currentPhoto}
                alt="Preview"
              />
              <AvatarFallback className="bg-neutral-200 text-4xl">
                <ImageIcon className="w-12 h-12 text-neutral-500" />
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Dropzone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`relative border-2 border-dashed rounded-lg p-8 transition-colors ${
              isDragging
                ? 'border-neutral-900 bg-neutral-100'
                : 'border-neutral-300 bg-white hover:border-neutral-400'
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              id="photo-upload"
            />
            <div className="flex flex-col items-center justify-center gap-2 text-center pointer-events-none">
              <Upload className="w-10 h-10 text-neutral-400" />
              <div className="text-sm">
                <span className="font-semibold text-neutral-900">
                  Clique para fazer upload
                </span>
                <span className="text-neutral-600"> ou arraste e solte</span>
              </div>
              <p className="text-xs text-neutral-500">PNG, JPG, GIF até 5MB</p>
            </div>
          </div>

          {/* Preview Actions */}
          {preview && (
            <div className="flex items-center justify-between p-3 bg-neutral-100 rounded-lg">
              <span className="text-sm text-neutral-700 font-medium">
                Nova imagem selecionada
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemovePreview}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={handleClose}
              className="border-2 border-neutral-300"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!preview || isUploading}
              className="bg-neutral-900 hover:bg-neutral-800 text-white"
            >
              {isUploading ? 'Salvando...' : 'Salvar Foto'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
