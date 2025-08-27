import { RequestPlanoJson } from "../../../../shared/communication/requests/planos/RequestPlanoJson";
import { ResponsePlanoJson } from "../../../../shared/communication/responses/planos/ResponsePlanoJson";
import { ICreatePlanoUseCase } from "./ICreatePlanoUseCase";
import type { IPlanoWriteOnlyRepository } from '../../../../domain/repositories/planos/IPlanoWriteOnlyRepository';
export declare class CreatePlanoUseCase implements ICreatePlanoUseCase {
    private readonly planoRepository;
    constructor(planoRepository: IPlanoWriteOnlyRepository);
    execute(usuarioId: string, request: RequestPlanoJson): Promise<ResponsePlanoJson>;
    private validate;
}
//# sourceMappingURL=CreatePlanoUseCase.d.ts.map