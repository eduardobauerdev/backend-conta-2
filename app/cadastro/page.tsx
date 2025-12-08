"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from 'next/navigation'
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Alert, AlertDescription } from "@/components/ui/alert"

function CadastroForm() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isValidating, setIsValidating] = useState(true)
  const [inviteData, setInviteData] = useState<{
    cargo: string
    id: string
  } | null>(null)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const inviteToken = searchParams.get('convite')
  const supabase = createClient()

  useEffect(() => {
    const validateInvite = async () => {
      if (!inviteToken) {
        setErrors({ form: "Token de convite inválido" })
        setIsValidating(false)
        return
      }

      try {
        const { data: invite, error } = await supabase
          .from('convites')
          .select('id, cargo, expira_em, usado')
          .eq('token', inviteToken)
          .maybeSingle()

        if (error || !invite) {
          setErrors({ form: "Convite não encontrado" })
          setIsValidating(false)
          return
        }

        if (invite.usado) {
          setErrors({ form: "Este convite já foi utilizado" })
          setIsValidating(false)
          return
        }

        const expirationDate = new Date(invite.expira_em)
        if (expirationDate < new Date()) {
          setErrors({ form: "Este convite expirou" })
          setIsValidating(false)
          return
        }

        setInviteData({
          cargo: invite.cargo,
          id: invite.id
        })
        setIsValidating(false)
      } catch (error) {
        console.error('[v0] Erro ao validar convite:', error)
        setErrors({ form: "Erro ao validar convite" })
        setIsValidating(false)
      }
    }

    validateInvite()
  }, [inviteToken, supabase])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!nome.trim()) {
      newErrors.nome = "Nome é obrigatório"
    }

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

    if (senha !== confirmarSenha) {
      newErrors.confirmarSenha = "As senhas não coincidem"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm() || !inviteData) {
      return
    }

    setIsLoading(true)

    try {
      const { data: existingUser } = await supabase
        .from('perfis')
        .select('id')
        .eq('email', email)
        .maybeSingle()

      if (existingUser) {
        setErrors({ email: "Este email já está cadastrado" })
        setIsLoading(false)
        return
      }

      const { data: newUser, error: insertError } = await supabase
        .from('perfis')
        .insert({
          nome: nome.trim(),
          email: email,
          senha: senha,
          cargo: inviteData.cargo,
          ultimo_login: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select('id')
        .single()

      if (insertError) {
        console.error('[v0] Erro ao criar usuário:', insertError)
        setErrors({ form: "Erro ao criar conta. Tente novamente." })
        setIsLoading(false)
        return
      }

      const { error: updateError } = await supabase
        .from('convites')
        .update({
          usado: true,
          usado_em: new Date().toISOString(),
          usado_por_id: newUser.id
        })
        .eq('id', inviteData.id)

      if (updateError) {
        console.error('[v0] Erro ao atualizar convite:', updateError)
      }

      router.push('/login?cadastro=sucesso')
      
    } catch (error) {
      console.error('[v0] Erro no cadastro:', error)
      setErrors({ form: "Erro ao criar conta. Tente novamente." })
      setIsLoading(false)
    }
  }

  if (isValidating) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4">
        <Card className="w-full max-w-md p-8 border-2 border-neutral-300">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-neutral-600" />
            <p className="text-neutral-600">Validando convite...</p>
          </div>
        </Card>
      </div>
    )
  }

  if (errors.form && !inviteData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4">
        <Card className="w-full max-w-md p-8 border-2 border-neutral-300">
          <div className="space-y-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.form}</AlertDescription>
            </Alert>
            <Button
              onClick={() => router.push('/login')}
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white"
            >
              Voltar ao Login
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4">
      <Card className="w-full max-w-md p-8 border-2 border-neutral-300">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Criar Conta</h1>
            <p className="text-neutral-600">
              Cargo: <span className="font-semibold">{inviteData?.cargo}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-sm font-medium text-neutral-800">
                Nome Completo
              </Label>
              <Input
                id="nome"
                type="text"
                placeholder="Seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={`border-2 ${
                  errors.nome 
                    ? "border-red-500 focus:border-red-500" 
                    : "border-neutral-300 focus:border-neutral-500"
                }`}
              />
              {errors.nome && (
                <p className="text-sm text-red-500">{errors.nome}</p>
              )}
            </div>

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
                  errors.email 
                    ? "border-red-500 focus:border-red-500" 
                    : "border-neutral-300 focus:border-neutral-500"
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha" className="text-sm font-medium text-neutral-800">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="senha"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 6 caracteres"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className={`border-2 pr-10 ${
                    errors.senha 
                      ? "border-red-500 focus:border-red-500" 
                      : "border-neutral-300 focus:border-neutral-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.senha && (
                <p className="text-sm text-red-500">{errors.senha}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmarSenha" className="text-sm font-medium text-neutral-800">
                Confirmar Senha
              </Label>
              <div className="relative">
                <Input
                  id="confirmarSenha"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Digite a senha novamente"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  className={`border-2 pr-10 ${
                    errors.confirmarSenha 
                      ? "border-red-500 focus:border-red-500" 
                      : "border-neutral-300 focus:border-neutral-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmarSenha && (
                <p className="text-sm text-red-500">{errors.confirmarSenha}</p>
              )}
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
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando conta...
                </>
              ) : (
                "Criar Conta"
              )}
            </Button>
          </form>

          <div className="text-center">
            <button
              type="button"
              className="text-sm text-neutral-600 hover:text-neutral-900 hover:underline"
              onClick={() => router.push('/login')}
            >
              Já tem uma conta? Faça login
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default function CadastroPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4">
        <Card className="w-full max-w-md p-8 border-2 border-neutral-300">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-neutral-600" />
            <p className="text-neutral-600">Carregando...</p>
          </div>
        </Card>
      </div>
    }>
      <CadastroForm />
    </Suspense>
  )
}
