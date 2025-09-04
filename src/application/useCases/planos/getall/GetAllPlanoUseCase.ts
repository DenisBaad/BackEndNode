import { ResponsePlanoJson } from "../../../../shared/communication/responses/planos/ResponsePlanoJson";
import { IGetAllPlanoUseCase } from "./IGetAllPlanoUseCase";
import { inject, injectable } from 'tsyringe';
import type { IPlanoReadOnlyRepository } from '../../../../domain/repositories/planos/IPlanoReadOnlyRepository';
import { PagedResult } from "../../../../shared/communication/responses/PagedResult";

@injectable()
export class GetAllPlanoUseCase implements IGetAllPlanoUseCase {

    constructor(@inject("IPlanoReadOnlyRepository") private readonly planoRepository: IPlanoReadOnlyRepository) {}

    async execute(usuarioId: string, pageNumber: number, pageSize: number, search?: string): Promise<PagedResult<ResponsePlanoJson>> {
        const planosPaged = await this.planoRepository.getAllAsync(usuarioId, pageNumber, pageSize, search);
        return new PagedResult<ResponsePlanoJson>(planosPaged.items, planosPaged.totalCount);
   }
}