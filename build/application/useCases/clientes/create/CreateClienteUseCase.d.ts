import { RequestClienteJson } from "../../../../shared/communication/requests/clientes/RequestClienteJson";
import { ResponseClienteJson } from "../../../../shared/communication/responses/clientes/ResponseClienteJson";
import { ICreateClienteUseCase } from "./ICreateClienteUseCase";
import type { IClienteWriteOnlyRepository } from "../../../../domain/repositories/clientes/IClienteWriteOnlyRepository";
export declare class CreateClienteUseCase implements ICreateClienteUseCase {
    private readonly clienteRepository;
    constructor(clienteRepository: IClienteWriteOnlyRepository);
    execute(usuarioId: string, request: RequestClienteJson): Promise<ResponseClienteJson>;
    private validate;
}
//# sourceMappingURL=CreateClienteUseCase.d.ts.map