# Guia: Como Usar Templates DOCX para Contratos

Este guia explica como usar arquivos DOCX (Word) como templates para gerar contratos e ordens de serviço.

## 🎯 Por que usar DOCX?

✅ **Fácil edição** - Qualquer pessoa pode editar no Word  
✅ **Formatação rica** - Negrito, cores, tabelas, imagens  
✅ **Find & Replace** - Substituição automática de variáveis  
✅ **Familiar** - Não precisa saber programar  
✅ **Reutilizável** - Um template, infinitos documentos  

## 📥 Passo 1: Criar o Template

### 1.1. Abra o Microsoft Word

Crie um novo documento ou use um contrato existente.

### 1.2. Insira placeholders (variáveis)

Use `{nomedavariavel}` onde você quer que dados sejam inseridos:

```
CONTRATO DE PRESTAÇÃO DE SERVIÇOS Nº {numeroContrato}

Data: {data}

CONTRATANTE
Nome: {nome}
CPF: {cpf}
Endereço: {endereco}, {numero}
Bairro: {bairro}, Cidade: {cidade} - {estado}
CEP: {cep}
Telefone: {telefone}
E-mail: {email}

OBJETO DO CONTRATO
Prestação de serviços de {tipoServico}.

VALOR
O valor total do contrato é de R$ {valor} ({valorExtenso}).

Formas de pagamento: {formaPagamento}

CLÁUSULA PRIMEIRA - DO OBJETO
{clausula1}

CLÁUSULA SEGUNDA - DO PRAZO
{clausula2}

___________________________        ___________________________
    {nome}                              Empresa
   Contratante                          Contratada
```

### 1.3. Formate o documento

- Aplique negrito, cores, fontes desejadas
- Adicione logo da empresa
- Configure cabeçalho e rodapé
- Adicione tabelas se necessário

### 1.4. Salve o arquivo

Salve em: `/public/templates/seu-template.docx`

## 📂 Passo 2: Colocar no Projeto

### Estrutura de pastas

```
backend-conta-2/
  public/
    templates/
      contrato-fisica.docx       ← Contratos pessoa física
      contrato-juridica.docx     ← Contratos pessoa jurídica  
      ordem-servico.docx         ← Ordens de serviço
      proposta-comercial.docx    ← Propostas
```

### Acessar via URL

Os arquivos em `/public/templates/` são acessíveis via:
```
https://seu-site.com/templates/contrato-fisica.docx
```

## 💻 Passo 3: Gerar Documentos

### 3.1. Instalar dependências

```bash
npm install docxtemplater pizzip
```

### 3.2. Usar no código

#### Exemplo simples (cliente)

```typescript
import { DocxGenerator } from '@/lib/document-generator/docx-generator'

async function gerarContrato() {
  // 1. Buscar template
  const response = await fetch('/templates/contrato-fisica.docx')
  const templateBuffer = await response.arrayBuffer()
  
  // 2. Preparar dados
  const dados = {
    numeroContrato: '2024/001',
    data: new Date().toLocaleDateString('pt-BR'),
    nome: 'João Silva',
    cpf: '123.456.789-00',
    endereco: 'Rua das Flores',
    numero: '123',
    bairro: 'Centro',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01234-567',
    telefone: '(11) 98765-4321',
    email: 'joao@email.com',
    tipoServico: 'instalação de internet',
    valor: '1.500,00',
    valorExtenso: 'mil e quinhentos reais',
    formaPagamento: 'Boleto bancário',
    clausula1: 'A empresa se compromete...',
    clausula2: 'O prazo de vigência...'
  }
  
  // 3. Gerar documento
  const docBuffer = await DocxGenerator.generateFromTemplate(
    Buffer.from(templateBuffer),
    dados
  )
  
  // 4. Fazer download
  const blob = new Blob([docBuffer], { 
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'contrato-joao-silva.docx'
  link.click()
  URL.revokeObjectURL(url)
}
```

#### Exemplo via API

```typescript
// app/api/contrato-fisica/route.ts

import { DocxGenerator } from '@/lib/document-generator/docx-generator'

export async function POST(request: Request) {
  const dadosDoFormulario = await request.json()
  
  // Gerar documento do servidor
  const docBuffer = await DocxGenerator.generateFromServerTemplate(
    'public/templates/contrato-fisica.docx',
    dadosDoFormulario
  )
  
  // Retornar para download
  return new Response(docBuffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="contrato.docx"`
    }
  })
}
```

#### Uso no componente React

```tsx
'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

