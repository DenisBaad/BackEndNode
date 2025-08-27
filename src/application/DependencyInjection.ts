import { container } from "tsyringe";
import { ICreateUsuarioUseCase } from "./useCases/usuarios/create/ICreateUsuarioUseCase";
import { CreateUsuarioUseCase } from "./useCases/usuarios/create/CreateUsuarioUseCase";
import { IGetAllUsuarioUseCase } from "./useCases/usuarios/getAll/IGetAllUsuarioUseCase";
import { GetAllUsuarioUseCase } from "./useCases/usuarios/getAll/GetAllUsuarioUseCase";
import { PasswordEncrypt } from "./servicos/PasswordEncrypt";
import { TokenController } from "../api/controllers/TokenController";
import { ILoginUseCase } from "./useCases/login/ILoginUseCase";
import { LoginUseCase } from "./useCases/login/LoginUseCase";
import { ICreatePlanoUseCase } from "./useCases/planos/create/ICreatePlanoUseCase";
import { CreatePlanoUseCase } from "./useCases/planos/create/CreatePlanoUseCase";
import { IGetAllPlanoUseCase } from "./useCases/planos/getall/IGetAllPlanoUseCase";
import { GetAllPlanoUseCase } from "./useCases/planos/getall/GetAllPlanoUseCase";
import { IEditPlanoUseCase } from "./useCases/planos/edit/IEditPlanoUseCase";
import { EditPlanoUseCase } from "./useCases/planos/edit/EditPlanoUseCase";
import { ICreateClienteUseCase } from "./useCases/clientes/create/ICreateClienteUseCase";
import { CreateClienteUseCase } from "./useCases/clientes/create/CreateClienteUseCase";
import { IGetAllClienteUseCase } from "./useCases/clientes/getAll/IGetAllClienteUseCase";
import { GetAllClienteUseCase } from "./useCases/clientes/getAll/GetAllClienteUseCase";
import { IEditClienteUseCase } from "./useCases/clientes/edit/IEditClienteUseCase";
import { EditClienteUseCase } from "./useCases/clientes/edit/EditClienteUseCase";
import { IAtivarInativarUseCase } from "./useCases/clientes/AtivarInativar/IAtivarInativarUseCase";
import { AtivarInativarUseCase } from "./useCases/clientes/AtivarInativar/AtivarInativarUseCase";
import { ICreateFaturaUseCase } from "./useCases/faturas/create/ICreateFaturaUseCase";
import { CreateFaturaUseCase } from "./useCases/faturas/create/CreateFaturaUseCase";
import { IGetAllFaturaUseCase } from "./useCases/faturas/getAll/IGetAllFaturaUseCase";
import { GetAllFaturaUseCase } from "./useCases/faturas/getAll/GetAllFaturaUseCase";
import { IEditFaturaUseCase } from "./useCases/faturas/edit/IEditFaturaUseCase";
import { EditFaturaUseCase } from "./useCases/faturas/edit/EditFaturaUseCase";
import { IRelatorioFaturasUseCase } from "./useCases/relatorios/relatorioFaturas/IRelatorioFaturasUseCase";
import { RelatorioFaturasUseCase } from "./useCases/relatorios/relatorioFaturas/RelatorioFaturasUseCase";

export function registerApplicationDependencies() {
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
  container
  .registerSingleton<ICreateUsuarioUseCase>("ICreateUsuarioUseCase", CreateUsuarioUseCase)
  .registerSingleton<IGetAllUsuarioUseCase>("IGetAllUsuarioUseCase", GetAllUsuarioUseCase);
}

function addLoginUseCase() {
  container.registerSingleton<ILoginUseCase>("ILoginUseCase", LoginUseCase);
}

function addPlanoUseCase() {
  container
    .registerSingleton<ICreatePlanoUseCase>("ICreatePlanoUseCase", CreatePlanoUseCase)
    .registerSingleton<IGetAllPlanoUseCase>("IGetAllPlanoUseCase", GetAllPlanoUseCase)
    .registerSingleton<IEditPlanoUseCase>("IEditPlanoUseCase", EditPlanoUseCase);
}

function addClienteUseCase() {
  container
    .registerSingleton<ICreateClienteUseCase>("ICreateClienteUseCase", CreateClienteUseCase)
    .registerSingleton<IGetAllClienteUseCase>("IGetAllClienteUseCase", GetAllClienteUseCase)
    .registerSingleton<IEditClienteUseCase>("IEditClienteUseCase", EditClienteUseCase)
    .registerSingleton<IAtivarInativarUseCase>("IAtivarInativarUseCase", AtivarInativarUseCase);
}

function addFaturaUseCase() {
  container
    .registerSingleton<ICreateFaturaUseCase>("ICreateFaturaUseCase", CreateFaturaUseCase)
    .registerSingleton<IGetAllFaturaUseCase>("IGetAllFaturaUseCase", GetAllFaturaUseCase)
    .registerSingleton<IEditFaturaUseCase>("IEditFaturaUseCase", EditFaturaUseCase)
    .registerSingleton<IRelatorioFaturasUseCase>("IRelatorioFaturasUseCase", RelatorioFaturasUseCase);
}

function addChaveAdicionalSenha() {
  container.registerSingleton(PasswordEncrypt);
}

function addTokenController() {
  container.register<TokenController>("TokenController", {
    useFactory: () => {
      const securityKey = process.env.JWT_SECRET!;
      const lifeTimeMinutesToken = Number(process.env.JWT_EXPIRES_IN_MINUTES || '60');
      return new TokenController(securityKey, lifeTimeMinutesToken);
    }
  });
}