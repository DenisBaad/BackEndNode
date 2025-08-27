import { IRelatorioFaturasUseCase } from "./IRelatorioFaturasUseCase";
import type { IFaturaReadOnlyRepository } from "../../../../domain/repositories/faturas/IFaturaReadOnlyRepository";
import type { IClienteReadOnlyRepository } from "../../../../domain/repositories/clientes/IClienteReadOnlyRepository";
import type { IPlanoReadOnlyRepository } from "../../../../domain/repositories/planos/IPlanoReadOnlyRepository";
import { EnumStatusFatura } from "../../../../shared/communication/enums/EnumStatusFatura";
export declare class RelatorioFaturasUseCase implements IRelatorioFaturasUseCase {
    private readonly faturaRepository;
    private readonly clienteRepository;
    private readonly planoRepository;
    constructor(faturaRepository: IFaturaReadOnlyRepository, clienteRepository: IClienteReadOnlyRepository, planoRepository: IPlanoReadOnlyRepository);
    executar(usuarioId: string, usuarioNome: string, dataAbertura?: Date, dataFechamento?: Date, status?: EnumStatusFatura, clienteIds?: string[]): Promise<Buffer>;
}
//# sourceMappingURL=RelatorioFaturasUseCase.d.ts.map