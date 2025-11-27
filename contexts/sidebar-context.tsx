"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface SidebarContextType {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
  toggleCollapse: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsedState] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed')
    if (saved !== null) {
      setIsCollapsedState(saved === 'true')
    }
    setIsMounted(true)
  }, [])

  const setIsCollapsed = (value: boolean) => {
    setIsCollapsedState(value)
    localStorage.setItem('sidebar-collapsed', value.toString())
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  // Avoid hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return null
  }

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed, toggleCollapse }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
