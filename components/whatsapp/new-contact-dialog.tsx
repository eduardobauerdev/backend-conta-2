"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, Loader2 } from "lucide-react"
import { toast } from "sonner"

const COUNTRIES = [
  { code: "+55", name: "Brasil", emoji: "🇧🇷" },
  { code: "+1", name: "Estados Unidos", emoji: "🇺🇸" },
  { code: "+54", name: "Argentina", emoji: "🇦🇷" },
  { code: "+56", name: "Chile", emoji: "🇨🇱" },
  { code: "+57", name: "Colômbia", emoji: "🇨🇴" },
  { code: "+51", name: "Peru", emoji: "🇵🇪" },
  { code: "+52", name: "México", emoji: "🇲🇽" },
  { code: "+351", name: "Portugal", emoji: "🇵🇹" },
  { code: "+34", name: "Espanha", emoji: "🇪🇸" },
  { code: "+44", name: "Reino Unido", emoji: "🇬🇧" },
  { code: "+33", name: "França", emoji: "🇫🇷" },
  { code: "+49", name: "Alemanha", emoji: "🇩🇪" },
  { code: "+39", name: "Itália", emoji: "🇮🇹" },
  { code: "+81", name: "Japão", emoji: "🇯🇵" },
  { code: "+86", name: "China", emoji: "🇨🇳" },
]

interface NewContactDialogProps {
  onContactCreated: (chatId: string) => void
}

export function NewContactDialog({ onContactCreated }: NewContactDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [countryCode, setCountryCode] = useState("+55")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, (_, ddd, p1, p2) => {
        return `(${ddd}) ${p1}${p2 ? "-" + p2 : ""}`
      })
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, (_, ddd, p1, p2) => {
      return `(${ddd}) ${p1}${p2 ? "-" + p2 : ""}`
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !phone.trim()) {
      toast.error("Preencha todos os campos")
      return
    }

    setIsSubmitting(true)

    try {
      // Extract only numbers from phone
      const phoneNumbers = phone.replace(/\D/g, "")
      const fullPhone = `${countryCode.replace("+", "")}${phoneNumbers}`

      // Create chat with WhatsApp API
      const response = await fetch("/api/whatsapp/create-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: fullPhone,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Conversa iniciada com sucesso!")
        onContactCreated(data.chatId)
        setOpen(false)
        setName("")
        setPhone("")
        setCountryCode("+55")
      } else {
        toast.error(data.message || "Erro ao criar conversa")
      }
    } catch (error) {
      console.error("[v0] Error creating contact:", error)
      toast.error("Erro ao criar contato")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full gap-2 bg-transparent">
          <UserPlus className="w-4 h-4" />
          Chamar Novo Contato
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chamar Novo Contato</DialogTitle>
          <DialogDescription>Inicie uma conversa com um novo número do WhatsApp</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome do contato"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">País *</Label>
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger id="country">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      <span className="flex items-center gap-2">
                        <span>{country.emoji}</span>
                        <span>{country.name}</span>
                        <span className="text-muted-foreground">({country.code})</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone *</Label>
              <div className="flex gap-2">
                <div className="flex items-center px-3 border rounded-md bg-muted text-muted-foreground min-w-[70px] justify-center">
                  {countryCode}
                </div>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  placeholder="(00) 00000-0000"
                  maxLength={15}
                  className="flex-1"
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Criando...
                </>
              ) : (
                "Iniciar Conversa"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
