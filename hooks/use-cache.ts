"use client"

import { useState, useEffect, useCallback } from "react"

interface CacheOptions {
  duration?: number // milliseconds
  key: string
  storage?: "memory" | "localStorage"
}

interface CacheData<T> {
  data: T
  timestamp: number
}

const memoryCache = new Map<string, CacheData<any>>()

export function useCache<T>(
  fetcher: () => Promise<T>,
  options: CacheOptions,
): {
  data: T | null
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
  invalidate: () => void
} {
  const { duration = 3600000, key, storage = "memory" } = options // default 1 hour

  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const getCached = useCallback((): CacheData<T> | null => {
    if (storage === "localStorage") {
      const stored = localStorage.getItem(key)
      if (stored) {
        try {
          return JSON.parse(stored)
        } catch {
          localStorage.removeItem(key)
          return null
        }
      }
    } else {
      return memoryCache.get(key) || null
    }
    return null
  }, [key, storage])

  const setCache = useCallback(
    (value: T) => {
      const cacheData: CacheData<T> = {
        data: value,
        timestamp: Date.now(),
      }

      if (storage === "localStorage") {
        localStorage.setItem(key, JSON.stringify(cacheData))
      } else {
        memoryCache.set(key, cacheData)
      }
    },
    [key, storage],
  )

  const invalidate = useCallback(() => {
    if (storage === "localStorage") {
      localStorage.removeItem(key)
    } else {
      memoryCache.delete(key)
    }
    setData(null)
  }, [key, storage])

  const fetch = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const cached = getCached()
      if (cached && Date.now() - cached.timestamp < duration) {
        setData(cached.data)
        setLoading(false)
        return
      }

      const result = await fetcher()
      setData(result)
      setCache(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"))
    } finally {
      setLoading(false)
    }
  }, [fetcher, getCached, setCache, duration])

  useEffect(() => {
    fetch() // Corrected variable name
  }, [])

  return { data, loading, error, refetch: fetch, invalidate }
}
