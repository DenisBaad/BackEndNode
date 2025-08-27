import { RequestClienteJson } from "../../../../shared/communication/requests/clientes/RequestClienteJson";
import { IEditClienteUseCase } from "./IEditClienteUseCase";
import type { IClienteUpdateOnlyRepository } from "../../../../domain/repositories/clientes/IClienteUpdateOnlyRepository";
import type { IClienteReadOnlyRepository } from "../../../../domain/repositories/clientes/IClienteReadOnlyRepository";
export declare class EditClienteUseCase implements IEditClienteUseCase {
    private readonly clienteUpdateRepository;
    private readonly clienteReadRepository;
    constructor(clienteUpdateRepository: IClienteUpdateOnlyRepository, clienteReadRepository: IClienteReadOnlyRepository);
    execute(id: string, request: RequestClienteJson): Promise<void>;
    private validate;
}
//# sourceMappingURL=EditClienteUseCase.d.ts.map