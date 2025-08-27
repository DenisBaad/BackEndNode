import type { IFaturaReadOnlyRepository } from "../../../../domain/repositories/faturas/IFaturaReadOnlyRepository";
import type { IFaturaUpdateOnlyRepository } from "../../../../domain/repositories/faturas/IFaturaUpdateOnlyRepository";
import { RequestFaturaJson } from "../../../../shared/communication/requests/faturas/RequestFaturaJson";
import { IEditFaturaUseCase } from "./IEditFaturaUseCase";
export declare class EditFaturaUseCase implements IEditFaturaUseCase {
    private readonly faturaUpdateRepository;
    private readonly faturaReadRepository;
    constructor(faturaUpdateRepository: IFaturaUpdateOnlyRepository, faturaReadRepository: IFaturaReadOnlyRepository);
    execute(id: string, request: RequestFaturaJson): Promise<void>;
    private validate;
}
//# sourceMappingURL=EditFaturaUseCase.d.ts.map