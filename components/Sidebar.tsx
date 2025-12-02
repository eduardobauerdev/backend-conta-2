"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Settings, ChevronLeft, ChevronRight, ChevronDown, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "@/contexts/user-context"
import { useSidebar } from "@/contexts/sidebar-context"
// import { useWhatsApp } from "@/contexts/whatsapp-context" // Removido para usar direto do banco
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { createClient } from "@/lib/supabase/client" // ✅ Importando Supabase

const FolderClosedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  </svg>
)

const FolderOpenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
  </svg>
)

const BookMarkedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 2v8l3-3 3 3V2" />
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
  </svg>
)

const DatabaseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5V19A9 3 0 0 0 21 19V5" />
    <path d="M3 12A9 3 0 0 0 21 12" />
  </svg>
)

// Ícone Verde para Conectado
const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#22c55e" // Verde
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

// Ícone Vermelho/Padrão para Desconectado
const WhatsAppDisconnectedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor" // Usa a cor do texto (cinza/branco)
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 19H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.7.7 0 0 1 2 21.286V5a2 2 0 0 1 1.184-1.826" />
    <path d="m2 2 20 20" />
    <path d="M8.656 3H20a2 2 0 0 1 2 2v11.344" />
  </svg>
)

const menuItems = [
  {
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z" />
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      </svg>
    ),
    label: "Visão Geral",
    href: "/visao-geral",
  },
  {
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z" />
        <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
      </svg>
    ),
    label: "CRM",
    href: "/crm",
  },
  {
    icon: "whatsapp",
    label: "WhatsApp",
    href: "/whatsapp",
  },
  {
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
        <path d="M14 2v5a1 1 0 0 0 1 1h5" />
        <path d="M10 9H8" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
      </svg>
    ),
    label: "Gerar Documento",
    href: "/gerar-documento",
  },
]

