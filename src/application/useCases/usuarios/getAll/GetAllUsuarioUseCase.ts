import type { IUsuarioReadOnlyRepository } from "../../../../domain/repositories/usuarios/IUsuarioReadOnlyRepository";
import { ResponseUsuarioJson } from "../../../../shared/communication/responses/usuarios/ResponseUsuarioJson";
import { IGetAllUsuarioUseCase } from "./IGetAllUsuarioUseCase";
import { injectable, inject } from "tsyringe";

@injectable()
export class GetAllUsuarioUseCase implements IGetAllUsuarioUseCase {

  constructor(@inject("IUsuarioReadOnlyRepository") private readonly usuarioRepository: IUsuarioReadOnlyRepository) {}

  async execute(): Promise<ResponseUsuarioJson[]> {
    return await this.usuarioRepository.getAllAsync();
  }
}