# 📝 Instruções para Templates DOCX

## Como preparar os templates

### 1. Abra seu contrato no Microsoft Word

Use os contratos que você já tem no Google Docs ou crie novos.

### 2. Substitua valores por placeholders

No lugar dos valores que devem ser preenchidos, use o nome da variável **entre chaves `{}`**:

#### ✅ CORRETO (funciona com docxtemplater):
```
Nome: {nome_contratante}
CPF: {cpf_contratante}
Valor: R$ {valor_final}
```

#### ❌ ERRADO (não funciona):
```
Nome: nome_contratante           ← Falta as chaves {}
CPF: {{cpf_contratante}}        ← Chaves duplas (errado)
Valor: $valor_final$            ← Caracteres errados
Nome: { nome_contratante }      ← Espaços dentro das chaves
```

### 3. Variáveis disponíveis

#### CONTRATO PESSOA FÍSICA (`contrato-fisica.docx`)

Coloque essas variáveis **entre chaves** onde quer que os valores apareçam:

```
{tipo_projeto}
{nome_contratante}
{telefone_contratante}
{endereco_contratante}
{cpf_contratante}
{forma_pagamento_nao_parcelado}
{valor_produtos_instalacao}
{valor_entrada}
{valor_desconto}
{quantidade_parcelas}
{forma_pagamento_parcelas}
{observacao_pagamento}
{data_emissao_contrato}
{valor_parcelas}
{valor_total_extenso}
{valor_parcela_extenso}
{valor_final}
```

**Exemplo de uso no Word:**
```
CONTRATO DE PRESTAÇÃO DE SERVIÇOS

Tipo de Projeto: {tipo_projeto}

CONTRATANTE
Nome: {nome_contratante}
CPF: {cpf_contratante}
Telefone: {telefone_contratante}
Endereço: {endereco_contratante}

PAGAMENTO
Valor Total: R$ {valor_final}
Valor por Extenso: {valor_total_extenso}

Entrada: R$ {valor_entrada}
Desconto: R$ {valor_desconto}

Forma de pagamento: {forma_pagamento_nao_parcelado}

PARCELAMENTO
Quantidade de parcelas: {quantidade_parcelas}
Valor de cada parcela: R$ {valor_parcelas}
Valor por extenso: {valor_parcela_extenso}
Forma de pagamento: {forma_pagamento_parcelas}

Observações: {observacao_pagamento}

Data de emissão: {data_emissao_contrato}

IMAGEM DO ORÇAMENTO
{foto_orcamento}
```

**IMPORTANTE sobre a imagem:**
- Use `{foto_orcamento}` para inserir a imagem do orçamento
- A imagem será inserida automaticamente quando o usuário enviar uma foto
- A imagem terá 600x400 pixels por padrão
- Deixe a chave em uma linha separada para melhor visualização

#### CONTRATO PESSOA JURÍDICA (`contrato-juridica.docx`)

Todas as variáveis da pessoa física MAIS:

```
{cnpj_contratante}
{nome_representante}
{cargo_representante}
{cpf_representante}
{telefone_representante}
```

**Exemplo adicional no Word:**
```
CONTRATANTE (PESSOA JURÍDICA)
Razão Social: {nome_contratante}
CNPJ: {cnpj_contratante}
Endereço: {endereco_contratante}
Telefone: {telefone_contratante}

REPRESENTANTE LEGAL
Nome: {nome_representante}
Cargo: {cargo_representante}
CPF: {cpf_representante}
Telefone: {telefone_representante}
```

### 4. Formatação

**Você pode usar toda formatação do Word:**
- ✅ Negrito
- ✅ Itálico
- ✅ Cores
- ✅ Alinhamento
- ✅ Tabelas
- ✅ Listas
- ✅ Cabeçalhos e rodapés
- ✅ Quebras de página

**Importante:** Formate as variáveis como quiser! Exemplo:

```
Nome: {nome_contratante}  ← pode deixar em negrito
CPF: {cpf_contratante}    ← pode deixar em vermelho
```

