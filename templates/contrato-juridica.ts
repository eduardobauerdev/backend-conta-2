export const CONTRATO_JURIDICA_TEMPLATE = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contrato de Prestação de Serviços - Pessoa Jurídica</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #007bff;
            padding-bottom: 20px;
        }
        .company-name {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
            margin-bottom: 5px;
        }
        .contract-title {
            font-size: 18px;
            font-weight: bold;
            margin: 20px 0;
            text-transform: uppercase;
        }
        .section {
            margin: 20px 0;
        }
        .section-title {
            font-weight: bold;
            color: #007bff;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
            margin-bottom: 10px;
        }
        .field-group {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin: 15px 0;
        }
        .field {
            flex: 1;
            min-width: 200px;
        }
        .field-label {
            font-weight: bold;
            color: #666;
        }
        .field-value {
            border-bottom: 1px solid #333;
            display: inline-block;
            min-width: 150px;
            padding: 2px 5px;
        }
        .signature-section {
            margin-top: 50px;
            display: flex;
            justify-content: space-between;
        }
        .signature-box {
            text-align: center;
            width: 250px;
        }
        .signature-line {
            border-bottom: 1px solid #333;
            height: 40px;
            margin-bottom: 10px;
        }
        .terms {
            background: #f8f9fa;
            padding: 15px;
            border-left: 4px solid #007bff;
            margin: 20px 0;
            font-size: 14px;
        }
        .date-location {
            text-align: right;
            margin: 20px 0;
            font-style: italic;
        }
        .representative-section {
            background: #f0f8ff;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="company-name">INOVA INOX</div>
        <div>CNPJ: XX.XXX.XXX/XXXX-XX</div>
        <div>Endereço da Empresa</div>
        <div>Telefone: (XX) XXXXX-XXXX</div>
    </div>

    <div class="contract-title">
        CONTRATO DE PRESTAÇÃO DE SERVIÇOS - PESSOA JURÍDICA
    </div>

    <div class="section">
        <div class="section-title">1. DADOS DA EMPRESA CONTRATANTE</div>
        <div class="field-group">
            <div class="field">
                <span class="field-label">Razão Social:</span>
                <span class="field-value">{{nome}}</span>
            </div>
            <div class="field">
                <span class="field-label">CNPJ:</span>
                <span class="field-value">{{cnpj|cnpj}}</span>
            </div>
        </div>
        <div class="field-group">
            <div class="field">
                <span class="field-label">Telefone:</span>
                <span class="field-value">{{telefone|phone}}</span>
            </div>
        </div>
        <div class="field-group">
            <div class="field" style="flex: 2;">
                <span class="field-label">Endereço:</span>
                <span class="field-value">{{endereco_contrato}}</span>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">2. REPRESENTANTE LEGAL</div>
        <div class="representative-section">
            <div class="field-group">
                <div class="field">
                    <span class="field-label">Nome do Representante:</span>
                    <span class="field-value">{{nome_representante}}</span>
                </div>
                <div class="field">
                    <span class="field-label">CPF:</span>
                    <span class="field-value">{{cpf_representante|cpf}}</span>
                </div>
            </div>
            <div class="field-group">
                <div class="field">
                    <span class="field-label">Cargo:</span>
                    <span class="field-value">{{cargo_representante}}</span>
                </div>
                <div class="field">
                    <span class="field-label">Telefone:</span>
                    <span class="field-value">{{telefone_representante|phone}}</span>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">3. OBJETO DO CONTRATO</div>
        <div class="field-group">
            <div class="field" style="flex: 2;">
                <span class="field-label">Tipo de Projeto:</span>
                <span class="field-value">{{tipo_projeto}}</span>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">4. CONDIÇÕES FINANCEIRAS</div>
        <div class="field-group">
            <div class="field">
                <span class="field-label">Valor dos Produtos/Instalação:</span>
                <span class="field-value">{{valor_produtos_instalacao|currency}}</span>
            </div>
            <div class="field">
                <span class="field-label">Valor de Entrada:</span>
                <span class="field-value">{{valor_entrada|currency}}</span>
            </div>
        </div>
        <div class="field-group">
            <div class="field">
                <span class="field-label">Desconto:</span>
                <span class="field-value">{{valor_desconto|currency}}</span>
            </div>
            <div class="field">
                <span class="field-label">Forma de Pagamento:</span>
                <span class="field-value">{{forma_pagamento}}</span>
            </div>
        </div>
        <div class="field-group">
            <div class="field">
                <span class="field-label">Quantidade de Parcelas:</span>
                <span class="field-value">{{quantidade_parcelas}}</span>
            </div>
            <div class="field">
                <span class="field-label">Forma Pagamento Parcelas:</span>
                <span class="field-value">{{forma_pagamento_parcelas}}</span>
            </div>
        </div>
        <div class="field-group">
            <div class="field" style="flex: 2;">
                <span class="field-label">Observações sobre Pagamento:</span>
                <span class="field-value">{{observacao_pagamento}}</span>
            </div>
        </div>
    </div>

    <div class="terms">
        <strong>CLÁUSULAS GERAIS:</strong><br>
        1. O presente contrato é firmado entre as partes em caráter irrevogável e irretratável.<br>
        2. A execução dos serviços seguirá o cronograma estabelecido entre as partes.<br>
        3. A empresa contratante garante que o representante legal possui poderes para firmar este contrato.<br>
        4. Quaisquer alterações deverão ser acordadas por escrito entre as partes.<br>
        5. Este contrato é regido pelas leis brasileiras e fica sujeito ao foro da comarca da contratada.
    </div>

    <div class="date-location">
        {{cidade}}, {{data_emissao_contrato|date}}
    </div>

    <div class="signature-section">
        <div class="signature-box">
            <div class="signature-line"></div>
            <div><strong>CONTRATANTE</strong></div>
            <div>{{nome}}</div>
            <div>CNPJ: {{cnpj|cnpj}}</div>
            <div>Repr.: {{nome_representante}}</div>
        </div>
        <div class="signature-box">
            <div class="signature-line"></div>
            <div><strong>CONTRATADA</strong></div>
            <div>INOVA INOX</div>
            <div>CNPJ: XX.XXX.XXX/XXXX-XX</div>
        </div>
    </div>
</body>
</html>
`