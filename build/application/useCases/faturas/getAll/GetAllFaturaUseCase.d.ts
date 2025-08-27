import { ResponseFaturaJson } from "../../../../shared/communication/responses/faturas/ResponseFaturaJson";
import { IGetAllFaturaUseCase } from "./IGetAllFaturaUseCase";
import type { IFaturaReadOnlyRepository } from "../../../../domain/repositories/faturas/IFaturaReadOnlyRepository";
export declare class GetAllFaturaUseCase implements IGetAllFaturaUseCase {
    private readonly faturaRepository;
    constructor(faturaRepository: IFaturaReadOnlyRepository);
    execute(usuarioId: string): Promise<ResponseFaturaJson[]>;
}
//# sourceMappingURL=GetAllFaturaUseCase.d.ts.map