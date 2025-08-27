import { Cliente } from "../../entities/Cliente";
export interface IClienteWriteOnlyRepository {
    addAsync(cliente: Cliente): Promise<void>;
}
//# sourceMappingURL=IClienteWriteOnlyRepository.d.ts.map