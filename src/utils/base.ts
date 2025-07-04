//utilitarias aqui

interface InvoiceData {
    id: number;
    rentalId: number;
    rental?: any;
    amount: number;
    dueDate: Date;
    status: 'pendente' | 'pago' | 'atrasado';
    paidAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export function generateInvoiceDocument(invoice: InvoiceData): string {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('pt-BR');
    };

    const getMonthYearFromDate = (date: Date) => {
        const d = new Date(date);
        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        return `${months[d.getMonth()]}/${d.getFullYear()}`;
    };

    const statusColor = {
        'pendente': '#ffc107',
        'pago': '#28a745',
        'atrasado': '#dc3545'
    };

    const statusText = {
        'pendente': 'PENDENTE',
        'pago': 'PAGO',
        'atrasado': 'ATRASADO'
    };

    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fatura de Aluguel #${invoice.id}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .invoice-container {
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #007bff;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #007bff;
            margin: 0;
            font-size: 28px;
        }
        .header p {
            color: #666;
            margin: 5px 0 0 0;
        }
        .invoice-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
        }
        .invoice-details, .rental-info {
            flex: 1;
        }
        .invoice-details h3, .rental-info h3 {
            color: #333;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            padding: 5px 0;
        }
        .label {
            font-weight: bold;
            color: #555;
        }
        .value {
            color: #333;
        }
        .status-badge {
            display: inline-block;
            padding: 5px 15px;
            border-radius: 20px;
            color: white;
            font-weight: bold;
            font-size: 12px;
            text-transform: uppercase;
        }
        .payment-section {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin-top: 30px;
        }
        .payment-section h3 {
            color: #007bff;
            margin-top: 0;
        }
        .total-amount {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
            text-align: center;
            margin: 20px 0;
            padding: 15px;
            border: 2px solid #007bff;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 14px;
        }
        @media print {
            body { background-color: white; }
            .invoice-container { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="header">
            <h1>FATURA DE ALUGUEL</h1>
            <p>Sistema de Gestão Imobiliária</p>
        </div>

        <div class="invoice-info">
            <div class="invoice-details">
                <h3>Detalhes da Fatura</h3>
                <div class="detail-row">
                    <span class="label">Número da Fatura:</span>
                    <span class="value">#${invoice.id}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Referência:</span>
                    <span class="value">${getMonthYearFromDate(invoice.dueDate)}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Data de Vencimento:</span>
                    <span class="value">${formatDate(invoice.dueDate)}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Status:</span>
                    <span class="value">
                        <span class="status-badge" style="background-color: ${statusColor[invoice.status]}">
                            ${statusText[invoice.status]}
                        </span>
                    </span>
                </div>
                <div class="detail-row">
                    <span class="label">Data de Emissão:</span>
                    <span class="value">${formatDate(invoice.createdAt)}</span>
                </div>
            </div>

            <div class="rental-info">
                <h3>Informações do Aluguel</h3>
                <div class="detail-row">
                    <span class="label">ID do Contrato:</span>
                    <span class="value">#${invoice.rentalId}</span>
                </div>
                ${invoice.rental?.property ? `
                <div class="detail-row">
                    <span class="label">Imóvel:</span>
                    <span class="value">${invoice.rental.property.address || 'N/A'}</span>
                </div>
                ` : ''}
                ${invoice.rental?.tenant ? `
                <div class="detail-row">
                    <span class="label">Inquilino:</span>
                    <span class="value">${invoice.rental.tenant.name || 'N/A'}</span>
                </div>
                ` : ''}
            </div>
        </div>

        <div class="total-amount">
            VALOR TOTAL: ${formatCurrency(invoice.amount)}
        </div>

        <div class="payment-section">
            <h3>Instruções para Pagamento</h3>
            <p><strong>Forma de Pagamento:</strong> Transferência bancária, PIX ou boleto</p>
            <p><strong>Vencimento:</strong> ${formatDate(invoice.dueDate)}</p>
            <p><strong>Observações:</strong> Pagamento após o vencimento sujeito a multa e juros conforme contrato.</p>
        </div>

        <div class="footer">
            <p>Este documento foi gerado automaticamente pelo sistema em ${formatDate(new Date())}</p>
            <p>Para dúvidas ou esclarecimentos, entre em contato conosco.</p>
        </div>
    </div>
</body>
</html>`;
}