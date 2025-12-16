# 🖼️ Como Inserir Imagens nos Templates DOCX

## ⚠️ IMPORTANTE: Sintaxe Correta para Imagens

Para inserir imagens no template DOCX, você **DEVE** usar a sintaxe especial com `%`:

```
{%foto_orcamento}
```

**NÃO use:**
- `{foto_orcamento}` ❌ (isso é para texto, não funciona com imagens)

## 📝 Regras Importantes:

### 1. O placeholder da imagem deve estar em um parágrafo dedicado
❌ **Errado:**
```
Orçamento: {%foto_orcamento} - Data: {data}
```

✅ **Correto:**
```
Orçamento:

{%foto_orcamento}

Data: {data}
```

### 2. Sintaxe disponível:
- `{%foto_orcamento}` - Imagem não centralizada
- `{%%foto_orcamento}` - Imagem centralizada (com `%%`)

### 3. Tamanho da imagem:
- Atualmente configurado para: **150x150 pixels**
- Para alterar, edite `getSize` em `docx-to-pdf.ts`

## 🔧 Como o Sistema Funciona:

1. **Frontend:** Usuário faz upload da imagem
2. **Conversão:** Imagem → base64 string
3. **Backend:** base64 → Buffer
4. **ImageModule:** Insere Buffer no DOCX como arquivo binário em `/word/media/`
5. **Resultado:** Word abre corretamente com imagem embutida

## 📚 Formato Esperado pelo Word:

- **Formato:** Buffer (dados binários da imagem)
- **Não é:** base64, URL, ou caminho de arquivo
- **Localização no DOCX:** `/word/media/image1.png` (ou .jpg)
- **Referência no XML:** Via relacionamentos (`<a:blip r:embed="rId4"/>`)

## 🐛 Troubleshooting:

### Erro "Xml parsing error":
✅ **Solução:** Adicione `fileType: 'docx'` nas opções do ImageModule

### Imagem não aparece:
✅ **Solução:** Verifique se está usando `{%foto_orcamento}` (com `%`)

### Imagem muito grande ou pequena:
✅ **Solução:** Ajuste os valores em `getSize()` - formato `[largura, altura]` em pixels

### Documento corrupto:
✅ **Solução:** Certifique-se que o placeholder está em parágrafo dedicado

## 💡 Exemplo Completo:

**Template DOCX:**
```
CONTRATO DE PRESTAÇÃO DE SERVIÇOS

Cliente: {nome_contratante}
CPF: {cpf_contratante}

ORÇAMENTO ANEXO:

{%foto_orcamento}

Valor Total: R$ {valor_final}
```

**Código:**
```typescript
const data = {
  nome_contratante: "João Silva",
  cpf_contratante: "123.456.789-00",
  foto_orcamento_base64: "data:image/png;base64,iVBORw0KG...",
  valor_final: "10.000,00"
}
```

O sistema automaticamente:
1. Detecta `foto_orcamento_base64`
2. Converte para Buffer
3. Remove o sufixo `_base64`
4. Disponibiliza como `foto_orcamento` para o template
5. ImageModule insere a imagem no lugar de `{%foto_orcamento}`

## 🔗 Referências:

- [docxtemplater-image-module-free NPM](https://www.npmjs.com/package/docxtemplater-image-module-free)
- [Documentação Oficial docxtemplater](https://docxtemplater.com/docs/tag-types/#images)
- Código implementado: `lib/document-generator/docx-to-pdf.ts`
