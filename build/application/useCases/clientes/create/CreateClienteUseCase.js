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
exports.CreateClienteUseCase = void 0;
const yup_1 = require("yup");
const clienteValidator_1 = require("../clienteValidator");
const ValidationErrorException_1 = require("../../../../shared/exception/ValidationErrorException");
const tsyringe_1 = require("tsyringe");
const Cliente_1 = require("../../../../domain/entities/Cliente");
let CreateClienteUseCase = class CreateClienteUseCase {
    clienteRepository;
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    async execute(usuarioId, request) {
        await this.validate(request);
        const cliente = new Cliente_1.Cliente();
        cliente.usuarioId = usuarioId,
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
        await this.clienteRepository.addAsync(cliente);
        return {
            codigo: cliente.codigo,
            contato: cliente.contato,
            cpfCnpj: cliente.cpfCnpj,
            dataNascimento: cliente.dataNascimento,
            identidade: cliente.identidade,
            nome: cliente.nome,
            nomeFantasia: cliente.nomeFantasia,
            orgaoExpedidor: cliente.orgaoExpedidor,
            status: cliente.status,
            tipo: cliente.tipo
        };
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
exports.CreateClienteUseCase = CreateClienteUseCase;
exports.CreateClienteUseCase = CreateClienteUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IClienteWriteOnlyRepository")),
    __metadata("design:paramtypes", [Object])
], CreateClienteUseCase);
//# sourceMappingURL=CreateClienteUseCase.js.map