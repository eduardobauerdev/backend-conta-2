# 📸 Como Inserir Imagens nos Contratos

## ✅ Configuração Concluída!

O sistema agora suporta inserção automática de imagens no template DOCX usando a chave `{foto_orcamento}`.

## 🎯 Como Usar

### 1. **No Template Word**

Abra seu template DOCX e digite onde quiser que a imagem apareça:

```
ORÇAMENTO DETALHADO

{foto_orcamento}

Conforme orçamento acima...
```

### 2. **No Formulário**

O usuário já pode enviar a imagem pelo sistema:
- Arraste e solte a imagem
- Cole com Ctrl+V
- Clique para selecionar arquivo

A imagem será automaticamente:
1. Convertida para base64
2. Enviada junto com os dados do contrato
3. Inserida no lugar de `{foto_orcamento}` no documento final

### 3. **Resultado**

O DOCX gerado terá a imagem do orçamento inserida no local exato onde você colocou `{foto_orcamento}`.

## ⚙️ Configurações de Tamanho

Por padrão, a imagem é inserida com:
- **Largura:** 600 pixels
- **Altura:** 400 pixels

Para alterar o tamanho, edite o arquivo `/lib/document-generator/docx-to-pdf.ts`:

```typescript
getSize: (img: Buffer, tagValue: any, tagName: string) => {
  return [600, 400] // [largura, altura] em pixels
}
```

### Exemplos de tamanhos:

| Uso | Largura | Altura | Código |
|-----|---------|--------|--------|
| Pequena | 400 | 300 | `[400, 300]` |
| Média | 600 | 400 | `[600, 400]` |
| Grande | 800 | 600 | `[800, 600]` |
| Página inteira | 700 | 900 | `[700, 900]` |

## 🔧 Opções Avançadas

### Centralizar Imagem

Para centralizar a imagem automaticamente, altere:

```typescript
const imageOpts = {
  centered: true, // ← mude para true
  // ...
}
```

### Múltiplas Imagens

Você pode ter várias chaves de imagem:

```
{foto_orcamento}
{foto_local}
{foto_instalacao}
```

Basta enviar cada imagem com a chave correspondente nos dados.

## ⚠️ Dicas Importantes

1. **Formato da Imagem:**
   - ✅ JPG/JPEG
   - ✅ PNG
   - ✅ GIF
   - ❌ SVG (não suportado)

2. **Tamanho do Arquivo:**
   - Recomendado: até 2MB por imagem
   - Imagens muito grandes podem deixar o DOCX pesado

3. **Posicionamento:**
   - Deixe `{foto_orcamento}` em uma linha separada
   - Não coloque texto na mesma linha da imagem

4. **Preview:**
   - Use a função "Pré-visualizar" para verificar se a imagem será inserida
   - A preview mostra "Buffer" se a imagem foi processada corretamente

## 🐛 Solução de Problemas

### Imagem não aparece no DOCX

1. Verifique se você digitou exatamente `{foto_orcamento}` no template
2. Confirme que a imagem foi enviada no formulário
3. Use a pré-visualização para verificar se há dados da imagem

### Imagem aparece distorcida

Ajuste o tamanho em `getSize()` para manter a proporção da imagem original.

### Erro ao gerar documento

- Certifique-se de que a imagem está em formato válido (JPG/PNG)
- Verifique o tamanho do arquivo (máximo recomendado: 2MB)

## 📝 Exemplo Completo

**Template (Word):**
```
CONTRATO DE PRESTAÇÃO DE SERVIÇOS

Cliente: {nome_contratante}
CPF: {cpf_contratante}

ORÇAMENTO FOTOGRÁFICO

{foto_orcamento}

Valor Total: R$ {valor_final}
```

**Resultado:**
- O nome do cliente será substituído
- O CPF será substituído
- A foto do orçamento será inserida
- O valor será substituído

Tudo automaticamente! 🎉
