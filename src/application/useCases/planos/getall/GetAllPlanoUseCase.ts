import { ResponsePlanoJson } from "../../../../shared/communication/responses/planos/ResponsePlanoJson";
import { IGetAllPlanoUseCase } from "./IGetAllPlanoUseCase";
import { inject, injectable } from 'tsyringe';
import type { IPlanoReadOnlyRepository } from '../../../../domain/repositories/planos/IPlanoReadOnlyRepository';

@injectable()
export class GetAllPlanoUseCase implements IGetAllPlanoUseCase {

    constructor(@inject("IPlanoReadOnlyRepository") private readonly planoRepository: IPlanoReadOnlyRepository) {}

    async execute(usuarioId: string): Promise<ResponsePlanoJson[]> {
        return await this.planoRepository.getAllAsync(usuarioId);
    }
}