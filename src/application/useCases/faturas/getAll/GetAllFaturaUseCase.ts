import { inject, injectable } from "tsyringe";
import { ResponseFaturaJson } from "../../../../shared/communication/responses/faturas/ResponseFaturaJson";
import { IGetAllFaturaUseCase } from "./IGetAllFaturaUseCase";
import type { IFaturaReadOnlyRepository } from "../../../../domain/repositories/faturas/IFaturaReadOnlyRepository";

@injectable()
export class GetAllFaturaUseCase implements IGetAllFaturaUseCase {

    constructor(@inject("IFaturaReadOnlyRepository") private readonly faturaRepository: IFaturaReadOnlyRepository) {}

    async execute(usuarioId: string): Promise<ResponseFaturaJson[]> {
        return await this.faturaRepository.getAllAsync(usuarioId);
    }
}