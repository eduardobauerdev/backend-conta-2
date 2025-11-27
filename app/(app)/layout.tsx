"use client"

import type React from "react"

import { Sidebar } from "@/components/Sidebar"
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context"
import { WhatsAppProvider } from "@/contexts/whatsapp-context"
import { WhatsAppCacheProvider } from "@/contexts/whatsapp-cache-context"

function AppLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const { isCollapsed } = useSidebar()

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main
        className="flex-1 transition-all duration-300 ease-in-out"
        style={{ marginLeft: isCollapsed ? "88px" : "280px" }}
      >
        {children}
      </main>
    </div>
  )
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <WhatsAppProvider>
        <WhatsAppCacheProvider>
          <AppLayoutContent>{children}</AppLayoutContent>
        </WhatsAppCacheProvider>
      </WhatsAppProvider>
    </SidebarProvider>
  )
}
