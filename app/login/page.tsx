"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { setCookie } from "@/lib/auth"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    if (searchParams.get("cadastro") === "sucesso") {
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 5000)
    }
  }, [searchParams])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!email) {
      newErrors.email = "Email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email inválido"
    }

    if (!senha) {
      newErrors.senha = "Senha é obrigatória"
    } else if (senha.length < 6) {
      newErrors.senha = "Senha deve ter no mínimo 6 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const { data, error } = await supabase
        .from("perfis")
        .select("id, email, cargo, nome, foto_perfil")
        .eq("email", email)
        .eq("senha", senha)
        .maybeSingle()

      if (error) {
        setErrors({ form: "Erro ao fazer login. Tente novamente." })
        setIsLoading(false)
        return
      }

      if (!data) {
        setErrors({ form: "Email ou senha incorretos" })
        setIsLoading(false)
        return
      }

      setCookie("auth_user_id", data.id, 30)
      setCookie("auth_user_name", encodeURIComponent(data.nome || "Usuário"), 30)
      setCookie("auth_user_email", data.email, 30)
      setCookie("auth_user_cargo", data.cargo, 30)
      setCookie("auth_user_foto", data.foto_perfil || "", 30)

      supabase
        .from("perfis")
        .update({ ultimo_login: new Date().toISOString() })
        .eq("id", data.id)
        .then(() => {})
        .catch(() => {})

      window.location.href = "/visao-geral"
    } catch (error) {
      setErrors({ form: "Erro ao fazer login. Tente novamente." })
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4">
      <Card className="w-full max-w-md p-8 border-2 border-neutral-300">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Login</h1>
            <p className="text-neutral-600">Sistema de Ordem de Serviço</p>
          </div>

          {showSuccessMessage && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Conta criada com sucesso! Faça login para continuar.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-neutral-800">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`border-2 ${
                  errors.email ? "border-red-500 focus:border-red-500" : "border-neutral-300 focus:border-neutral-500"
                }`}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha" className="text-sm font-medium text-neutral-800">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="senha"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className={`border-2 pr-10 ${
                    errors.senha ? "border-red-500 focus:border-red-500" : "border-neutral-300 focus:border-neutral-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.senha && <p className="text-sm text-red-500">{errors.senha}</p>}
            </div>

            {errors.form && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{errors.form}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="text-center">
            <button
              type="button"
              className="text-sm text-neutral-600 hover:text-neutral-900 hover:underline"
              onClick={() => alert("Funcionalidade em desenvolvimento")}
            >
              Esqueceu sua senha?
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}
