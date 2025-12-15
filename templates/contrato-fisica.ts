export const CONTRATO_FISICA_TEMPLATE = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contrato de Prestação de Serviços - Pessoa Física</title>
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
        CONTRATO DE PRESTAÇÃO DE SERVIÇOS - PESSOA FÍSICA
    </div>

    <div class="section">
        <div class="section-title">1. DADOS DO CONTRATANTE</div>
        <div class="field-group">
            <div class="field">
                <span class="field-label">Nome:</span>
                <span class="field-value">{{nome}}</span>
            </div>
            <div class="field">
                <span class="field-label">CPF:</span>
                <span class="field-value">{{cpf|cpf}}</span>
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
        <div class="section-title">2. OBJETO DO CONTRATO</div>
        <div class="field-group">
            <div class="field" style="flex: 2;">
                <span class="field-label">Tipo de Projeto:</span>
                <span class="field-value">{{tipo_projeto}}</span>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">3. CONDIÇÕES FINANCEIRAS</div>
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
        3. Quaisquer alterações deverão ser acordadas por escrito entre as partes.<br>
        4. Este contrato é regido pelas leis brasileiras.
    </div>

    <div class="date-location">
        {{cidade}}, {{data_emissao_contrato|date}}
    </div>

    <div class="signature-section">
        <div class="signature-box">
            <div class="signature-line"></div>
            <div><strong>CONTRATANTE</strong></div>
            <div>{{nome}}</div>
            <div>CPF: {{cpf|cpf}}</div>
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