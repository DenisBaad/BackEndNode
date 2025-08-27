import { ResponseClienteJson } from "../../../../shared/communication/responses/clientes/ResponseClienteJson";
import { IGetAllClienteUseCase } from "./IGetAllClienteUseCase";
import type { IClienteReadOnlyRepository } from "../../../../domain/repositories/clientes/IClienteReadOnlyRepository";
export declare class GetAllClienteUseCase implements IGetAllClienteUseCase {
    private readonly clienteRepository;
    constructor(clienteRepository: IClienteReadOnlyRepository);
    execute(usuarioId: string): Promise<ResponseClienteJson[]>;
}
//# sourceMappingURL=GetAllClienteUseCase.d.ts.map