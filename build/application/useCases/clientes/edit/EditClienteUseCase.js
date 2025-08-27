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
exports.EditClienteUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const clienteValidator_1 = require("../clienteValidator");
const yup_1 = require("yup");
const ValidationErrorException_1 = require("../../../../shared/exception/ValidationErrorException");
const mongodb_1 = require("mongodb");
let EditClienteUseCase = class EditClienteUseCase {
    clienteUpdateRepository;
    clienteReadRepository;
    constructor(clienteUpdateRepository, clienteReadRepository) {
        this.clienteUpdateRepository = clienteUpdateRepository;
        this.clienteReadRepository = clienteReadRepository;
    }
    async execute(id, request) {
        const objectId = new mongodb_1.ObjectId(id);
        await this.validate(request);
        var cliente = await this.clienteReadRepository.getByIdAsync(objectId);
        if (!cliente)
            throw new Error("Cliente não encontrado");
        cliente.codigo = request.codigo,
            cliente.contato = request.contato,
            cliente.cpfCnpj = request.cpfCnpj,
            cliente.dataNascimento = request.dataNascimento,
            cliente.identidade = request.identidade;
        cliente.nome = request.nome,
            cliente.nomeFantasia = request.nomeFantasia,
            cliente.orgaoExpedidor = request.orgaoExpedidor,
            cliente.status = request.status,
            cliente.tipo = request.tipo;
        await this.clienteUpdateRepository.updateAsync(objectId, cliente);
    }
    async validate(request) {
        try {
            await clienteValidator_1.clienteValidator.validate(request, { abortEarly: false });
        }
        catch (err) {
            if (err instanceof yup_1.ValidationError) {
                throw new ValidationErrorException_1.ValidationErrorException(err.errors);
            }
            throw err;
        }
    }
};
exports.EditClienteUseCase = EditClienteUseCase;
exports.EditClienteUseCase = EditClienteUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IClienteUpdateOnlyRepository")),
    __param(1, (0, tsyringe_1.inject)("IClienteReadOnlyRepository")),
    __metadata("design:paramtypes", [Object, Object])
], EditClienteUseCase);
//# sourceMappingURL=EditClienteUseCase.js.map