export const ORDEM_SERVICO_TEMPLATE = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ordem de Serviço</title>
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
            border-bottom: 2px solid #28a745;
            padding-bottom: 20px;
        }
        .company-name {
            font-size: 24px;
            font-weight: bold;
            color: #28a745;
            margin-bottom: 5px;
        }
        .document-title {
            font-size: 20px;
            font-weight: bold;
            margin: 20px 0;
            text-transform: uppercase;
            color: #28a745;
        }
        .os-number {
            font-size: 16px;
            background: #28a745;
            color: white;
            padding: 5px 15px;
            border-radius: 5px;
            display: inline-block;
            margin: 10px 0;
        }
        .section {
            margin: 20px 0;
            border: 1px solid #ddd;
            padding: 15px;
            border-radius: 5px;
        }
        .section-title {
            font-weight: bold;
            color: #28a745;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
            margin-bottom: 15px;
            font-size: 16px;
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
        .ambiente-section {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 5px;
            padding: 15px;
            margin: 15px 0;
        }
        .ambiente-title {
            font-weight: bold;
            color: #28a745;
            margin-bottom: 10px;
            font-size: 14px;
        }
        .checkbox-list {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
        }
        .checkbox-item {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .checkbox {
            width: 12px;
            height: 12px;
            border: 1px solid #666;
            display: inline-block;
        }
        .checkbox.checked::after {
            content: "✓";
            display: block;
            text-align: center;
            font-size: 10px;
        }
        .tipo-os-badges {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin: 10px 0;
        }
        .badge {
            background: #007bff;
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
        }
        .notes-section {
            background: #fffacd;
            border-left: 4px solid #ffd700;
            padding: 15px;
            margin: 20px 0;
        }
        .date-location {
            text-align: right;
            margin: 20px 0;
            font-style: italic;
        }
        .signature-section {
            margin-top: 50px;
            display: flex;
            justify-content: space-between;
        }
        .signature-box {
            text-align: center;
            width: 200px;
        }
        .signature-line {
            border-bottom: 1px solid #333;
            height: 40px;
            margin-bottom: 10px;
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

    <div class="document-title">
        ORDEM DE SERVIÇO
    </div>

    <div class="os-number">
        OS Nº: {{ordem_producao || 'A DEFINIR'}}
    </div>

    <div class="section">
        <div class="section-title">DADOS DO CLIENTE</div>
        <div class="field-group">
            <div class="field">
                <span class="field-label">Cliente:</span>
                <span class="field-value">{{cliente}}</span>
            </div>
            <div class="field">
                <span class="field-label">Celular:</span>
                <span class="field-value">{{celular|phone}}</span>
            </div>
        </div>
        <div class="field-group">
            <div class="field" style="flex: 2;">
                <span class="field-label">Endereço:</span>
                <span class="field-value">{{endereco}}</span>
            </div>
        </div>
        <div class="field-group">
            <div class="field">
                <span class="field-label">Cidade:</span>
                <span class="field-value">{{cidade}}</span>
            </div>
            <div class="field">
                <span class="field-label">Vendedor:</span>
                <span class="field-value">{{vendedor}}</span>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">TIPO DE ORDEM DE SERVIÇO</div>
        <div class="tipo-os-badges">
            <span class="badge">{{tipo_os}}</span>
        </div>
        <div class="field-group">
            <div class="field">
                <span class="field-label">Data/Hora da Visita:</span>
                <span class="field-value">{{data_hora_visita}}</span>
            </div>
        </div>
    </div>

    <div class="ambiente-section">
        <div class="ambiente-title">AMBIENTE: {{ambiente_nome}}</div>
        
        <div class="field-group">
            <div class="field">
                <span class="field-label">Tipo de Piso:</span>
                <span class="field-value">{{tipo_piso}}</span>
            </div>
            <div class="field">
                <span class="field-label">Medidas:</span>
                <span class="field-value">{{medidas}}</span>
            </div>
        </div>

        <!-- INOX -->
        <div style="margin: 15px 0;">
            <strong>INOX:</strong>
            <div style="margin: 10px 0;">
                <span class="field-label">Acabamento:</span>
                <span class="badge">{{inox_acabamento}}</span>
            </div>
            <div style="margin: 10px 0;">
                <span class="field-label">Passamão:</span>
                <span class="badge">{{inox_passamao}}</span>
            </div>
            <div style="margin: 10px 0;">
                <span class="field-label">Tubos:</span>
                <span class="badge">{{inox_tubos}}</span>
            </div>
            <div class="checkbox-list">
                <div class="checkbox-item">
                    <span class="checkbox {{com_uniao_checked}}"></span>
                    <span>Com União</span>
                </div>
                <div class="checkbox-item">
                    <span class="checkbox {{uniao_com_curva_checked}}"></span>
                    <span>União com Curva</span>
                </div>
                <div class="checkbox-item">
                    <span class="checkbox {{inicio_com_curva_checked}}"></span>
                    <span>Início com Curva</span>
                </div>
                <div class="checkbox-item">
                    <span class="checkbox {{final_com_curva_checked}}"></span>
                    <span>Final com Curva</span>
                </div>
                <div class="checkbox-item">
                    <span class="checkbox {{pinado_checked}}"></span>
                    <span>Pinado</span>
                </div>
            </div>
        </div>

        <!-- HASTES -->
        <div style="margin: 15px 0;">
            <strong>HASTES:</strong>
            <div style="margin: 10px 0;">
                <span class="field-label">Tipo:</span>
                <span class="badge">{{hastes_tipo}}</span>
            </div>
            <div class="checkbox-list">
                <div class="checkbox-item">
                    <span class="checkbox {{fixacao_lateral_checked}}"></span>
                    <span>Fixação Lateral</span>
                </div>
                <div class="checkbox-item">
                    <span class="checkbox {{fixacao_superior_checked}}"></span>
                    <span>Fixação Superior</span>
                </div>
                <div class="checkbox-item">
                    <span class="checkbox {{flange_checked}}"></span>
                    <span>Flange</span>
                </div>
                <div class="checkbox-item">
                    <span class="checkbox {{tarugo_padrao_checked}}"></span>
                    <span>Tarugo Padrão</span>
                </div>
            </div>
        </div>

        <!-- VIDRO -->
        <div style="margin: 15px 0;">
            <strong>VIDRO:</strong>
            <div style="margin: 10px 0;">
                <span class="field-label">Tipo:</span>
                <span class="badge">{{vidro_tipo}}</span>
            </div>
            <div style="margin: 10px 0;">
                <span class="field-label">Espessura:</span>
                <span class="badge">{{vidro_espessura}}</span>
            </div>
            <div style="margin: 10px 0;">
                <span class="field-label">Acabamento:</span>
                <span class="badge">{{vidro_acabamento}}</span>
            </div>
        </div>
    </div>

    <div class="notes-section">
        <strong>Informações Complementares:</strong><br>
        {{informacoes_complementares}}
    </div>

    <div class="date-location">
        {{cidade}}, {{data_hora_visita|date}}
    </div>

    <div class="signature-section">
        <div class="signature-box">
            <div class="signature-line"></div>
            <div><strong>CLIENTE</strong></div>
            <div>{{cliente}}</div>
        </div>
        <div class="signature-box">
            <div class="signature-line"></div>
            <div><strong>TÉCNICO</strong></div>
            <div>INOVA INOX</div>
        </div>
        <div class="signature-box">
            <div class="signature-line"></div>
            <div><strong>VENDEDOR</strong></div>
            <div>{{vendedor}}</div>
        </div>
    </div>
</body>
</html>
`