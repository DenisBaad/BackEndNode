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
exports.EditFaturaUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const mongodb_1 = require("mongodb");
const FaturaValidator_1 = require("../FaturaValidator");
const yup_1 = require("yup");
const ValidationErrorException_1 = require("../../../../shared/exception/ValidationErrorException");
let EditFaturaUseCase = class EditFaturaUseCase {
    faturaUpdateRepository;
    faturaReadRepository;
    constructor(faturaUpdateRepository, faturaReadRepository) {
        this.faturaUpdateRepository = faturaUpdateRepository;
        this.faturaReadRepository = faturaReadRepository;
    }
    async execute(id, request) {
        const objectId = new mongodb_1.ObjectId(id);
        await this.validate(request);
        var fatura = await this.faturaReadRepository.getByIdAsync(objectId);
        if (!fatura)
            throw new Error("Fatura não encontrado");
        fatura.planoId = request.planoId,
            fatura.clienteId = request.clienteId,
            fatura.status = request.status,
            fatura.inicioVigencia = request.inicioVigencia,
            fatura.fimVigencia = request.fimVigencia,
            fatura.dataPagamento = request.dataPagamento,
            fatura.dataVencimento = request.dataVencimento,
            fatura.valorPagamento = request.valorPagamento,
            fatura.valorDesconto = request.valorPagamento,
            fatura.valorTotal = request.valorTotal;
        await this.faturaUpdateRepository.updateAsync(objectId, fatura);
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
exports.EditFaturaUseCase = EditFaturaUseCase;
exports.EditFaturaUseCase = EditFaturaUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IFaturaUpdateOnlyRepository")),
    __param(1, (0, tsyringe_1.inject)("IFaturaReadOnlyRepository")),
    __metadata("design:paramtypes", [Object, Object])
], EditFaturaUseCase);
//# sourceMappingURL=EditFaturaUseCase.js.map