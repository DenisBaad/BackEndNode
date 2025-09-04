import { inject, injectable } from "tsyringe";
import { ResponseFaturaJson } from "../../../../shared/communication/responses/faturas/ResponseFaturaJson";
import { IGetAllFaturaUseCase } from "./IGetAllFaturaUseCase";
import type { IFaturaReadOnlyRepository } from "../../../../domain/repositories/faturas/IFaturaReadOnlyRepository";
import { PagedResult } from "../../../../shared/communication/responses/PagedResult";

@injectable()
export class GetAllFaturaUseCase implements IGetAllFaturaUseCase {

    constructor(@inject("IFaturaReadOnlyRepository") private readonly faturaRepository: IFaturaReadOnlyRepository) {}

    async execute(usuarioId: string, pageNumber: number, pageSize: number): Promise<PagedResult<ResponseFaturaJson>> {
        const faturasPaged = await this.faturaRepository.getAllAsync(usuarioId, pageNumber, pageSize);
        return new PagedResult<ResponseFaturaJson>(faturasPaged.items, faturasPaged.totalCount);
    }
}