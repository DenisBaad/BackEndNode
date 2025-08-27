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
exports.CreateUsuarioUseCase = void 0;
const usuarioValidator_1 = require("./../usuarioValidator");
const yup_1 = require("yup");
const ValidationErrorException_1 = require("../../../../shared/exception/ValidationErrorException");
const Usuario_1 = require("../../../../domain/entities/Usuario");
const tsyringe_1 = require("tsyringe");
const PasswordEncrypt_1 = require("../../../servicos/PasswordEncrypt");
const TokenController_1 = require("../../../../api/controllers/TokenController");
let CreateUsuarioUseCase = class CreateUsuarioUseCase {
    usuarioRepository;
    usuarioReadRepository;
    tokenController;
    passwordEncrypt;
    constructor(usuarioRepository, usuarioReadRepository, tokenController, passwordEncrypt) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioReadRepository = usuarioReadRepository;
        this.tokenController = tokenController;
        this.passwordEncrypt = passwordEncrypt;
    }
    async execute(request) {
        await this.validateRequest(request);
        const usuario = new Usuario_1.Usuario();
        usuario.nome = request.nome;
        usuario.email = request.email;
        usuario.senha = this.passwordEncrypt.encript(request.senha);
        const result = await this.usuarioRepository.addAsync(usuario);
        return {
            nome: usuario.nome,
            token: this.tokenController.create(result.toString()),
        };
    }
    async validateRequest(request) {
        let errors = [];
        try {
            await usuarioValidator_1.requestValidation.validate(request, { abortEarly: false });
        }
        catch (err) {
            if (err instanceof yup_1.ValidationError) {
                errors = errors.concat(err.errors);
            }
            else {
                throw err;
            }
        }
        const emailExist = await this.usuarioReadRepository.existUseWithEmailAsync(request.email);
        if (emailExist) {
            errors.push("Email já cadastrado na base de dados");
        }
        if (errors.length > 0) {
            throw new ValidationErrorException_1.ValidationErrorException(errors);
        }
    }
};
exports.CreateUsuarioUseCase = CreateUsuarioUseCase;
exports.CreateUsuarioUseCase = CreateUsuarioUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IUsuarioWriteOnlyRepository")),
    __param(1, (0, tsyringe_1.inject)("IUsuarioReadOnlyRepository")),
    __param(2, (0, tsyringe_1.inject)("TokenController")),
    __metadata("design:paramtypes", [Object, Object, TokenController_1.TokenController,
        PasswordEncrypt_1.PasswordEncrypt])
], CreateUsuarioUseCase);
//# sourceMappingURL=CreateUsuarioUseCase.js.map