import { ResponsePlanoJson } from "../../../../shared/communication/responses/planos/ResponsePlanoJson";
import { IGetAllPlanoUseCase } from "./IGetAllPlanoUseCase";
import type { IPlanoReadOnlyRepository } from '../../../../domain/repositories/planos/IPlanoReadOnlyRepository';
export declare class GetAllPlanoUseCase implements IGetAllPlanoUseCase {
    private readonly planoRepository;
    constructor(planoRepository: IPlanoReadOnlyRepository);
    execute(usuarioId: string): Promise<ResponsePlanoJson[]>;
}
//# sourceMappingURL=GetAllPlanoUseCase.d.ts.map