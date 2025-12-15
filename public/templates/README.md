# Templates de Documentos

Esta pasta contém os templates DOCX usados para gerar contratos e ordens de serviço.

## 📝 Como criar um template DOCX

### 1. Crie o documento no Microsoft Word

Exemplo de template:
```
CONTRATO DE PRESTAÇÃO DE SERVIÇOS

CONTRATANTE
Nome: {nome}
CPF: {cpf}
RG: {rg}
Endereço: {endereco}, {numero}
Bairro: {bairro}
Cidade: {cidade} - {estado}
CEP: {cep}
Telefone: {telefone}
E-mail: {email}

VALOR DO CONTRATO
O valor total dos serviços é de R$ {valor} ({valorExtenso}).

DATA
{data}
```

### 2. Sintaxe de variáveis

Use `{variavel}` para placeholders simples:
- `{nome}` - Texto simples
- `{valor}` - Valores numéricos
- `{data}` - Datas

### 3. Variáveis aninhadas (objetos)

Se seus dados têm estrutura:
```typescript
{
  cliente: {
    nome: 'João',
    cpf: '123.456.789-00'
  }
}
```

Use no template:
```
Nome: {cliente.nome}
CPF: {cliente.cpf}
```

### 4. Loops (listas/arrays)

Para arrays de itens:
```
{#servicos}
- {descricao}: R$ {valor}
{/servicos}
```

Dados:
```typescript
{
  servicos: [
    { descricao: 'Instalação', valor: '500,00' },
    { descricao: 'Configuração', valor: '300,00' }
  ]
}
```

Resultado:
```
- Instalação: R$ 500,00
- Configuração: R$ 300,00
```

### 5. Condicionais

Mostrar conteúdo apenas se variável existir:
```
{#temDesconto}
Desconto aplicado: {desconto}%
{/temDesconto}
```

## 📂 Estrutura de arquivos

```
public/templates/
  ├── README.md (este arquivo)
  ├── contrato-fisica.docx
  ├── contrato-juridica.docx
  └── ordem-servico.docx
```

## 🔧 Como usar no código

### No cliente (React/Next.js)

```typescript
import { DocxGenerator } from '@/lib/document-generator/docx-generator'

async function gerarContrato() {
  // Buscar template
  const response = await fetch('/templates/contrato-fisica.docx')
  const templateBuffer = await response.arrayBuffer()
  
  // Gerar documento
  const docBuffer = await DocxGenerator.generateFromTemplate(
    Buffer.from(templateBuffer),
    {
      nome: 'João Silva',
      cpf: '123.456.789-00',
      endereco: 'Rua Example',
      numero: '123',
      // ... outros campos
    }
  )
  
  // Download
  const blob = new Blob([docBuffer], { 
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'contrato.docx'
  link.click()
  URL.revokeObjectURL(url)
}
```

### Na API (Server-side)

```typescript
// app/api/generate-docx/route.ts
import { NextResponse } from 'next/server'
import { DocxGenerator } from '@/lib/document-generator/docx-generator'

export async function POST(request: Request) {
  const { templateId, data } = await request.json()
  
  // Gerar documento do servidor
  const docBuffer = await DocxGenerator.generateFromServerTemplate(
    `public/templates/${templateId}.docx`,
    data
  )
  
  // Retornar arquivo
  return new NextResponse(docBuffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="${templateId}.docx"`
    }
  })
}
```

## 📋 Variáveis disponíveis por template

### contrato-fisica.docx
- `{nome}` - Nome completo
- `{cpf}` - CPF formatado
- `{rg}` - RG
- `{endereco}` - Logradouro
- `{numero}` - Número
- `{bairro}` - Bairro
- `{cidade}` - Cidade
- `{estado}` - UF
- `{cep}` - CEP
- `{telefone}` - Telefone
- `{email}` - E-mail
- `{valor}` - Valor formatado
- `{valorExtenso}` - Valor por extenso
- `{data}` - Data atual

### contrato-juridica.docx
- `{razaoSocial}` - Razão Social
- `{cnpj}` - CNPJ formatado
- `{inscricaoEstadual}` - IE
- `{responsavel}` - Nome do responsável
- `{cargo}` - Cargo do responsável
- Demais campos igual ao contrato física

### ordem-servico.docx
- `{numero}` - Número da OS
- `{cliente}` - Nome do cliente
- `{servico}` - Descrição do serviço
- `{tecnico}` - Nome do técnico
- `{dataInicio}` - Data de início
- `{dataTermino}` - Data de término
- `{observacoes}` - Observações

## 🎨 Formatação

O template mantém toda formatação do Word:
- ✅ Negrito, itálico, sublinhado
- ✅ Cores de texto e fundo
- ✅ Tamanhos e fontes
- ✅ Alinhamento (esquerda, centro, direita, justificado)
- ✅ Tabelas
- ✅ Imagens
- ✅ Cabeçalhos e rodapés
- ✅ Numeração e marcadores
- ✅ Quebras de página

## ⚠️ Dicas importantes

1. **Sempre teste o template** antes de usar em produção
2. **Não delete as chaves {}** ao editar no Word
3. **Use nomes descritivos** para variáveis
4. **Documente as variáveis** necessárias
5. **Mantenha backups** dos templates
6. **Teste com dados reais** e dados vazios

## 🐛 Troubleshooting

### Erro: "Variável não encontrada"
- Certifique-se que o nome da variável no template corresponde exatamente ao nome no objeto de dados

### Erro: "Template corrompido"
- Verifique se o arquivo DOCX não está corrompido
- Tente abrir no Word e salvar novamente

### Variáveis não substituídas
- Verifique se usou `{variavel}` e não `{{variavel}}` ou `$variavel$`
- Certifique-se que não há espaços: `{ variavel }` não funciona

### Formatação perdida
- Aplique a formatação diretamente no template DOCX
- Não tente formatar via código