O sistema vai substituir o texto mantendo a formatação.

### 5. Salvar o arquivo

1. **Salvar como:** `.docx` (não use `.doc`)
2. **Nome do arquivo:**
   - `contrato-fisica.docx` para pessoa física
   - `contrato-juridica.docx` para pessoa jurídica
3. **Local:** Coloque em `/public/templates/`

### 6. Testar

Depois de criar o template:

1. Cole o arquivo DOCX em `/public/templates/`
2. Acesse a aplicação
3. Vá em "Gerar Contrato"
4. Preencha os dados
5. Clique em "Gerar"
6. O sistema vai:
   - Ler o template
   - Substituir todas as variáveis
   - Gerar DOCX preenchido
   - Fazer download automático

### 7. Conversão para PDF

**Opção 1: Abrir e salvar manualmente**
- Baixe o DOCX gerado
- Abra no Word ou Google Docs
- Salve como PDF

**Opção 2: Print to PDF (recomendado)**
- O sistema pode abrir o documento em nova janela
- Use Ctrl+P ou Cmd+P
- Selecione "Salvar como PDF"

**Opção 3: Conversão automática (futuro)**
- Podemos adicionar conversão automática DOCX → PDF
- Requer LibreOffice no servidor ou API externa

## 🎯 Dicas importantes

### ✅ FAZER:
- Use os nomes exatos das variáveis listadas acima entre chaves `{}`
- Mantenha a formatação do Word (negrito, cores, etc)
- Teste com dados reais antes de usar em produção
- Faça backup dos templates
- Digite a variável de uma vez só (sem pausar no meio)

### ❌ NÃO FAZER:
- Não esqueça as chaves: `nome_contratante` não funciona, use `{nome_contratante}`
- Não use chaves duplas: `{{nome}}` não funciona
- Não use espaços: `{ nome_contratante }` não funciona
- Não altere o nome das variáveis: `{nomeContratante}` ≠ `{nome_contratante}`
- Não salve como `.doc` (formato antigo)

## 📊 Exemplo de dados enviados

Quando o formulário é preenchido, o sistema envia:

```json
{
  "tipo_projeto": "Instalação de corrimão",
  "nome_contratante": "João Silva",
  "telefone_contratante": "(11) 98765-4321",
  "endereco_contratante": "Rua das Flores, 123 - Centro",
  "cpf_contratante": "123.456.789-00",
  "forma_pagamento_nao_parcelado": "Pix",
  "valor_produtos_instalacao": "R$ 5.000,00",
  "valor_entrada": "R$ 1.000,00",
  "valor_desconto": "R$ 200,00",
  "quantidade_parcelas": "4",
  "forma_pagamento_parcelas": "Boleto",
  "observacao_pagamento": "Parcelas com vencimento todo dia 10",
  "data_emissao_contrato": "2024-12-15",
  "valor_parcelas": "R$ 1.000,00",
  "valor_total_extenso": "quatro mil e oitocentos reais",
  "valor_final": "R$ 4.800,00"
}
```

O sistema pega cada valor e substitui a variável correspondente no template.

## 🔧 Troubleshooting

### Variável não foi substituída

**Problema:** No documento final aparece `{nome_contratante}` em vez do nome

**Solução:**
1. Verifique se escreveu o nome exato da variável entre chaves
2. O Word às vezes divide o texto - delete e digite novamente de uma vez só
3. Verifique se o campo foi enviado no formulário

### Erro ao abrir template

**Problema:** "Falha ao processar template DOCX"

**Solução:**
1. Verifique se o arquivo é .docx (não .doc)
2. Abra o arquivo no Word e salve novamente
3. Confirme que está em `/public/templates/`

### Formatação perdida

**Problema:** PDF sem cores/negrito

**Solução:**
- Aplique formatação no template Word
- Não tente formatar via código
- Use Print to PDF em vez de conversão automática

## 📞 Suporte

Se tiver dúvidas:
1. Verifique se seguiu todas as instruções acima
2. Teste com dados de exemplo
3. Consulte os logs do console do navegador
