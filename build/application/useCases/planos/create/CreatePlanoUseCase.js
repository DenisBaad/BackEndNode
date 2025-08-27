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
exports.CreatePlanoUseCase = void 0;
const planoValidator_1 = require("../planoValidator");
const ValidationErrorException_1 = require("../../../../shared/exception/ValidationErrorException");
const yup_1 = require("yup");
const Plano_1 = require("../../../../domain/entities/Plano");
const tsyringe_1 = require("tsyringe");
let CreatePlanoUseCase = class CreatePlanoUseCase {
    planoRepository;
    constructor(planoRepository) {
        this.planoRepository = planoRepository;
    }
    async execute(usuarioId, request) {
        await this.validate(request);
        const plano = new Plano_1.Plano();
        plano.usuarioId = usuarioId,
            plano.descricao = request.descricao;
        plano.valorPlano = request.valorPlano;
        plano.quantidadeUsuarios = request.quantidadeUsuarios;
        plano.vigenciaMeses = request.vigenciaMeses;
        await this.planoRepository.addAsync(plano);
        return {
            descricao: plano.descricao,
            valorPlano: plano.valorPlano,
            quantidadeUsuarios: plano.quantidadeUsuarios,
            vigenciaMeses: plano.vigenciaMeses,
            usuarioId: plano.usuarioId
        };
    }
    async validate(request) {
        try {
            await planoValidator_1.planoValidator.validate(request, { abortEarly: false });
        }
        catch (err) {
            if (err instanceof yup_1.ValidationError) {
                throw new ValidationErrorException_1.ValidationErrorException(err.errors);
            }
            throw err;
        }
    }
};
exports.CreatePlanoUseCase = CreatePlanoUseCase;
exports.CreatePlanoUseCase = CreatePlanoUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IPlanoWriteOnlyRepository")),
    __metadata("design:paramtypes", [Object])
], CreatePlanoUseCase);
//# sourceMappingURL=CreatePlanoUseCase.js.map