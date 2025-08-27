import { container } from "tsyringe";
import { IUsuarioWriteOnlyRepository } from "./../domain/repositories/usuarios/IUsuarioWriteOnlyRepository";
import { UsuarioRepository } from "./repositories/UsuarioRepository";
import { IUsuarioReadOnlyRepository } from "../domain/repositories/usuarios/IUsuarioReadOnlyRepository";
import { ZeusContext } from "./database/ZeusContext";
import { IPlanoWriteOnlyRepository } from "../domain/repositories/planos/IPlanoWriteOnlyRepository";
import { PlanoRepository } from "./repositories/PlanoRepository";
import { IPlanoReadOnlyRepository } from "../domain/repositories/planos/IPlanoReadOnlyRepository";
import { IPlanoUpdateOnlyRepository } from "../domain/repositories/planos/IPlanoUpdateOnlyRepository";
import { ClienteRepository } from "./repositories/ClienteRepository";
import { IClienteWriteOnlyRepository } from "../domain/repositories/clientes/IClienteWriteOnlyRepository";
import { IClienteReadOnlyRepository } from "../domain/repositories/clientes/IClienteReadOnlyRepository";
import { IClienteUpdateOnlyRepository } from "../domain/repositories/clientes/IClienteUpdateOnlyRepository";
import { IFaturaWriteOnlyRepository } from "../domain/repositories/faturas/IFaturaWriteOnlyRepository";
import { FaturaRepository } from "./repositories/FaturaRepository";
import { IFaturaReadOnlyRepository } from "../domain/repositories/faturas/IFaturaReadOnlyRepository";
import { IFaturaUpdateOnlyRepository } from "../domain/repositories/faturas/IFaturaUpdateOnlyRepository";

export function registerInfrastructureDependencies() {
  ZeusContext.initialize().then(() => addRepositories());
}

function addRepositories() {
  addUsuarioRepository();
  addPlanoRepository();
  addClienteRepository();
  addFaturaRepository();
}

function addUsuarioRepository() {
  container
    .registerSingleton<IUsuarioWriteOnlyRepository>("IUsuarioWriteOnlyRepository", UsuarioRepository)
    .registerSingleton<IUsuarioReadOnlyRepository>("IUsuarioReadOnlyRepository", UsuarioRepository);
}

function addPlanoRepository() {
  container
    .registerSingleton<IPlanoWriteOnlyRepository>("IPlanoWriteOnlyRepository", PlanoRepository)
    .registerSingleton<IPlanoReadOnlyRepository>("IPlanoReadOnlyRepository", PlanoRepository)
    .registerSingleton<IPlanoUpdateOnlyRepository>("IPlanoUpdateOnlyRepository", PlanoRepository);
}

function addClienteRepository() {
  container
    .registerSingleton<IClienteWriteOnlyRepository>("IClienteWriteOnlyRepository", ClienteRepository)
    .registerSingleton<IClienteReadOnlyRepository>("IClienteReadOnlyRepository", ClienteRepository)
    .registerSingleton<IClienteUpdateOnlyRepository>("IClienteUpdateOnlyRepository", ClienteRepository);
}

function addFaturaRepository() {
  container
    .registerSingleton<IFaturaWriteOnlyRepository>("IFaturaWriteOnlyRepository", FaturaRepository)
    .registerSingleton<IFaturaReadOnlyRepository>("IFaturaReadOnlyRepository", FaturaRepository)
    .registerSingleton<IFaturaUpdateOnlyRepository>("IFaturaUpdateOnlyRepository", FaturaRepository);
}