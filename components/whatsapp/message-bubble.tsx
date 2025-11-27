import { cn } from "@/lib/utils"
import { Check, CheckCheck, Download, FileText, Music, Video, ImageIcon } from "lucide-react"

interface Message {
  id: string
  body: string
  timestamp: number
  fromMe: boolean
  ack: number
  from?: string
  type?: string
  hasMedia?: boolean
  mediaUrl?: string | null
  mimeType?: string | null
  caption?: string | null
}

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const time = new Date(message.timestamp).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })

  const getMediaType = () => {
    if (!message.mimeType) return null
    if (message.mimeType.startsWith("image/")) return "image"
    if (message.mimeType.startsWith("video/")) return "video"
    if (message.mimeType.startsWith("audio/")) return "audio"
    return "document"
  }

  const mediaType = getMediaType()

  const renderMediaIcon = () => {
    switch (mediaType) {
      case "image":
        return <ImageIcon className="w-4 h-4" />
      case "video":
        return <Video className="w-4 h-4" />
      case "audio":
        return <Music className="w-4 h-4" />
      case "document":
        return <FileText className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className={cn("flex", message.fromMe ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[70%] rounded-lg px-4 py-2",
          message.fromMe ? "bg-primary text-primary-foreground" : "bg-muted",
        )}
      >
        {!message.fromMe && message.from && <p className="text-xs font-medium mb-1 opacity-70">{message.from}</p>}

        {message.hasMedia && message.mediaUrl && (
          <div className="mb-2">
            {mediaType === "image" && (
              <img
                src={message.mediaUrl || "/placeholder.svg"}
                alt="Imagem"
                className="rounded-lg max-w-full h-auto max-h-[300px] object-contain"
                loading="lazy"
              />
            )}
            {mediaType === "video" && (
              <video controls className="rounded-lg max-w-full h-auto max-h-[300px]">
                <source src={message.mediaUrl} type={message.mimeType || "video/mp4"} />
                Seu navegador não suporta reprodução de vídeo.
              </video>
            )}
            {mediaType === "audio" && (
              <audio controls className="w-full">
                <source src={message.mediaUrl} type={message.mimeType || "audio/mpeg"} />
                Seu navegador não suporta reprodução de áudio.
              </audio>
            )}
            {mediaType === "document" && (
              <a
                href={message.mediaUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-2 p-2 rounded border",
                  message.fromMe
                    ? "bg-primary-foreground/10 border-primary-foreground/20"
                    : "bg-background/50 border-border",
                )}
              >
                <FileText className="w-5 h-5" />
                <span className="text-sm flex-1">Documento</span>
                <Download className="w-4 h-4" />
              </a>
            )}
          </div>
        )}

        {(message.caption || message.body) && (
          <p className="text-sm whitespace-pre-wrap break-words">{message.caption || message.body}</p>
        )}

        <div className={cn("flex items-center gap-1 mt-1", message.fromMe ? "justify-end" : "justify-start")}>
          <span className={cn("text-xs", message.fromMe ? "text-primary-foreground/70" : "text-muted-foreground")}>
            {time}
          </span>
          {message.fromMe && (
            <span className="text-primary-foreground/70">
              {message.ack >= 3 ? (
                <CheckCheck className="w-4 h-4 text-blue-400" />
              ) : message.ack >= 2 ? (
                <CheckCheck className="w-4 h-4" />
              ) : (
                <Check className="w-4 h-4" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
