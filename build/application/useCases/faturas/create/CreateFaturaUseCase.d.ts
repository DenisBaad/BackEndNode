import { RequestFaturaJson } from "../../../../shared/communication/requests/faturas/RequestFaturaJson";
import { ResponseFaturaJson } from "../../../../shared/communication/responses/faturas/ResponseFaturaJson";
import { ICreateFaturaUseCase } from "./ICreateFaturaUseCase";
import type { IFaturaWriteOnlyRepository } from "../../../../domain/repositories/faturas/IFaturaWriteOnlyRepository";
export declare class CreateFaturaUseCase implements ICreateFaturaUseCase {
    private readonly faturaRepository;
    constructor(faturaRepository: IFaturaWriteOnlyRepository);
    execute(usuarioId: string, request: RequestFaturaJson): Promise<ResponseFaturaJson>;
    private validate;
}
//# sourceMappingURL=CreateFaturaUseCase.d.ts.map