import { IRelatorioFaturasUseCase } from "./IRelatorioFaturasUseCase";
import { ObjectId } from "mongodb";
import type { IFaturaReadOnlyRepository } from "../../../../domain/repositories/faturas/IFaturaReadOnlyRepository";
import type { IClienteReadOnlyRepository } from "../../../../domain/repositories/clientes/IClienteReadOnlyRepository";
import type { IPlanoReadOnlyRepository } from "../../../../domain/repositories/planos/IPlanoReadOnlyRepository";
import { EnumStatusFatura } from "../../../../shared/communication/enums/EnumStatusFatura";
import { inject, injectable } from "tsyringe";
import PdfPrinter from "pdfmake";

const fonts = {
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique'
  }
};

@injectable()
export class RelatorioFaturasUseCase implements IRelatorioFaturasUseCase {

    constructor(
        @inject("IFaturaReadOnlyRepository") private readonly faturaRepository: IFaturaReadOnlyRepository,
        @inject("IClienteReadOnlyRepository") private readonly clienteRepository: IClienteReadOnlyRepository,
        @inject("IPlanoReadOnlyRepository") private readonly planoRepository: IPlanoReadOnlyRepository) {}

    public async executar(usuarioId: string, usuarioNome: string, dataAbertura?: Date, dataFechamento?: Date, status?: EnumStatusFatura, clienteIds?: string[]): Promise<Buffer> {

        const faturas = await this.faturaRepository.getRelatorioFaturaPorCliente(
            usuarioId,
            dataAbertura,
            dataFechamento,
            status !== undefined ? Number(status) : undefined,
            clienteIds
        );

        const clienteIdsFiltrados = clienteIds || Array.from(new Set(faturas.map(f => f.clienteId.toString())));
        const clientes: any[] = [];
        for (const id of clienteIdsFiltrados) {
            const cliente = await this.clienteRepository.getByIdAsync(new ObjectId(id));
            if (cliente) clientes.push(cliente);
        }

        const planoIds = Array.from(new Set(faturas.map(f => f.planoId.toString())));
        const planos: any[] = [];
        for (const id of planoIds) {
            const plano = await this.planoRepository.getByIdAsync(new ObjectId(id));
            if (plano) planos.push(plano);
        }
        const planoMap = new Map(planos.map(p => [p._id.toString(), p]));

        const printer = new PdfPrinter(fonts);
        const body: any[] = [];

        const docDefinition: any = {
            pageSize: 'A4',
            pageMargins: [30, 30, 30, 30],
            defaultStyle: {
                font: 'Helvetica' 
            },
            content: [
                { text: "Relatório de Faturas por Clientes", style: 'header' },
                { text: `Usuário: ${usuarioNome}`, style: 'subheader' },
                { text: `Período: ${dataAbertura?.toLocaleDateString("pt-BR")} até ${dataFechamento?.toLocaleDateString("pt-BR")}`, style: 'subheader' },
                { table: { headerRows: 1, widths: ['*', '*', '*', '*', '*', '*'], body }, layout: 'lightHorizontalLines' }
            ],
            styles: {
                header: { fontSize: 14, bold: true, margin: [0, 0, 0, 10] },
                subheader: { fontSize: 10, margin: [0, 0, 0, 5] }
            }
        };

        for (const cliente of clientes) {
            body.push([{ text: `Cliente: ${cliente.nome} - CPF/CNPJ: ${cliente.cpfCnpj} - Contato: ${cliente.contato}`, colSpan: 6, bold: true, margin: [0, 5, 0, 5] }, {}, {}, {}, {}, {}]);

            const faturasCliente = faturas.filter(f => f.clienteId.toString() === cliente._id.toString());

            if (faturasCliente.length === 0) {
                body.push([{ text: "Nenhuma fatura encontrada para este cliente.", colSpan: 6, margin: [0, 0, 0, 5] }, {}, {}, {}, {}, {}]);
                continue;
            }

            // Cabeçalho
            body.push([
                { text: "Data Vencimento", bold: true },
                { text: "Valor Total", bold: true },
                { text: "Status", bold: true },
                { text: "Plano", bold: true },
                { text: "Valor Plano", bold: true },
                { text: "Qtd. Usuários", bold: true }
            ]);

            // Linhas
            faturasCliente.forEach(fatura => {
                const plano = planoMap.get(fatura.planoId.toString());
                body.push([
                    new Date(fatura.dataVencimento).toLocaleDateString("pt-BR"),
                    fatura.valorTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
                    EnumStatusFatura[fatura.status],
                    plano.descricao,
                    plano.valorPlano.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
                    plano.quantidadeUsuarios.toString()
                ]);
            });

            body.push([{ text: "", colSpan: 6, margin: [0, 5, 0, 5] }, {}, {}, {}, {}, {}]); 
        }

        const pdfDoc = printer.createPdfKitDocument(docDefinition);
        const chunks: Buffer[] = [];
        return new Promise<Buffer>((resolve, reject) => {
            pdfDoc.on('data', chunk => chunks.push(chunk));
            pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
            pdfDoc.on('error', reject);
            pdfDoc.end(); 
        });
    }
}