const documentosSubmenu = [
  {
    label: "Ordens",
    href: "/ordens",
    icon: BookMarkedIcon,
  },
  {
    label: "Contratos",
    href: "/contratos",
    icon: BookMarkedIcon,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useUser()
  const { isCollapsed, toggleCollapse } = useSidebar()
  
  // ✅ ESTADO LOCAL PARA CONEXÃO (Substituindo o contexto antigo)
  const [isWhatsAppConnected, setIsWhatsAppConnected] = useState(false)
  const supabase = createClient()

  // ✅ EFEITO: Escuta o status do banco em tempo real
  useEffect(() => {
    // 1. Busca status inicial
    const fetchStatus = async () => {
        const { data } = await supabase
            .from("instance_settings")
            .select("status")
            .eq("id", 1)
            .single()
        
        setIsWhatsAppConnected(data?.status === "connected")
    }
    fetchStatus()

    // 2. Escuta mudanças
    const channel = supabase
        .channel("sidebar_status")
        .on(
            "postgres_changes",
            { event: "UPDATE", schema: "public", table: "instance_settings", filter: "id=eq.1" },
            (payload) => {
                const status = payload.new.status
                setIsWhatsAppConnected(status === "connected")
            }
        )
        .subscribe()

    return () => {
        supabase.removeChannel(channel)
    }
  }, [supabase])


  const isInDocumentosSection = documentosSubmenu.some((sub) => pathname === sub.href)
  const [isDocumentosOpen, setIsDocumentosOpen] = React.useState(isInDocumentosSection)
  const [isDocumentosHovered, setIsDocumentosHovered] = React.useState(false)

  React.useEffect(() => {
    if (isInDocumentosSection) {
      setIsDocumentosOpen(true)
    }
  }, [isInDocumentosSection])

  const getFirstName = (fullName: string) => {
    return fullName.split(" ")[0]
  }

  const avatarSrc = React.useMemo(() => user?.foto_perfil || undefined, [user?.foto_perfil])
  const avatarAlt = React.useMemo(() => user?.nome || "", [user?.nome])
  const avatarFallback = React.useMemo(() => (user?.nome ? user.nome.charAt(0).toUpperCase() : "?"), [user?.nome])

  const canAccessDatabase = user?.cargo === "Administrador" || user?.cargo === "Desenvolvedor"
  const canAccessUsers = user?.cargo === "Administrador" || user?.cargo === "Desenvolvedor"

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-neutral-900 text-neutral-200 p-6 flex flex-col transition-all duration-300 ease-in-out z-40",
          isCollapsed ? "w-[88px]" : "w-[280px]",
        )}
      >
        <div className="absolute -right-3 top-6 z-10">
          <Button
            size="icon"
            variant="outline"
            className="h-6 w-6 rounded-full bg-black/80 backdrop-blur-sm border-neutral-700 hover:bg-black shadow-lg"
            onClick={toggleCollapse}
          >
            {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
          </Button>
        </div>

        <div className="mb-8">
          {!isCollapsed ? (
            <>
              <h1 className="text-xl font-bold text-white">Sistema de OS</h1>
              <p className="text-sm text-neutral-400 mt-1">Gestão de Ordens</p>
            </>
          ) : (
            <h1 className="text-xl font-bold text-white text-center">OS</h1>
          )}
        </div>

        {user && (
          <div className={cn("mb-6 pb-6 border-b border-neutral-700", isCollapsed && "flex justify-center")}>
            {!isCollapsed ? (
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 border-2 border-neutral-700">
                  <AvatarImage src={avatarSrc || "/placeholder.svg"} alt={avatarAlt} />
                  {!user.foto_perfil && (
                    <AvatarFallback className="bg-neutral-700 text-white">{avatarFallback}</AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{getFirstName(user.nome)}</p>
                  <p className="text-xs text-neutral-400 truncate">{user.email}</p>
                  <p className="text-xs text-neutral-500 truncate">{user.cargo}</p>
                </div>
              </div>
            ) : (
              <Avatar className="w-10 h-10 border-2 border-neutral-700">
                <AvatarImage src={avatarSrc || "/placeholder.svg"} alt={avatarAlt} />
                {!user.foto_perfil && (
                  <AvatarFallback className="bg-neutral-700 text-white">{avatarFallback}</AvatarFallback>
                )}
              </Avatar>
            )}
          </div>
        )}

        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => {
            const Icon =
              item.icon === "whatsapp"
                ? isWhatsAppConnected
                  ? WhatsAppIcon
                  : WhatsAppDisconnectedIcon
                : item.icon === "googledrive"
                  ? null
                  : item.icon
            const isActive = pathname === item.href

            const linkElement = (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                  "hover:bg-white/10",
                  isActive && "bg-white/10 text-white font-medium",
                  isCollapsed && "justify-center",
                )}
              >
                <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                  {typeof Icon === "function" ? <Icon /> : <Icon className="w-5 h-5" />}
                </span>
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            )

            if (isCollapsed) {
              return (
                <Tooltip key={item.href} delayDuration={0}>
                  <TooltipTrigger asChild>{linkElement}</TooltipTrigger>
                  <TooltipContent side="right" className="ml-2">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              )
            }

            return linkElement
          })}

          <div>
            {isCollapsed ? (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setIsDocumentosOpen(!isDocumentosOpen)}
                    onMouseEnter={() => setIsDocumentosHovered(true)}
                    onMouseLeave={() => setIsDocumentosHovered(false)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                      "hover:bg-white/10",
                      (isDocumentosOpen || isInDocumentosSection) && "bg-white/10 text-white font-medium",
                      "justify-center",
                    )}
                  >
                    <span className="w-5 h-5 flex-shrink-0">
                      {isDocumentosOpen || isDocumentosHovered ? <FolderOpenIcon /> : <FolderClosedIcon />}
                    </span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="ml-2">
                  <p>Documentos</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <button
                onClick={() => setIsDocumentosOpen(!isDocumentosOpen)}
                onMouseEnter={() => setIsDocumentosHovered(true)}
                onMouseLeave={() => setIsDocumentosHovered(false)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                  "hover:bg-white/10",
                  (isDocumentosOpen || isInDocumentosSection) && "bg-white/10 text-white font-medium",
                )}
              >
                <span className="w-5 h-5 flex-shrink-0">
                  {isDocumentosOpen || isDocumentosHovered ? <FolderOpenIcon /> : <FolderClosedIcon />}
                </span>
                <span className="flex-1 text-left">Documentos</span>
                <ChevronDown className={cn("w-4 h-4 transition-transform", isDocumentosOpen && "rotate-180")} />
              </button>
            )}

            {isDocumentosOpen && (
              <div className={cn("space-y-1", isCollapsed ? "mt-1" : "ml-8 mt-1")}>
                {documentosSubmenu.map((subItem) => {
                  const isSubActive = pathname === subItem.href
                  const SubIcon = subItem.icon

                  if (isCollapsed) {
                    return (
                      <Tooltip key={subItem.href} delayDuration={0}>
                        <TooltipTrigger asChild>
                          <Link
                            href={subItem.href}
                            className={cn(
                              "flex items-center justify-center px-4 py-2 rounded-lg transition-all",
                              "hover:bg-white/10",
                              isSubActive && "bg-white/10 text-white font-medium",
                            )}
                          >
                            {SubIcon && (
                              <span className="w-4 h-4 flex-shrink-0">
                                <SubIcon />
                              </span>
                            )}
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="ml-2">
                          <p>{subItem.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    )
                  }

                  return (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm",
                        "hover:bg-white/10",
                        isSubActive && "bg-white/10 text-white font-medium",
                      )}
                    >
                      {SubIcon && (
                        <span className="w-4 h-4 flex-shrink-0">
                          <SubIcon />
                        </span>
                      )}
                      <span>{subItem.label}</span>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {canAccessDatabase && (
            <>
              {isCollapsed ? (
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href="/banco-de-dados"
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                        "hover:bg-white/10",
                        (pathname === "/banco-de-dados" || pathname.startsWith("/banco-de-dados/")) &&
                          "bg-white/10 text-white font-medium",
                        "justify-center",
                      )}
                    >
                      <span className="w-5 h-5 flex-shrink-0">
                        <DatabaseIcon />
                      </span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="ml-2">
                    <p>Banco de Dados</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Link
                  href="/banco-de-dados"
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                    "hover:bg-white/10",
                    (pathname === "/banco-de-dados" || pathname.startsWith("/banco-de-dados/")) &&
                      "bg-white/10 text-white font-medium",
                  )}
                >
                  <span className="w-5 h-5 flex-shrink-0">
                    <DatabaseIcon />
                  </span>
                  <span>Banco de Dados</span>
                </Link>
              )}
            </>
          )}

          {canAccessUsers && (
            <>
              {isCollapsed ? (
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href="/usuarios"
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                        "hover:bg-white/10",
                        pathname === "/usuarios" && "bg-white/10 text-white font-medium",
                        "justify-center",
                      )}
                    >
                      <span className="w-5 h-5 flex-shrink-0">
                        <Users className="w-5 h-5" />
                      </span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="ml-2">
                    <p>Usuários</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Link
                  href="/usuarios"
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                    "hover:bg-white/10",
                    pathname === "/usuarios" && "bg-white/10 text-white font-medium",
                  )}
                >
                  <span className="w-5 h-5 flex-shrink-0">
                    <Users className="w-5 h-5" />
                  </span>
                  <span>Usuários</span>
                </Link>
              )}
            </>
          )}
        </nav>

        <div className="pt-4 border-t border-neutral-700 space-y-2">
          {isCollapsed ? (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href="/ajustes"
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                    "hover:bg-white/10",
                    pathname === "/ajustes" && "bg-white/10 text-white font-medium",
                    "justify-center",
                  )}
                >
                  <Settings className="w-5 h-5 flex-shrink-0" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="ml-2">
                <p>Ajustes</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              href="/ajustes"
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                "hover:bg-white/10",
                pathname === "/ajustes" && "bg-white/10 text-white font-medium",
              )}
            >
              <Settings className="w-5 h-5 flex-shrink-0" />
              <span>Ajustes</span>
            </Link>
          )}
        </div>
      </aside>
    </TooltipProvider>
  )
}