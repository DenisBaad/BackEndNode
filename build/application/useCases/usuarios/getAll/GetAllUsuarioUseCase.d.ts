import type { IUsuarioReadOnlyRepository } from "../../../../domain/repositories/usuarios/IUsuarioReadOnlyRepository";
import { ResponseUsuarioJson } from "../../../../shared/communication/responses/usuarios/ResponseUsuarioJson";
import { IGetAllUsuarioUseCase } from "./IGetAllUsuarioUseCase";
export declare class GetAllUsuarioUseCase implements IGetAllUsuarioUseCase {
    private readonly usuarioRepository;
    constructor(usuarioRepository: IUsuarioReadOnlyRepository);
    execute(): Promise<ResponseUsuarioJson[]>;
}
//# sourceMappingURL=GetAllUsuarioUseCase.d.ts.map