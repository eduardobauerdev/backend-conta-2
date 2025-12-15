// Gerador de PDF usando método de impressão do navegador (mais confiável)
export class PDFGenerator {
  /**
   * Gera PDF usando janela de impressão (método mais confiável)
   * Este é o método RECOMENDADO pois sempre funciona em todos os navegadores
   */
  static async generateFromHTML(html: string, filename: string = 'document.pdf'): Promise<void> {
    // Criar nova janela para impressão
    const printWindow = window.open('', '_blank', 'width=1024,height=768')
    
    if (!printWindow) {
      throw new Error('Pop-up bloqueado. Permita pop-ups para gerar PDFs.')
    }

    const fullHtml = `
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${filename.replace('.pdf', '')}</title>
          <style>
            /* Estilos para impressão */
            @page {
              size: A4;
              margin: 1.5cm;
            }
            
            * {
              box-sizing: border-box;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            body {
              font-family: Arial, Helvetica, sans-serif;
              font-size: 12pt;
              line-height: 1.5;
              color: #000;
              margin: 0;
              padding: 0;
              background: white;
            }
            
            /* Estilos para tela (preview antes de imprimir) */
            @media screen {
              body {
                background: #f5f5f5;
                padding: 20px;
              }
              .page-container {
                background: white;
                max-width: 21cm;
                margin: 0 auto;
                padding: 2cm;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                min-height: 29.7cm;
              }
              .print-instructions {
                position: fixed;
                top: 10px;
                right: 10px;
                background: #007bff;
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                z-index: 9999;
                font-size: 14px;
                max-width: 300px;
              }
              .print-instructions strong {
                display: block;
                margin-bottom: 5px;
                font-size: 16px;
              }
              .print-instructions button {
                background: white;
                color: #007bff;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
                margin-top: 10px;
                font-weight: bold;
                width: 100%;
              }
              .print-instructions button:hover {
                background: #f0f0f0;
              }
            }
            
            /* Estilos para impressão */
            @media print {
              body {
                padding: 0;
                background: white;
              }
              .page-container {
                max-width: none;
                margin: 0;
                padding: 0;
                box-shadow: none;
                min-height: 0;
              }
              .print-instructions {
                display: none !important;
              }
              .no-print {
                display: none !important;
              }
              .page-break {
                page-break-after: always;
              }
              .page-break-before {
                page-break-before: always;
              }
              h1, h2, h3, h4, h5, h6 {
                page-break-after: avoid;
                page-break-inside: avoid;
              }
              table, figure, img {
                page-break-inside: avoid;
              }
              .signature-section,
              .signature-box {
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-instructions no-print">
            <strong>📄 Como gerar o PDF:</strong>
            <p style="margin: 10px 0; font-size: 13px;">
              1. Clique no botão abaixo<br>
              2. Na janela que abrir, selecione "Salvar como PDF"<br>
              3. Clique em "Salvar"
            </p>
            <button onclick="window.print()">🖨️ Imprimir / Gerar PDF</button>
            <button onclick="window.close()" style="background: #dc3545; color: white; margin-top: 5px;">✕ Fechar</button>
          </div>
          
          <div class="page-container">
            ${html}
          </div>
          
          <script>
            // Auto-trigger print após carregar
            window.onload = function() {
              setTimeout(() => {
                // Comentado para o usuário ter tempo de ver o documento
                // window.print();
              }, 500);
            };
            
            // Não fechar automaticamente
            // window.onafterprint = function() {
            //   setTimeout(() => window.close(), 1000);
            // };
          </script>
        </body>
      </html>
    `
    
    printWindow.document.write(fullHtml)
    printWindow.document.close()
  }

  /**
   * Baixa conteúdo como arquivo HTML para visualização
   */
  static downloadHTML(html: string, filename: string = 'preview.html'): void {
    const fullHTML = `
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${filename.replace('.html', '')}</title>
          <style>
            body {
              font-family: Arial, Helvetica, sans-serif;
              max-width: 21cm;
              margin: 0 auto;
              padding: 2cm;
              background: #f5f5f5;
              line-height: 1.5;
            }
            .document {
              background: white;
              padding: 2cm;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
              min-height: 29.7cm;
            }
            .print-button {
              position: fixed;
              top: 20px;
              right: 20px;
              background: #007bff;
              color: white;
              padding: 12px 24px;
              border: none;
              border-radius: 6px;
              cursor: pointer;
              font-size: 16px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.2);
              z-index: 1000;
            }
            .print-button:hover {
              background: #0056b3;
            }
            @media print {
              body { 
                background: white; 
                margin: 0; 
                padding: 0;
              }
              .document { 
                box-shadow: none; 
                margin: 0; 
                padding: 0;
              }
              .print-button { 
                display: none; 
              }
            }
          </style>
        </head>
        <body>
          <button class="print-button" onclick="window.print()">🖨️ Imprimir / Gerar PDF</button>
          <div class="document">
            ${html}
          </div>
        </body>
      </html>
    `
    
    const blob = new Blob([fullHTML], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}