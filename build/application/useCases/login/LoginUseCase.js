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
exports.LoginUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const TokenController_1 = require("../../../api/controllers/TokenController");
const PasswordEncrypt_1 = require("../../servicos/PasswordEncrypt");
const InvalidLoginException_1 = require("../../../shared/exception/InvalidLoginException");
let LoginUseCase = class LoginUseCase {
    usuarioRepository;
    tokenController;
    passwordEncrypt;
    constructor(usuarioRepository, tokenController, passwordEncrypt) {
        this.usuarioRepository = usuarioRepository;
        this.tokenController = tokenController;
        this.passwordEncrypt = passwordEncrypt;
    }
    async execute(request) {
        try {
            const senhaCriptografada = this.passwordEncrypt.encript(request.senha);
            const usuario = await this.usuarioRepository.existUserByEmailAndPasswordAsync(request.email, senhaCriptografada);
            if (!usuario) {
                throw new InvalidLoginException_1.InvalidLoginException();
            }
            const token = this.tokenController.create(usuario._id.toString());
            return {
                nome: usuario.nome,
                token,
            };
        }
        catch (error) {
            if (!(error instanceof InvalidLoginException_1.InvalidLoginException)) {
                throw new InvalidLoginException_1.InvalidLoginException("E-mail ou senha inválidos.");
            }
            throw error;
        }
    }
};
exports.LoginUseCase = LoginUseCase;
exports.LoginUseCase = LoginUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IUsuarioReadOnlyRepository")),
    __param(1, (0, tsyringe_1.inject)("TokenController")),
    __metadata("design:paramtypes", [Object, TokenController_1.TokenController,
        PasswordEncrypt_1.PasswordEncrypt])
], LoginUseCase);
//# sourceMappingURL=LoginUseCase.js.map