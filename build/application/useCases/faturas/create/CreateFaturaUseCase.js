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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFaturaUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const FaturaValidator_1 = require("../FaturaValidator");
const yup_1 = require("yup");
const ValidationErrorException_1 = require("../../../../shared/exception/ValidationErrorException");
const Fatura_1 = require("../../../../domain/entities/Fatura");
let CreateFaturaUseCase = class CreateFaturaUseCase {
    faturaRepository;
    constructor(faturaRepository) {
        this.faturaRepository = faturaRepository;
    }
    async execute(usuarioId, request) {
        await this.validate(request);
        const fatura = new Fatura_1.Fatura();
        fatura.usuarioId = usuarioId,
            fatura.planoId = request.planoId,
            fatura.clienteId = request.clienteId,
            fatura.status = request.status,
            fatura.inicioVigencia = new Date(request.inicioVigencia),
            fatura.fimVigencia = new Date(request.fimVigencia),
            fatura.dataPagamento = request.dataPagamento ? new Date(request.dataPagamento) : undefined;
        fatura.dataVencimento = new Date(request.dataVencimento),
            fatura.valorPagamento = request.valorPagamento,
            fatura.valorDesconto = request.valorPagamento,
            fatura.valorTotal = request.valorTotal;
        await this.faturaRepository.addAsync(fatura);
        return {
            usuarioId: fatura.usuarioId,
            planoId: fatura.planoId,
            clienteId: fatura.clienteId,
            status: fatura.status,
            inicioVigencia: fatura.inicioVigencia,
            fimVigencia: fatura.fimVigencia,
            dataPagamento: fatura.dataPagamento,
            dataVencimento: fatura.dataVencimento,
            valorPagamento: fatura.valorPagamento,
            valorDesconto: fatura.valorDesconto,
            valorTotal: fatura.valorTotal
        };
    }
    async validate(request) {
        try {
            await FaturaValidator_1.faturaValidator.validate(request, { abortEarly: false });
        }
        catch (err) {
            if (err instanceof yup_1.ValidationError) {
                throw new ValidationErrorException_1.ValidationErrorException(err.errors);
            }
            throw err;
        }
    }
};
exports.CreateFaturaUseCase = CreateFaturaUseCase;
exports.CreateFaturaUseCase = CreateFaturaUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IFaturaWriteOnlyRepository")),
    __metadata("design:paramtypes", [Object])
], CreateFaturaUseCase);
//# sourceMappingURL=CreateFaturaUseCase.js.map