"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerApplicationDependencies = registerApplicationDependencies;
const tsyringe_1 = require("tsyringe");
const CreateUsuarioUseCase_1 = require("./useCases/usuarios/create/CreateUsuarioUseCase");
const GetAllUsuarioUseCase_1 = require("./useCases/usuarios/getAll/GetAllUsuarioUseCase");
const PasswordEncrypt_1 = require("./servicos/PasswordEncrypt");
const TokenController_1 = require("../api/controllers/TokenController");
const LoginUseCase_1 = require("./useCases/login/LoginUseCase");
const CreatePlanoUseCase_1 = require("./useCases/planos/create/CreatePlanoUseCase");
const GetAllPlanoUseCase_1 = require("./useCases/planos/getall/GetAllPlanoUseCase");
const EditPlanoUseCase_1 = require("./useCases/planos/edit/EditPlanoUseCase");
const CreateClienteUseCase_1 = require("./useCases/clientes/create/CreateClienteUseCase");
const GetAllClienteUseCase_1 = require("./useCases/clientes/getAll/GetAllClienteUseCase");
const EditClienteUseCase_1 = require("./useCases/clientes/edit/EditClienteUseCase");
const AtivarInativarUseCase_1 = require("./useCases/clientes/AtivarInativar/AtivarInativarUseCase");
const CreateFaturaUseCase_1 = require("./useCases/faturas/create/CreateFaturaUseCase");
const GetAllFaturaUseCase_1 = require("./useCases/faturas/getAll/GetAllFaturaUseCase");
const EditFaturaUseCase_1 = require("./useCases/faturas/edit/EditFaturaUseCase");
const RelatorioFaturasUseCase_1 = require("./useCases/relatorios/relatorioFaturas/RelatorioFaturasUseCase");
function registerApplicationDependencies() {
    addUseCases();
    addChaveAdicionalSenha();
    addTokenController();
}
function addUseCases() {
    addUsuarioUseCase();
    addLoginUseCase();
    addPlanoUseCase();
    addClienteUseCase();
    addFaturaUseCase();
}
function addUsuarioUseCase() {
    tsyringe_1.container
        .registerSingleton("ICreateUsuarioUseCase", CreateUsuarioUseCase_1.CreateUsuarioUseCase)
        .registerSingleton("IGetAllUsuarioUseCase", GetAllUsuarioUseCase_1.GetAllUsuarioUseCase);
}
function addLoginUseCase() {
    tsyringe_1.container.registerSingleton("ILoginUseCase", LoginUseCase_1.LoginUseCase);
}
function addPlanoUseCase() {
    tsyringe_1.container
        .registerSingleton("ICreatePlanoUseCase", CreatePlanoUseCase_1.CreatePlanoUseCase)
        .registerSingleton("IGetAllPlanoUseCase", GetAllPlanoUseCase_1.GetAllPlanoUseCase)
        .registerSingleton("IEditPlanoUseCase", EditPlanoUseCase_1.EditPlanoUseCase);
}
function addClienteUseCase() {
    tsyringe_1.container
        .registerSingleton("ICreateClienteUseCase", CreateClienteUseCase_1.CreateClienteUseCase)
        .registerSingleton("IGetAllClienteUseCase", GetAllClienteUseCase_1.GetAllClienteUseCase)
        .registerSingleton("IEditClienteUseCase", EditClienteUseCase_1.EditClienteUseCase)
        .registerSingleton("IAtivarInativarUseCase", AtivarInativarUseCase_1.AtivarInativarUseCase);
}
function addFaturaUseCase() {
    tsyringe_1.container
        .registerSingleton("ICreateFaturaUseCase", CreateFaturaUseCase_1.CreateFaturaUseCase)
        .registerSingleton("IGetAllFaturaUseCase", GetAllFaturaUseCase_1.GetAllFaturaUseCase)
        .registerSingleton("IEditFaturaUseCase", EditFaturaUseCase_1.EditFaturaUseCase)
        .registerSingleton("IRelatorioFaturasUseCase", RelatorioFaturasUseCase_1.RelatorioFaturasUseCase);
}
function addChaveAdicionalSenha() {
    tsyringe_1.container.registerSingleton(PasswordEncrypt_1.PasswordEncrypt);
}
function addTokenController() {
    tsyringe_1.container.register("TokenController", {
        useFactory: () => {
            const securityKey = process.env.JWT_SECRET;
            const lifeTimeMinutesToken = Number(process.env.JWT_EXPIRES_IN_MINUTES || '60');
            return new TokenController_1.TokenController(securityKey, lifeTimeMinutesToken);
        }
    });
}
//# sourceMappingURL=DependencyInjection.js.map