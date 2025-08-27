import { IAtivarInativarUseCase } from "./IAtivarInativarUseCase";
import type { IClienteUpdateOnlyRepository } from "../../../../domain/repositories/clientes/IClienteUpdateOnlyRepository";
import type { IClienteReadOnlyRepository } from "../../../../domain/repositories/clientes/IClienteReadOnlyRepository";
export declare class AtivarInativarUseCase implements IAtivarInativarUseCase {
    private readonly clienteUpdateRepository;
    private readonly clienteReadRepository;
    constructor(clienteUpdateRepository: IClienteUpdateOnlyRepository, clienteReadRepository: IClienteReadOnlyRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=AtivarInativarUseCase.d.ts.map