"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, ChevronRight, ChevronDown } from "lucide-react"
import { toast } from "sonner"

interface QuickRepliesPanelProps {
  onSelectReply: (message: string) => void
}

interface QuickReply {
  id: string
  title: string
  message: string
  category_id: string
  category: {
    id: string
    name: string
  }
  created_by_name: string
}

interface Category {
  id: string
  name: string
}

export function QuickRepliesPanel({ onSelectReply }: QuickRepliesPanelProps) {
  const [replies, setReplies] = useState<QuickReply[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      setLoading(true)

      const [repliesRes, categoriesRes] = await Promise.all([
        fetch("/api/whatsapp/quick-replies"),
        fetch("/api/whatsapp/quick-reply-categories"),
      ])

      const repliesData = await repliesRes.json()
      const categoriesData = await categoriesRes.json()

      if (repliesData.success) {
        setReplies(repliesData.replies || [])
      }

      if (categoriesData.success) {
        setCategories(categoriesData.categories || [])
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
      toast.error("Erro ao carregar respostas rápidas")
    } finally {
      setLoading(false)
    }
  }

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId)
      } else {
        newSet.add(categoryId)
      }
      return newSet
    })
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Respostas Rápidas</h3>
        <p className="text-xs text-muted-foreground">Clique na categoria para expandir</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {categories.map((category) => {
            const categoryReplies = replies.filter((r) => r.category?.id === category.id)
            const isExpanded = expandedCategories.has(category.id)

            if (categoryReplies.length === 0) return null

            return (
              <div key={category.id} className="mb-2">
                <Button
                  variant="ghost"
                  className="w-full justify-between text-left h-auto py-2 px-3 hover:bg-accent"
                  onClick={() => toggleCategory(category.id)}
                >
                  <span className="font-medium text-sm">{category.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">({categoryReplies.length})</span>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </Button>

                {isExpanded && (
                  <div className="ml-2 mt-1 space-y-1">
                    {categoryReplies.map((reply) => (
                      <Button
                        key={reply.id}
                        variant="outline"
                        className="w-full justify-start text-left h-auto py-3 px-4 hover:bg-accent bg-transparent"
                        onClick={() => onSelectReply(reply.message)}
                      >
                        <div className="flex flex-col gap-1 w-full">
                          <div className="font-medium text-sm break-words">{reply.title}</div>
                          <div className="text-xs text-muted-foreground line-clamp-3 break-words whitespace-pre-wrap">{reply.message}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
