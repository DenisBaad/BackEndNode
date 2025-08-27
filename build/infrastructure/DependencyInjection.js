"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerInfrastructureDependencies = registerInfrastructureDependencies;
const tsyringe_1 = require("tsyringe");
const UsuarioRepository_1 = require("./repositories/UsuarioRepository");
const ZeusContext_1 = require("./database/ZeusContext");
const PlanoRepository_1 = require("./repositories/PlanoRepository");
const ClienteRepository_1 = require("./repositories/ClienteRepository");
const FaturaRepository_1 = require("./repositories/FaturaRepository");
function registerInfrastructureDependencies() {
    ZeusContext_1.ZeusContext.initialize().then(() => addRepositories());
}
function addRepositories() {
    addUsuarioRepository();
    addPlanoRepository();
    addClienteRepository();
    addFaturaRepository();
}
function addUsuarioRepository() {
    tsyringe_1.container
        .registerSingleton("IUsuarioWriteOnlyRepository", UsuarioRepository_1.UsuarioRepository)
        .registerSingleton("IUsuarioReadOnlyRepository", UsuarioRepository_1.UsuarioRepository);
}
function addPlanoRepository() {
    tsyringe_1.container
        .registerSingleton("IPlanoWriteOnlyRepository", PlanoRepository_1.PlanoRepository)
        .registerSingleton("IPlanoReadOnlyRepository", PlanoRepository_1.PlanoRepository)
        .registerSingleton("IPlanoUpdateOnlyRepository", PlanoRepository_1.PlanoRepository);
}
function addClienteRepository() {
    tsyringe_1.container
        .registerSingleton("IClienteWriteOnlyRepository", ClienteRepository_1.ClienteRepository)
        .registerSingleton("IClienteReadOnlyRepository", ClienteRepository_1.ClienteRepository)
        .registerSingleton("IClienteUpdateOnlyRepository", ClienteRepository_1.ClienteRepository);
}
function addFaturaRepository() {
    tsyringe_1.container
        .registerSingleton("IFaturaWriteOnlyRepository", FaturaRepository_1.FaturaRepository)
        .registerSingleton("IFaturaReadOnlyRepository", FaturaRepository_1.FaturaRepository)
        .registerSingleton("IFaturaUpdateOnlyRepository", FaturaRepository_1.FaturaRepository);
}
//# sourceMappingURL=DependencyInjection.js.map