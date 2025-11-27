'use client'

import { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react'
import { getUserIdFromCookie, getUserData } from '@/lib/auth'

export interface UserData {
  id: string
  email: string
  cargo: string
  nome: string
  foto_perfil: string | null
}

interface UserContextType {
  user: UserData | null
  loading: boolean
  refreshUser: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const userCache = new Map<string, { data: UserData; timestamp: number }>()
const CACHE_DURATION = 30 * 60 * 1000 // Aumentado para 30 minutos

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const hasInitialized = useRef(false)

  const getCachedUser = (userId: string): UserData | null => {
    const cached = userCache.get(userId)
    if (cached) {
      const isExpired = Date.now() - cached.timestamp > CACHE_DURATION
      if (!isExpired) {
        return cached.data
      } else {
        userCache.delete(userId)
      }
    }
    return null
  }

  const setCachedUser = (userId: string, userData: UserData) => {
    userCache.set(userId, { data: userData, timestamp: Date.now() })
  }

  const loadUser = async () => {
    try {
      const userId = getUserIdFromCookie()
      
      if (userId) {
        let userData = getCachedUser(userId)
        
        if (userData) {
          setUser(userData)
          setLoading(false)
          return
        }
        
        userData = await getUserData(userId)
        if (userData) {
          setCachedUser(userId, userData)
          setUser(userData)
        }
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true
      loadUser()
    }
  }, [])

  const refreshUser = async () => {
    try {
      const userId = getUserIdFromCookie()
      if (userId) {
        userCache.delete(userId)
        
        const userData = await getUserData(userId)
        if (userData) {
          setCachedUser(userId, userData)
          setUser(userData)
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error)
    }
  }

  return (
    <UserContext.Provider value={{ user, loading, refreshUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
