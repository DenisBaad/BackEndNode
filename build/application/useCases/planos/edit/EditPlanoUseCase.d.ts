import { RequestPlanoJson } from "../../../../shared/communication/requests/planos/RequestPlanoJson";
import { IEditPlanoUseCase } from "./IEditPlanoUseCase";
import type { IPlanoUpdateOnlyRepository } from "../../../../domain/repositories/planos/IPlanoUpdateOnlyRepository";
import type { IPlanoReadOnlyRepository } from "../../../../domain/repositories/planos/IPlanoReadOnlyRepository";
export declare class EditPlanoUseCase implements IEditPlanoUseCase {
    private readonly planoUpdate;
    private readonly planoRead;
    constructor(planoUpdate: IPlanoUpdateOnlyRepository, planoRead: IPlanoReadOnlyRepository);
    execute(id: string, request: RequestPlanoJson): Promise<void>;
    private validate;
}
//# sourceMappingURL=EditPlanoUseCase.d.ts.map