export function GerarContratoButton({ dadosCliente }: any) {
  const [loading, setLoading] = useState(false)
  
  async function handleGerar() {
    setLoading(true)
    
    try {
      // Chamar API
      const response = await fetch('/api/generate-docx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: 'contrato-fisica',
          data: dadosCliente,
          filename: `contrato-${dadosCliente.nome}.docx`
        })
      })
      
      if (!response.ok) throw new Error('Erro ao gerar')
      
      // Download
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `contrato-${dadosCliente.nome}.docx`
      link.click()
      URL.revokeObjectURL(url)
      
      alert('Contrato gerado com sucesso!')
    } catch (error) {
      console.error(error)
      alert('Erro ao gerar contrato')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <Button onClick={handleGerar} disabled={loading}>
      <Download className="mr-2 h-4 w-4" />
      {loading ? 'Gerando...' : 'Gerar Contrato DOCX'}
    </Button>
  )
}
```

## 🎨 Recursos Avançados

### Loops (repetições)

Para gerar listas:

**Template:**
```
SERVIÇOS CONTRATADOS:
{#servicos}
- {descricao}: R$ {valor}
{/servicos}

Total: R$ {total}
```

**Dados:**
```typescript
{
  servicos: [
    { descricao: 'Instalação', valor: '500,00' },
    { descricao: 'Manutenção', valor: '300,00' },
    { descricao: 'Suporte', valor: '200,00' }
  ],
  total: '1.000,00'
}
```

**Resultado:**
```
SERVIÇOS CONTRATADOS:
- Instalação: R$ 500,00
- Manutenção: R$ 300,00
- Suporte: R$ 200,00

Total: R$ 1.000,00
```

### Condicionais

Mostrar/ocultar conteúdo:

**Template:**
```
{#temDesconto}
Desconto aplicado: {desconto}%
Valor com desconto: R$ {valorComDesconto}
{/temDesconto}
```

**Dados:**
```typescript
{
  temDesconto: true,
  desconto: 10,
  valorComDesconto: '1.350,00'
}
```

### Objetos aninhados

**Template:**
```
CLIENTE
Nome: {cliente.nome}
CPF: {cliente.cpf}

ENDEREÇO
Rua: {endereco.logradouro}, {endereco.numero}
Cidade: {endereco.cidade} - {endereco.uf}
```

**Dados:**
```typescript
{
  cliente: {
    nome: 'João Silva',
    cpf: '123.456.789-00'
  },
  endereco: {
    logradouro: 'Rua das Flores',
    numero: '123',
    cidade: 'São Paulo',
    uf: 'SP'
  }
}
```

## ⚠️ Limitações e Cuidados

### ❌ PDF como template NÃO funciona bem

PDF não é recomendado porque:
- Formato fechado, difícil de editar
- Texto é posicionado por coordenadas
- Não suporta find & replace tradicional
- Requer bibliotecas complexas e limitadas

**Alternativa:** 
1. Use DOCX como template
2. Gere o DOCX
3. Converta para PDF depois (se necessário)

### ✅ Boas práticas

1. **Teste o template** - Sempre gere um documento de teste
2. **Use nomes claros** - `{nomeCliente}` é melhor que `{n}`
3. **Documente variáveis** - Mantenha lista das variáveis usadas
4. **Backup** - Guarde cópias dos templates
5. **Validação** - Verifique se todas variáveis têm valores

### 🐛 Troubleshooting

**Variável não substituída:**
```
❌ {nome }  (espaço antes do })
❌ { nome}  (espaço depois do {)
✅ {nome}   (sem espaços)
```

**Erro "Template corrompido":**
- Abra no Word e salve novamente
- Certifique-se que é arquivo .docx (não .doc)

**Formatação perdida:**
- Aplique formatação no template, não no código
- Use ferramentas de formatação do Word

## 🔄 Migrar do Sistema Atual

Se você já usa templates HTML, pode migrar:

### Passo 1: Converta templates HTML para DOCX

1. Abra o HTML no navegador
2. Copie o conteúdo
3. Cole no Word
4. Ajuste formatação
5. Substitua valores fixos por `{variavel}`
6. Salve como DOCX

### Passo 2: Atualize endpoints

```typescript
// ANTES (HTML)
import { DocumentGenerator } from '@/templates'
const result = await DocumentGenerator.generateDocument({...})

// DEPOIS (DOCX)
import { DocxGenerator } from '@/lib/document-generator/docx-generator'
const docBuffer = await DocxGenerator.generateFromServerTemplate(
  'public/templates/contrato.docx',
  data
)
```

### Passo 3: Mantenha ambos (opcional)

Você pode oferecer as duas opções:
- **Download PDF** → Use sistema atual (HTML + Print)
- **Download DOCX** → Use novo sistema (Template DOCX)

## 📚 Referências

- [docxtemplater - Documentação oficial](https://docxtemplater.com/)
- [Sintaxe de templates](https://docxtemplater.com/docs/tag-types/)
- [Exemplos avançados](https://docxtemplater.com/demo/)

## 🎉 Pronto!

Agora você pode:
- ✅ Criar templates no Word
- ✅ Fazer find & replace automático
- ✅ Gerar documentos personalizados
- ✅ Manter formatação profissional
