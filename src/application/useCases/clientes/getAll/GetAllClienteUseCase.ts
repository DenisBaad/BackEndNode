import { inject, injectable } from "tsyringe";
import { ResponseClienteJson } from "../../../../shared/communication/responses/clientes/ResponseClienteJson";
import { IGetAllClienteUseCase } from "./IGetAllClienteUseCase";
import type { IClienteReadOnlyRepository } from "../../../../domain/repositories/clientes/IClienteReadOnlyRepository";

@injectable()
export class GetAllClienteUseCase implements IGetAllClienteUseCase {

    constructor(@inject("IClienteReadOnlyRepository") private readonly clienteRepository: IClienteReadOnlyRepository) {}

    async execute(usuarioId: string): Promise<ResponseClienteJson[]> {
        return await this.clienteRepository.getAllAsync(usuarioId);
    }
}