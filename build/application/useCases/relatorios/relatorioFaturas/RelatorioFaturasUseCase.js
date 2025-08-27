"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelatorioFaturasUseCase = void 0;
const mongodb_1 = require("mongodb");
const EnumStatusFatura_1 = require("../../../../shared/communication/enums/EnumStatusFatura");
const tsyringe_1 = require("tsyringe");
const pdfmake_1 = __importDefault(require("pdfmake"));
const fonts = {
    Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
    }
};
let RelatorioFaturasUseCase = class RelatorioFaturasUseCase {
    faturaRepository;
    clienteRepository;
    planoRepository;
    constructor(faturaRepository, clienteRepository, planoRepository) {
        this.faturaRepository = faturaRepository;
        this.clienteRepository = clienteRepository;
        this.planoRepository = planoRepository;
    }
    async executar(usuarioId, usuarioNome, dataAbertura, dataFechamento, status, clienteIds) {
        const faturas = await this.faturaRepository.getRelatorioFaturaPorCliente(usuarioId, dataAbertura, dataFechamento, status !== undefined ? Number(status) : undefined, clienteIds);
        const clienteIdsFiltrados = clienteIds || Array.from(new Set(faturas.map(f => f.clienteId.toString())));
        const clientes = [];
        for (const id of clienteIdsFiltrados) {
            const cliente = await this.clienteRepository.getByIdAsync(new mongodb_1.ObjectId(id));
            if (cliente)
                clientes.push(cliente);
        }
        const planoIds = Array.from(new Set(faturas.map(f => f.planoId.toString())));
        const planos = [];
        for (const id of planoIds) {
            const plano = await this.planoRepository.getByIdAsync(new mongodb_1.ObjectId(id));
            if (plano)
                planos.push(plano);
        }
        const planoMap = new Map(planos.map(p => [p._id.toString(), p]));
        const printer = new pdfmake_1.default(fonts);
        const body = [];
        const docDefinition = {
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
                    EnumStatusFatura_1.EnumStatusFatura[fatura.status],
                    plano.descricao,
                    plano.valorPlano.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
                    plano.quantidadeUsuarios.toString()
                ]);
            });
            body.push([{ text: "", colSpan: 6, margin: [0, 5, 0, 5] }, {}, {}, {}, {}, {}]);
        }
        const pdfDoc = printer.createPdfKitDocument(docDefinition);
        const chunks = [];
        return new Promise((resolve, reject) => {
            pdfDoc.on('data', chunk => chunks.push(chunk));
            pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
            pdfDoc.on('error', reject);
            pdfDoc.end();
        });
    }
};
exports.RelatorioFaturasUseCase = RelatorioFaturasUseCase;
exports.RelatorioFaturasUseCase = RelatorioFaturasUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IFaturaReadOnlyRepository")),
    __param(1, (0, tsyringe_1.inject)("IClienteReadOnlyRepository")),
    __param(2, (0, tsyringe_1.inject)("IPlanoReadOnlyRepository")),
    __metadata("design:paramtypes", [Object, Object, Object])
], RelatorioFaturasUseCase);
//# sourceMappingURL=RelatorioFaturasUseCase.js.map