import { inject, injectable } from "tsyringe";
import { ResponseClienteJson } from "../../../../shared/communication/responses/clientes/ResponseClienteJson";
import { IGetAllClienteUseCase } from "./IGetAllClienteUseCase";
import type { IClienteReadOnlyRepository } from "../../../../domain/repositories/clientes/IClienteReadOnlyRepository";
import { PagedResult } from "../../../../shared/communication/responses/PagedResult";

@injectable()
export class GetAllClienteUseCase implements IGetAllClienteUseCase {

    constructor(@inject("IClienteReadOnlyRepository") private readonly clienteRepository: IClienteReadOnlyRepository) {}

    async execute(usuarioId: string, pageNumber: number, pageSize: number, search?: string): Promise<PagedResult<ResponseClienteJson>> {
        const clientesPaged = await this.clienteRepository.getAllAsync(usuarioId, pageNumber, pageSize, search);
        return new PagedResult<ResponseClienteJson>(clientesPaged.items, clientesPaged.totalCount);
    }
}